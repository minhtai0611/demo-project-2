/* eslint-disable no-undef */
import express from "express";

const app = new express();
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server NodeJS + Express + MongoDB is running on port ${PORT}`))