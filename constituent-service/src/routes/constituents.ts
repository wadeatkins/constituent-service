import express from "express";
import {
  upsertConstituent,
  getConstituents,
  searchConstituents
} from "../domain/prisma-client";
import {stringify} from "csv-stringify";
import {SearchCriteria, SearchInputSchema} from "../domain/types";
import {z, ZodError} from "zod";

const router = express.Router();

// GET /constituents
router.get("/", async (req, res, next) => {
  const skip: number = +!!req?.query?.skip || 0;
  const take: number = +!!req?.query?.take || 100;

  try {
    const constituents = await getConstituents(skip, take);

    return res.status(200).json({
      constituents: constituents
    });
  } catch (err: any) {
    next(err);
  }
});

// GET /constituents/download
router.get("/download", async (req, res, next) => {
  let criteria: SearchCriteria;

  try {
    const date = z.coerce.date();

    const start = date.parse(req.query.start);
    const end = date.parse(req.query.end);

    criteria = {
      // createdDateRange: {
      //   // start, end
      // }
    };
  } catch (err) {
    console.log(err);
    return res.status(400).json({error: "Invalid date range"});
  }

  try {
    const constituents = await searchConstituents(criteria);
    stringify(constituents, (err, output) => {
      if (err) {
        throw err;
      }

      res.setHeader("Content-Type", "text/csv");
      res.setHeader("Content-Disposition", "attachment; filename=\"constituents.csv\"");

      return res.status(200).send(output);
    });
  } catch (err: any) {
    if (err instanceof ZodError) {
      console.log(err);
      return res.status(400).json(err);
    }
    next(err);
  }
});

// POST /constituents
router.post("/", async (req, res, next) => {
  try {
    const constituent = await upsertConstituent(req.body);

    return res.status(201).json({constituent: constituent});
  } catch (err: any) {
    if (err instanceof ZodError) {
      console.log(err);
      return res.status(400).json(err);
    }
    next(err);
  }
});

router.post("/search", async (req, res, next) => {
  try {
    // console.log("blah")
    const constituents = await searchConstituents(req.body);

    return res.status(200).json({
      constituents: constituents
    });
  } catch (err: any) {
    if (err instanceof ZodError) {
      console.log(err);
      return res.status(400).json(err);
    }
    next(err);
  }
});

export default router;