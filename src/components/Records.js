import React,{ useEffect, useState }  from "react";
import {Link} from "react-router-dom";
import "./Records.css";
function Records() {

  const [data,setData] = useState([]);

  const columns = [
    { title: "ID", field: "Id" },
    { title: "Date", field: "Trip_date" },
    { title: "Name", field: "Name" },
    { title: "Trip", field: "Trip" },
    { title: "Marker Type", field: "Marker_type" },
    { title: "Distance(KM)", field: "Total_dist" },
    { title: "Revenue ₹", field: "Total_Amount" },
  ];

  useEffect(() => {
     const getData = async () => {
       const res = await fetch(
         "http://localhost/show_details.php"
       );
       const getData = await res.json();
       setData(getData);
     };
     getData();
   }, []);
   
  return (
    <div>
      <button>
        <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
          Back
        </Link>
      </button>
      <h1>Records Table</h1>
      <table>
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={column.field}>{column.title}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr key={row.id}>
              {columns.map((column) => (
                <td key={row.id}>{row[column.field]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Records;
