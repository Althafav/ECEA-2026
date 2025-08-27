import { GetServerSideProps } from "next";
import Globals from "@/modules/Globals";

type PageProps = {
  pageData: any | null;
};

export default function Page({ pageData }: PageProps) {
  if (!pageData) {
    return null;
  }
  return (
    <main className="">
      <div className="container mx-auto">
        <div className="py-10">
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 md:text-4xl mb-8">
            {pageData.heading.value}
          </h1>
          <article
            className=" text-justify prose max-w-none "
            dangerouslySetInnerHTML={{ __html: pageData.content.value }}
          />
        </div>
      </div>
    </main>
  );
}

export const getServerSideProps: GetServerSideProps = async (context: any) => {
  const { locale } = context;

  console.log('locale' , locale)

  const languageCode = locale === "ar" ? "arabic" : "default";
  try {
    const response: any = await Globals.KontentClient.item(
      "uae_society_of_engineers_page"
    )
      .languageParameter(languageCode)
      .withParameter("depth", "4")
      .toPromise();

    const pageData = JSON.parse(JSON.stringify(response.item));

    return {
      props: {
        pageData,
      },
    };
  } catch (error) {
    console.error("Error fetching homepage content:", error);
    return {
      props: {
        pageData: null,
      },
    };
  }
};
