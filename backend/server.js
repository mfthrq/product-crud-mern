import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import productRoutes from './route/product.route.js';

dotenv.config();

const app = express();

app.use(express.json()); // to accept json data in the body

app.use("/api/products", productRoutes);

app.listen(5000, () => {
    connectDB();
    console.log("Server running on http://localhost:5000/");
});

