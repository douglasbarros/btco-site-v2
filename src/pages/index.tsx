import type { GetStaticProps, InferGetStaticPropsType } from "next";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import PrincipalImage from "../components/principal-image";

// eslint-disable-next-line no-unused-vars
const HomePage = (_props: InferGetStaticPropsType<typeof getStaticProps>) => {
  const { t } = useTranslation("common");
  return (
    <>
      <section>
        <>
          <div className="text-center">
            <h2 className="mt-9 mb-3 text-4xl font-bold dark:text-gray-200">
              Bitcoin Nano {t("cryptocurrency")}
            </h2>
            <p className="mt-9 mb-3 dark:text-gray-200">{t("subtitle")}</p>
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <PrincipalImage />
          </div>
        </>
      </section>
    </>
  );
};

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale ?? "en", ["common"])),
  },
});

export default HomePage;
