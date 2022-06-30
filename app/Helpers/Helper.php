<?php

namespace App\Helpers;

use App\Models\Error;
use DateTime;

class Helper
{
    public static function handleError(\Exception $e)
    {
        try {
            Error::create(['message' => $e->__toString()]);
        } catch (\Exception) {
        }
    }

    public static function logError($e)
    {
        try {
            if (is_string($e)) {
                Error::create(['message' => $e]);
            } else {
                Error::create(['message' => $e->__toString()]);
            }
        } catch (\Exception) {
        }
    }

    public static function randomNumbersString($length = 4)
    {
        try {
            $characters = '123456789';
            $randstring = '';

            for ($i = 0; $i < $length; $i++) {
                $randstring[$i] = $characters[rand(0, strlen($characters) - 1)];
            }

            return $randstring;
        } catch (\Exception) {
        }

        return '1234';
    }

    public static function resizeImage($file, $width)
    {
        try {
            $src = imagecreatefromjpeg($file);
            list($imgWidth) = getimagesize($file);
            $dst = $imgWidth > $width ? imagescale($src, $width) : $src;

            imagejpeg($dst, $file);
        } catch (\Exception) {
        }
    }
}
