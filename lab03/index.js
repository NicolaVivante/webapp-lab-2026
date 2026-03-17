// imports
import morgan from "morgan";
import express from "express";

// app creation and configuration
const app = express();
const port = 3001;

// middleware injection
app.use(express.json());
app.use(morgan("dev"));

// endpoints creation


// server start
app.listen(port, "localhost", () => {console.log(`Server started at port ${port}`)});