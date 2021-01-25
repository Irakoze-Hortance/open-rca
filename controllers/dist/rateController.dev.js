"use strict";

var _require = require('../models/rateModel'),
    Rate = _require.Rate,
    validatedRate = _require.validatedRate;

var express = require('express');

var _require2 = require('./productController'),
    updateProduct = _require2.updateProduct;

RateProduct = function RateProduct(req, res) {
  var body, error, rate;
  return regeneratorRuntime.async(function RateProduct$(_context) {
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
            error: 'You must provide a star and a comment'
          }));

        case 3:
          error = validatedRate(req.body);

          if (!error) {
            _context.next = 6;
            break;
          }

          return _context.abrupt("return", res.status(400).send(error));

        case 6:
          rate = new Rate(body);

          if (rate) {
            _context.next = 9;
            break;
          }

          return _context.abrupt("return", res.status(400).json({
            success: false,
            error: err
          }));

        case 9:
          rate.save().then(function (doc) {
            return res.status(201).json({
              success: true,
              id: doc._id,
              message: 'Thank you for your review'
            });
          });

        case 10:
        case "end":
          return _context.stop();
      }
    }
  });
};

updateRate = function updateRate(req, res) {
  var body;
  return regeneratorRuntime.async(function updateRate$(_context2) {
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
            error: 'you must provide all details to update your rate'
          }));

        case 3:
          Rate.findOne({
            _id: req.params.id
          }, function (err, rate) {
            if (err) return res.status(400).json({
              err: err,
              message: 'This  rate does not exist'
            });
          }, rate.proId = body.proId, rate.userId = body.userId, rate.stars = body.stars, rate.review = body.review, rate.save().then(function () {
            return res.status(200).json({
              success: true,
              id: rate._id,
              message: 'Rating updated'
            });
          }));

        case 4:
        case "end":
          return _context2.stop();
      }
    }
  });
};

unrate = function unrate(req, res) {
  return regeneratorRuntime.async(function unrate$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 2;
          return regeneratorRuntime.awrap(Rate.findByIdAndDelete({
            _id: req.params.id
          }, function (err, rate) {
            if (err) {
              return res.status(400).json({
                success: false,
                error: err
              });
            }

            if (!rate) {
              return res.status(404).json({
                success: false,
                message: 'Rate not found'
              });
            }

            return res.status(200).json({
              success: true,
              data: rate
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

getRateByStars = function getRateByStars(req, res) {
  return regeneratorRuntime.async(function getRateByStars$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.next = 2;
          return regeneratorRuntime.awrap(Rate.findOne({
            stars: req.params.stars
          }, function (err, rate) {
            if (err) {
              return res.status(400).json({
                success: false,
                error: err
              });
            }

            if (!rate) {
              return res.status(404).json({
                success: false,
                error: 'Rate not found'
              });
            }

            return res.status(200).json({
              success: true,
              data: rate
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

getRates = function getRates(req, res) {
  Rate.find();
};

module.exports = {
  RateProduct: RateProduct
};