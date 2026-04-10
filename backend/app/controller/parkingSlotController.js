const Slot = require('../model/parkingSlot-model');
const { parkingSlotSchema } = require('../validator/validator.js');
const slotCtlr = {};

slotCtlr.create = async (req, res) => {
    const body = req.body;
    const { error, value } = parkingSlotSchema.validate(body, { abortEarly: false });
    if (error) {
        return res.status(400).json({ error: error.details.map(ele => ele.message) })
    }
    try {
        const { slotNumber } = value;
        const found = await Slot.findOne({ slotNumber })
        if (found) {
            return res.status(400).json({ error: "Duplicate" })
        }
        const newSlot = new Slot(value);
        newSlot.isOccupied = false;
        await newSlot.save();
        res.status(201).json(newSlot);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Something went wrong!" });
    }
}

slotCtlr.read = async (req, res) => {
    try {
        const slotNumber = req.params.slotNumber;
        const slot = await Slot.findOne({ slotNumber }).lean();

        if (!slot) {
            return res.status(404).json({ error: "Slot not found" });
        }

        let result = { ...slot };

        if (slot.isOccupied) {
            const Ticket = require('../model/parkingTicket-model');
            const activeTicket = await Ticket.findOne({ slot: slot._id, isActive: true }).populate('vehicle').lean();
            if (activeTicket) {
                result.vehicleNumber = activeTicket.vehicle.vehicleNumber;
                result.vehicleType = activeTicket.vehicle.vehicleType;
                result.ticketNumber = activeTicket.ticketNumber;
                result.entryTime = activeTicket.entryTime;
            }
        }

        res.status(200).json(result);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Something went wrong!" });
    }
}

module.exports = slotCtlr;