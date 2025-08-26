import { TypeResolver } from "./TypeResolvers";



const KontentDelivery = require("@kentico/kontent-delivery");

export default class Globals {
    static PROJECT_ID: string = "7f2c8999-bc83-009e-da44-f828866147e0";

    static SECURE_API_KEY: string =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI4YWFiN2UzY2U5MmM0Mzk0OWY4ZDgyZGFiOGViYmM3OCIsImlhdCI6MTcyNDI0NDc2OCwibmJmIjoxNzI0MjQ0NzY4LCJleHAiOjE3NTU3ODA3MjAsInZlciI6IjIuMC4wIiwic2NvcGVfaWQiOiIzZjkyOWFmODA1MWI0ZGJlYmVmYmU2MWUxMzY1YjkxOCIsInByb2plY3RfY29udGFpbmVyX2lkIjoiMjg2MjY1MjNlNWNiMDBlYWZkYmE4ZDBhOWFlZWEzMzIiLCJhdWQiOiJkZWxpdmVyLmtvbnRlbnQuYWkifQ.7nystj42M5pbb7phDBlY9LknzvC0TI_xqMXQU9SiU6Y";
  
    static KontentClient: any = new KontentDelivery.DeliveryClient({
        projectId: Globals.PROJECT_ID,
        globalQueryConfig: {
            useSecuredMode: true, // Queries the Delivery API using secure access.
        },
        secureApiKey: Globals.SECURE_API_KEY,
        typeResolvers: TypeResolver,

    });

    static SITE_NAME = "ECEA";


    static CURRENT_LANG_CODENAME: string = "default";

    static LANG_COOKIE: string = "0cd50f-lang-cookie";

    static BASE_URL: string =
        process.env.NODE_ENV === "production"
            ? "https://ecea.ae/"
            : "http://localhost:3000/";
}