import {z} from "zod";
import {Prisma} from "@prisma/client";

export type SearchCriteria = z.infer<typeof SearchInputSchema>;

export const SearchInputSchema = z.object({
  emails: z.array(z.string().email()).optional().optional(),
  firstNames: z.array(z.string()).optional(),
  lastNames: z.array(z.string()).optional(),
  streets: z.array(z.string()).optional(),
  cities: z.array(z.string()).optional(),
  states: z.array(z.string()).optional(),
  postalCodes: z.array(z.number()).optional(),
  countries: z.array(z.string()).optional(),
  createdDateRange: z.object({
    start: z.string().datetime(),
    end: z.string().datetime(),
  }).optional(),
  updatedDateRange: z.object({
    start: z.string().datetime(),
    end: z.string().datetime(),
  }).optional(),
});



export const ConstituentCreateInput = z.object({
  email: z.string().email(),
  firstName: z.string(),
  lastName: z.string(),
  street: z.string(),
  city: z.string(),
  state: z.string(),
  postalCode: z.number(),
  country: z.string(),
}) satisfies z.Schema<Prisma.ConstituentUncheckedCreateInput>;