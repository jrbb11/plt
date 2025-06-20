// src/components/PetChatWidget.jsx
import React, { useState } from 'react';
import Modal from 'react-modal';
import MapSelector from './MapSelector';
import { getGPTResponse } from '../utils/gpt';

export default function PetChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const [showMap, setShowMap] = useState(false);
  const [mapMode, setMapMode] = useState(null);
  const [pickupAddress, setPickupAddress] = useState('');
  const [dropoffAddress, setDropoffAddress] = useState('');

  const handleSend = async () => {
    if (!input.trim()) return;
    const userMessage = { role: 'user', content: input };
    setMessages([...messages, userMessage]);
    setInput('');
    setLoading(true);

    let gptReply = await getGPTResponse(input);

    setMessages(prev => [...prev, { role: 'assistant', content: gptReply }]);
    setLoading(false);

    if (
      gptReply.toLowerCase().includes('select') &&
      (gptReply.toLowerCase().includes('pickup') || gptReply.toLowerCase().includes('drop-off'))
    ) {
      setMessages(prev => [
        ...prev,
        {
          role: 'assistant',
          content: 'Click below to select pickup and drop-off locations 🗺️',
          type: 'map_request'
        }
      ]);
    }
  };

  const handleMapSelect = (address) => {
    if (mapMode === 'pickup') {
      setPickupAddress(address);
      setMessages(prev => [...prev, { role: 'user', content: `📍 Pickup: ${address}` }]);
    } else {
      setDropoffAddress(address);
      setMessages(prev => [...prev, { role: 'user', content: `📍 Drop-off: ${address}` }]);
    }
    setShowMap(false);
    setMapMode(null);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {open ? (
        <div className="w-80 bg-white border rounded-xl shadow-lg overflow-hidden flex flex-col">
          <div className="bg-[#17C0EB] text-white px-4 py-2 flex justify-between items-center">
            <span>💬 Pet.Love.AI</span>
            <button onClick={() => setOpen(false)}>✖</button>
          </div>
          <div className="p-3 flex-1 overflow-y-auto h-64 space-y-2">
            {messages.map((msg, idx) => (
              <div key={idx} className={`text-sm ${msg.role === 'user' ? 'text-right' : 'text-left'}`}>
                <div className={`inline-block p-2 rounded-lg ${msg.role === 'user' ? 'bg-blue-100' : 'bg-gray-200'}`}>
                  {msg.content}
                </div>
                {msg.type === 'map_request' && (
                  <div className="flex gap-2 mt-2">
                    <button
                      onClick={() => {
                        setMapMode('pickup');
                        setShowMap(true);
                      }}
                      className="btn-brand text-xs"
                    >
                      Select Pickup
                    </button>
                    <button
                      onClick={() => {
                        setMapMode('dropoff');
                        setShowMap(true);
                      }}
                      className="btn-brand text-xs"
                    >
                      Select Drop-off
                    </button>
                  </div>
                )}
              </div>
            ))}
            {loading && <div className="text-gray-400 text-sm">Typing...</div>}
          </div>
          <div className="p-2 flex gap-2 border-t">
            <input
              className="flex-1 border rounded px-2 py-1 text-sm"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleSend()}
              placeholder="Ask us anything..."
            />
            <button onClick={handleSend} className="btn-brand text-sm px-3">Send</button>
            <button
              onClick={() => setShowMap(true)}
              className="btn-brand text-sm px-3"
              title="Open map to select pickup or drop-off"
              type="button"
            >
              🗺️
            </button>
          </div>
        </div>
      ) : (
        <button onClick={() => setOpen(true)} className="btn-brand px-4 py-2 rounded-full shadow-lg">
          💬 Chat
        </button>
      )}

      <Modal isOpen={showMap} onRequestClose={() => setShowMap(false)}>
        {!mapMode ? (
          <div className="flex flex-col items-center gap-4 p-4">
            <span className="font-semibold">Select location type:</span>
            <div className="flex gap-4">
              <button
                onClick={() => setMapMode('pickup')}
                className="btn-brand px-4 py-2"
              >
                Select Pickup
              </button>
              <button
                onClick={() => setMapMode('dropoff')}
                className="btn-brand px-4 py-2"
              >
                Select Drop-off
              </button>
            </div>
          </div>
        ) : (
          <MapSelector
            onSelect={(address) => {
              handleMapSelect(address);
              setMapMode(null);
            }}
            role={mapMode}
          />
        )}
      </Modal>
    </div>
  );
} 
