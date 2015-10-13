<?php

error_reporting(0);
ini_set('display_error', 0);

header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
header('Access-Control-Allow-Methods: GET, POST, PUT');

$json = array();

$fh = fopen("bookmarks.txt", "r") or die(array("status" => "failure!"));
while (($line = fgets($fh)) !== false) {
    $json[] = trim($line);
}

header('Content-Type: application/json');
echo json_encode($json);


