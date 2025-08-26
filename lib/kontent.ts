// lib/kontent.ts

import Globals from "@/modules/Globals";

// Server-only helper to fetch and serialize the item.
export async function fetchHomePage2026() {
  // Your existing client call:
  const response = await Globals.KontentClient
    .item("home_page_2026")
    .withParameter("depth", "4")
    .toPromise();

  // Ensure it's serializable for Next.js
  return JSON.parse(JSON.stringify(response.item));
}


export async function fetchGlobalComponent() {
  // Your existing client call:
  const response = await Globals.KontentClient
    .item("global_component")
    .withParameter("depth", "4")
    .toPromise();

  // Ensure it's serializable for Next.js
  return JSON.parse(JSON.stringify(response.item));
}


