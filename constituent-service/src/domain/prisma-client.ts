import {Prisma, PrismaClient} from "@prisma/client";
import {SearchCriteria, ConstituentCreateInput} from "./types";

const prisma = new PrismaClient().$extends({
  query: {
    constituent: {
      create({ args, query }) {
        args.data = ConstituentCreateInput.parse(args.data)
        return query(args)
      },
      // update({ args, query }) {
      //   args.data = ConstituentCreateInput.partial().parse(args.data)
      //   return query(args)
      // },
      // updateMany({ args, query }) {
      //   args.data = ConstituentCreateInput.partial().parse(args.data)
      //   return query(args)
      // },
      upsert({ args, query }) {
        args.create = ConstituentCreateInput.parse(args.create)
        args.update = ConstituentCreateInput.partial().parse(args.update)
        return query(args)
      },
    },
  },
});

type PostCreateBody = Prisma.Args<typeof prisma.constituent, 'create'>['data'];

export async function getConstituents(skip?: number, take?: number) {
  return await prisma.constituent.findMany({skip, take});
}

export async function upsertConstituent(constituent: PostCreateBody) {
  return await prisma.constituent.upsert({
    where: {email: constituent.email},
    update: constituent,
    create: constituent
  });
}

export async function searchConstituents(criteria: SearchCriteria) {
  return await prisma.constituent.findMany({
    where: {
      AND: [
        criteria.emails ? {email: {in: criteria.emails}} : {},
        criteria.firstNames ? {firstName: {in: criteria.firstNames}} : {},
        criteria.lastNames ? {lastName: {in: criteria.lastNames}} : {},
        criteria.streets ? {street: {in: criteria.streets}} : {},
        criteria.cities ? {city: {in: criteria.cities}} : {},
        criteria.states ? {state: {in: criteria.states}} : {},
        criteria.postalCodes ? {postalCode: {in: criteria.postalCodes}} : {},
        criteria.countries ? {country: {in: criteria.countries}} : {},
        criteria.createdDateRange
          ? {createdAt: {
              gte: criteria.createdDateRange.start,
              lte: criteria.createdDateRange.end
          }} : {},
        criteria.updatedDateRange
          ? {createdAt: {
              gte: criteria.updatedDateRange.start,
              lte: criteria.updatedDateRange.end
          }} : {}
      ]
    }
  });
}
