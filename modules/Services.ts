export default class Services {
    static loadRecaptcha() {
        const script = document.createElement("script");
        script.src = "https://www.google.com/recaptcha/api.js";
        script.async = true;
        document.body.appendChild(script);
    }

    static loadFile(url: string, callBack?: () => any) {
        const script = document.createElement("script");
        script.src = url;
        script.async = false;
        document.body.appendChild(script);
        if (callBack && typeof callBack !== "undefined") {
            callBack();
        }
    }

    static formatDate(date: string) {
        const formattedDate = new Date(date).toLocaleDateString("en-US", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
        });
        return formattedDate;
    }
}