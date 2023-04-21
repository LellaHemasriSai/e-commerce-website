const Razorpay = require("razorpay");

const checkout = async (req, res) => {
  try {
    const instance = new Razorpay({
      key_id: "rzp_test_IkTrsrpynLHLwp",
      key_secret: "1TyWW4ursloQmdkhfvK1Tqlz",
    });
    const { amount } = req.body;
    const option = {
      amount: amount * 100,
      currency: "INR",
    };
    const order = await instance.orders.create(option);
    if (!order) {
      return res.status(500).send("Some error occured");
    }
    res.json({
      success: true,
      order,
    });
  } catch (error) {
    res.status(500).send(error);
  }
};

const paymentVerification = async (req, res) => {
  const { razorpayOrderId, razorpayPamentId } = req.body;
  res.json({ razorpayOrderId, razorpayPamentId });
};

module.exports = { checkout, paymentVerification };
