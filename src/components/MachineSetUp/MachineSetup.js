import React, { useEffect, useState } from 'react'
import '../WorkLog/WorkLog.css'
import '../MachineSetUp/MachineSetup.css'
import Blink from 'react-blink-text';
import machineLogo from '../../assets/machine-logo.png'
import MyTable from '../MyTable/MyTable';
import '../MyTable/MyTable.css'
import firebase from 'firebase/compat/app'
import 'firebase/compat/storage';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function MachineSetup({ id , setFlag }) {
    const host = "http://192.168.101.65:1708";
    const [machine, setMachine] = useState({})
    const downTimeCols = ["Date", "Start Time", "End Time", "Operating Time", "Shut Down Time", "Total Products", "Down Time (Hours)", "Reason"];
    const [downTimeData, setDownTimeData] = useState([]);
    const [edit,setEdit] = useState({})

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
        setEdit(json);
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
        setDownTimeData([])
        json.map((item, i) => {
            setDownTimeData(old => [
                ...old,
                {
                    date: item.date,
                    startTime: item.start_time,
                    endTime: item.end_time,
                    operatingTime: item.operating_time,
                    shutdownTime: item.shut_down_time,
                    totalProducts: item.products_count,
                    downTime: item.break_down_time,
                    reason: item._down_time_reason
                }
            ])
        })
    }


    const handleFileUpload = (e)=>{
        const selectedFile = e.target.files[0];
        if(selectedFile){
          const storageRef = firebase.storage().ref(selectedFile.path);
          const fileRef = storageRef.child(selectedFile.name);
    
          fileRef.put(selectedFile)
            .then((snapshot)=>{
              snapshot.ref.getDownloadURL()
                .then((downloadURL)=>{
                    setEdit({...edit, image: downloadURL});
                })
            }) 
        }
        else{
          alert("No File Selected");
        }
      }

    const handleChange = (e)=>{
        setEdit({...machine,[e.target.name]: e.target.value})
    }

    const handleSubmit = async () => {
        const response = await fetch(`${host}/api/machine/updateMachine`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(edit)
          });
      
          const json = await response.json();
          if(json){
            getMachine();
            setFlag(true);
          }
          else{
            toast("Update Machine Failed");
          }
    }

    useEffect(() => {
        getMachine();
        setDownTimeData([])
        getWorkLogs();
    }, []);




    return (
        <div className="machine_setup">
            {
                machine && <>
                    <div className="machine_setup_top">
                        <span>Machine Details Setup</span>
                    </div>
                    <div className="machine_profile_div">
                        <div className="machine_profile_left">
                            <div className="profile_div">
                                <span className="machine_profile_heading">Machine Name: </span>
                                <span className="machine_profile_value">{machine.name}</span>
                            </div>
                            <div className="profile_div">
                                <span className="machine_profile_heading">Machine Number / LogId: </span>
                                <span className="machine_profile_value">{machine.logid}</span>
                            </div>
                            <div className="profile_div">
                                <span className="machine_profile_heading">Machine Type: </span>
                                <span className="machine_profile_value">{machine.type}</span>
                            </div>
                            <br />
                            <button className="btn myBtn" data-bs-toggle="modal" data-bs-target="#exampleModal">Edit</button>
                        </div>
                        <div className="machine_profile_right">
                            <img src={machine.image || machineLogo} alt="" />
                        </div>
                    </div>
                    <div className="machine_worklogs_div">
                        <span style={{ fontSize: '17px', fontWeight: 'bold' }}>Work Logs</span>

                        <>
                            <div className="myTable">
                                <table className="table">
                                    <thead className='table-warning'>
                                        <tr>
                                            <th scope="col">S.No</th>
                                            {
                                                downTimeCols.map((col, i) => {
                                                    return <th scope="col" key={i}>{col}</th>
                                                })
                                            }
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            downTimeData.map((row, i) => {
                                                return (
                                                    <tr key={i}>
                                                        <th scope="row">{i + 1}</th>
                                                        <td>{row.date}</td>
                                                        <td>{row.startTime}</td>
                                                        <td>{row.endTime}</td>
                                                        <td>{row.operatingTime}</td>
                                                        <td>{row.shutdownTime}</td>
                                                        <td>{row.totalProducts}</td>
                                                        <td>{row.downTime}</td>
                                                        <td>{row.reason}</td>
                                                    </tr>
                                                )
                                            })
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </>
                    </div>

                    {/* Add Machine modal  */}
                    <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" >
                        <div className="modal-dialog modal-dialog-centered  modal-lg">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h1 className="modal-title fs-5" id="exampleModalLabel">Update Machine Details</h1>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div className="modal-body">
                                    <div className="machine-img-upload">
                                        <input type="file" onChange={handleFileUpload} />
                                        <div className="machine_img">
                                            <img src={edit.image || machineLogo} alt="" />
                                        </div>
                                    </div>
                                    <div className="machineInputField">
                                        <span className="machineInputTitle">Machine Name</span>
                                        <div className="machineInputTag">
                                            <input type="text" name="name" value={edit.name} onChange={handleChange}/>
                                        </div>
                                    </div>
                                    <div className="machineInputField">
                                        <span className="machineInputTitle">Machine Number / LogId</span>
                                        <div className="machineInputTag">
                                            <input type="text" name="logid" value={edit.logid} onChange={handleChange} />
                                        </div>
                                    </div>
                                    <div className="machineInputField">
                                        <span className="machineInputTitle">Machine Type</span>
                                        <div className="machineInputTag">
                                            <input type="text" name="type" value={edit.type} onChange={handleChange} />
                                        </div>
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <button onClick={handleSubmit} className="btn" data-bs-dismiss="modal" style={{ color: 'white', backgroundColor: 'rgb(255, 184, 5)', height: '30px', display: 'flex', alignItems: 'center' }}>Submit</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            }
            
            <ToastContainer style={{ marginTop:'50px'}} />
        </div>
    )
}

export default MachineSetup
