<?php

error_reporting(0);
ini_set('display_error', 0);

header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
header('Access-Control-Allow-Methods: GET, POST, PUT');

$postdata = file_get_contents("php://input");
$request = json_decode($postdata);
$bookmark = $request->bookmark . "\r\n";

$bookmarks = file_get_contents("bookmarks.txt");
$bookmarks .= $bookmark;
$fh = fopen("bookmarks.txt", "w") or die(array("status" => "failure!"));
fwrite($fh, $bookmarks);
fclose($fh);

echo json_encode(array("status" => "ok"));

?>