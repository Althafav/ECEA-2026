import Globals from "@/modules/Globals";
import JsLoader from "@/modules/JsLoader";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

interface Props {
  pageData: any;
  attendAs: string;
}

export default function Page({ pageData, attendAs }: Props) {
  useEffect(() => {
    JsLoader.loadFile(`/assets/js/contact.js`);
  }, []);
  if (!pageData) {
    return null;
  }
  return (
    <div className="py-20 bg-white">
      <div className="container mx-auto px-4 max-w-5xl">
        <form
          method="POST"
          action="//ac.strategic.ae/proc.php"
          id="_form_319_"
          className="_form _form_319 _inline-form  _dark"
          noValidate
        >
          <input type="hidden" name="u" value="319" />
          <input type="hidden" name="f" value="319" />
          <input type="hidden" name="s" />
          <input type="hidden" name="c" value="0" />
          <input type="hidden" name="m" value="0" />
          <input type="hidden" name="act" value="sub" />
          <input type="hidden" name="v" value="2" />
          <input
            type="hidden"
            name="or"
            value="cc70b1451fc22350bb9bcea2a5cbc2eb"
          />

          <input
            type="hidden"
            name="field[38]"
            value={`ECEA 2025 - ${attendAs}`}
          />

          {attendAs === "Award Guide" && (
            <input
              type="hidden"
              id="award-guide"
              value={pageData.awardguidepdflink.value}
            />
          )}

          <div className="_form-content">
            <div className="grid grid-cols-2 gap-3">
              <div className="">
                <input
                  type="text"
                  id="firstname"
                  name="firstname"
                  className="form-control form-field w-full rounded-lg border border-gray-300 p-3 focus:ring-2 focus:ring-blue-500"
                  placeholder={pageData?.firstName.value}
                  required
                />
              </div>
              <div className="">
                <input
                  type="text"
                  id="lastname"
                  name="lastname"
                  className="form-control form-field w-full rounded-lg border border-gray-300 p-3 focus:ring-2 focus:ring-blue-500"
                  placeholder={pageData?.lastName.value}
                  required
                />
              </div>

              <div className="">
                <input
                  type="text"
                  id="field[12]"
                  name="field[12]"
                  className="form-control form-field w-full rounded-lg border border-gray-300 p-3 focus:ring-2 focus:ring-blue-500"
                  placeholder={pageData?.phone.value}
                  required
                />
              </div>
              <div className="">
                <input
                  type="text"
                  id="email"
                  name="email"
                  className="form-control form-field w-full rounded-lg border border-gray-300 p-3 focus:ring-2 focus:ring-blue-500"
                  placeholder={pageData?.yourEmail.value}
                  required
                />
              </div>

              <div className="">
                <input
                  type="text"
                  id="field[23]"
                  name="field[23]"
                  className="form-control form-field w-full rounded-lg border text-black border-gray-300 p-3 focus:ring-2 focus:ring-blue-500"
                  placeholder={pageData?.jobTitle.value}
                  required
                />
              </div>

              <div className="">
                <input
                  type="text"
                  id="customer_account"
                  name="customer_account"
                  className="form-control form-field w-full rounded-lg border text-black border-gray-300 p-3 focus:ring-2 focus:ring-blue-500"
                  placeholder={pageData?.company.value}
                  required
                />
              </div>

              <div className="col-span-2">
                <input
                  type="text"
                  id="field[174]"
                  name="field[174]"
                  className="form-control form-field w-full rounded-lg border text-black border-gray-300 p-3 focus:ring-2 focus:ring-blue-500"
                  placeholder={pageData?.subject.value}
                  required
                />
              </div>

              <div className="col-span-2 hidden">
                <p className={``}>
                  <strong>{pageData?.interestedIn.value}</strong>
                </p>
                <input
                  data-autofill="false"
                  type="hidden"
                  id="field[327][]"
                  name="field[327][]"
                  value="~|"
                />
                <div className={`_row _checkbox-radio `}>
                  <input
                    id="field_327Nomination"
                    type="checkbox"
                    style={{ display: "unset", marginRight: "5px" }}
                    name="field[327][]"
                    value="Nomination"
                    className="any"
                    required
                    defaultChecked={attendAs === "Award Guide"}
                  />
                  <span>
                    <label>{pageData?.nomination.value}</label>
                  </span>
                </div>
                <div className={`_row _checkbox-radio `}>
                  <input
                    id="field_327Sponsor"
                    type="checkbox"
                    style={{ display: "unset", marginRight: "5px" }}
                    name="field[327][]"
                    value="Sponsor"
                    defaultChecked={attendAs === "Sponsorship Package"}
                  />
                  <span>
                    <label>{pageData?.sponsor.value}</label>
                  </span>
                </div>
                <div className={`_row _checkbox-radio `}>
                  <input
                    id="field_327Supporting Partner"
                    type="checkbox"
                    style={{ display: "unset", marginRight: "5px" }}
                    name="field[327][]"
                    value="Supporting Partner"
                    defaultChecked={attendAs === "Supporting Partner"}
                  />
                  <span>
                    <label>{pageData?.supportingPartner.value}</label>
                  </span>
                </div>
                <div className={`_row _checkbox-radio `}>
                  <input
                    id="field_327Media Partner"
                    type="checkbox"
                    style={{ display: "unset", marginRight: "5px" }}
                    name="field[327][]"
                    value="Media Partner"
                    defaultChecked={attendAs === "Media Partner"}
                  />
                  <span>
                    <label>{pageData?.mediaPartner.value}</label>
                  </span>
                </div>
                <div className={`_row _checkbox-radio `}>
                  <input
                    id="field_327Visitor"
                    type="checkbox"
                    style={{ display: "unset", marginRight: "5px" }}
                    name="field[327][]"
                    value="Visitor"
                    defaultChecked={attendAs === "Visitor"}
                  />
                  <span>
                    <label>{pageData?.visitor.value}</label>
                  </span>
                </div>
              </div>

              <div className="col-span-2">
                <textarea
                  className="form-control form-field w-full rounded-lg border text-black border-gray-300 p-3 focus:ring-2 focus:ring-blue-500"
                  id="field[6]"
                  name="field[6]"
                  style={{ height: "120px" }}
                  placeholder={pageData?.message.value}
                  required
                ></textarea>
              </div>

              <div
                className="g-recaptcha"
                style={{ width: "304px", marginBottom: "12px" }}
                data-sitekey="6LcwIw8TAAAAACP1ysM08EhCgzd6q5JAOUR1a0Go"
              ></div>
            </div>

            <input
              type="submit"
              id="_form_319_submit"
              className="form-cta-btn-blue bg-primary-3 hover:bg-primary-2 px-4 py-2 text-white rounded-full"
              value={pageData?.submit.value}
            />
          </div>
          <div className="_form-thank-you" style={{ display: "none" }}>
            <p className={`text-success `}>{pageData?.successMessage.value}</p>
          </div>
        </form>
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context: any) => {
  try {
    const params = context.query;
    const mainsource = params.mainsource || "Website";
    const subsource = params.subsource || "/";
    const attendAs = params.attend || "";

    const { locale } = context;
    const languageCode = locale === "ar" ? "arabic" : "default";
    const response: any = await Globals.KontentClient.item("contact_us_page")
      .languageParameter(languageCode)
      .withParameter("depth", "4")
      .toPromise();

    const pageData = JSON.parse(JSON.stringify(response.item));

    return {
      props: {
        pageData,
        attendAs,
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
