<?php
$targetFolder = realpath(__DIR__.'/../frm').'/storage/app/public/img';
$linkFolder = $_SERVER['DOCUMENT_ROOT'].'/img';
unlink($linkFolder);
symlink($targetFolder, $linkFolder);

$targetFolder = realpath(__DIR__.'/../frm').'/storage/app/public/file';
$linkFolder = $_SERVER['DOCUMENT_ROOT'].'/files';
unlink($linkFolder);
symlink($targetFolder, $linkFolder);

echo 'Symlink process successfully completed';