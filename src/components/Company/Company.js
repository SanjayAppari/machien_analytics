import React, { useEffect, useState } from 'react'
import MainNavbar from '../MainNavbar/MainNavbar'
import '../Company/Company.css'
import machineLogo from '../../assets/machine-logo.png'
import { useNavigate } from 'react-router-dom'
import firebase from 'firebase/compat/app'
import 'firebase/compat/storage';

function Company() {

  const host = "http://192.168.101.65:1708";
 
  const navigate = useNavigate();
  const [cardSize, setCardSize] = useState({ width: '450px', height: '300px' });
  const [newMachine,setNewMachine] = useState({
    image:"", name:"",logid:"", type:""
  })
  const [machine, setMachine] = useState([]);

  const getMachines = async ()=>{
    const response = await fetch(`${host}/api/company/getMachines`, {
      method: 'GET',
      headers: {
        'auth-token': localStorage.getItem('token')
      }
    });
    const json = await response.json();
    setMachine(json);
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
                setNewMachine({...newMachine, image: downloadURL});
            })
        }) 
    }
    else{
      alert("No File Selected");
    }
  }

  const handleChange = (e)=>{
    setNewMachine({...newMachine,[e.target.name]: e.target.value});
  }

  const handleSubmit = async () => {
    const response = await fetch(`${host}/api/machine/addMachine`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token'),
      },
      body: JSON.stringify(newMachine)
    });

    const json = await response.json();
    if(json.success){
      getMachines();
    }
  }

  useEffect(()=>{
    if(!localStorage.getItem('token')) {
      navigate('/login');
    }
    getMachines();
  },[]);



  return (
    <div className="company">
      <MainNavbar />
      <div className="company-setting-div">
        <button className="btn my-btn" data-bs-toggle="modal" data-bs-target="#exampleModal">+ Add Machine</button>
        <button className="btn my-btn  dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false"><i className="fa-solid fa-layer-group"></i><pre> </pre>View</button>
        <ul className="dropdown-menu">
          <li className='dropdown-item' onClick={() => setCardSize({ width: '550px', height: '350px' })}>Large Cards</li>
          <li className='dropdown-item' onClick={() => setCardSize({ width: '450px', height: '300px' })}>Medium Cards</li>
          <li className='dropdown-item' onClick={() => setCardSize({ width: '350px', height: '200px' })}>Small Cards</li>
          <li className='dropdown-item' onClick={() => setCardSize({ width: '0px', height: '0px' })}>Tiles</li>
        </ul>
      </div>
      <div className="machine-cards">
        {
          cardSize.width != '0px' && machine.map((ele, i) => {
            return (
              <div onClick={()=>{navigate(`/machine/${ele.id}`)}} className="machine-card" key={i} style={cardSize}>
                <div className="machine-img">
                  <img src={ele.image || machineLogo} alt="" />
                </div>
                <div className="machine-content" style={{ padding: cardSize.height == '200px' && '3px' }}>
                  <span style={{ fontSize: cardSize.height == '200px' && '12px' }}>M-{ele.logid} | {ele.type}</span>
                  <div style={{ display: 'flex', justifyContent: "space-between", alignItems: "center", marginTop: cardSize.height == '200px' && '-10px' }}>
                    <span className='machineName' style={{ fontSize: cardSize.height == '200px' && '16px' }}>{ele.name}</span>
                    <i className="fa-solid fa-caret-right"></i>
                  </div>
                </div>
              </div>
            )
          })
        }
        {
          cardSize.width == '0px' && machine.map((ele, i) => {
            return (
              <div className="machine-tile"onClick={()=>{navigate(`/machine/${ele.id}`)}} >
                <div className="tile-img">
                  <img src={machineLogo} alt="" />
                </div>
                <div className="tile-name">
                  <span>{ele.name} - {ele.type} </span>
                </div>
              </div>
            )
          })
        }
      </div>

      {/* Add Machine modal  */}
      <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" >
        <div className="modal-dialog modal-dialog-centered  modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">Add Machine</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <div className="machine-img-upload">
                 <input type="file" onChange={handleFileUpload} />
                  <div className="machine_img">
                    <img src={newMachine.image || machineLogo} alt="" />
                  </div>
              </div>
              <div className="machineInputField">
                <span className="machineInputTitle">Machine Name</span>
                <div className="machineInputTag">
                  <input type="text" name="name" value={newMachine.name} onChange={handleChange} />
                </div>
              </div>
              <div className="machineInputField">
                <span className="machineInputTitle">Machine Number / LogId</span>
                <div className="machineInputTag">
                  <input type="text" name="logid" value={newMachine.logid} onChange={handleChange} />
                </div>
              </div>
              <div className="machineInputField">
                <span className="machineInputTitle">Machine Type</span>
                <div className="machineInputTag">
                  <input type="text" name="type" value={newMachine.type} onChange={handleChange} />
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn" onClick={handleSubmit} data-bs-dismiss="modal" style={{ color: 'white', backgroundColor: 'rgb(255, 184, 5)', height: '30px', display: 'flex', alignItems: 'center' }}>Submit</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Company
