const mongoose = require('mongoose');

const {Schema, model} = mongoose;

const parkingSlotSchema = new Schema({
    slotNumber: {
        type: Number,
        required: true
    },
    slotType: {
        type: String,
        enum: ['bike', 'car', 'truck'],
        required: true
    },
    isOccupied: {
        type: Boolean,
        default: false
    }
},{timestamps: true});

const ParkingSlot = model('ParkingSlot', parkingSlotSchema);

module.exports = ParkingSlot;