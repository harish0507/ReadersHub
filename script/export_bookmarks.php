<?php

error_reporting(0);
ini_set('display_error', 0);

header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
header('Access-Control-Allow-Methods: GET, POST, PUT');

$data = "\"Sl.No\",\"Bookmarks\"\n";

$fh = fopen("bookmarks.txt", "r") or die(array("status" => "failure!"));
$count = 1;
while (($line = fgets($fh)) !== false) {
    $line = trim($line);
    $data .= "\"{$count}\",\"{$line}\"\n";
    $count++;
}

header('Content-Type: application/csv');
header('Content-Disposition: attachement; filename="Bookmark.csv"');
echo $data;
exit;

?>