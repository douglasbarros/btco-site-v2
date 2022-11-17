import React, { useEffect, useState } from "react";
import ServiceCard from "../components/service-card";
import { api } from "../utils/api";
import { Service } from "../utils/types";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import type { GetStaticProps, InferGetStaticPropsType } from "next";

type Props = {
  locale: string;
}

const Marketplace = (_props: InferGetStaticPropsType<typeof getStaticProps>) => {
  const [services, setServices] = useState<Service[]>([]);

  useEffect(()=>{
    api<{ data: Service[] }>(`/api/services?locale=${_props.locale}&filters[active][$eq]=true`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: "Bearer " + process.env['JWT_TOKEN'],
      },
    }).then(({ data }) => {
      setServices(data)
    }).catch(error => {
      console.error(error)
    })
  }, [])

  const listServices = services.map((service: Service) => {
    return <ServiceCard
      key={service.id}
      id={service.id}
      name={service.attributes.name}
      description={service.attributes.description}
      image={service.attributes.image}
      price_per_hour={service.attributes.price_per_hour}
    />
  })

  return (
    <>
      <section>
        <>
        <header>
          <h2 className="mt-9 mb-3 text-4xl font-bold dark:text-gray-200">
            Marketplace
          </h2>
        </header>
        <div className="flex flex-wrap items-center gap-4">
          {listServices}
        </div>
        </>
      </section>
    </>
  );
}

export const getStaticProps: GetStaticProps<Props> = async ({ locale }) => ({
  props: {
    locale: locale ?? 'en',
    ...await serverSideTranslations(locale ?? 'en', ['common']),
  },
})

export default Marketplace;