const Ticket = require("../model/parkingTicket-model");
const Slot = require("../model/parkingSlot-model");
const Vehicle = require("../model/vehicle-model");
const {ticketSchema, exitSchema} = require("../validator/validator");

parkingTicketCtlr = {};

parkingTicketCtlr.createTicket = async(req, res) => {
    const {body} = req;
    const {error, value} = ticketSchema.validate(body, {abortEarly: false});
    if(error){
        return res.status(400).json({error: error.details.map(ele => ele.message)});
    }
    try{
        const {vehicleNumber, vehicleType} = value;
        let vehicle = await Vehicle.findOne({vehicleNumber});
        if(!vehicle){
            vehicle = new Vehicle({vehicleNumber, vehicleType});
            await vehicle.save();
        }
        const activeTicket = await Ticket.findOne({
            vehicle: vehicle._id,
            isActive: true
        });
        if(activeTicket){
            return res.status(400).json({error: "Duplicate"});
        }
        const slot = await Slot.findOne({
            slotType: vehicleType,
            isOccupied: false
        }).sort({slotNumber: 1});

        if(!slot){
            return res.status(404).json({error: "No slots"});
        }
        const ticket = new Ticket({
            vehicle: vehicle._id,
            slot: slot._id,
            isActive: true,
        });
        await ticket.save();

        slot.isOccupied = true;
        await slot.save();
        console.log(ticket.entryTime);
        const result = await Ticket.findById(ticket._id)
            .populate('vehicle')
            .populate('slot');
        res.status(201).json(result);
    }catch(err){
        console.log(err);
        res.status(500).json({error: 'Something went wrong!'});
    }
}
    parkingTicketCtlr.exit = async(req, res) => {
        const {body} = req;
        const {error, value} = exitSchema.validate(body, {abortEarly: false});
        if(error){
            return res.status(400).json({error: error.details.map(ele => ele.message)});
        }
        try{
            const {vehicleNumber} = value;
            const exitVehicle = await Vehicle.findOne({vehicleNumber});
            if(!exitVehicle){
                return res.status(404).json({error: "No record"});
            }
            const exitTicket = await Ticket.findOne({
                vehicle: exitVehicle._id,
                isActive: true
            });
            if(!exitTicket){
                return res.status(404).json({error:"No parked status!"});
            }
            const exitTime = new Date();
            const entryTime = exitTicket.entryTime;
            const duration = exitTime - entryTime;
            const seconds = Math.ceil(duration /1000);
            let hours = Math.ceil(seconds/(60*60));
            console.log(hours)
            if(hours == 0) hours = 1;
            if(hours <= 1){
                switch(exitVehicle.vehicleType){
                    case "car":
                        exitTicket.amount = 20;
                        break;
                    case "bike":
                        exitTicket.amount = 10;
                        break;
                    case "truck":
                        exitTicket.amount = 30;
                }
            }else{
                switch(exitVehicle.vehicleType){
                    case "car":
                        exitTicket.amount = 20 + 10*(hours - 1);
                        break;
                    case "bike":
                        exitTicket.amount = 10 + 5*(hours - 1);
                        break;
                    case "truck":
                        exitTicket.amount = 30 + 15*(hours - 1);
                        break;
                }
            }
            exitTicket.isActive = false;
            await exitTicket.save();
            
            await Slot.findByIdAndUpdate(exitTicket.slot, {isOccupied: false});

            res.status(200).json({
                hours,
                amount: exitTicket.amount,
                message: "Thank you"
            })
        }
        catch(err){
            res.status(500).json({error: err.message});
        }
}


module.exports = parkingTicketCtlr;