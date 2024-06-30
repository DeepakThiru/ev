import React, { useState, useEffect } from 'react';
import { ReactComponent as CarSvg } from '../car20_112837.svg';
// import { ReactComponent as BatterySvg } from '../-battery-charging_86898.svg';
import {ReactComponent as BatterySvg } from '../aa-battery_55330.svg';
import { ReactComponent as ChargerSvg } from '../charging_station_129004.svg';

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
          {value}
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
        <div className="row bg-white p-2 m-0 mb-3 rounded-4">
          <div className="col">
            <p>Remaining range: {fullRange.toFixed(1)} kms.</p>
            <p>You can travel {safeRange.toFixed(1)} kms before your SoC reaches {safeSoc}%.</p>
          </div>
        </div>
        <div className="row bg-secondary px-2 py-3 m-0 mb-3 rounded-4">
          <div className="col-auto">
            <CarSvg height="50" fill='white'/>
          </div>
          <div className="col">
            <select id="selectCapacity" value={selectedCapacity} onChange={handleCapacityChange} className='form-control rounded-1'>
              <option value="50.3">MG ZS - 50.3 kWh</option>
              <option value="30.2">Tata Nexon - 30.2 kWh</option>
              <option value="26">Tata Tigor - 26 kWh</option>
              <option value="39.2">Hyundai Kona - 39.2 kWh</option>
            </select>
          </div>
        </div>
        <div className="row bg-secondary px-2 py-3 m-0 rounded-4">
          <div className="col-6">
            <ChargerSvg height="50"/>
          </div>
          <div className="col-6">
            <BatterySvg height="50"/>
          </div>
          <div className='w-100'></div>
          <div className="col-6">
            <div className='input-group'>
              <select id="selectUsage" value={selectedUsage} onChange={handleUsageChange} className='form-control rounded-1'>
                {usageOptions}
              </select>
              <div className='input-group-append'>
                <span className='input-group-text'>km/kWh</span>
              </div>
            </div>
          </div>
          <div className="col-6">
          <div className='input-group'>
              <input id="soc" type="number" value={soc} onChange={handleSocChange} placeholder="Enter SoC percentage" className='form-control rounded-1'>
              </input>
              <div className="input-group-append">
                <span className="input-group-text" id="basic-addon2">%</span>
              </div>
            </div>
            {/* <div className='input-group'>
              <div className='input-group-prepend'>
                <span className='input-group-text'>&#128267;</span>
              </div>
              <input id="soc" type="number" value={soc} onChange={handleSocChange} placeholder="Enter SoC percentage" className='form-control rounded-1'>
              </input>
              <div className="input-group-append">
                <span className="input-group-text" id="basic-addon2">%</span>
              </div>
            </div> */}
          </div>
        </div>
      </div>
    );
  }
  
export default TrueRange;