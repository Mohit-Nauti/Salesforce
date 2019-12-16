<?php
$server = "localhost";
$user="id4215412_abc";
$dbname = "id4215412_abc";
$pass = "welcome@123";

$college_id=$_POST['college_id'];
$name=$_POST['username'];
$fname= $_POST['name'];
$phone = $_POST['phone'];


$response["data"] = array();

$con = mysqli_connect($server , $user , $pass , $dbname );
    
$result = mysqli_query($con ,"INSERT INTO `try`(`college_id`, `name`, `fname`, `contact`) VALUES ('$college_id','$name','$fname','$phone')"); 

if ($result) {
        

$response["success"] = 1;
        
$response["message"] = "Successfull.";

        
echo json_encode($response);
    

} else {
        

$response["success"] = 0;
        
$response["message"] = "Oops! An error occurred jvjd.";
        
        
echo json_encode($response);
    
}

?>