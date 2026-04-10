import axios from 'axios';
import { useState } from 'react';

export default function ReadSlotPage() {
    const [slotNumber, setSlotNumber] = useState("");
    const [slotData, setSlotData] = useState(null);
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSlotData(null);
        setError(null);

        if (slotNumber === "") {
            setError("Fill the slot number");
            return;
        }
        
        try {
            const response = await axios.get(`http://localhost:3600/api/slot/${slotNumber}`);
            setSlotData(response.data);
            setError(null);
        } catch (err) {
            console.log(err.message);
            if (err.response && err.response.status === 404) {
                setError("Slot not found");
            } else {
                setError("Failed to fetch slot details");
            }
        }
    }

    return (
        <div>
            <h2>Read Slot Status</h2>
            <form onSubmit={handleSubmit}>
                <label>Slot Number </label>
                <input type="text" value={slotNumber} onChange={(e) => setSlotNumber(e.target.value)} />
                <br />
                <br />
                <input type="submit" value="Read slot" />
            </form>

            {error && <p>{error}</p>}

            {slotData && (
                <div>
                    <h4>Slot Details</h4>
                    <p>Slot No: {slotData.slotNumber}</p>
                    <p>Type: {slotData.slotType}</p>
                    <p>Status: {slotData.isOccupied ? "Occupied" : "Available"}</p>
                    
                    {slotData.isOccupied && (
                        <>
                            <p>Vehicle No: {slotData.vehicleNumber}</p>
                            <p>Vehicle Type: {slotData.vehicleType}</p>
                            <p>Ticket No: {slotData.ticketNumber}</p>
                            <p>Entry Time: {new Date(slotData.entryTime).toLocaleString()}</p>
                        </>
                    )}
                </div>
            )}
        </div>
    )
}
