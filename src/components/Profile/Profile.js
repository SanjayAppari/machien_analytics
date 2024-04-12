import React, { useEffect, useState } from 'react'
import MainNavbar from '../MainNavbar/MainNavbar'
import '../Profile/Profile.css'
import companyLogo from '../../assets/companyProfile.jpg'
import machineLogo from '../../assets/machine-logo.png'
import { useNavigate } from 'react-router-dom'
import firebase from 'firebase/compat/app'
import 'firebase/compat/storage';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Profile() {
  const host = "http://192.168.101.65:1708";


  const navigate = useNavigate();
  const [company,setCompany] = useState({});
  const [editCompany, setEditCompany] = useState({})
  const [machine, setMachine] = useState([]);
  const [image,setImage] = useState(companyLogo)

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

  const getCompany = async () => {
    const response = await fetch(`${host}/api/company/getCompanyDetails`, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({
          id: localStorage.getItem('companyId')
      })
    });

    const json = await response.json();
    setImage(json.image)
    setCompany(json);
    setEditCompany(json);
  }

  const handleLogout = ()=>{
    localStorage.removeItem('token');
    window.location.reload();
  }

  const handleChange = (e) => {
    setEditCompany({...editCompany, [e.target.name]: e.target.value});
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
                    setEditCompany({...editCompany, image: downloadURL});
                })
            }) 
        }
        else{
          alert("No File Selected");
        }
    }


    const handleSubmit = async(e)=>{
      const response = await fetch(`${host}/api/company/updateCompany`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editCompany)
      });

      const json = await response.json();
      if(json){
        getCompany();
      }
      else{
        toast("Update Machine Failed");
      }
    }

  useEffect(()=>{
    if(!localStorage.getItem('token')){
        navigate('/');
    }
    getCompany();
    getMachines();
  },[]);


  return (
    <div className="profile">
        <MainNavbar />
        <div className="profile_details_bg" style={{backgroundImage: `url(${image})`}}>
            <div className="profile_overlay">
                <div className="actual_profile">
                    <center>
                        <h1>{company.name}</h1>
                        <span>{company.description}</span>
                    </center>
                    <br />
                    <center>
                        <span>{company.email}</span> 
                        <p>{company.address}</p>
                    </center>
                    <div>
                        <button class="btn btn-warning" style={{margin:'0 10px'}} data-bs-toggle="modal" data-bs-target="#exampleModal">Edit Details</button>
                        <button class="btn btn-warning" style={{margin:'0 10px'}} onClick={handleLogout}>Log out</button>
                    </div>
                </div>
            </div>
        </div>
        <div className="show_machines">
            <h5 style={{paddingLeft:'50px'}}>Machines</h5>
            <div className="machines_container">

              {
                 machine.map((item,i)=>{
                    return (
                      <div className="machine_card" onClick={()=>{navigate(`/machine/${item.id}`)}} >
                          <div className="machine_card_1">
                              <img src={item.image || machineLogo} alt="" />
                          </div>
                          <div className="machine_card_2">
                              <h6>{item.name}</h6>
                          </div>
                      </div>
                    )
                 })
              }
            </div>
        </div>




        <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" >
        <div className="modal-dialog modal-dialog-centered  modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Company Details</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <div className="machine-img-upload">
                 <input type="file" onChange={handleFileUpload}  />
                  <div className="machine_img">
                    <img src={editCompany.image || companyLogo} alt="" />
                  </div>
              </div>
              <div className="machineInputField">
                <span className="machineInputTitle">Company Name</span>
                <div className="machineInputTag">
                  <input type="text" value={editCompany.name} name="name" onChange={handleChange} />
                </div>
              </div>
              <div className="machineInputField">
                <span className="machineInputTitle">Company Description</span>
                <div className="machineInputTag">
                  <input type="text" value={editCompany.description} name="description" onChange={handleChange} />
                </div>
              </div>
              <div className="machineInputField">
                <span className="machineInputTitle">Company Email</span>
                <div className="machineInputTag">
                  <input type="text" name="email" value={editCompany.email} onChange={handleChange} />
                </div>
              </div>
              <div className="machineInputField">
                <span className="machineInputTitle">Address</span>
                <div className="machineInputTag">
                  <input type="text" name="address" value={editCompany.address} onChange={handleChange} />
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn" onClick={handleSubmit}  data-bs-dismiss="modal" style={{ color: 'white', backgroundColor: 'rgb(255, 184, 5)', height: '30px', display: 'flex', alignItems: 'center' }}>Submit</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile
