<?php
header("Access-Control-Allow-Origin: *"); //add this CORS header to enable any domain to send HTTP requests to these endpoints:
$host = "mysql.hostinger.in"; 
$user = "u833254268_imagisegis"; 
$password = "Im@g!sEg!s987"; 
$dbname = "u833254268_imagisegis"; 
$id = '';
 
$con = mysqli_connect($host, $user, $password,$dbname);
 
$method = $_SERVER['REQUEST_METHOD'];
 
 
if (!$con) {
  die("Connection failed: " . mysqli_connect_error());
}
 
 
switch ($method) {
    case 'GET':
      $sql = "select * from Coordinates"; 
      break;
    case 'POST':
      $Trip_date = $_POST['Trip_date'];
      $Name = $_POST['Name'];
      $Trip = $_POST['Trip'];
      $Marker_type = $_POST['Marker_type'];
      $Total_dist = $_POST['Total_dist'];
      $Total_Amount =$_POST['Total_Amount'];
      $sql = "INSERT INTO Trip_details (Trip_date,Name,Trip,Marker_type,Total_dist,Total_Amount) VALUES ('$Trip_date','$Name','$Trip','$Marker_type','$Total_dist','$Total_Amount')";
      break;

}
 
// run SQL statement
$result = mysqli_query($con,$sql);
 
// die if SQL statement failed
if (!$result) {
  http_response_code(404);
  die(mysqli_error($con));
}
 
if ($method == 'GET') {
    if (!$id) echo '[';
    for ($i=0 ; $i<mysqli_num_rows($result) ; $i++) {
      echo ($i>0?',':'').json_encode(mysqli_fetch_object($result));
    }
    if (!$id) echo ']';
}else if($method == 'POST'){
  echo json_encode($result);
}else{
    echo mysqli_affected_rows($con);
}
 
$con->close();