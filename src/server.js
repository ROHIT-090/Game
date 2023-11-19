const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB (replace 'your_mongodb_connection_string' with your actual connection string)
mongoose.connect('mongodb+srv://Rohit:Rohit1@cluster0.iov7nj6.mongodb.net/gaming?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// Define a MongoDB schema
const checkoutSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  
  city: String,
  zipCode: String,
  
  country: String,
  phone: String,
  totalPrice:String,
});

const Checkout = mongoose.model('Checkout', checkoutSchema);


app.post('/server', async (req, res) => {
  try {
    const formData = req.body;
    const newCheckout = new Checkout(formData);
    await newCheckout.save();
    res.status(200).json({ message: 'Form data submitted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

const Razorpay = require("razorpay");

app.post("/custom_pay", async (req, res) => {
  console.log("Run server")
    try {
        const instance = new Razorpay({
            key_id: 'rzp_test_zpcvSUNJXUqrLv',
            key_secret:'uGZApKWjnDBHcfaMiQQctHxQ',
        });

        console.log(Math.round(req.body.amount))

        const options = {
            amount: req.body.amount, // amount in smallest currency unit
            currency: "INR",
            receipt: "receipt_order_74394",
        };

        const order = await instance.orders.create(options);

        if (!order) return res.status(500).send("Some error occured");
        res.json(order);
    } catch (error) {
        console.log(error)
        res.status(500).send(error);
    }
});



// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});