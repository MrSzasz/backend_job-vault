import { Router } from "express";
import { jobsControllers } from "../../controllers/jobs/jobsControllers.js";

const jobsRoutes = Router();

jobsRoutes.get("/", jobsControllers.GET_AllJobs);
jobsRoutes.post("/", jobsControllers.POST_AddJob);
jobsRoutes.put("/", jobsControllers.PUT_UpdateJob);
jobsRoutes.delete("/", jobsControllers.DELETE_DeleteJob);

export default jobsRoutes;
