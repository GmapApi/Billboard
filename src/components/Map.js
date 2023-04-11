import { GoogleMap, Marker, Polyline } from "@react-google-maps/api";
//importing images,required api to plot the maps and markers
import Type_A from "../assets/A.png";
import Type_B from "../assets/B.png";
import Type_C from "../assets/C.png";
import React, { useEffect, useState } from "react";
import "./Map.css";

const Map = (props) => {
  const { isLoaded } = props;
  const containerStyle = {
    height: "100vh",
    width: "100%",
  };
  const [selctedMarker, setSelectedMarker] = useState([]);
  const [setCoords, setSelectedCoords] = useState([]);
  const [m_type, setM_type] = useState(null);
  const [values, setValues] = useState([]);
  // const [trip, set_trip] = useState("");
  const [markers, setMarker] = useState([]);
  const [checkValue, setCheckValue] = useState([]);
  //Function To calculate Distance between two markers
  function haversine_distance(mk1, mk2) {
    var R = 3958.8; // Radius of the Earth in miles
    var rlat1 = mk1.lat * (Math.PI / 180); // Convert degrees to radians
    var rlat2 = mk2.lat * (Math.PI / 180); // Convert degrees to radians
    var difflat = rlat2 - rlat1; // Radian difference (latitudes)
    var difflon = (mk2.lng - mk1.lng) * (Math.PI / 180); // Radian difference (longitudes)

    var d =
      2 *
      R *
      Math.asin(
        Math.sqrt(
          Math.sin(difflat / 2) * Math.sin(difflat / 2) +
            Math.cos(rlat1) *
              Math.cos(rlat2) *
              Math.sin(difflon / 2) *
              Math.sin(difflon / 2)
        )
      );
    return d * 1.6;
  }
  // Calculating the cumalative Distance of all the markers Selected
  const calcute_final_dist = () => {
    var dist = 0;
    for (let i = 0; i < setCoords.length - 1; i++) {
      dist += haversine_distance(setCoords[i], setCoords[i + 1]);
    }
    return dist.toFixed(2);
  };

  const center = {
    lat: 22.11839,
    lng: 78.04667,
  };

  const handleMarkerClick = (marker) => {
    //Code to detect if marker is clicked and then add it to the array setCoords to plot the line between two markers
    setSelectedMarker(marker);

    const coordinates = {
      lat: parseFloat(marker.Latitude),
      lng: parseFloat(marker.Longitude),
    };

    //pushing cordinates/markers selected into an array(setCoords)
    if (setCoords.length < 1) {
      setSelectedCoords([...setCoords, coordinates]);
      setValues([...values, marker.MarkerID]);
      setM_type(marker.Marker_Type);
    } else {
      console.log(marker.Marker_Type);
      if (m_type == marker.Marker_Type && !values.includes(marker.MarkerID)) {
        setSelectedCoords([...setCoords, coordinates]);
        setValues([...values, marker.MarkerID]);
      }
      if (values.includes(marker.MarkerID)) {
        const result = window.confirm("Are you sure you want to delete this item?");
        console.log(values);
        if (result === true) {
          // User clicked "OK" or "Yes"
          const findElement = "" + marker.MarkerID + "";
        const index = values.indexOf(findElement);
        DeleteClick(index);
          console.log("Item deleted.");
          console.log(values);
        } else {
          // User clicked "Cancel" or "No"
          console.log("Deletion cancelled.");
        }
      }
    }
  };
  useEffect(() => {
    var arrString = values.join("->");
    props.getTrip(arrString);
    SendDistance();
    
  }, [values]);
  const DeleteClick = (markerIndex) => {
    const updatedValues= [...values];
    const updatedCoords = [...setCoords];
    console.log(updatedValues);
    // Remove the marker and its coordinates from the arrays
    updatedValues.splice(markerIndex, 1);

    updatedCoords.splice(markerIndex, 1);

    // Update the state with the new arrays
    setValues(updatedValues);
    setSelectedCoords(updatedCoords);
    console.log(updatedValues);
  };

  //Fetching of Data from localHost From mysql
  useEffect(() => {
    const getMarker = async () => {
      const res = await fetch("https://embeddedcreation.in/deeGIS/backend/markers.php");
      const getData = await res.json();
      setMarker(getData);
    };
    getMarker();
  }, []);

  //Function to see the legend checkbox
  const handleChange = (e) => {
    const value = e.target.value;
    const checked = e.target.checked;
    if (checked) {
      setCheckValue([...checkValue, value]);
    } else {
      setCheckValue(checkValue.filter((e) => e !== value));
    }
  };

  //Function to display cummaltative distance on console
  const SendDistance = () => {
    var d = calcute_final_dist();
    console.log("distance: - ", d);
    props.getDist(d);
  };
  const google = window.google;

  //Loading of Google Map
  return (
    isLoaded && (
      <div className="mapContainer">
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={18}
          mapOptions
        >
          {}

          {markers.map((marker) => {
            //Conditional plotting of markers according to legend
            if (checkValue.includes(marker.Marker_Type)) {
              return (
                <div key={marker.id}>
                  <Marker
                    position={{
                      lat: parseFloat(marker.Latitude),
                      lng: parseFloat(marker.Longitude),
                    }}
                    options={{
                      icon:
                        marker.Marker_Type == "A"
                          ? Type_A
                          : marker.Marker_Type == "B"
                          ? Type_B
                          : marker.Marker_Type == "C"
                          ? Type_C
                          : "",
                    }}
                    title={marker.MarkerID}
                    onClick={() => handleMarkerClick(marker)}
                  />
                </div>
              );
            }

            if (props.Clear == 1) {
              props.getTrip("");
            }
          })}

          {/* Code to Deploy Polyline */}
          {selctedMarker && (
            <Polyline
              path={setCoords}
              strokeColor="#0000FF"
              strokeOpacity={0.8}
              strokeWeight={2}
            />
          )}
        </GoogleMap>
        {/* Code For Legend */}
        <div id="legend">
          <h4>Map Legends</h4>
          <div className="style">
            <div className="para">Type A</div>
            <div>
              <img className="marker" src={Type_A} />
            </div>
            <div>
              <input
                id="checkbox"
                className="cbox"
                type="checkbox"
                value="A"
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="style">
            <div className="para">Type B</div>
            <div>
              <img className="marker" src={Type_B} />
            </div>
            <div>
              <input
                id="checkbox1"
                className="cbox"
                type="checkbox"
                value="B"
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="style">
            <div className="para">Type C</div>
            <div>
              <img className="marker" src={Type_C} />
            </div>
            <div>
              <input
                id="checkbox2"
                className="cbox"
                type="checkbox"
                value="C"
                onChange={handleChange}
              />
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default Map;
