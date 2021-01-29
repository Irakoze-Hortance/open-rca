const {
    Rate,
    validatedRate
} = require('../models/rateModel')
const express = require('express')
const db=require('../../open-rca/DB/db')

RateProduct = async (req, res) => {
    const body = req.body
    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a star and a comment',
        })
    }

    const {error} = validatedRate(req.body)

    if (error)
        return res.status(400).send(error)

    const newRate = new Rate(body);
    await newRate.save()

            return res.status(201).json({
                success: true,
                rate:newRate,
                message: 'Thank you for your review'
            })
        }


updateRate = async (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'you must provide all details to update your rate'
        })
    }

    Rate.findOne({
            _id: req.params.id
        }, (err, rate) => {
            if (err)
                return res.status(400).json({
                    err,
                    message: 'This  rate does not exist',
                })
                const proId = body.proId;
                const userId = body.userId;
                const stars = body.stars;
                const review = body.review;

            const updates={
                proId,userId,stars,review
            };

            rate.save()
            .then(() => {
                return res.status(200).json({
                    success: true,
                    id: rate._id,
                    message: 'Rating updated',
                })
            })

        },
    )}

unrate = async (req, res) => {
    await Rate.findByIdAndDelete({
        _id: req.params.id
    }, (err, rate) => {
        if (err) {
            return res.status(400).json({
                success: false,
                error: err
            })
        }

        if (!rate) {
            return res.status(404).json({
                success: false,
                message: 'Rate not found'
            })
        }

        return res.status(200).json({
            success: true,
            data: rate
        })
    }).catch(err => console.log(err))
}

getRateByStars = async (req, res) => {
    await Rate.findOne({
        stars: req.params.stars
    }, (err, rate) => {
        if (err) {
            return res.status(400).json({
                success: false,
                error: err
            })
        }
        if (!rate) {
            return res.status(404).json({
                success: false,
                error: 'Rate not found'
            })
        }
        return res.status(200).json({
            success: true,
            data: rate
        })
    }).catch(err => console.log(err))
}

getRates = (req, res) => {
    Rate.find()
        .then((docs) => {
            if (docs.length <=0) {
                return res.status(400).send({
                    success: false,
                    error: "Rate record doesn't exist"
                })
            } else {
                return res.status(200).send({
                    success: true,
                    data: docs
                })
            }
        }).catch(e => {
            return res.status(400).send({
                success: false,
                message: "Something went wrong"
            })
        })
}
module.exports = {
    RateProduct,
    updateRate,
    unrate,
    getRateByStars,
    getRates
}
