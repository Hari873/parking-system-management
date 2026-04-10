import axios from 'axios';
import { useState } from 'react';
export default function ExitPage() {
    const [vehicleNumber, setVehicleNumber] = useState("");
    const [error, setError] = useState({});
    const [exitData, setExitData] = useState(null);

    const handleSubmit = async (e) => {
        const errObj = {};
        e.preventDefault();
        setExitData(null);
        if (vehicleNumber == "") {
            errObj.vehicleNumber = "Fill the vehicle number";
            setError(errObj);
            return;
        }
        try {
            const response = await axios.patch('http://localhost:3600/api/ticket/exit', {
                vehicleNumber
            })
            console.log("Sucess", response.data);
            setVehicleNumber("");
            setError({});
            setExitData(response.data);
            alert("Pay Rs: " + response.data.amount + " Thank You!");
        } catch (err) {
            console.log(err.message);
            alert("Error passing data");
        }
    }
    return (
        <div>
            <h2>Exit Page</h2>
            <form onSubmit={handleSubmit}>
                <label>Vehicle Number </label>
                <input type="text" value={vehicleNumber} onChange={(e) => setVehicleNumber(e.target.value)} />
                <br />
                <br />
                <input type="submit" />
            </form>

            {exitData && exitData.ticket && (
                <div>
                    <h4>Exit Details</h4>
                    <p>Message: {exitData.message}</p>
                    <p>Total Hours: {exitData.hours}</p>
                    <p>Amount Paid: Rs {exitData.amount}</p>
                    
                    <p>Slot No: {exitData.ticket.slot.slotNumber}</p>
                    <p>Type: {exitData.ticket.slot.slotType}</p>
                    <p>Vehicle No: {exitData.ticket.vehicle.vehicleNumber}</p>
                    <p>Vehicle Type: {exitData.ticket.vehicle.vehicleType}</p>
                    <p>Ticket No: {exitData.ticket.ticketNumber}</p>
                    <p>Entry Time: {new Date(exitData.ticket.entryTime).toLocaleString()}</p>
                    <p>Exit Time: {new Date(exitData.ticket.exitTime).toLocaleString()}</p>
                </div>
            )}
        </div>
    )
}