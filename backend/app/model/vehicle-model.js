const mongoose = require('mongoose');

const {Schema, model} = mongoose;

const vehicleSchema = new Schema({
    vehicleNumber: {
        type:String,
        required: true
    },
    vehicleType:{
        type: String,
        enum: ['bike', 'car', 'truck'],
        required: true
    }
}, {timestamps: true});

const Vehicle = model('Vehicle', vehicleSchema);

module.exports = Vehicle;