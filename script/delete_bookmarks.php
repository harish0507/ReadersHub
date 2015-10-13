<?php

error_reporting(0);
ini_set('display_error', 0);

header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
header('Access-Control-Allow-Methods: GET, POST, PUT');

$fh = fopen("bookmarks.txt", "w") or die(array("status" => "failure!"));
fclose($fh);

?>