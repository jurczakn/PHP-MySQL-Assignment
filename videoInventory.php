<?php

error_reporting(E_ALL);
ini_set('display_errors', 'On');

$mysqli = new mysqli("oniddb.cws.oregonstate.edu", "jurczakn-db", "681ouA5JomfiwgDp", "jurczakn-db");

if (!$mysqli || $mysqli->connect_errno){

	echo "Connection error".$mysqli->connect_errno." ".$mysqli->connection_error;

}


if (isset($_POST['action']) && $_POST['action'] == 'delete'){

		$stmt = $mysqli->prepare("DELETE FROM VideoInventory WHERE name LIKE ?");

	if(!$stmt){

		echo "error on stmt";

	}

	$stmt->bind_param("s", $_POST['n']);	

	$stmt->execute();

	$stmt->close();
}


if (isset($_POST['action']) && $_POST['action'] == 'check'){

		$stmt = $mysqli->prepare("UPDATE VideoInventory SET rented = !rented WHERE name LIKE ?");

	if(!$stmt){

		echo "error on stmt";

	}

	$stmt->bind_param("s", $_POST['n']);	

	$stmt->execute();

	$stmt->close();
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

	$redirect = "http://web.engr.oregonstate.edu/~jurczakn/videoInventory.html";

	header("Location:{$redirect}", false);

}


$stmt = $mysqli->prepare("SELECT * FROM VideoInventory");

if(!$stmt){

	echo "error on stmt";

}

$stmt->execute();

$stmt->bind_result($id, $name, $category, $length, $rented);

$results = array();

while ($stmt->fetch()){

	$results[] = array('id' => $id, 'name' => $name, 'category' => $category, 'length' => $length, 'rented' => $rented);

}

echo json_encode($results);


?>

