import React, { useEffect, useState } from 'react'
import '../Overview/Overview.css'
import SingleDataChart from '../Charts/SingleDataChart';
import MultiDataChart from '../Charts/MultiDataChart';
import SemiCircleProgressBar from "react-progressbar-semicircle";
import Blink from 'react-blink-text';
import { Link } from 'react-router-dom';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import ReactTooltip from 'react-tooltip';
import { Line, Circle } from 'rc-progress';
import DownTime from '../DownTime/DownTime';

function Overview({id, name}) {
  const host = "http://192.168.101.65:1708";



  const [workLogs,setWorkLogs] = useState([
    {
      "date": "2024-03-10",
      "start_time": "8:30",
      "end_time": "18:00",
      "operating_time": 1,
      "break_down_time": 10,
      "shut_down_time": 1,
      "products_count": 500,
      "scrap_count": 10,
      "down_time_reasons": null,
    },
    {
      "date": "2024-03-11",
      "start_time": "8:30",
      "end_time": "18:00",
      "operating_time": 6,
      "break_down_time": 2,
      "shut_down_time": 2,
      "products_count": 300,
      "scrap_count": 1,
      "down_time_reasons": null,
    },{
      "date": "2024-03-12",
      "start_time": "8:30",
      "end_time": "18:00",
      "operating_time": 2,
      "break_down_time": 2,
      "shut_down_time": 3,
      "products_count": 80,
      "scrap_count": 10,
      "down_time_reasons": null,
    },{
      "date": "2024-03-13",
      "start_time": "8:30",
      "end_time": "15:00",
      "operating_time": 5,
      "break_down_time": 10,
      "shut_down_time": 0,
      "products_count": 80,
      "scrap_count": 5,
      "down_time_reasons": null,
    },    
  ]);

  const [healthScore,setHealthScore] = useState(0);
  const healthScoreFormula = "Health Score: OperatingTime(30%) + Productivity(25%) + Utilization(20%) + OEE(15%) + DownTime(10%) "
  const [downTimeToggle, setDownTimeToggle] = useState(false);
  const [downTimeArray,setDownTimeArray] = useState([])

  const styles = {
    overview: {
      backgroundColor: 'rgb(255, 97, 5)',
    },
    health_score: {
      height: '200px',
      width: '200px'
    }
  }


  const [machine,setMachine] = useState({})
  const [overView,setOverView] = useState({
    startDate: "",
    endDate: "",
    ore: 0,
    utilization: 0,
    availability: 0,
    operatingTime: 0,
    productionRate: 0,
    downTime: 0,
    totalDays: 0,
    downTimeDays: 0,
  })


  const handleChange = (e) => {
    setOverView({...overView,[e.target.name]: e.target.value})    
  }

  const calculateTotalTime = (startTime, endTime) => {
    // Parse start and end times into Date objects
    let startDate = new Date();
    let [startHours, startMinutes] = startTime.split(':').map(Number);
    startDate.setHours(startHours);
    startDate.setMinutes(startMinutes);
    startDate.setSeconds(0); // Ensure seconds are set to zero for accurate calculation

    let endDate = new Date();
    let [endHours, endMinutes] = endTime.split(':').map(Number);
    endDate.setHours(endHours);
    endDate.setMinutes(endMinutes);
    endDate.setSeconds(0); // Ensure seconds are set to zero for accurate calculation

    // Calculate the difference in milliseconds
    let differenceInMilliseconds = endDate.getTime() - startDate.getTime();

    // Convert milliseconds to hours
    let differenceInHours = differenceInMilliseconds / (1000 * 60 * 60);
    return differenceInHours;
  }

  const calculateValue = () =>{
    const startDate = new Date(overView.startDate);
    const endDate = new Date(overView.endDate);
    let ore = 0;
    let operatingTime = 0;
    let totalTime = 0;
    let availability = 0;
    let utilization = 0;
    let totalProducts = 0;
    let totalScrap = 0;
    let productivityRate = 0;
    let downTime = 0;
    let healthScore = 0;
    let downTimeDays = 0;
    let totalDays = 0;
    setDownTimeArray([])
    for (let currentDate = new Date(startDate); currentDate <= endDate; currentDate.setDate(currentDate.getDate() + 1)) {
      // Check if the current date is in the date array
      for(let item of workLogs){
        const date = new Date(item.date);
        if(date.getTime() === currentDate.getTime()){
           setDownTimeArray(old => [
            ...old,
            {
               date: item.date,
               downTime: item.break_down_time,
               reason: item.down_time_reasons
            }
           ])
           
           operatingTime += item.operating_time;
           totalTime += calculateTotalTime(item.start_time, item.end_time);
           totalProducts += item.products_count;
           totalScrap += item.scrap_count;
           downTime += item.break_down_time + item.shut_down_time;
           if(item.break_down_time!=0) downTimeDays++;
           totalDays++;
        }
      }
    }
    if(operatingTime !== 0){
      availability = Math.floor((operatingTime/totalTime)*100)
      utilization = Math.floor((operatingTime/availability)*100);
      ore = availability*utilization;
      ore/=100;
      productivityRate = (totalProducts - totalScrap)/totalProducts
      productivityRate*=100;
      downTime = Math.floor((downTime/totalTime)*100);
      healthScore = ((availability*35)/100) + ((productivityRate*25)/100) + ((utilization*20)/100) + ((ore*15)/100) + ((downTime*10)/100);
      setHealthScore(healthScore.toFixed(2))
    }
    setOverView({...overView,ore, downTime, totalDays, downTimeDays, "operatingTime": operatingTime, "availability": availability, "utilization": utilization, "productionRate": productivityRate  });
  }

  const getMachine = async () => {
    const mId = localStorage.getItem('machineId');
    const response = await fetch(`${host}/api/machine/getMachineDetails`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({id: mId}),
    });
    const json = await response.json();
    setMachine(json);
  }


  const getWorkLogs = async () => {
    const response = await fetch(`${host}/api/work/getWorkLogs`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ machine_id: localStorage.getItem('machineId') || id })
    });
    const json = await response.json();
    setWorkLogs(json);
  }

  useEffect(()=>{
    getMachine();
    getWorkLogs();
  }, []);

  useEffect(()=>{
    calculateValue();
  },[overView.startDate, overView.endDate])

  return (
    <div className="main_overview">
      <div className="overview_heading">
        <span >Overview of {name} From </span>
        <div className="overview_date">
          <input type="date" name="startDate" value={overView.startDate} onChange={handleChange} class="form-control" />
        </div>
        <span>To</span>
        <div className="overview_date">
          <input type="date" name="endDate" value={overView.endDate} onChange={handleChange} class="form-control" />
        </div>
      </div>
      <div className="overview">
        <div className="overview_1">
          {
            downTimeToggle ? <DownTime downTimeArray={downTimeArray} /> : (
              <>
                <div className="overview_1_1">
                  <div className="overview_card">
                    <div className="overview_card_1">
                      <div className="overview_card_img" style={styles.overview}>
                        <i class="fa-solid fa-bolt"></i>
                      </div>
                      <span>{overView.ore}%</span>
                    </div>
                    <div className="overview_card_2">
                      <span>Overall Effectiveness</span>
                    </div>
                  </div>
                  <div className="overview_card">
                    <div className="overview_card_1">
                      <div className="overview_card_img">
                        <i class="fa-solid fa-clock-rotate-left"></i>
                      </div>
                      <span>{overView.utilization}%</span>
                    </div>
                    <div className="overview_card_2">
                      <span>Utilization</span>
                    </div>
                  </div>
                  <div className="overview_card">
                    <div className="overview_card_1">
                      <div className="overview_card_img" style={styles.overview}>
                        <i class="fa-solid fa-person-running"></i>
                      </div>
                      <span>{overView.operatingTime} Hours</span>
                    </div>
                    <div className="overview_card_2">
                      <span>Operating Time</span>
                    </div>
                  </div>
                  <div className="overview_card">
                    <div className="overview_card_1">
                      <div className="overview_card_img">
                        <i class="fa-solid fa-p"></i>
                      </div>
                      <span>{Math.floor(overView.productionRate)}%</span>
                    </div>
                    <div className="overview_card_2">
                      <span>Production Rate</span>
                    </div>
                  </div>
                </div>
                <div className="overview_1_2">

                  <MultiDataChart workLogs={workLogs} startDate={overView.startDate} endDate={overView.endDate} />
                  <SingleDataChart type="line" workLogs={workLogs} startDate={overView.startDate} endDate={overView.endDate} title="Utilization Chart" />
                  <SingleDataChart type="bar" workLogs={workLogs} startDate={overView.startDate} endDate={overView.endDate} title="Production Chart" />
                </div>
              </>
            )
          }
        </div>
        <div className="overview_2">
          <div className="overview_2_1">
            <div className="break_down_1">
              {
                overView.downTimeDays > (overView.totalDays/2) && <Blink color='red' fontSize='20' fontWeight='bold' text='Machine at RISK' >Machine Status</Blink>
              }
              {
                (overView.downTimeDays===0 || overView.downTimeDays < (overView.totalDays/2)) && <Blink color='green' fontSize='20' fontWeight='bold' text='Machine at Safe' >Machine Status</Blink>
              }
              {
                overView.downTimeDays!==0 && overView.downTimeDays === (overView.totalDays/2) && <Blink color='orange' fontSize='20' fontWeight='bold' text='Machine Need Service' >Machine Status</Blink>
              }
            </div>
            <div className="break_down_2">
            {
                overView.downTimeDays > (overView.totalDays/2) && <SemiCircleProgressBar stroke="red" percentage={(overView.downTimeDays/overView.totalDays)*100} diameter={180} />
              }
              {
                (overView.downTimeDays===0 || overView.downTimeDays < (overView.totalDays/2)) && <SemiCircleProgressBar stroke="green" percentage={(overView.downTimeDays/overView.totalDays)*100} diameter={180} />
              }
              {
                overView.downTimeDays!==0 && overView.downTimeDays === (overView.totalDays/2) && <SemiCircleProgressBar stroke="orange" percentage={(overView.downTimeDays/overView.totalDays)*100} diameter={180} />
              }
              <span className="break_down_count">Days: {overView.downTimeDays}/{overView.totalDays}</span>
            </div>
            <div className="break_down_3">
              <span>Break Down Time Analysis</span>
              <Link onClick={()=>setDownTimeToggle(!downTimeToggle)} >Click Here</Link>
            </div>
          </div>
          <div className="overview_2_2">
            <div className="health_score_1">
              <span data-tip={healthScoreFormula}>Health Score <i class="fa-solid fa-heart-pulse"></i>
              </span>
            </div>
            <div className="health_score_2">
              <CircularProgressbar styles={{
                root: {},
                path: {
                  stroke: `#ffb805`,
                  transition: 'stroke-dashoffset 1.5s ease 0s',
                  transform: 'rotate(0.75turn)',
                  transformOrigin: 'center center',
                },
                text: {
                  fill: '#f88',
                  fontSize: '16px',
                  fontWeight: 'bold'
                },
              }} value={healthScore} text={`${healthScore}%`} />
            </div>
            <div className="health_score_3">
              <div className="score_3_1">
                <div className="score_3_1_2 score_3_1_1">
                  <span>Operating Time</span>
                </div>
                <div className="score_3_1_2">
                  <Line percent={overView.operatingTime} strokeWidth={4} strokeColor="rgb(140, 0, 255)" />
                </div>
              </div>
              <div className="score_3_1">
                <div className="score_3_1_2 score_3_1_1">
                  <span>Productivity</span>
                </div>
                <div className="score_3_1_2">
                  <Line percent={overView.productionRate} strokeWidth={4} strokeColor="#ffb805" />
                </div>
              </div>
              <div className="score_3_1">
                <div className="score_3_1_2 score_3_1_1">
                  <span>Utilization</span>
                </div>
                <div className="score_3_1_2">
                  <Line percent={overView.utilization} strokeWidth={4} strokeColor="green" />
                </div>
              </div>
              <div className="score_3_1">
                <div className="score_3_1_2 score_3_1_1">
                  <span>OEE</span>
                </div>
                <div className="score_3_1_2">
                  <Line percent={overView.ore} strokeWidth={4} strokeColor="blue" />
                </div>
              </div>
              <div className="score_3_1">
                <div className="score_3_1_2 score_3_1_1">
                  <span>Down Time</span>
                </div>
                <div className="score_3_1_2">
                  <Line percent={overView.downTime} strokeWidth={4} strokeColor="red" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ReactTooltip />
    </div>
  )
}

export default Overview
