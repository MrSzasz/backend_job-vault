import { Request, type Response } from "express";
import { client } from "../../database/db.js";

export const jobsControllers = {
  GET_AllJobs: async (req: Request, res: Response) => {
    try {
      const emailFromUser = req.query.email;

      if (typeof emailFromUser !== "string") {
        res.status(400).json({ error: "Email is required" });

        return;
      }

      const { rows: data } = await client.execute({
        sql: "SELECT * from jobs WHERE jobs.userEmail = (:email)",
        args: { email: emailFromUser },
      });

      res.json({ data });
    } catch (err) {
      console.error(err);
      res.status(500).json({
        error: err,
      });
    }
  },

  POST_AddJob: async (req: Request, res: Response) => {
    try {
      const newJobToSave = req.body.job;

      if (newJobToSave === undefined) {
        res.status(400).json({ error: "Job is required" });

        return;
      }

      const data = await client.execute({
        sql: "INSERT INTO jobs VALUES (:id, :status, :position, :positionLink, :company, :description, :requirements, :extra, :date, :cv, :letter, :userEmail)",
        args: newJobToSave,
      });

      res.json({ data });
    } catch (err) {
      console.error(err);
      res.status(500).json({
        error: err,
      });
    }
  },

  PUT_UpdateJob: async (req: Request, res: Response) => {
    try {
      const newJobToSave = req.body.job;

      if (newJobToSave === undefined) {
        res.status(400).json({ error: "Job is required" });

        return;
      }

      const data = await client.execute({
        sql: "UPDATE jobs SET status = ?, position = ?, positionLink = ?, company = ?, description = ?, requirements = ?, extra = ?, date = ?, cv = ?, letter = ? WHERE id = ?",

        args: [
          newJobToSave.status,
          newJobToSave.position,
          newJobToSave.positionLink,
          newJobToSave.company,
          newJobToSave.description,
          newJobToSave.requirements,
          newJobToSave.extra,
          newJobToSave.date,
          newJobToSave.cv,
          newJobToSave.letter,
          newJobToSave.id,
        ],
      });

      if (data.rowsAffected === 0) {
        res
          .status(400)
          .json({ error: "Something went wrong, try again later" });

        return;
      }

      res.json({ data });
    } catch (err) {
      console.error(err);
      res.status(500).json({
        error: err,
      });
    }
  },

  DELETE_DeleteJob: async (req: Request, res: Response) => {
    try {
      const jobId = req.query.jobId;

      if (typeof jobId !== "string") {
        res.status(400).json({ error: "Job id is required" });

        return;
      }

      const data = await client.execute({
        sql: "DELETE FROM jobs WHERE id = ?",
        args: [jobId],
      });

      if (data.rowsAffected === 0) {
        res.status(400).json({ error: "Job not found, try again later" });

        return;
      }

      res.json({ data });
    } catch (err) {
      console.error(err);
      res.status(500).json({
        error: err,
      });
    }
  },
};
