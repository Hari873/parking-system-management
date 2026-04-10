import axios from 'axios';
import { useState } from 'react';
export default function ExitPage() {
    const [vehicleNumber, setVehicleNumber] = useState("");
    const [error, setError] = useState({});

    const handleSubmit = async (e) => {
        const errObj = {};
        e.preventDefault();
        if (vehicleNumber == "") {
            errObj.vehicleNumber = "Fill the vehicle number";
            return;
        }
        try {
            const response = await axios.post('http://localhost:4000/api/ticket/exit', {
                vehicleNumber
            })
            console.log("Sucess", response.data);
            setVehicleNumber("");
            setError({});
            alert("Pay Rs: " + response.data.amount + " Thank You!");
        } catch (err) {
            console.log(err.message);
            alert("Error passing data");
        }
    }
    return (
        <div>
            <h2>Exit Page</h2>
            <form onClick={handleSubmit}>
                <label>Vehicle Number </label>
                <input type="text" value={vehicleNumber} onChange={(e) => setVehicleNumber(e.target.value)} />
                <br />
                <br />
                <input type="submit" />
            </form>
        </div>
    )
}