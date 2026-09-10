import supabase from "../config/supabase.js";

export const getAllBills = async () => {
  const { data, error } = await supabase
    .from("bills")
    .select(
      `*, patients (
        id,
        name
      )`,
    )
    .order("created_at", { ascending: false });

  if (error) {
    throw error;
  }

  return data;
};

export const getBillById = async (id) => {
  const { data, error } = await supabase
    .from("bills")
    .select(
      `
        *,
        patients (
          id,
          name
        )
      `,
    )
    .eq("id", id)
    .maybeSingle();

  if (error) {
    throw error;
  }

  return data;
};

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
  const { data: patient, error: patientError } = await supabase
    .from("patients")
    .select("id")
    .eq("id", patient_id)
    .maybeSingle();

  if (patientError) {
    throw patientError;
  }

  if (!patient) {
    const error = new Error("Patient not found");
    error.statusCode = 404;
    throw error;
  }

  const billNumber = `BILL-${Date.now()}`;

  const billData = {
    bill_number: billNumber,
    patient_id,
    total_amount,
    payment_status,
  };

  if (date_issued) {
    billData.date_issued = date_issued;
  }

  const { data, error } = await supabase
    .from("bills")
    .insert(billData)
    .select()
    .single();

  if (error) {
    throw error;
  }

  return data;
};

export const updateBillById = async (
  id,
  { total_amount, payment_status, date_issued },
) => {
  const updateData = {};

  if (total_amount !== undefined) {
    updateData.total_amount = total_amount;
  }

  if (payment_status !== undefined) {
    updateData.payment_status = payment_status;
  }

  if (date_issued !== undefined) {
    updateData.date_issued = date_issued;
  }

  const { data, error } = await supabase
    .from("bills")
    .update(updateData)
    .eq("id", id)
    .select()
    .maybeSingle();

  if (error) {
    throw error;
  }

  return data;
};

export const deleteBillById = async (id) => {
  const { data, error } = await supabase
    .from("bills")
    .delete()
    .eq("id", id)
    .select()
    .maybeSingle();

  if (error) {
    throw error;
  }

  return data;
};

export const getBillsByPatientId = async (patientId) => {
  const { data: patient, error: patientError } = await supabase
    .from("patients")
    .select("id")
    .eq("id", patientId)
    .maybeSingle();

  if (patientError) {
    throw patientError;
  }

  if (!patient) {
    const error = new Error("Patient not found");
    error.statusCode = 404;
    throw error;
  }

  const { data, error } = await supabase
    .from("bills")
    .select("*")
    .eq("patient_id", patientId)
    .order("date_issued", { ascending: false });

  if (error) {
    throw error;
  }

  return data;
};
