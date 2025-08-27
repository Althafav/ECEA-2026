import { Contactpage } from "@/models/contactpage";




const KontentDelivery = require("@kentico/kontent-delivery");


export const TypeResolver = [

  new KontentDelivery.TypeResolver("Contactpage", (rawData: any) => new Contactpage()),
];
