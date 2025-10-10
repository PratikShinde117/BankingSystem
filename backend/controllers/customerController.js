import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { createCustomer, getCustomerByEmail, updateBalance, transferMoney, getBalance } from "../models/customerModel.js";

export const registerCustomer = async (req, res) => {
  try {
    const { cust_name, address, email, pass_word, phone_no, pan_no, aadhar_no } = req.body;

    if (!cust_name || !address || !email || !pass_word || !phone_no || !pan_no || !aadhar_no) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existing = await getCustomerByEmail(email);
    if (existing) return res.status(400).json({ message: "Email already registered" });

    const hashedPassword = await bcrypt.hash(pass_word, 10);

    const newCustomer = await createCustomer({
      cust_name,
      address,
      email,
      pass_word: hashedPassword,
      phone_no,
      pan_no,
      aadhar_no,
    });

    res.json({ message: "Account created successfully", customer: newCustomer });
  } catch (err) {
    console.error("Error in registerCustomer:", err);
    res.status(500).json({ error: err.message });
  }
};

export const loginCustomer = async (req, res) => {
  try {
    const { email, pass_word } = req.body;
    const user = await getCustomerByEmail(email);
    if (!user) return res.status(400).json({ message: "Invalid email or password" });

    const isMatch = await bcrypt.compare(pass_word, user.pass_word);
    if (!isMatch) return res.status(400).json({ message: "Invalid email or password" });

    const token = jwt.sign({ cust_id: user.cust_id, account_no: user.account_no }, "secretkey", { expiresIn: "1h" });

    res.json({ token, user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const depositMoney = async (req, res) => {
  const { account_no, amount } = req.body;
  try {
    await updateBalance(account_no, amount);
    res.json({ message: "Deposit successful" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const transferFunds = async (req, res) => {
  const { fromAcc, toAcc, amount } = req.body;
  try {
    await transferMoney(fromAcc, toAcc, amount);
    res.json({ message: "Transfer successful" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const checkBalance = async (req, res) => {
  const { account_no } = req.params;
  try {
    const result = await getBalance(account_no);
    if (!result) return res.status(404).json({ message: "Account not found" });
    res.json({ balance: result.balance });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
