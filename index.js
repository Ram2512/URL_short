const express = require('express');
const { connectToMongoDB }= require("./connect");
const urlRoute = require("./routes/url");
const { connect } = require('mongoose');

const app = express();
const PORT = 8001;

connectToMongoDB("mongodb://localhost:27017/short-url")
.then(()=>  console.log("Connected to MongoDB database"));

app.use(express.json());

app.use("/url", urlRoute);

// app.get("/:shortId",)

app.listen(PORT, ()=> console.log(`Server Started ar PORT: ${PORT}`));