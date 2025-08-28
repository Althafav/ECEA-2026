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
import Link from "next/link";
import PopupBanner from "@/components/common/PopupBanner";
import SubscribeForm from "@/components/home/SubscribeForm";

type PageProps = {
  pageData: Homepage2026 | null;
  locale: string;
};

export default function Home({ pageData, locale }: PageProps) {
  if (!pageData) {
    return null;
  }
  return (
    <main className="w-full">
      {/* <PopupBanner
        bannerImage={pageData.promobannerimage.value[0].url}
        href={pageData.promobannerlink.value}
        frequency="day" // "session" | "day" | "always"
        openDelay={3000} // ms
        alt=" Excellence and Creative Engineering Award"
      /> */}
      <HeroCenterAuto
        videoSrc={pageData.bannervideolink.value}
        poster={pageData.bannerimage.value[0]?.url}
        topOffsetPx={111}
        initialVw={34.5}
        bannerHeading={
          locale === "ar"
            ? ["التقديم", "مفتوح الآن!"]
            : ["SUBMISSIONS ", "NOW OPEN!"]
        }
        ctaText={locale === "ar" ? "قدّم الآن" : "Apply Now"}
        ctaHref="/award-categories"
        duration={1.2}
        linesStagger={0.12}
        startViewport="top 80%"
        playOnce={true}
      />

      <div className="container mx-auto">
        {/* aboutheading.value */}
        <div className="py-20">
          <div className="grid sm:grid-cols-2 gap-10">
            <div>
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

              <div>
                {pageData.aboutctabuttonlink.value && (
                  <div className="overflow-hidden mt-6">
                    <Link
                      className="cta inline-block rounded-full hover:bg-black px-5 py-3 text-white backdrop-blur-md  bg-primary-3 transition"
                      href={pageData.aboutctabuttonlink.value}
                    >
                      {pageData.aboutctabuttonname.value}
                    </Link>
                  </div>
                )}
              </div>
            </div>
            <div className=" rounded-3xl overflow-hidden">
              <iframe
                title="YouTube Video"
                width="100%"
                height="350px"
                src="https://www.youtube.com/embed/2Cvl6saWy-A?si=FLGo3BAecG3sAy7e"
                frameBorder="0"
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="h-full"
              />
            </div>
          </div>
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
      <div className="py-10 bg-transparent" id="subscribe-section">
        <SubscribeForm />
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
        locale,
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
