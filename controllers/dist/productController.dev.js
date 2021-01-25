"use strict";

var _require = require('../models/productModel'),
    Product = _require.Product,
    validateProductSchema = _require.validateProductSchema;

var multer = require('multer');

var express = require('express');

var storage = multer.diskStorage({
  destination: function destination(req, file, callb) {
    callb(null, './uploads');
  },
  filename: function filename(req, file, cb) {
    cb(null, file.originalname);
  }
});

var docFilter = function docFilter(req, file, cb) {
  if (!file.originalname.match(/\.(jpeg|jpg|png)$/)) {
    return cb(new Error('You can only upload document file!'), false);
  }

  cb(null, true);
};

var upload = multer({
  storage: storage,
  fileFilter: docFilter
});

createProduct = function createProduct(req, res) {
  var body, error, product;
  return regeneratorRuntime.async(function createProduct$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          body = req.body;

          if (body) {
            _context.next = 3;
            break;
          }

          return _context.abrupt("return", res.status(400).json({
            success: false,
            error: 'You must provide product details'
          }));

        case 3:
          error = validateProductSchema(req.body);

          if (!error) {
            _context.next = 6;
            break;
          }

          return _context.abrupt("return", res.status(400).send(error));

        case 6:
          product = new Product(body);

          if (product) {
            _context.next = 9;
            break;
          }

          return _context.abrupt("return", res.status(400).json({
            success: false,
            error: err
          }));

        case 9:
          product.save().then(function (doc) {
            return res.status(201).json({
              success: true,
              id: doc_id,
              message: 'Product added successfully...'
            });
          });

        case 10:
        case "end":
          return _context.stop();
      }
    }
  });
};

updateProduct = function updateProduct(req, res) {
  var body;
  return regeneratorRuntime.async(function updateProduct$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          body = req.body;

          if (body) {
            _context2.next = 3;
            break;
          }

          return _context2.abrupt("return", res.status(400).json({
            success: false,
            error: 'You must provide all details to update a product'
          }));

        case 3:
          Product.findOne({
            _id: req.params.id
          }, function (err, product) {
            if (err) return res.status(400).json({
              err: err,
              message: 'Product not found'
            });
          }, product.proId = body.proId, product.proName = body.proName, product.catId = body.catId, product.quantity = body.quantity, product.price = body.price, product.description = body.description, product.review = body.review, product.productImg = req.file.filename, product.tags = body.tags, product.save().then(function () {
            return res.status(200).json({
              success: 'true',
              id: product._id,
              message: 'Product updated'
            });
          }));

        case 4:
        case "end":
          return _context2.stop();
      }
    }
  });
};

removeProduct = function removeProduct(req, res) {
  return regeneratorRuntime.async(function removeProduct$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 2;
          return regeneratorRuntime.awrap(Product.findByIdAndDelete({
            _id: req.params.id
          }, function (err, product) {
            if (err) {
              return res.status(400).json({
                success: false,
                error: err
              });
            }

            if (!product) {
              return res.status(404).json({
                success: false,
                message: 'Product not found'
              });
            }

            return res.status(200).json({
              success: true,
              data: product
            });
          })["catch"](function (err) {
            return console.log(err);
          }));

        case 2:
        case "end":
          return _context3.stop();
      }
    }
  });
};

getProductById = function getProductById(req, res) {
  return regeneratorRuntime.async(function getProductById$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.next = 2;
          return regeneratorRuntime.awrap(Product.findOne({
            _id: req.params.id
          }, function (err, product) {
            if (err) {
              return res.status(400).json({
                success: false,
                error: err
              });
            }

            if (!product) {
              return res.status(404).json({
                success: false,
                error: 'Product not found'
              });
            }

            return res.status(200).json({
              success: true,
              data: product
            });
          })["catch"](function (err) {
            return console.log(err);
          }));

        case 2:
        case "end":
          return _context4.stop();
      }
    }
  });
};

getProducts = function getProducts(req, res) {
  Product.find().then(function (docs) {
    if (docs.length < 1) {
      return res.status(400).send({
        success: false,
        error: 'Product not found'
      });
    } else {
      return res.status(200).send({
        success: true,
        data: docs
      });
    }
  })["catch"](function (e) {
    return res.status(400).send({
      success: false,
      message: "something went wrong!"
    });
  });
};

module.exports = {
  createProduct: createProduct,
  updateProduct: updateProduct,
  removeProduct: removeProduct,
  getProducts: getProducts,
  getProductById: getProductById
};