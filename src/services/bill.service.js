import prisma from "../config/prisma.js";

// Get all bills
export const getAllBills = async () => {
  const bills = await prisma.bills.findMany({
    include: {
      patients: {
        select: {
          id: true,
          name: true,
        },
      },
    },
    orderBy: {
      created_at: "desc",
    },
  });

  return bills;
};

// Get bill by ID
export const getBillById = async (id) => {
  const bill = await prisma.bills.findUnique({
    where: {
      id,
    },
    include: {
      patients: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  });

  return bill;
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
  const patient = await prisma.patients.findUnique({
    where: {
      id: patient_id,
    },
    select: {
      id: true,
    },
  });

  if (!patient) {
    const error = new Error("Patient not found");
    error.statusCode = 404;
    throw error;
  }

  const billNumber = `BILL-${Date.now()}`;

  const bill = await prisma.bills.create({
    data: {
      bill_number: billNumber,
      patient_id,
      total_amount,
      payment_status,

      ...(date_issued && {
        date_issued: new Date(date_issued),
      }),
    },
  });

  return bill;
};

// Update bill
export const updateBillById = async (
  id,
  { total_amount, payment_status, date_issued },
) => {
  const data = {};

  if (total_amount !== undefined) {
    data.total_amount = total_amount;
  }

  if (payment_status !== undefined) {
    data.payment_status = payment_status;
  }

  if (date_issued !== undefined) {
    data.date_issued = new Date(date_issued);
  }

  if (Object.keys(data).length === 0) {
    const error = new Error("No fields provided to update");
    error.statusCode = 400;
    throw error;
  }

  try {
    const bill = await prisma.bills.update({
      where: {
        id,
      },
      data,
    });

    return bill;
  } catch (error) {
    if (error.code === "P2025") {
      return null;
    }

    throw error;
  }
};

// Delete bill
export const deleteBillById = async (id) => {
  try {
    const bill = await prisma.bills.delete({
      where: {
        id,
      },
    });

    return bill;
  } catch (error) {
    if (error.code === "P2025") {
      return null;
    }

    throw error;
  }
};

// Get bills by patient ID
export const getBillsByPatientId = async (patientId) => {
  // Check patient exists
  const patient = await prisma.patients.findUnique({
    where: {
      id: patientId,
    },
    select: {
      id: true,
    },
  });

  if (!patient) {
    const error = new Error("Patient not found");
    error.statusCode = 404;
    throw error;
  }

  const bills = await prisma.bills.findMany({
    where: {
      patient_id: patientId,
    },
    orderBy: {
      date_issued: "desc",
    },
  });

  return bills;
};
