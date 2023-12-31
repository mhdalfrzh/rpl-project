import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import data from '../data.js';
import Product from '../models/productModel.js';
import { isAdmin, isAuth, isSellerOrAdmin } from '../utils.js';

const productRouter = express.Router();

productRouter.get(
    '/',
    expressAsyncHandler(async (req, res) => {
        const name = req.query.name || '';
        const category = req.query.category || '';
        const seller = req.query.seller || '';
        const user = req.query.user || '';
        const nameFilter = name ? {name: {$regex: name, $options: 'i'}} : {};
        const categoryFilter = category ? {category} : {};
        const sellerFilter = seller ? {seller} : {};
        const userFilter = user ? {user} : {};
        const products = await Product.find({ ...sellerFilter, ...nameFilter, ...categoryFilter, ...userFilter }).populate(
            'seller',
            'seller.name seller.logo name'
        );
        res.send(products);
    })
);

productRouter.get(
    '/categories',
    expressAsyncHandler(async (req, res) => {
        const categories = await Product.find().distinct('category');
        res.send(categories);
    })
);

productRouter.get(
    '/seed',
    expressAsyncHandler(async (req, res) => {
        //await Product.remove({});
        const createdProducts = await Product.insertMany(data.products);
        res.send({ createdProducts });
    })
);

productRouter.get(
    '/:id',
    expressAsyncHandler(async (req, res) => {
        const product = await Product.findById(req.params.id).populate(
            'seller',
            'seller.name seller.logo name'
          );
        if (product) {
            res.send(product);
        } else {
            res.status(404).send({ message: 'Produk Tidak Ditemukan'});
        }
    })
);

productRouter.post(
    '/',
    isAuth,
    isSellerOrAdmin,
    expressAsyncHandler(async (req, res) => {
        const product = new Product({
            name: 'sample name' + Date.now(),
            seller: req.user._id,
            image: '/images/img1.png',
            price: 0,
            category: 'sample category',
            brand: 'sample brand',
            countInStock: 1,
            description: 'sampe description',
        });
        const createdProduct = await product.save();
        res.send({ message: 'Produk Berhasil Ditambahkan', product: createdProduct });
    })
);

productRouter.put(
    '/:id',
    isAuth,
    isSellerOrAdmin,
    expressAsyncHandler(async (req, res) => {
        const productId = req.params.id;
        const product = await Product.findById(productId);
        if (product) {
            product.name = req.body.name;
            product.price = req.body.price;
            product.image = req.body.image;
            product.category = req.body.category;
            product.brand = req.body.brand;
            product.countInStock = req.body.countInStock;
            product.description = req.body.description;
            const updateProduct = await product.save();
            res.send({ message: 'Product Updated', product: updateProduct });
        } else {
            res.status(404).send({ message: 'Produk Tidak Ditemukan' });
        }
    })
);

productRouter.delete(
    '/:id',
    isAuth,
    isAdmin,
    expressAsyncHandler(async (req, res) => {
        const product = await Product.findById(req.params.id);
        if(product) {
            const deleteProduct = await product.remove();
            res.send({ message: 'Product Deleted', product: deleteProduct });
        } else {
            res.status(404).send({ message: 'Produk Tidak Ditemukan' });
        }
    })
);

export default productRouter;