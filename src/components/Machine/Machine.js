import React, { useEffect, useState } from 'react'
import MainNavbar from '../MainNavbar/MainNavbar'
import Sidebar from '../Sidebar/Sidebar'
import '../Machine/Machine.css'
import Overview from '../Overview/Overview'
import DailyAnalysis from '../DailyAnalysis/DailyAnalysis'
import MonthlyAnalysis from '../MonthlyAnalysis/MonthlyAnalysis'
import { useParams } from 'react-router-dom'
import WorkLog from '../WorkLog/WorkLog'
import MachineSetup from '../MachineSetUp/MachineSetup'

function Machine() {

  const [flag,setFlag] = useState(false);
  const host = "http://192.168.101.65:1708";

  const [tab,setTab] = useState("Overview");
  const {id} = useParams();
  const [machine,setMachine] = useState({})

  const getMachine = async () => {
    const response = await fetch(`${host}/api/machine/getMachineDetails`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({id})
    });
    const json = await response.json();
    setMachine(json);
    localStorage.setItem('machineId',json.id);
  }

  useEffect(()=>{
    getMachine();
  }, []);

  return (
    <>
      <MainNavbar/>
      <div className="main-dashboard">
        <Sidebar image={machine.image} id={machine.id} flag={flag} tab={tab} setTab={setTab}/>
        <div className="dashboard_wrapper">
          { tab=="Machine" && <MachineSetup setFlag={setFlag}  id={machine.id} /> }
          { tab=="Overview" && <Overview name={machine.name} id={machine.id} />}
          { tab=="Daily" && <DailyAnalysis id={machine.id}/>}
          { tab=="Monthly" && <MonthlyAnalysis id={machine.id}/>}
          { tab=="Worklog" && <WorkLog name={machine.name} id={machine.id} /> }
        </div>
      </div>
    </>
  )
}

export default Machine
