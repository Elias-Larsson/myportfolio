import { cache } from "react";
import type { Homepage } from "../types/homepage";
import { client } from "./client";
import { homepageQuery } from "./queries";

export const getHomepage = cache(() =>
  client.fetch<Homepage | null>(
    homepageQuery,
    {},
    { next: { revalidate: 60 } },
  ),
);
