/* eslint-disable jsx-a11y/anchor-is-valid */
import { Button } from "flowbite-react";
import { useTranslation } from "next-i18next";
import Link from "next/link";
import { useRouter } from "next/router";
import {
  HiHome,
  HiOutlineDeviceMobile,
  HiShoppingBag,
  HiUserGroup,
} from "react-icons/hi";
import { IoIosRocket } from "react-icons/io";
import Sidebar from "../components/sidebar";

const iconClass =
  "h-6 w-6 mr-2 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white text-gray-700 dark:text-gray-100";

const ActualSidebar = function (): JSX.Element {
  const { t } = useTranslation("common");
  const router = useRouter();

  const menuItems = [
    {
      href: "/",
      title: "Home",
      icon: <HiHome className={iconClass} />,
    },
    {
      href: "/marketplace",
      title: "Marketplace",
      icon: <HiShoppingBag className={iconClass} />,
    },
    {
      href: "/members",
      title: t("members"),
      icon: <HiUserGroup className={iconClass} />,
    },
    {
      href: "/infinitum",
      title: t("infinitumWallet"),
      icon: <HiOutlineDeviceMobile className={iconClass} />,
    },
  ];

  return (
    <Sidebar>
      <Sidebar.Items>
        <Sidebar.ItemGroup>
          <ul className="mt-14 lg:mt-2">
            {menuItems.map(({ href, title, icon }) => (
              <li
                className={
                  router.pathname == href
                    ? "m-2 rounded bg-gray-100 dark:bg-gray-700"
                    : "m-2"
                }
                key={title}
              >
                <Link href={href}>
                  <span
                    className={`flex p-2 text-lg font-normal text-gray-900 rounded hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700 cursor-pointer`}
                  >
                    {icon}
                    {title}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
          <div className="float-left mt-4 ml-2">
            <Button
              outline
              gradientDuoTone="purpleToPink"
              onClick={() =>
                window.open(
                  "https://presales.bitcoinnano.org",
                  "_blank",
                  "noopener,noreferrer"
                )
              }
            >
              <IoIosRocket className="mr-2" />
              {t("presales")}
            </Button>
          </div>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
};

export default ActualSidebar;
