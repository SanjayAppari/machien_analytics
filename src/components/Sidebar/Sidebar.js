import React, { useEffect, useState } from 'react';
import '../Sidebar/Sidebar.css';
import machineLogo from '../../assets/machine-logo.png';

function Sidebar({tab,setTab,image, id, flag}) {
    const host = "http://192.168.101.65:1708";

    const style = {
        backgroundColor: 'rgb(255, 184, 5)',
        color: 'white',
    }
    const [machine, setMachine] = useState({});

    const getMachine = async () => {
        const response = await fetch(`${host}/api/machine/getMachineDetails`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id })
        });
        const json = await response.json();
        setMachine(json);
    }

    useEffect(()=>{
        getMachine();
    }, [flag]);

  return (
    <div className="sidebar">
      <div className="sidebar-img">
        <div className="sidebar-imagecard">
            <img src={machine.image || image || machineLogo} alt="" />
        </div>
      </div>
      <div className="tabs-wrapper">
        <div className="sidebar-tab" onClick={()=>setTab("Machine")} style={{backgroundColor: tab=="Machine" && 'rgb(255, 184, 5)', color: tab=="Machine" && 'white'}}>
            <div className="sidebar-tab-icon">
                <i class="fa-solid fa-gear"></i>
            </div>
            <div className="sidebar-tab-title">
                Machine Setup
            </div>
        </div>
        <div className="sidebar-tab" onClick={()=>setTab("Overview")} style={{backgroundColor: tab=="Overview" && 'rgb(255, 184, 5)', color: tab=="Overview" && 'white'}}>
            <div className="sidebar-tab-icon">
                <i class="fa-sharp fa-solid fa-eye"></i>
            </div>
            <div className="sidebar-tab-title">
                Overview
            </div>
        </div>
        <div className="sidebar-tab" onClick={()=>setTab("Daily")} style={{backgroundColor: tab=="Daily" && 'rgb(255, 184, 5)', color: tab=="Daily" && 'white'}}>
            <div className="sidebar-tab-icon">
                <i class="fa-solid fa-chart-simple"></i>
            </div>
            <div className="sidebar-tab-title">
                Daily Analysis
            </div>
        </div>
        <div className="sidebar-tab" onClick={()=>setTab("Monthly")} style={{backgroundColor: tab=="Monthly" && 'rgb(255, 184, 5)', color: tab=="Monthly" && 'white'}}>
            <div className="sidebar-tab-icon">
                <i class="fa-solid fa-chart-simple"></i>
            </div>
            <div className="sidebar-tab-title">
                Monthly Analysis
            </div>
        </div>
        <div className="sidebar-tab" onClick={()=>setTab("Worklog")} style={{backgroundColor: tab=="Worklog" && 'rgb(255, 184, 5)', color: tab=="Worklog" && 'white'}}>
            <div className="sidebar-tab-icon">
                <i class="fa-solid fa-square-check"></i>
            </div>
            <div className="sidebar-tab-title">
                Add Worklog
            </div>
        </div>
      </div>
    </div>
  )
}

export default Sidebar
