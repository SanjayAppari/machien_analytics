import React, { useEffect, useState } from 'react'
import '../DailyAnalysis/DailyAnalysis.css'
import SingleDataChart from '../Charts/SingleDataChart'
import PieChartComponent from '../Charts/PieChart';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function DailyAnalysis({ id }) {

    const host = "http://192.168.101.65:1708";
    const [date, setDate] = useState("");
    const [workLog, setWorkLog] = useState({})

    const labels = ['operatingTime', 'breakDownTime','shutDownTime'];
    const [data, setData] = useState([6,0,1])

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



    const getWorkLog = async () => {
        try {
            const response = await fetch(`${host}/api/work/getWorkLogByDate`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    date: date,
                    machine_id: id
                })
            });

            const json = await response.json();
            if(!json) toast("No workLog found")
            json['totalTime'] = calculateTotalTime(json.start_time, json.end_time).toFixed(1);
            json['utilization'] = Math.floor((json.operating_time / json.totalTime) * 100);
            json['ore'] = json.totalTime * json.utilization;
            json.ore /= 10;
            json['productivityRate'] = (json.products_count - json.scrap_count) / json.products_count
            json.productivityRate *= 100;
            json.productivityRate = json.productivityRate.toFixed(2)

            const [hours, minutes] = json.end_time.split(':');
            let hh = parseInt(hours, 10);
            let meridiem = 'AM';

            // Determine meridiem (AM/PM) and convert hours to 12-hour format
            if (hh >= 12) {
                meridiem = 'PM';
                hh = hh === 12 ? 12 : hh - 12;
            } else if (hh === 0) {
                hh = 12;
            }

            // Format hours and minutes
            const formattedTime = `${hh}:${minutes}`;
            json.end_time = formattedTime;

            setData([json.operating_time, json.break_down_time, json.shut_down_time]);

            setWorkLog(json);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getWorkLog();
    }, [date]);

    return (
        <div className="daily_analysis">
            <div className="daily_analysis_1">
                <span>Day Wise Analysis</span>
                <div className="daily_date">
                    <input type="date" value={date} onChange={(e) => setDate(e.target.value)} class="form-control" />
                </div>
                {/* <button className="myBtn">Edit Work Log</button> */}
            </div>
            <div className="daily_analysis_2">
                <div className="daily_left">
                    <div className="daily_left_top">
                        <div className="daily_card">
                            <div className="daily_card_top">
                                <div className="daily_card_top_1" style={{ color: 'green' }}>
                                    <i class="fa-solid fa-clock"></i>
                                </div>
                                <div className="daily_card_top_2">
                                    {workLog.start_time}
                                    <span style={{ fontSize: '10px', marginTop: '11px', marginLeft: '2px' }}>Am</span>
                                </div>
                            </div>
                            <div className="daily_card_bottom">
                                Start Time
                            </div>
                        </div>
                        <div className="daily_card">
                            <div className="daily_card_top">
                                <div className="daily_card_top_1" style={{ color: '#4f05ff' }}>
                                    <i class="fa-regular fa-clock"></i>
                                </div>
                                <div className="daily_card_top_2">
                                    {workLog.end_time}
                                    <span style={{ fontSize: '10px', marginTop: '11px', marginLeft: '2px' }}>Pm</span>
                                </div>
                            </div>
                            <div className="daily_card_bottom">
                                End Time
                            </div>
                        </div>
                        <div className="daily_card">
                            <div className="daily_card_top">
                                <div className="daily_card_top_1" style={{ color: 'rgb(255, 184, 5)' }}>
                                    <i class="fa-solid fa-person-running"></i>
                                </div>
                                <div className="daily_card_top_2">
                                    {workLog.operating_time}
                                    <span style={{ fontSize: '10px', marginTop: '11px', marginLeft: '2px' }}>Hours</span>
                                </div>
                            </div>
                            <div className="daily_card_bottom">
                                Operating Time
                            </div>
                        </div>
                        <div className="daily_card">
                            <div className="daily_card_top">
                                <div className="daily_card_top_1" style={{ color: 'red' }}>
                                    <i class="fa-solid fa-bolt"></i>
                                </div>
                                <div className="daily_card_top_2">
                                    {workLog.ore}%
                                </div>
                            </div>
                            <div className="daily_card_bottom">
                                Effectiveness
                            </div>
                        </div>
                        <div className="daily_card">
                            <div className="daily_card_top">
                                <div className="daily_card_top_1" style={{ color: 'blue' }}>
                                    <i class="fa-solid fa-clock-rotate-left"></i>
                                </div>
                                <div className="daily_card_top_2">
                                    {workLog.utilization}%
                                </div>
                            </div>
                            <div className="daily_card_bottom">
                                Utilization
                            </div>
                        </div>
                    </div>
                    <div className="daily_left_bottom">
                        <div className="daily_graph_container">
                            <div class="accordion" id="accordionExample">
                                <div class="accordion-item">
                                    <h2 class="accordion-header" id="headingOne">
                                        <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                            Down Time Reasons
                                        </button>
                                    </h2>
                                    <div id="collapseOne" class="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                                        <div class="accordion-body">
                                            {workLog.down_time_reasons}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="daily_chart">
                                <PieChartComponent labels={labels} data={data} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="daily_right">
                    <div className="daily_card">
                        <div className="daily_card_top">
                            <div className="daily_card_top_1" style={{ color: 'green' }}>
                                <i class="fa-solid fa-p"></i>
                            </div>
                            <div className="daily_card_top_2">
                                {workLog.productivityRate}%
                            </div>
                        </div>
                        <div className="daily_card_bottom">
                            Productivity
                        </div>
                    </div>
                    <div className="daily_card">
                        <div className="daily_card_top">
                            <div className="daily_card_top_1" style={{ color: 'orange' }}>
                                <i class="fa-solid fa-hourglass-start"></i>
                            </div>
                            <div className="daily_card_top_2">
                                {workLog.break_down_time}
                                <span style={{ fontSize: '10px', marginTop: '11px', marginLeft: '2px' }}>Hours</span>
                            </div>
                        </div>
                        <div className="daily_card_bottom">
                            Break Down Time
                        </div>
                    </div>
                    <div className="daily_card">
                        <div className="daily_card_top">
                            <div className="daily_card_top_1" style={{ color: '#4f05ff' }}>
                                <i class="fa-solid fa-stopwatch"></i>
                            </div>
                            <div className="daily_card_top_2">
                                {workLog.totalTime}
                                <span style={{ fontSize: '10px', marginTop: '11px', marginLeft: '2px' }}>Hours</span>
                            </div>
                        </div>
                        <div className="daily_card_bottom">
                            Total Time
                        </div>
                    </div>
                    <div className="daily_card">
                        <div className="daily_card_top">
                            <div className="daily_card_top_1" style={{ color: 'red' }}>
                                <i class="fa-solid fa-hourglass-start"></i>
                            </div>
                            <div className="daily_card_top_2">
                                {workLog.products_count}
                            </div>
                        </div>
                        <div className="daily_card_bottom">
                            Output Products
                        </div>
                    </div>
                    <div className="daily_card">
                        <div className="daily_card_top">
                            <div className="daily_card_top_1" style={{ color: 'blue' }}>
                                <i class="fa-solid fa-p"></i>
                            </div>
                            <div className="daily_card_top_2">
                                {workLog.scrap_count}
                            </div>
                        </div>
                        <div className="daily_card_bottom">
                            Scrap Products
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer style={{ marginTop:'50px'}} />
        </div>
    )
}

export default DailyAnalysis
