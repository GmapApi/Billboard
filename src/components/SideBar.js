import React, { useState } from "react"
import {Link} from "react-router-dom";
import "./SideBar.css"
import smartCity from "../assets/smart-city-nagpur-logo.png";
import axios from "axios";
const SideBar =(props)=>{
    
    // const url = "";
    const trip = props.trip;
    const dist = props.dist;
    const markers = trip.split("->").map((s, i) => ({ number: i+1, Name: s }));
    var rpk=dist*15;
    const rpk1=rpk.toFixed(2);
    const today = new Date().toISOString().substr(0, 10);
    const [date, setDate] = useState(today);
    const [name,setName] = useState('');

    const columns =[
      {title: "No.",field:"number"},
      {title : "Board Name",field:"Name"},
    ]
    
    // const[posts,setposts] = useState([]);
    console.log(markers);

  const handleSubmit = () => {
    if (name.length === 0) {
      alert("Name Has Left Blank!");
    } else if (date.length === 0) {
      alert("Date has been left Blank!");
    } else if (dist === undefined) {
      alert("Calculate distance");
    } else {
        const now = new Date();
        const Id = parseInt(now.getTime());
      const t_dist = parseFloat(dist);
      const t_amt = parseFloat(rpk1);
      let tripData = new FormData();
      tripData.append("Id",Id);
      tripData.append("Trip_date", date);
      tripData.append("Name", name);
      tripData.append("Trip", trip);
      tripData.append("Marker_type", trip[0]);
      tripData.append("Total_dist", t_dist);
      tripData.append("Total_Amount", t_amt);

      axios({
        method: "post",
        url:"https://embeddedcreation.in/deeGIS/backend/markers.php",
        data: tripData,
        config: { headers: { "Content-Type": "multipart/form-data" } },
      })
        .then(function (response) {
          alert("new Contact Added succesfully");
        })
        .catch(function (response) {
          alert("Please Try Again");
          console.log(response);
        });
    }
  }

    
    return(
        // <Menu>
        <div className="sidebar">
        <div style={{display:"flex"}}>
        <div><img className="logo" src={smartCity}/></div>
        <div className="nmc">
        Nagpur Smart & Sustainable City Development Corporation LTD
        </div>
      </div>
      <h1 className="heading">Route Details</h1>
      <div>
        <p className="label">Name:</p>
        <input
          className="input"
          type="text"
          onChange={(e) => setName(e.target.value)}
        ></input>
      </div>
      <div>
        <p className="label">Date:</p>
        <input
          className="input"
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </div>
      <div>
        <button className="btn" onClick={handleSubmit}>
          Enter Record
        </button>
        <button className="btn">
            <Link to="/Records" style={{ textDecoration: 'none', color: 'inherit' }}>
          View Records
            </Link>
        </button>
        <button className="btn" onClick={() => window.location.reload(true)}>
          Clear Route
        </button>
      </div>
      <div>
        <p className="label">Path:</p>
        <p className="label">{props.trip}</p>
      </div>
      <div>
        <p className="label">
          Dist: {props.dist}
          {props.dist > 0 ? " Km" : ""}
        </p>
      </div>
      <div>
        <table>
          <thead>
            <tr>
              {columns.map((column) => (
                <th key={column.field}>{column.title}</th>
              ))}
              <th></th>
            </tr>
          </thead>
          <tbody>
            {markers.map((row) => (
              <tr key={row.id}>
                {columns.map((column) => (
                  <td key={row.id}>{row[column.field]}</td>
                ))}
                <td><button>Upload</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div>
        {/* <p className="label">Generated Amount: {rpk1}{(props.dist > 0)? " Rs":""}</p> */}
      </div>
    </div>
    // </Menu>
  );
};


export default SideBar;
