import express from "express";
import { getCompany, getCompanyById, registerCompany, updateCompany } from "../controllers/company.controller.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";

const router= express.Router();

router.route("/register").post(isAuthenticated,registerCompany);
router.get("/get",isAuthenticated, getCompany);
router.get("/get/:id", isAuthenticated, getCompanyById)
router.put("/update/:id",isAuthenticated, updateCompany);

export default router