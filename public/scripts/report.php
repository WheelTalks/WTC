<!doctype html>
<html>
<head>
<meta charset="UTF-8">
<title>report</title>
<link rel="stylesheet" type="text/css" href="main.css">

</head>

<body>

<div id='main'>

<!--HEADER-->

<div id='logo'> 
  <a href="index.html"><img alt="WheelTalks", src='images/logo_example.jpg'></a>
</div>
<div id='title'>
 <a href="index.html"><h1><span class='wheel'>Wheel</span><span class='talks'>Talks</span></h1></a>
  
<div id='number'><p>Send an anonymous message to any driver on the road. Just text <br><strong>(781) 559-4602</strong> with a license plate number and message.</p></div>
</div>

<hr>
<div id='navbar'>
	<ul>
   	  <li><a href='index'>Home</a></li>
      <li><a href='about.html'>About Us</a></li>
      <li><a href='faqs.html'>FAQs</a></li>
    </ul>
  </div>
<h1> Congratulations! You are now connected to the road</h1>
</body>
<?php
$name = $_POST['name']; 
$email = $_POST['email']; 
$phone = $_POST['phonenumber']; 
$phone_number = "+1".$phone;
$license_plate = $_POST['licensenumber'];
$license_plate = strtoupper($license_plate); 
$state = $_POST['licenseplate'];
echo 'Your car name is ' . $name . '<br />';
echo 'Your email is ' . $email .  '<br />';
echo 'Your phone number is ' . $phone_number .  '<br />';
echo 'Your license plate number is ' . $license_plate . '<br />';
echo 'Your state is ' .  $state .  '<br />';


$hostname = "liamdata.db.11070558.hostedresource.com";
$username = "liamdata";
$dbname = "liamdata";

//These variable values need to be changed by you before deploying
$password = "LiamFlahive#1";
$usertable = "users";

        
//Connecting to your database
 mysql_connect($hostname, $username, $password);
mysql_select_db($dbname);

$sql ="INSERT INTO users (`Name`, `Email`, `License`, `State`, `Phone Number`, `Score`)
VALUES
('$name','$email','$license_plate','$state','$phone_number',1)";

if (!mysql_query($sql))
  {
  die('Error: ' . mysqli_error($con));
  }

$to = 'samlanger9433@gmail.com';
$subject = 'form information';
$msg = "name is $name.\n" . 
"email is $email.\n" .
"phone number is $phone_number.\n" .
"license plate is $license_plate.\n";
$website = 'wheeltalks';
mail($to, $subject, $msg, 'From: ' . $website);

$to = $email;
$subject = 'Congratulations';
$msg = "Welcome $name.\n " . 
"Anonymously text any driver on the road at (781) 559-4602.\n" .
"Here is your information as we received it:\n" .
"email is $email.\n" .
"phone number is $phone_number.\n" .
"license plate is $license_plate.\n".
"state is $state.\n".

" \n" .
"contact us at questions@wheeltalks.com for any questions.\n" .
"please visit our website at www.wheeltalks.com.\n";
$website = 'wheeltalks';
mail($to, $subject, $msg, 'From: ' . $website);



?>
<body>
<h2>coming soon:</h2>
<ui>
<li>see what people are wheeltalking</li>
<li>change any incorrect information</li>
<li>change your update plan to emails or upon checking instead of getting texts</li>

</ui>
</body>

</html>