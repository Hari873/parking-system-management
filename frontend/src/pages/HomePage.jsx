import { useState } from 'react';
import axios from 'axios';

export default function HomePage() {
    const [vehicleNumber, setVehicleNumber] = useState("");
    const [vehicleType, setVehicleType] = useState("");
    // const [vehicle, setVehicle] = useState({});
    const [error, setError] = useState({});

    const handleSubmit = async (e) => {
        e.preventDefault();
        const obj = {};
        const errObj = {};
        obj.vehicleNumber = vehicleNumber;
        if (vehicleNumber == "") {
            errObj.vehicleNumber = "Fill vehicle number"
        }
        obj.vehicleType = vehicleType;
        if (vehicleType == "") {
            errObj.vehicleType = "Fill vehicle type"
        }
        if (Object.keys(errObj).length > 0) {
            setError(errObj);
            return;
        } if (vehicleNumber != "" && vehicleType != "") {
            try {
                const response = await axios.post('http://localhost:3600/api/ticket/create', {
                    vehicleNumber, vehicleType
                });
                console.log("Sucess", response.data);
                setVehicleNumber("");
                setVehicleType("");
                setError({});
                const date = new Date(response.data.createdAt).toLocaleString();
                alert('Ticket generated sucessfully at ' + date + ' and slot is ' + response.data.slot.slotNumber);
                console.log(response.data.slot);
            }
            catch (err) {
                console.log(err.message);
                alert("Failed to generate ticket");
            }
        }
    }
    return (
        <div>
            <h2>TicketPage</h2>

            <form onSubmit={handleSubmit}>
                <label>Vehicle Number </label>
                <input type="text" value={vehicleNumber} onChange={(e) => setVehicleNumber(e.target.value)} />
                <br />
                <br />
                <label>Vehicle Type </label>
                <input type="text" value={vehicleType} onChange={(e) => setVehicleType(e.target.value)} />
                <br />
                <br />
                <input type="submit" />
            </form>
        </div>
    )
}