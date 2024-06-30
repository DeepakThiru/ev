import React, { useState, useEffect } from 'react';

function TrueRange() {
    const [selectedCapacity, setSelectedCapacity] = useState(50.3);
    const [selectedUsage, setSelectedUsage] = useState(6.0);
    const [soc, setSoc] = useState(60);
    const [fullRange, setFullRange] = useState(0);
    const [safeRange, setSafeRange] = useState(0);
    const [safeSoc, setSafeSoc] = useState(30);
  
    useEffect(() => {
      const newFullRange = calculateFullRange(selectedCapacity, selectedUsage, soc);
      setFullRange(newFullRange);
  
      const newSafeRange = calculateSafeRange(selectedCapacity, selectedUsage, soc);
      setSafeRange(newSafeRange);
    }, [selectedCapacity, selectedUsage, soc]);
  
    const usageOptions = [];
    for (let i=40; i<=85; i++) {
      const value = Number((i / 10).toFixed(1));
      usageOptions.push(
        <option key={value} value={value}>
          {value} km/kWh
        </option>
      );
    }
  
    const handleCapacityChange = (e) => {
      setSelectedCapacity(e.target.value);
    };
  
    const handleUsageChange = (e) => {
      setSelectedUsage(e.target.value);
    }
  
    const handleSocChange = (e) => {
      setSoc(e.target.value);
    }
    
    function calculateFullRange() {
      // console.log("selectedCapacity: ", selectedCapacity);
      // console.log("selectedUsage", selectedUsage);
      return (selectedCapacity * (soc/100)) * selectedUsage;
    }
    
    function calculateSafeRange() {
      let remainingSafeSoc = 0;
      if (soc > 30) {
        setSafeSoc(30);
        remainingSafeSoc = soc - 30;
      } else if (soc > 20) {
        setSafeSoc(20);
        remainingSafeSoc = soc - 20;
      } else if (soc > 10) {
        setSafeSoc(10);
        remainingSafeSoc = soc - 10;
      } else if (soc > 5) {
        setSafeSoc(5);
        remainingSafeSoc = soc - 5;
      }
      
      return (selectedCapacity * (remainingSafeSoc/100)) * selectedUsage;
    }
  
    return (
      <div className="container min-vh-100 p-3 bg-light">
        <div className="row">
          <div className="col">
            Remaining range: {fullRange.toFixed(1)} kms.
          </div>
        </div>
        <div className="row">
          <div className="col">
            You can travel {safeRange.toFixed(1)} kms before your SoC reaches {safeSoc}%.
          </div>
        </div>
        <div className="row">
          <div className="col">
            <label htmlFor="selectCapacity">EV's capacity:</label>
          </div>
          <div className="col">
            <select id="selectCapacity" value={selectedCapacity} onChange={handleCapacityChange}>
              <option value="50.3">MG ZS - 50.3 kWh</option>
              <option value="30.2">Tata Nexon - 30.2 kWh</option>
              <option value="26">Tata Tigor - 26 kWh</option>
              <option value="39.2">Hyundai Kona - 39.2 kWh</option>
            </select>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <label htmlFor="selectUsage">Current Usage:</label>
          </div>
          <div className="col">
          <select id="selectUsage" value={selectedUsage} onChange={handleUsageChange}>
              {usageOptions}
            </select>
          </div>
          <div className="col">
            <label htmlFor="soc">SoC (%):</label>
          </div>
          <div className="col">
            <input id="soc" type="number" value={soc} onChange={handleSocChange} placeholder="Enter SoC percentage"></input>
          </div>
        </div>
      </div>
    );
  }
  
export default TrueRange;