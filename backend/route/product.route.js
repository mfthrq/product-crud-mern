import express from 'express';
import Product from './model/product.model.js';
import mongoose from 'mongoose';

const router = express.router();

router.get('/', async (req, res) => {
    try {
        const products = await Product.find({});
        res.status(200).json({success: products, data: products});
    } catch (error) {
        console.log("error in fetching products: ", error.message);
        res.status(500).json({success: false, message: error.message});
    }
});

router.post('/', async (req, res) => {
    const product = req.body;

    if(!product.name || !product.price || !product.image){
        return res.status(400).json({ success:false, msg: 'Please provide all fields.' });
    }

    const newProduct = new Product(product);
    
    try {
        await newProduct.save();
        res.status(201).json({ success:true, data:newProduct});
    } catch (error) {
        console.error("Error in Create Product", error.message);
        res.status(500).json({ success: false, msg: 'Server Error' });
    }
});

router.delete('/:id', async (req, res) => {
    const {id} = req.params;
    
    try {
        await Product.findByIdAndDelete(id);
        res.json(200).json({success: true, message: 'Product deleted successfully'});
    } catch (error) {
        console.log("error in deleting products: ", error.message);
        res.json(404).json({success: false, message: 'Product not found'});
    }
});

router.put('/:id', async (req, res) => {
    const {id} = req.params;

    const product = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({success: false, message:"Invalid Product ID"});
    }

    try {
        const updatedProduct = await Product.findByIdAndUpdate(id, product, {new:true});
        res.status(200).json({success: true, data: updatedProduct});
    } catch (error) {
        res.status(500).json({success: false, error: error.message});
    }
});

export default productRoutes;