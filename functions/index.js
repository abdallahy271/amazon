const functions = require("firebase-functions");
const express = require("express");

// npm i cors
const cors = require("cors");

const stripe = require("stripe")("sk_test_51IZpSIBqs6Wtkhf8KslVuQyOruUJOSEzmkn9mea5EulinPOnHJtMtnl48eO7jYhyVfzYFNG1eXefMrJ4SddNyi6P00E029rtcD");

// API steps:

// - App config
const app = express();
// - Middlewares
app.use(cors({origin: true}));
app.use(express.json());

// - API routes
app.get("/", (request, response) => response.status(200).send("Hello world"));

app.post("/payments/create", async (request, response) => {
  const total = request.query.total;

  const paymentIntent = await stripe.paymentIntents.create({
    amount: total,
    currency: "usd",
  });

  // Ok - Created something!
  response.status(201).send({
    clientSecret: paymentIntent.client_secret,
  });
});


// - Listen command
exports.api = functions.https.onRequest(app);
// Example endpoint
// http://localhost:5001/fir-bcd8c/us-central1/api
