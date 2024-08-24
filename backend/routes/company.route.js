import express from "express";
import { getCompany, getCompanyById, registerCompany, updateCompany } from "../controllers/company.controller.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { singleUpload } from "../middlewares/multer.js";

const router= express.Router();

router.route("/register").post(registerCompany);
router.route("/get").get(getCompany);
router.get("/get/:id", isAuthenticated, getCompanyById)
router.put("/update/:id",isAuthenticated,singleUpload, updateCompany);

export default router