import { z } from "zod";
import { showSchema } from "./show-schema";

const localStateSchema = z.object({
  page: z.number(),
  isLoading: z.boolean(),
  showsById: z.record(z.number(), showSchema),
  showIdsByGenre: z.record(
    z.string(),
    z.record(z.string(), z.array(z.number())),
  ),
});

export type LocalState = z.infer<typeof localStateSchema>;

export function validateLocalState(show: unknown) {
  return localStateSchema.parse(show);
}
