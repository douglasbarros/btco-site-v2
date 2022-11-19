/* eslint-disable tailwindcss/no-custom-classname */
import { Button, Card, Label } from "flowbite-react";
import { useRouter } from "next/router";
import { useState } from "react";
//import * as acceptBtco from '../../dist';
import * as acceptBtco from "accept-btco";
import { useTranslation } from "next-i18next";
import { v1 as uuidv1, v4 as uuidv4 } from "uuid";
import { api, API } from "../utils/api";
import { ServicePayment } from "../utils/types";

const baseURL = process.env.NODE_ENV == "development" ? API : "";

const ServiceCard = function (props: any): JSX.Element {
  const { t, i18n } = useTranslation("common");
  const router = useRouter();

  const [amount, setAmount] = useState("");
  const [amountInTime, setAmountInTime] = useState("");
  let servicePayment: ServicePayment | null = null;

  const defineAmount = (days: number) => {
    const numBTCO = days * 24 * props.price_per_hour;
    const strBTCO = numBTCO.toLocaleString(i18n.language, {
      minimumFractionDigits: 3,
      maximumFractionDigits: 3,
    });
    maskAmount({ target: { value: strBTCO } });
  };

  const maskAmount = (event: any) => {
    const value = event.target.value;
    if (value.length > 15) return;
    const num = Number(value.replace(/\D/g, "")) / 1000;
    setAmount(
      num.toLocaleString(i18n.language, {
        minimumFractionDigits: 3,
        maximumFractionDigits: 3,
      })
    );
    const amountInHours = num / props.price_per_hour;
    if (amountInHours < 1) {
      // show in minutes
      const time = new Number(amountInHours * 60).toLocaleString(
        i18n.language,
        {
          minimumFractionDigits: 0,
          maximumFractionDigits: 0,
        }
      );
      setAmountInTime(time + " " + t("minute", { count: parseInt(time) }));
    } else if (amountInHours < 24) {
      // show in hours
      const time = new Number(amountInHours).toLocaleString(i18n.language, {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      });
      setAmountInTime(time + " " + t("hour", { count: parseInt(time) }));
    } else {
      // show in days
      const time = new Number(amountInHours / 24).toLocaleString(
        i18n.language,
        {
          minimumFractionDigits: 0,
          maximumFractionDigits: 0,
        }
      );
      setAmountInTime(time + " " + t("day", { count: parseInt(time) }));
    }
  };

  const onSubmit = async (event: any) => {
    event.preventDefault();

    const session = acceptBtco.createSession({
      apiHost: process.env["ACCEPT_BTCO_API"] || "",
      debug: true,
    });

    session.on("start", async () => {
      console.log("paymentStarted");
      if (amount !== null) {
        const amountNum: number = parseFloat(
          amount.replaceAll(".", "").replace(",", ".")
        );
        const response = await api<{ data: ServicePayment }>(
          "/api/service-payments",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
              Authorization: "Bearer " + process.env["JWT_TOKEN"],
            },
            body: JSON.stringify({
              data: {
                service: props.id,
                date_ini: new Date(),
                hash: uuidv4() + "/" + uuidv1(),
                amount_hours: amountNum
                  ? new Number(amountNum / props.price_per_hour).toFixed(15)
                  : null,
                amount_btco: amountNum,
              },
            }),
          }
        );
        servicePayment = response.data;
      }
    });

    session.on("end", async (error, payment) => {
      console.log("paymentEnded");
      if (error) {
        console.error({ reason: error.reason });
        if (servicePayment !== null) {
          const response = await api<{ data: ServicePayment }>(
            `/api/service-payments/${servicePayment.id}`,
            {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                Authorization: "Bearer " + process.env["JWT_TOKEN"],
              },
              body: JSON.stringify({
                data: {
                  error: error.reason,
                  destination_account: payment?.account,
                  token: payment?.token,
                  merchant_notified: payment?.merchantNotified,
                },
              }),
            }
          );
          servicePayment = response.data;
        }
        return;
      }

      if (servicePayment !== undefined && servicePayment !== null) {
        const response = await api<{ data: ServicePayment }>(
          `/api/service-payments/${servicePayment.id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
              Authorization: "Bearer " + process.env["JWT_TOKEN"],
            },
            body: JSON.stringify({
              data: {
                amount_paid: payment?.amount,
                payment_state: payment?.state,
                sub_payments: payment?.subPayments,
                destination_account: payment?.account,
                token: payment?.token,
                merchant_notified: payment?.merchantNotified,
              },
            }),
          }
        );
        servicePayment = response.data;

        if (servicePayment.attributes.merchant_notified) {
          router.push(
            {
              pathname: "/api-keys",
              query: {
                serviceName: props.name,
                hash: servicePayment.attributes.hash,
              },
            },
            "/api-keys"
          );
        }
      }
    });

    session.createPayment({
      amount: amount.replaceAll(".", "").replace(",", "."),
      currency: "BTCO",
      state: uuidv4(),
    });
  };

  return (
    <div className="max-w-sm">
      <Card imgAlt={props.description} imgSrc={baseURL + props.image}>
        <div className="h-200">
          <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {props.name}
          </h5>
          <p className="h-24 font-normal text-gray-700 dark:text-gray-400">
            {props.description}
          </p>
          <div>
            <form id="paymentForm" onSubmit={onSubmit}>
              <div className="mb-2 block h-10">
                <Label htmlFor="amount">
                  {t("amount")}{" "}
                  {amountInTime && `(${t("time")}: ${amountInTime})`}
                </Label>
              </div>
              <div className="inline-flex w-full gap-1">
                <div className="flex">
                  <input
                    type="text"
                    id="amount"
                    value={amount}
                    onChange={maskAmount}
                    placeholder="0.000"
                    className="block rounded-l-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                    required
                  ></input>
                  <span className="inline-flex items-center rounded-r-lg border border-r-0 border-gray-300 bg-gray-200 px-2 text-sm text-gray-900 dark:border-gray-600 dark:bg-gray-600 dark:text-gray-400">
                    BTCO
                  </span>
                </div>
                <div className="flex">
                  <Button outline gradientDuoTone="greenToBlue" type="submit">
                    {t("payNow")}
                  </Button>
                </div>
              </div>
              <div className="mt-1">
                <div className="inline-flex rounded-md shadow-sm" role="group">
                  <button
                    type="button"
                    onClick={() => defineAmount(30)}
                    className="rounded-l-lg border border-gray-200 bg-white p-2 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:text-blue-700 focus:ring-2 focus:ring-blue-700 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600 dark:hover:text-white dark:focus:text-white dark:focus:ring-blue-500"
                  >
                    {`30 ${t("day", { count: 30 })}`}
                  </button>
                  <button
                    type="button"
                    onClick={() => defineAmount(90)}
                    className="border border-b border-gray-200 bg-white p-2 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:text-blue-700 focus:ring-2 focus:ring-blue-700 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600 dark:hover:text-white dark:focus:text-white dark:focus:ring-blue-500"
                  >
                    {`3 ${t("month", { count: 3 })}`}
                  </button>
                  <button
                    type="button"
                    onClick={() => defineAmount(180)}
                    className="border border-b border-gray-200 bg-white p-2 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:text-blue-700 focus:ring-2 focus:ring-blue-700 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600 dark:hover:text-white dark:focus:text-white dark:focus:ring-blue-500"
                  >
                    {`6 ${t("month", { count: 6 })}`}
                  </button>
                  <button
                    type="button"
                    onClick={() => defineAmount(365)}
                    className="rounded-r-md border border-gray-200 bg-white p-2 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:text-blue-700 focus:ring-2 focus:ring-blue-700 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600 dark:hover:text-white dark:focus:text-white dark:focus:ring-blue-500"
                  >
                    {`1 ${t("year", { count: 1 })}`}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ServiceCard;
