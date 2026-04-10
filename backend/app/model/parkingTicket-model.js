const mongoose = require('mongoose');

const {Schema, model} = mongoose;

const parkingTicketSchema = new Schema({
    ticketNumber: String,
    vehicle: {
        type: Schema.Types.ObjectId,
        ref: 'Vehicle'
    },
    slot: {
        type: Schema.Types.ObjectId,
        ref: 'ParkingSlot'
    },
    entryTime: {
        type:Date,
        default: Date.now
    },
    exitTime: Date,
    amount: Number,
    isActive: {
        type: Boolean,
        default: true
    }
},{timestamps: true});

parkingTicketSchema.pre('save', async function (){
    try{
        const total = await this.constructor.countDocuments();
        const nextNumber = total + 1;
        this.ticketNumber = nextNumber.toString().padStart(4, '0');
    }catch(error){
        console.log(error);
    }

})
const ParkingTicket = model('ParkingTicket', parkingTicketSchema);

module.exports = ParkingTicket;