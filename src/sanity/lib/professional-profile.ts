import { cache } from "react";
import type { ProfessionalProfile } from "../types/professionalProfile";
import { client } from "./client";
import { professionalProfileQuery } from "./queries";

export const getProfessionalProfile = cache(() =>
  client.fetch<ProfessionalProfile | null>(
    professionalProfileQuery,
    {},
    {
      next: { revalidate: 60 },
    },
  ),
);
