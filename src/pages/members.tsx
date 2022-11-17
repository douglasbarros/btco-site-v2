import Member from "../components/member";
import Container from "../components/container";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import type { GetStaticProps, InferGetStaticPropsType } from "next";

const thales = "/img/team/thales.webp";
const andrey = "/img/team/andrey.webp";
const carlos = "/img/team/carlos_santana.webp";
const douglas = "/img/team/douglas.webp";
const elissandro = "/img/team/elissandro.webp";
const emerson = "/img/team/emerson.webp";
const ismael = "/img/team/ismael.webp";
const max = "/img/team/max.webp";
const ricardo = "/img/team/ricardo.webp";
const rogerio = "/img/team/rogerio.webp";
const talmiro = "/img/team/talmiro.webp";
const willian = "/img/team/willian.webp";

const Members = (_props: InferGetStaticPropsType<typeof getStaticProps>) => {
  const { t } = useTranslation("common");
  return (
    <>
      <section>
        <>
        <header>
          <h2 className="mt-9 mb-3 text-4xl font-bold dark:text-gray-200">
            {t("members")}
          </h2>
        </header>
        <div className="flex flex-wrap items-center gap-4">
          <Container>
            <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-8 xl:grid-cols-4">
              <Member image={thales} name="Thales Andrey" title="Director of Developer Relations @ Bitcoin Nano" />
              <Member image={andrey} name="Andrey Nikolas" title="Machine Learning Expert @ Bitcoin Nano" />
              <Member image={carlos} name="Carlos Santana" title="Chief Marketing Officer @ Bitcoin Nano" />
              <Member image={douglas} name="Douglas Barros" title="CTO Co-Founder @ Bitcoin Nano" />
              <Member image={elissandro} name="Elissandro Martins" title="Full-stack developer @ Bitcoin Nano" />
              <Member image={emerson} name="Emerson Pedroso" title="CEO Founder @ Bitcoin Nano" />
              <Member image={ismael} name="Ismael Zazzeron" title="CSO & Machine Learning Expert @ Bitcoin Nano" />
              <Member image={max} name="Max Junior" title="Trading Expert & Co-Founder @ Bitcoin Nano" />
              <Member image={ricardo} name="Ricardo Silva" title="Junior front-end developer @ Bitcoin Nano" />
              <Member image={rogerio} name="Rogerio Santiago" title="CCO Co-Founder @ Bitcoin Nano" />
              <Member image={talmiro} name="Talmiro Silva" title="Full-stack developer @ Bitcoin Nano" />
              <Member image={willian} name="Willian da Silva" title="Junior Front-end Developer @ Bitcoin Nano" />
            </div>
          </Container>
        </div>
        </>
      </section>
    </>
  );
}

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...await serverSideTranslations(locale ?? 'en', ['common']),
  },
})

export default Members;