import { useState } from 'react';
import { calculateFare } from '../utils/rates';
import { Link } from 'react-router-dom';

function QuotationSection() {
  const [vehicleType, setVehicleType] = useState('Car');
  const [distance, setDistance] = useState('');
  const [petSize, setPetSize] = useState('Small');
  const [petCount, setPetCount] = useState(1);
  const [fare, setFare] = useState(null);
  const [baseFare, setBaseFare] = useState(0);
  const [extraCharge, setExtraCharge] = useState(0);

  const handleGetQuote = () => {
    if (!distance || petCount < 1) return;

    const base = calculateFare(Number(distance), vehicleType);
    let extra = 0;

    if (petSize === 'Large') {
      if (petCount > 1) {
        extra = (petCount - 1) * 100;
      }
    } else if (petSize === 'Small' || petSize === 'Medium') {
      if (petCount > 2) {
        extra = (petCount - 2) * 50;
      }
    }

    setBaseFare(base);
    setExtraCharge(extra);
    setFare(base + extra);
  };

  return (
    <div className="max-w-md mx-auto bg-white p-8 shadow-lg rounded mt-10 mb-16 text-center border border-gray-200">

      <h3 className="text-2xl font-bold mb-6 text-[#17C0EB]">Get a Quick Quotation</h3>

      <div className="text-left space-y-4">
        <div>
          <label className="block mb-1 font-medium">Estimated Distance (km)</label>
          <input
            type="number"
            value={distance}
            onChange={e => setDistance(e.target.value)}
            className="border p-2 w-full rounded"
            min="1"
            placeholder="Enter distance"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Vehicle Type</label>
          <select value={vehicleType} onChange={e => setVehicleType(e.target.value)} className="border p-2 w-full rounded">
            <option>Car</option>
            <option>Motorcycle</option>
          </select>
        </div>

        <div>
          <label className="block mb-1 font-medium">Pet Size</label>
          <select value={petSize} onChange={e => setPetSize(e.target.value)} className="border p-2 w-full rounded">
            <option>Small</option>
            <option>Medium</option>
            <option>Large</option>
          </select>
        </div>

        <div>
          <label className="block mb-1 font-medium">Number of Pets</label>
          <input
            type="number"
            value={petCount}
            onChange={e => setPetCount(e.target.value)}
            className="border p-2 w-full rounded"
            min="1"
          />
        </div>
      </div>

      <button onClick={handleGetQuote} className="btn-brand w-full mt-6">Get Quote</button>

      {fare !== null && (
        <div className="mt-6 bg-gray-50 p-4 rounded">
          <p>Base Fare: ₱{baseFare}</p>
          <p>Extra Charge: ₱{extraCharge}</p>
          <hr className="my-2" />
          <p className="text-lg font-bold text-[#17C0EB]">Total: ₱{fare}</p>
          <Link to="/booking" className="btn-brand w-full mt-4 inline-block">Proceed to Booking</Link>
        </div>
      )}
    </div>
  );
}

export default QuotationSection;
