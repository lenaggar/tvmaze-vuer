import { z } from "zod";

const showSchema = z.object({
  id: z.number(),
  name: z.string(),
  language: z.string(),
  genres: z.array(z.string()),
  officialSite: z.string().url().nullable(),
  rating: z.object({
    average: z.number().nullable(),
  }),
  image: z
    .object({
      medium: z.string().url(),
      original: z.string().url(),
    })
    .nullable(),
  summary: z.string().nullable(),
});

export type Show = z.infer<typeof showSchema>;

export function validateShow(show: unknown) {
  return showSchema.parse(show);
}
