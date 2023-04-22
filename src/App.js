import { useJsApiLoader } from "@react-google-maps/api";
import { mapOptions } from "./components/MapConfiguration";
import Records from "./components/Records"
import "./App.css";
import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SideBar from "./components/SideBar";
import Map from "./components/Map";

function App() {
  const { isLoaded } = useJsApiLoader({
    id: mapOptions.googleMapApiKey,
    googleMapsApiKey: mapOptions.googleMapApiKey,
  });
  const [trip, setTrip] = useState("");
  const [dist, setDist] = useState();
  function getTrip(trip) {
    setTrip(trip);
  }
  function getDist(d) {
    setDist(d);
  }
  const [clear, isClear] = useState(0);
  function setClear(cr) {
    isClear(1);
  }
  return (
    <div className="App">
        <Routes>
        <Route path="/" element={
            <>
              <SideBar
                className="sidebar"
                trip={trip}
                setClear={setClear}
                dist={dist}
              />
              <Map
                className="map"
                isLoaded={isLoaded}
                getTrip={getTrip}
                Clear={clear}
                getDist={getDist}
              />
            </>
          } />
          <Route path="/Records" exact element={<Records />} />
        </Routes>
    </div>
  );
}

export default App;
