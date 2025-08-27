import { GetServerSideProps } from "next";
import Globals from "@/modules/Globals";
import AwardCategorySection from "@/components/home/AwardCatagorySection";

type PageProps = {
  pageData: any | null;
};

export default function Page({ pageData }: PageProps) {
  if (!pageData) {
    return null;
  }
  return (
    <main className="py-10">
      <div>
        <AwardCategorySection pageData={pageData} />
      </div>
    </main>
  );
}

export const getServerSideProps: GetServerSideProps = async (context: any) => {
  const { locale } = context;

  const languageCode = locale === "ar" ? "arabic" : "default";
  try {
    const response: any = await Globals.KontentClient.item("home_page_2026")
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
