import JsLoader from "@/modules/JsLoader";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

export default function SubscribeForm() {
  useEffect(() => {
    JsLoader.loadFile(`/assets/js/newsletter.js`);
  }, []);

  const {locale} = useRouter();

  return (
    <div className="flex justify-center items-center">
      <form
        method="POST"
        action="//ac.strategic.ae/proc.php"
        id="_form_315_"
        className="_form _form_315 _inline-form _dark w-full max-w-md  p-6 space-y-4"
        noValidate
      >
        {/* Hidden Inputs */}
        <input type="hidden" name="u" value="315" />
        <input type="hidden" name="f" value="315" />
        <input type="hidden" name="s" />
        <input type="hidden" name="c" value="0" />
        <input type="hidden" name="m" value="0" />
        <input type="hidden" name="act" value="sub" />
        <input type="hidden" name="v" value="2" />
        <input
          type="hidden"
          name="or"
          value="1fa1b12ba02c888cb605242f5ad93ef8"
        />

        {/* Heading */}
        <h2 className="text-xl font-semibold text-center text-gray-800">
         {locale === "ar" ? "اشترك في نشرتنا الإخبارية": " Subscribe to our Newsletter"}
        </h2>

        <div className="_form-content">
          <div className="newsletter-table mx-auto space-y-4">
            {/* Email Input */}
            <div className="newletter-field-wrap">
              <input
                type="text"
                id="email"
                name="email"
                className="form-control newsletter-field m-b-10 w-full px-4 py-3 border border-gray-100 bg-white rounded-lg text-black focus:ring-2 focus:ring-primary-3 focus:outline-none"
                placeholder={locale === "ar" ? "البريد الإلكتروني" : "Email"}
                required
              />
            </div>

            {/* Recaptcha */}
            <div>
              <div
                className="g-recaptcha m-b-7 flex justify-center"
                data-sitekey="6LcwIw8TAAAAACP1ysM08EhCgzd6q5JAOUR1a0Go"
              ></div>
            </div>

            {/* Submit */}
            <div className="newletter-submit-wrap text-center">
              <button
                type="submit"
                id="_form_315_submit"
                className="newsletter-submit w-full bg-primary-3 text-white font-medium py-3 rounded-full hover:bg-primary-2 transition-all"
              >
               {locale === "ar" ? "اشترك" : "Submit"}
              </button>
            </div>
          </div>
        </div>

        {/* Success Message */}
        <div
          className="_form-newsletter-thank-you text-center w-100"
          style={{ display: "none" }}
        >
          <p className="text-success text-center text-green-600">
            Subscribed.
          </p>
        </div>
      </form>
    </div>
  );
}
