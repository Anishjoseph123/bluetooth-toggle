import { useState } from "react";

export default function BluetoothToggle() {
  const [connected, setConnected] = useState(false);
  const [device, setDevice] = useState(null);

  const handleToggle = async () => {
    if (!connected) {
      try {
        const selectedDevice = await navigator.bluetooth.requestDevice({
          acceptAllDevices: true,
        });

        setDevice(selectedDevice);
        setConnected(true);
        console.log("Connected to:", selectedDevice.name);
      } catch (error) {
        console.error("Connection failed:", error);
      }
    } else {
      // Disconnect (only logical, browser doesn't fully control Bluetooth)
      setConnected(false);
      setDevice(null);
      console.log("Disconnected");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <button
        onClick={handleToggle}
        className={`px-6 py-3 rounded-xl text-white font-semibold transition ${
          connected ? "bg-red-500" : "bg-green-500"
        }`}
      >
        {connected ? "Turn Bluetooth OFF" : "Turn Bluetooth ON"}
      </button>

      {device && (
        <p className="mt-4 text-gray-700">
          Connected to: {device.name || "Unknown Device"}
        </p>
      )}
    </div>
  );
}
