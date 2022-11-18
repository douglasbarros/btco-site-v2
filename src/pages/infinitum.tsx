import type { GetStaticProps, InferGetStaticPropsType } from "next";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Image from "next/image";

const Infinitum = (_props: InferGetStaticPropsType<typeof getStaticProps>) => {
  const { t } = useTranslation("common");
  return (
    <>
      <section>
        <>
          <header>
            <h2 className="mt-9 mb-3 text-4xl font-bold dark:text-gray-200">
              {t("infinitumWallet")}
            </h2>
          </header>
          <div className="flex flex-wrap">
            <div className="columns-1 xl:columns-2">
              <div className="px-12 text-center py-8 xl:pt-60">
                <Image
                  className="w-100"
                  src="/img/infinitum/hero-text-v2.svg"
                  width={346}
                  height={76}
                />
                <div className="flex flex-row justify-center columns-2 gap-12">
                  <div className="button-bg w-36 grow-2">
                    <a
                      href="https://apps.apple.com/br/app/infinitum-wallet/id1613978672"
                      target="_blank"
                    >
                      <Image
                        className="w-95"
                        src="/img/infinitum/button-appstore-v2.svg"
                        width={141}
                        height={42}
                      />
                    </a>
                  </div>
                  <div className="button-bg w-36 grow-2">
                    <a
                      href="https://play.google.com/store/apps/details?id=com.bitcoinnano.infinitum"
                      target="_blank"
                    >
                      <Image
                        className="w-95"
                        src="/img/infinitum/button-playstore-v2.svg"
                        width={141}
                        height={42}
                      />
                    </a>
                  </div>
                </div>
              </div>
              <div className="px-12">
                <Image
                  src="/img/infinitum/hero-phone-v2xx.svg"
                  width={562}
                  height={761}
                />
              </div>
            </div>
          </div>
          <div className="flex flex-wrap">
            <div className="columns-1 xl:columns-2">
              <div className="px-12">
                <Image
                  src="/img/infinitum/send-phone-v3.svg"
                  width={562}
                  height={761}
                />
              </div>
              <div className="px-12 text-center py-8 xl:pt-60">
                <div className="bubble-bg grow-2">
                  <Image
                    className="w-100"
                    src="/img/infinitum/send-bubble-v2.svg"
                    width={325}
                    height={100}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-wrap">
            <div className="columns-1 xl:columns-2">
              <div className="px-12 text-center py-8 xl:pt-60">
                <div className="bubble-bg grow-2">
                  <Image
                    className="w-100"
                    src="/img/infinitum/receive-bubble-v2.svg"
                    width={325}
                    height={100}
                  />
                </div>
              </div>
              <div className="px-12">
                <Image
                  src="/img/infinitum/receive-phone-v3.png"
                  width={562}
                  height={761}
                />
              </div>
            </div>
          </div>
          <div className="flex flex-wrap">
            <div className="columns-1 xl:columns-2">
              <div className="px-12">
                <Image
                  src="/img/infinitum/contacts-phone-v3.png"
                  width={562}
                  height={761}
                />
              </div>
              <div className="px-12 text-center py-8 xl:pt-60">
                <div className="bubble-bg grow-2">
                  <Image
                    className="w-100"
                    src="/img/infinitum/contacts-bubble-v2.svg"
                    width={325}
                    height={100}
                  />
                </div>
              </div>
            </div>
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

export default Infinitum;
