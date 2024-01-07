import AnimatedTitle from "@/components/AnimatedTitle";
import Container from "@/components/ui/Container";
import Header from "@/components/ui/Header";
import Wrapper from "@/components/ui/Wrapper";
import { getSiteSettings } from "@/lib/sanity.client";
import { SiteProps } from "@/types";
import { GetStaticProps } from "next";
import Link from "next/link";

type Props = {
  site: SiteProps;
};

export default function ContactPage({site}: Props) {
  return (
      <Container theme="white" className="bg-pageBG text-pageText transition-all duration-500 ease-linear">
      <Header title='Contact' menus={site.menus} />
      <div className="mt-8 space-y-14 pt-[var(--header-height)] md:mt-10 lg:space-y-32">
        <Wrapper>
        </Wrapper>
      </div>
    </Container>
  );
}


export const getStaticProps: GetStaticProps<
  Props
> = async () => {
  const [site] = await Promise.all([
    getSiteSettings(),
  ]);
  return {
    props: {
      site,
    },
  };
};

ContactPage.getLayout = function getLayout(page: any) {
  return <>{page}</>;
};
