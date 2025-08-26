import Globals from "./Globals";


export default class formatParameter {
    static formatUrlParameter = (name: string) => {

        name = name.replace(/\s+/g, "-");

        name = name.replace(/[?.:,"'’/()%]/g, "");

        name = name.toLowerCase();

        name = name.replace(/^-+|-+$/g, "");

        return name;
    };

    static getLanguageCode(): string {
        const storageItem = localStorage.getItem(Globals.LANG_COOKIE);
        if (storageItem) {
            var getLanguage = JSON.parse(storageItem);
            return getLanguage["language_code"];
        }
        else {
            this.setLanguage("en-US");
            return "en-US";
        }

    };


    static setLanguage(code: string): string {
        if (code) {
            const LanguageModel = {
                language_code: code,
            };

            localStorage.removeItem(Globals.LANG_COOKIE);
            localStorage.setItem(Globals.LANG_COOKIE, JSON.stringify(LanguageModel));
        }
        
        return code
    }

    static getLanguageName(current: string): string {
        if (current === "en-US") {
          return "default";
        } else if (current === "ar-AE") {
          return "Arabic";
        } else {
          return "default";
        }
      }


      






    static getRandomInteger(min: number = 0, max: number): number {
        // Calculate a random integer within the given range
        // Math.floor(Math.random() * (max - min + 1)) + min generates an integer between min and max
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    static getUploadFile = (image: any) => {
        var file;
        if (image) {
            file = image.files[0];
        }
        return file;
    };

    static getSessionDate = () => {
        const storageItem = localStorage.getItem(Globals.PROJECT_ID);
        if (storageItem) {
            var getrecordParse = JSON.parse(storageItem);
            return getrecordParse["date"];
        }
    };


    static serializeArray(form: any) {
        var field,
            l,
            s = [];
        if (typeof form == "object" && form.nodeName == "FORM") {
            var len = form.elements.length;
            for (var i = 0; i < len; i++) {
                field = form.elements[i];
                if (
                    field.name &&
                    !field.disabled &&
                    field.type != "file" &&
                    field.type != "reset" &&
                    field.type != "submit" &&
                    field.type != "button"
                ) {
                    if (field.type == "select-multiple") {
                        l = form.elements[i].options.length;
                        var j: number;
                        for (j = 0; j < l; j++) {
                            if (field.options[j].selected)
                                s.push({
                                    name: field.name,
                                    value: field.options[j].value,
                                });
                        }
                    } else if (
                        (field.type != "checkbox" && field.type != "radio") ||
                        field.checked
                    ) {
                        s.push({ name: field.name, value: field.value });
                    }
                }
            }
        }
        return s;
    }
}