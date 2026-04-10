const Joi = require('joi');

const parkingSlotSchema = Joi.object({
    slotNumber: Joi.number().positive().required(),
    slotType: Joi.string().valid('car', 'bike', 'truck').required()
})
const exitSchema = Joi.object({
    vehicleNumber: Joi.string().trim().required()
})
const ticketSchema = Joi.object({
    vehicleNumber: Joi.string().trim().required(),
    vehicleType: Joi.string().valid('car', 'bike', 'truck').required()
})

module.exports = {parkingSlotSchema, exitSchema, ticketSchema}