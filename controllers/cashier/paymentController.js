const asyncHandler = require("express-async-handler");
const Payment = require("../../models/cashier/paymentModel");
const Billing = require("../../models/cashier/billingModel");


// Create a new payment
// POST: /foodskill/restaurant/create/payment
// exports.paymentOrder = asyncHandler(async (req, res) => {
//   const { billId, paymentMethod, offerDiscount, couponCode, status } = req.body;

//   // Validate required fields
//   if (!billId || !paymentMethod || !status) {
//     return res.status(400).json({
//       success: false,
//       message: "Please provide all required fields: billId, paymentMethod, and status",
//     });
//   }

//   // Check if billId exists
//   const billingExists = await Billing.findById(billId);
//   if (!billingExists) {
//     return res.status(404).json({
//       success: false,
//       message: "Bill not found",
//     });
//   }

//   // Create and save the payment record
//   const newPayment = new Payment({
//     billId,
//     paymentMethod,
//     offerDiscount: offerDiscount || 0, // Default to 0 if not provided
//     couponCode: couponCode || "", // Default to empty string if not provided
//     status,
//   });

//   const savedPayment = await newPayment.save();

//   res.status(201).json({
//     success: true,
//     message: "Payment created successfully",
//     data: savedPayment,
//   });
// });

exports.paymentOrder = asyncHandler(async (req, res) => {
  const { billId, paymentMethod, offerDiscount, couponCode, status } = req.body;

  // Validate required fields
  if (!billId || !paymentMethod || !status) {
    res.status(400);
    throw new Error("Please provide billId, paymentMethod, and status");
  }

  // Initialize offerDiscount and couponCode
  let discountApplied = 0;
  let finalAmount = 0;

  // Validate and apply offerDiscount
  if (offerDiscount && typeof offerDiscount === 'number' && offerDiscount > 0) {
    discountApplied = offerDiscount;
  }

  // Check if couponCode exists and is valid
  if (couponCode) {
    const validCoupon = await Coupon.findOne({ code: couponCode });
    if (validCoupon) {
      // Apply coupon discount
      discountApplied = validCoupon.discount;
    } else {
      res.status(400);
      throw new Error("Invalid coupon code");
    }
  }

  // Fetch the bill to calculate the total amount after discount
  const bill = await Bill.findById(billId);
  if (!bill) {
    res.status(404);
    throw new Error("Bill not found");
  }

  // Calculate final amount after discount
  finalAmount = bill.totalAmount - discountApplied;

  // Create and save the payment record
  const newPayment = new Payment({
    billId,
    paymentMethod,
    offerDiscount: discountApplied,
    couponCode: couponCode || "",
    totalAmount: finalAmount,
    status,
    paymentDateTime: new Date(),
  });

  const savedPayment = await newPayment.save();

  res.status(201).json({
    success: true,
    message: "Payment created successfully",
    data: savedPayment,
  });
});



// GET: /foodskill/restaurant/create/getallpayments
exports.getAllPayments = asyncHandler(async (req, res) => {
  try {
    const payments = await Payment.aggregate([
      {
        $lookup: {
          from: "billings",
          localField: "billId",
          foreignField: "_id",
          as: "billingDetails",
        },
      },
      { $unwind: "$billingDetails" },
    ]);

    res.status(200).json({
      success: true,
      totalPayments: payments.length,
      message: "Payments retrieved successfully",
      data: payments,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error retrieving payments",
      error: error.message,
    });
  }
});
