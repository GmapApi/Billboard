import { useJsApiLoader } from "@react-google-maps/api";
import Map from "./components/Map";
import { mapOptions } from "./components/MapConfiguration";
import SideBar from "./components/SideBar";
import "./App.css"
import { useState } from "react";

function App() {
  const { isLoaded } = useJsApiLoader({
    id:mapOptions.googleMapApiKey,
    googleMapsApiKey:mapOptions.googleMapApiKey,
  });
  const [trip,setTrip] = useState('');
  const [dist,setDist] = useState();
  function getTrip(trip){
    setTrip(trip);
  }
  function getDist(d){
    setDist(d);
  }
  const [clear,isClear] = useState(0);
  function setClear(cr){
    
    isClear(1);
   
  }
  return (
    
    <div className="App">
      <SideBar className="sidebar" trip={trip} setClear={setClear} dist={dist}/>
      {/* Loading of map Main code in map.js */}
      {/* pull request */}
      <Map  className="map" isLoaded={isLoaded} getTrip={getTrip} Clear={clear} getDist = {getDist}/>

    </div>
    
  );
}

export default App;
