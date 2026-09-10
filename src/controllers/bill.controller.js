import {
  createBill,
  deleteBillById,
  getAllBills,
  getBillById,
  getBillsByPatientId,
  updateBillById,
} from "../services/bill.service.js";

export const getBills = async (req, res) => {
  try {
    const bills = await getAllBills();

    return res.status(200).json({
      success: true,
      data: bills,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getBill = async (req, res) => {
  try {
    const bill = await getBillById(req.params.id);

    if (!bill) {
      return res.status(404).json({
        success: false,
        message: "Bill not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: bill,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const addBill = async (req, res) => {
  try {
    const bill = await createBill(req.body);

    return res.status(201).json({
      success: true,
      message: "Bill created successfully",
      data: bill,
    });
  } catch (error) {
    return res.status(error.statusCode || 500).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateBill = async (req, res) => {
  try {
    const bill = await updateBillById(req.params.id, req.body);

    if (!bill) {
      return res.status(404).json({
        success: false,
        message: "Bill not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Bill updated successfully",
      data: bill,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const removeBill = async (req, res) => {
  try {
    const bill = await deleteBillById(req.params.id);

    if (!bill) {
      return res.status(404).json({
        success: false,
        message: "Bill not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Bill deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getPatientBills = async (req, res) => {
  try {
    const bills = await getBillsByPatientId(req.params.id);

    return res.status(200).json({
      success: true,
      data: bills,
    });
  } catch (error) {
    return res.status(error.statusCode || 500).json({
      success: false,
      message: error.message,
    });
  }
};
