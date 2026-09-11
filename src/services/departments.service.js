import pool from "../config/database.js";

//Get All Departments
export const getDepartments = async () => {
  const result = await pool.query(
    `SELECT * FROM departments  ORDER BY created_at DESC`,
  );
  return result.rows;
};

//Get Single Department via id
export const getDepartmentById = async (id) => {
  const result = await pool.query(
    `
    SELECT * FROM departments WHERE id = $1`,
    [id],
  );

  return result.rows[0] || null;
};

//Create Deparmtent
export const createDepartment = async (department) => {
  const result = await pool.query(
    `
  INSERT INTO departments(
  name,
  location,
  contact_number
  )
  VALUES($1,$2,$3)
  RETURNING *
  `,
    [department.name, department.location, department.contact_number],
  );
  return result.rows[0];
};

//Updae department
export const updateDepartment = async (id, department) => {
  const result = await pool.query(
    `
      UPDATE departments
      SET
        name = $1,
        location = $2,
        contact_number = $3
      WHERE id = $4
      RETURNING *
    `,
    [department.name, department.location, department.contact_number, id],
  );

  return result.rows[0] || null;
};

//Delete any department
export const deleteDepartment = async (id) => {
  const result = await pool.query(
    `
      DELETE FROM departments
      WHERE id = $1
      RETURNING *
    `,
    [id],
  );

  return result.rows[0] || null;
};
