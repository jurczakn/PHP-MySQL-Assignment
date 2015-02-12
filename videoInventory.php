<?php

error_reporting(E_ALL);
ini_set('display_errors', 'On');

$mysqli = new mysqli("oniddb.cws.oregonstate.edu", "jurczakn-db", "681ouA5JomfiwgDp", "jurczakn-db");

if (!$mysqli || $mysqli->connect_errno){

	echo "Connection error".$mysqli->connect_errno." ".$mysqli->connection_error;

}

if (isset($_GET['name'])){

	$name = $_GET['name'];

	$category = $_GET['category'];

	$length = $_GET['length'];

	$rented = $_GET['rented'];

	$stmt = $mysqli->prepare("INSERT INTO VideoInventory (name, category, length, rented) VALUES (?, ?, ?, ?)");

	if(!$stmt){

	echo "error on stmt";

	}

	$stmt->bind_param("ssii", $name, $category, $length, $rented);	

	$stmt->execute();

	$stmt->close();

}

$stmt = $mysqli->prepare("SELECT * FROM VideoInventory");

if(!$stmt){

	echo "error on stmt";

}

$stmt->execute();

$stmt->bind_result($id, $name, $category, $length, $rented);

while ($stmt->fetch()){

//	echo " $id $name $category $length ";

//	if ($rented)

//		echo "Checked Out";

//	else 

//		echo "available";

}

$redirect = "http://web.engr.oregonstate.edu/~jurczakn/videoInventory.html";

header("Location:{$redirect}", false);


?>

