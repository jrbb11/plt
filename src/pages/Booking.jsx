import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
// import MapSelector from '../components/MapSelector';
import { supabase } from '../supabaseClient';
import { calculateFare } from '../utils/rates';
import { getDrivingDistance } from '../utils/distance';

Modal.setAppElement('#root');

function getMaxPets(size, vehicleType) {
  if (vehicleType === 'Motorcycle') return size === 'Small' ? 2 : 1;
  return size === 'Small' ? 5 : size === 'Medium' ? 3 : 2;
}

export default function Booking() {
  const [step, setStep] = useState(1);
  const [pickupAddress, setPickupAddress] = useState('');
  const [pickupPos, setPickupPos] = useState(null);
  const [dropoffAddress, setDropoffAddress] = useState('');
  const [dropoffPos, setDropoffPos] = useState(null);
  const [pickerOpen, setPickerOpen] = useState(null);

  const [petSize, setPetSize] = useState('Small');
  const [petCount, setPetCount] = useState(1);
  const [vehicleType, setVehicleType] = useState('Car');

  const [pickupName, setPickupName] = useState('');
  const [pickupContact, setPickupContact] = useState('');
  const [dropoffName, setDropoffName] = useState('');
  const [dropoffContact, setDropoffContact] = useState('');
  const [transportDate, setTransportDate] = useState(null);

  const [distance, setDistance] = useState(0);
  const [fare, setFare] = useState(0);
  const [error, setError] = useState('');

  // Calculate Driving Distance when pickup/dropoff/vehicle changes
  useEffect(() => {
    if (pickupPos && dropoffPos) {
      getDrivingDistance(pickupPos, dropoffPos)
        .then(km => {
          setDistance(km);
          setFare(calculateFare(km, vehicleType));
        })
        .catch(() => setError("Unable to calculate route distance."));
    }
  }, [pickupPos, dropoffPos, vehicleType]);

  const handleSelect = (addr, coords) => {
    if (pickerOpen === 'pickup') {
      setPickupAddress(addr);
      setPickupPos(coords);
    }
    if (pickerOpen === 'dropoff') {
      setDropoffAddress(addr);
      setDropoffPos(coords);
    }
    setPickerOpen(null);
  };

  const validateStep = () => {
    if (step === 1) return pickupPos && dropoffPos;
    if (step === 2) return petCount >= 1 && petCount <= getMaxPets(petSize, vehicleType);
    if (step === 3) return pickupName && pickupContact && dropoffName && dropoffContact && transportDate;
    return false;
  };

  const next = () => validateStep() ? setStep(prev => Math.min(prev + 1, 3)) : setError('Complete all fields.');
  const back = () => setStep(prev => Math.max(prev - 1, 1));

  const handleSubmit = async e => {
    e.preventDefault();
    if (!validateStep()) return setError('Complete all fields.');
    await supabase.from('bookings').insert([{
      pet_size: petSize, pet_count: petCount, vehicle_type: vehicleType,
      pickup_name: pickupName, pickup_contact: pickupContact,
      dropoff_name: dropoffName, dropoff_contact: dropoffContact,
      transport_date: transportDate.toISOString(),
      pickup_address: pickupAddress, dropoff_address: dropoffAddress,
      pickup_lat: pickupPos[0], pickup_lng: pickupPos[1],
      dropoff_lat: dropoffPos[0], dropoff_lng: dropoffPos[1],
      distance, fare, status: 'pending'
    }]);
    alert('Booking Submitted!');
  };

  return (
    <div className="max-w-2xl mx-auto p-4 bg-white shadow rounded mt-6">
      <h2 className="text-2xl font-bold mb-4 text-center">Book Your Pet Transport</h2>
      {error && <div className="bg-red-100 text-red-700 p-2 mb-4 rounded">{error}</div>}
      <form onSubmit={handleSubmit} className="space-y-6">
        {step === 1 && (
          <div>
            <button type="button" onClick={() => setPickerOpen('pickup')} className="btn-brand w-full mb-3">
              Select Pickup Location
            </button>
            <div className="text-sm mb-2">{pickupAddress}</div>
            <button type="button" onClick={() => setPickerOpen('dropoff')} className="btn-brand w-full">
              Select Drop-off Location
            </button>
            <div className="text-sm">{dropoffAddress}</div>
          </div>
        )}
        {step === 2 && (
          <div className="grid grid-cols-1 gap-4">
            <select value={petSize} onChange={e => setPetSize(e.target.value)} className="border p-2 rounded">
              <option>Small</option><option>Medium</option><option>Large</option>
            </select>
            <select value={petCount} onChange={e => setPetCount(+e.target.value)} className="border p-2 rounded">
              {Array.from({ length: getMaxPets(petSize, vehicleType) }, (_, i) => i + 1).map(n => <option key={n}>{n}</option>)}
            </select>
            <select value={vehicleType} onChange={e => setVehicleType(e.target.value)} className="border p-2 rounded">
              <option>Motorcycle</option><option>Car</option>
            </select>
            <div className="flex justify-between bg-gray-100 p-2 rounded">
              <span>Distance: {distance} km</span><span>Fare: ₱{fare}</span>
            </div>
          </div>
        )}
        {step === 3 && (
          <div className="grid grid-cols-1 gap-4">
            <input placeholder="Pickup Name" value={pickupName} onChange={e => setPickupName(e.target.value)} className="border p-2 rounded" />
            <input placeholder="Pickup Contact" value={pickupContact} onChange={e => setPickupContact(e.target.value)} className="border p-2 rounded" />
            <input placeholder="Drop-off Name" value={dropoffName} onChange={e => setDropoffName(e.target.value)} className="border p-2 rounded" />
            <input placeholder="Drop-off Contact" value={dropoffContact} onChange={e => setDropoffContact(e.target.value)} className="border p-2 rounded" />
            <DatePicker selected={transportDate} onChange={setTransportDate} showTimeSelect dateFormat="Pp" className="border p-2 rounded w-full" />
          </div>
        )}
        <div className="flex justify-between">
          {step > 1 && <button type="button" onClick={back} className="btn-brand">Back</button>}
          {step < 3 ? <button type="button" onClick={next} className="btn-brand">Next</button> : <button type="submit" className="btn-brand">Submit</button>}
        </div>
      </form>
      <Modal isOpen={!!pickerOpen} onRequestClose={() => setPickerOpen(null)} style={{ content: { height: '80vh' } }}>
        {/* <MapSelector initialAddress={pickerOpen === 'pickup' ? pickupAddress : dropoffAddress} initialCenter={pickerOpen === 'pickup' ? pickupPos : dropoffPos} onSelect={handleSelect} /> */}
      </Modal>
    </div>
  );
}
