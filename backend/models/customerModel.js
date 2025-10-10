import pool from "../db.js";

// Generate unique IDs
const generateCustId = () => "CUST" + Date.now();
const generateAccountNo = () => Math.floor(1000000000 + Math.random() * 9000000000); // 10-digit

export const createCustomer = async (data) => {
  const { cust_name, address, email, pass_word, phone_no, pan_no, aadhar_no } = data;

  const cust_id = generateCustId();
  const account_no = generateAccountNo();

  const sql = `
    INSERT INTO cust_create
    (cust_id, account_no, cust_name, address, email, pass_word, phone_no, pan_no, aadhar_no, balance)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 0)
  `;

  await pool.execute(sql, [
    cust_id,
    account_no,
    cust_name,
    address,
    email,
    pass_word,
    phone_no,
    pan_no,
    aadhar_no,
  ]);

  // Return only the needed info
  return { cust_id, account_no, cust_name, address, email, phone_no, pan_no, aadhar_no, balance: 0 };
};

export const getCustomerByEmail = async (email) => {
  const [rows] = await pool.execute("SELECT * FROM cust_create WHERE email = ?", [email]);
  return rows[0];
};

export const updateBalance = async (account_no, amount) => {
  await pool.execute("UPDATE cust_create SET balance = balance + ? WHERE account_no = ?", [amount, account_no]);
};
export const transferMoney = async (fromAcc, toAcc, amount) => {
  const conn = await pool.getConnection();
  try {
    await conn.beginTransaction();

    // Check sender balance
    const [fromRows] = await conn.execute(
      "SELECT balance FROM cust_create WHERE account_no = ?",
      [fromAcc]
    );
    if (fromRows.length === 0) throw new Error("Sender account not found");
    if (fromRows[0].balance < amount) throw new Error("Insufficient balance");

    // Check receiver account exists
    const [toRows] = await conn.execute(
      "SELECT balance FROM cust_create WHERE account_no = ?",
      [toAcc]
    );
    if (toRows.length === 0) throw new Error("Receiver account not found");

    // Update balances
    await conn.execute(
      "UPDATE cust_create SET balance = balance - ? WHERE account_no = ?",
      [amount, fromAcc]
    );
    await conn.execute(
      "UPDATE cust_create SET balance = balance + ? WHERE account_no = ?",
      [amount, toAcc]
    );

    await conn.commit();
  } catch (err) {
    await conn.rollback();
    throw err;
  } finally {
    conn.release();
  }
};


export const getBalance = async (account_no) => {
  const [rows] = await pool.execute("SELECT balance FROM cust_create WHERE account_no = ?", [account_no]);
  return rows[0];
};
