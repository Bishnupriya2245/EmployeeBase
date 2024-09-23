import dotenv from "dotenv";
dotenv.config();

import express from 'express';
import cors from 'cors';
// import bodyParser from 'body-parser';
import { ConnectDB } from "./config/db.config.js";
import authRoutes from './routes/authRoutes.js';
import employeeRoutes from './routes/employeeRoutes.js';
// import bodyParser from 'body-parser';




const app = express();

app.use(express.json());

app.use(express.urlencoded({ extended: true }));
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({
    origin: "https://employee-base-u7ff.vercel.app/",
    methods: ["POST","GET"],
    credentials: true
}));


app.use('/auth', authRoutes);
app.use('/api', employeeRoutes);

const port = process.env.PORT || 8082; 

ConnectDB();


app.listen(port,()=>{
    console.log(`Server running on port ${port}`)
});