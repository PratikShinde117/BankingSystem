import express from "express";
import { registerCustomer, loginCustomer, depositMoney, transferFunds, checkBalance } from "../controllers/customerController.js";

const router = express.Router();

router.post("/register", registerCustomer);
router.post("/login", loginCustomer);
router.post("/deposit", depositMoney);
router.post("/transfer", transferFunds);
router.get("/balance/:account_no", checkBalance);

export default router;
