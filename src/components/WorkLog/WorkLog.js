import React, { useEffect, useState } from 'react'
import '../WorkLog/WorkLog.css'
import Blink from 'react-blink-text';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function WorkLog(props) {

    const host = "http://192.168.101.65:1708";

    const [workLog,setWorkLog] = useState({
        "start_time":"",
        "end_time":"",
        "operating_time": 0,
        "break_down_time":0,
        "shut_down_time":0,
        "products_count":0,
        "scrap_count":0,
        "down_time_reasons":""
    });

    const handleChange = (e)=>{
        setWorkLog({...workLog,[e.target.name]: e.target.value});
    }

    const handleSubmit = async () => {
        const response = await fetch(`${host}/api/work/addWork`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                machine_id: props.id,
                start_time:workLog.start_time,
                end_time: workLog.end_time,
                operating_time:  workLog.operating_time,
                break_down_time: workLog.break_down_time,
                shut_down_time: workLog.shut_down_time,
                products_count: workLog.products_count,
                scrap_count: workLog.scrap_count,
                down_time_reasons: workLog.down_time_reasons
            })
        });
        const json = await response.json();
        if(json.success) {
            toast("Work Log added successfully");
            setWorkLog({
                "start_time":"",
                "end_time":"",
                "operating_time": 0,
                "break_down_time":0,
                "shut_down_time":0,
                "products_count":0,
                "scrap_count":0,
                "down_time_reasons":""
            })
        }
        else{
            toast("WorkLog already exists for today");
        }
    }

    useEffect(()=>{
        
    },[])

    return (
        <div className="workLog">
            <div className="workLog_tab" style={{ paddingLeft: '10px' }}>
                <span>Add Work Log for machine :
                    <span> {props.name}</span>
                </span>
            </div>
            <div className="workLog_bottom">
                <span className='worklog_heading'>Add Work Log</span>
                <Blink color='red' fontSize='20' fontWeight='bold' text='Time in Hours' >Input Type</Blink>
                <div className="worklog_form_wrapper">
                    <div className="worklog_form">
                        <div className="worklog_input_half">
                            <div class="mb-3">
                                <label for="exampleInputEmail1" class="form-label">Start Time</label>
                                <input type="text" name="start_time" value={workLog.start_time} onChange={handleChange} class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                            </div>
                        </div>
                        <div className="worklog_input_half">
                            <div class="mb-3">
                                <label for="exampleInputEmail1" class="form-label">End Time</label>
                                <input type="text" name="end_time" value={workLog.end_time} onChange={handleChange} class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                            </div>
                        </div>
                        <div className="worklog_input_half">
                            <div class="mb-3">
                                <label for="exampleInputEmail1" class="form-label">Operating Time</label>
                                <input type="number" name="operating_time" value={workLog.operating_time} onChange={handleChange} class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                            </div>
                        </div>
                        <div className="worklog_input_half">
                            <div class="mb-3">
                                <label for="exampleInputEmail1" class="form-label">Shut Down Time</label>
                                <input type="number" name="shut_down_time" value={workLog.shut_down_time} onChange={handleChange} class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                            </div>
                        </div>
                        <div className="worklog_input_half">
                            <div class="mb-3">
                                <label for="exampleInputEmail1" class="form-label">Total Products Count</label>
                                <input type="number" name="products_count" value={workLog.products_count} onChange={handleChange} class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                            </div>
                        </div>
                        <div className="worklog_input_half">
                            <div class="mb-3">
                                <label for="exampleInputEmail1" class="form-label">Scrap Products Count</label>
                                <input type="number" name="scrap_count" value={workLog.scrap_count} onChange={handleChange} class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                            </div>
                        </div>
                        <div className="worklog_input_half" style={{width:'100%'}}>
                            <div class="mb-3">
                                <label for="exampleInputEmail1" class="form-label">Break Down Time</label>
                                <input type="number" name="break_down_time" value={workLog.break_down_time} onChange={handleChange} class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                            </div>
                        </div>
                        <div className="worklog_input_half" style={{width:'100%'}}>
                            <div class="mb-3">
                                <label for="exampleInputEmail1" class="form-label">Break Down Reason</label>
                                <input type="text" name="down_time_reasons" value={workLog.down_time_reasons} onChange={handleChange} class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                            </div>
                        </div>
                        <button className="btn myBtn" onClick={handleSubmit}> Submit </button>
                    </div>
                </div>
            </div>
            <ToastContainer style={{ marginTop:'50px'}} />
        </div>
    )
}

export default WorkLog
