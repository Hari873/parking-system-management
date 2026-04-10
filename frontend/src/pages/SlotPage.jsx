import axios from 'axios';
import { useState } from 'react';
export default function SlotPage() {
    const [slotNumber, setSlotNumber] = useState("");
    const [slotType, setSlotType] = useState("");
    const [error, setError] = useState({});
    const handleSubmit = async (e) => {
        e.preventDefault();
        const obj = {};
        const errObj = {};
        obj.slotNumber = slotNumber;
        if (slotNumber == "") {
            errObj.slotNumber = "Fill the slot number";
        }
        obj.slotType = slotType;
        if (slotType == "") {
            errObj.slotType = "Fill the slot type";
        }
        if (Object.keys(errObj).length > 0) {
            setError(errObj);
            return;
        } if (slotNumber != "" && slotType != "") {
            try {
                const response = await axios.post('http://localhost:4000/api/slot', {
                    slotNumber, slotType
                });
                console.log("Sucess", response.data);
                alert("Slot number " + response.data.slotNumber + " has been created sucessfully for " + response.data.slotType + ".")
                setSlotNumber("");
                setSlotType("");
                setError({});
            } catch (err) {
                console.log(err.message);
                alert('Failed to allocate slot');
            }
        }
    }
    return (
        <div>
            <h2>Assign Slot</h2>
            <form onSubmit={handleSubmit}>
                <label>Slot Number </label>
                <input type="text" value={slotNumber} onChange={(e) => setSlotNumber(e.target.value)} />
                <br />
                <br />
                <label>Slot Type </label>
                <input type="text" value={slotType} onChange={(e) => setSlotType(e.target.value)} />
                <br />
                <br />
                <input type="submit" />
            </form>
        </div>
    )
}