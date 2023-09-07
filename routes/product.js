const express = require("express");
const productController = require("../controller/product");
const router = express.Router();
router
	.post("/", productController.createProduct)
	.get("/", productController.getAllProducts)
	.get("/:id", productController.getProduct)
	.put("/:id", productController.updateProduct)
	.patch("/:id", productController.partialUpdateProduct)
	.delete("/:id", productController.deleteProduct);

exports.routes = router;
// YwdEdV6OSGiUIrTI;
