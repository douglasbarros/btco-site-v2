import copy from "copy-to-clipboard";
import { Button } from "flowbite-react";
import type { GetStaticProps, InferGetStaticPropsType } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useRouter } from "next/router";
import { FaRegCopy } from "react-icons/fa";
import { HiCheck } from "react-icons/hi";
import { toast } from "react-toastify";

// eslint-disable-next-line no-unused-vars
const Apikeys = (_props: InferGetStaticPropsType<typeof getStaticProps>) => {
  const router = useRouter();
  const { serviceName, hash, hashPair1, hashPair2 } = router.query;

  const handleCopyKeys = () => {
    copy(
      `API Key: ${hash} | Pair Key 1: ${hashPair1} | Pair Key 2: ${hashPair2}`
    );
    toast.success("Keys copied successfully!");
  };

  return (
    <>
      <section>
        <>
          <header>
            <h2 className="mt-9 mb-3 text-4xl font-bold dark:text-gray-200">
              {serviceName} - Your Keys:
            </h2>
          </header>
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex w-full items-center rounded-lg bg-white p-4 text-gray-500 shadow dark:bg-gray-800 dark:text-gray-400">
              <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-green-100 text-green-500 dark:bg-green-800 dark:text-green-200">
                <HiCheck className="h-5 w-5" />
              </div>
              <div className="flex w-full flex-col gap-4">
                <div className="ml-3 text-sm font-normal">
                  <span className="font-bold text-gray-700 dark:text-gray-400">
                    API Key:{" "}
                  </span>
                  {hash}
                </div>
                <div className="ml-3 text-sm font-normal">
                  <span className="font-bold text-gray-700 dark:text-gray-400">
                    Pair Key 1:{" "}
                  </span>
                  {hashPair1}
                </div>
                <div className="ml-3 text-sm font-normal">
                  <span className="font-bold text-gray-700 dark:text-gray-400">
                    Pair Key 2:{" "}
                  </span>
                  {hashPair2}
                </div>
              </div>
              <div className="flex w-24 flex-col gap-4">
                <Button
                  size="sm"
                  outline
                  gradientDuoTone="greenToBlue"
                  onClick={handleCopyKeys}
                >
                  <FaRegCopy size="24" />
                </Button>
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

export default Apikeys;
