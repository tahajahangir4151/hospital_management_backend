import pool from "../config/database.js";

// Get all bills
export const getAllBills = async () => {
  const result = await pool.query(`
    SELECT
      b.*,
      json_build_object(
        'id', p.id,
        'name', p.name
      ) AS patients
    FROM bills b
    LEFT JOIN patients p
      ON b.patient_id = p.id
    ORDER BY b.created_at DESC
  `);

  return result.rows;
};

// Get bill by ID
export const getBillById = async (id) => {
  const result = await pool.query(
    `
      SELECT
        b.*,
        json_build_object(
          'id', p.id,
          'name', p.name
        ) AS patients
      FROM bills b
      LEFT JOIN patients p
        ON b.patient_id = p.id
      WHERE b.id = $1
    `,
    [id],
  );

  return result.rows[0] || null;
};

// Create bill
export const createBill = async ({
  patient_id,
  total_amount,
  payment_status,
  date_issued,
}) => {
  if (!patient_id || total_amount === undefined || !payment_status) {
    const error = new Error(
      "Patient ID, total amount and payment status are required",
    );
    error.statusCode = 400;
    throw error;
  }

  // Check patient exists
  const patientResult = await pool.query(
    `
      SELECT id
      FROM patients
      WHERE id = $1
    `,
    [patient_id],
  );

  if (patientResult.rows.length === 0) {
    const error = new Error("Patient not found");
    error.statusCode = 404;
    throw error;
  }

  const billNumber = `BILL-${Date.now()}`;

  let result;

  if (date_issued) {
    result = await pool.query(
      `
        INSERT INTO bills (
          bill_number,
          patient_id,
          total_amount,
          payment_status,
          date_issued
        )
        VALUES ($1, $2, $3, $4, $5)
        RETURNING *
      `,
      [billNumber, patient_id, total_amount, payment_status, date_issued],
    );
  } else {
    result = await pool.query(
      `
        INSERT INTO bills (
          bill_number,
          patient_id,
          total_amount,
          payment_status
        )
        VALUES ($1, $2, $3, $4)
        RETURNING *
      `,
      [billNumber, patient_id, total_amount, payment_status],
    );
  }

  return result.rows[0];
};

// Update bill
export const updateBillById = async (
  id,
  { total_amount, payment_status, date_issued },
) => {
  const fields = [];
  const values = [];

  if (total_amount !== undefined) {
    values.push(total_amount);
    fields.push(`total_amount = $${values.length}`);
  }

  if (payment_status !== undefined) {
    values.push(payment_status);
    fields.push(`payment_status = $${values.length}`);
  }

  if (date_issued !== undefined) {
    values.push(date_issued);
    fields.push(`date_issued = $${values.length}`);
  }

  if (fields.length === 0) {
    const error = new Error("No fields provided to update");
    error.statusCode = 400;
    throw error;
  }

  values.push(id);

  const result = await pool.query(
    `
      UPDATE bills
      SET ${fields.join(", ")}
      WHERE id = $${values.length}
      RETURNING *
    `,
    values,
  );

  return result.rows[0] || null;
};

// Delete bill
export const deleteBillById = async (id) => {
  const result = await pool.query(
    `
      DELETE FROM bills
      WHERE id = $1
      RETURNING *
    `,
    [id],
  );

  return result.rows[0] || null;
};

// Get bills by patient ID
export const getBillsByPatientId = async (patientId) => {
  // Check patient exists
  const patientResult = await pool.query(
    `
      SELECT id
      FROM patients
      WHERE id = $1
    `,
    [patientId],
  );

  if (patientResult.rows.length === 0) {
    const error = new Error("Patient not found");
    error.statusCode = 404;
    throw error;
  }

  const result = await pool.query(
    `
      SELECT *
      FROM bills
      WHERE patient_id = $1
      ORDER BY date_issued DESC
    `,
    [patientId],
  );

  return result.rows;
};
