import Image from "next/image";
import { Rubik } from "next/font/google";
import { GetServerSideProps } from "next";
import Globals from "@/modules/Globals";
import { Homepage2026 } from "@/models/homepage2026";
import HeroCenterAuto from "@/components/animated/HeroCenterAuto";
import SplitTextReveal from "@/components/common/SplitTextReveal";
import ImportantDates from "@/components/home/ImportantDates";
import TargetCTAComponent from "@/components/home/TargetCTAComponent";
import EligibleSection from "@/components/home/EligibleSection";
import AwardCategorySection from "@/components/home/AwardCatagorySection";
import BenefitSection from "@/components/home/BenefitSection";
import PreviousWinnerSection from "@/components/home/PreviousWinnerSection";
import JurySection from "@/components/home/JurySection";
import SponsorSection from "@/components/home/SponsorSection";
import FAQSection from "@/components/home/FAQSection";


type PageProps = {
  pageData: Homepage2026 | null;
};

export default function Home({ pageData }: PageProps) {
  if (!pageData) {
    return null;
  }
  return (
    <main className="">
      <HeroCenterAuto
        videoSrc={pageData.bannervideolink.value}
        poster={pageData.bannerimage.value[0]?.url}
        topOffsetPx={111}
        initialVw={34.5}
        bannerHeading={["Celebrating Excellence", "in Engineering"]}
        ctaText="Apply Now"
        ctaHref="/award-categories"
        duration={1.2}
        linesStagger={0.12}
        startViewport="top 80%"
        playOnce={true}
      />

      <div className="container mx-auto">
        {/* aboutheading.value */}
        <div className="py-20">
          <SplitTextReveal
            text={pageData.aboutheading.value}
            className="block text-4xl md:text-5xl max-w-xl font-bold leading-[1.06] tracking-tight"
            fromColor="#d1d5db"
            toColor="#C89F32"
            start="top 80%"
            end="bottom 20%"
            scrub={1}
            duration={0.6}
            stagger={0.06}
            debug={false}
          />
          {/* aboutdescription.value */}
          <SplitTextReveal
            text={pageData.aboutdescription.value}
            className="mt-6 text-lg md:text-xl"
            fromColor="#d1d5db"
            toColor="#111827"
            start="top 85%"
            end="top 25%"
            scrub={1}
            duration={0.4}
            stagger={0.02}
          />
        </div>

        <div className="py-20">
          <ImportantDates pageData={pageData} />
        </div>
      </div>
      <div className="py-20 bg-white">
        <TargetCTAComponent pageData={pageData} />
      </div>
      <div className="container mx-auto">
        <div className="py-20">
          <EligibleSection pageData={pageData} />
        </div>

        <div className="py-20" id="award-categories">
          <AwardCategorySection pageData={pageData} />
        </div>

        <div className="py-20" id="benefits">
          <BenefitSection pageData={pageData} />
        </div>

        <div className="py-20" id="previous-winners">
          <PreviousWinnerSection pageData={pageData} />
        </div>

        <div className="py-20" id="jury">
          <JurySection pageData={pageData} />
        </div>

        <div className="py-20" id="sponsors">
          <SponsorSection pageData={pageData} />
        </div>

        <div className="py-20" id="faq">
          <FAQSection pageData={pageData} />
        </div>
      </div>
    </main>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const response: any = await Globals.KontentClient.item("home_page_2026")
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
