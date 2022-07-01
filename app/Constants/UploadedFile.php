<?php

namespace App\Constants;

abstract class UploadedFile
{
    const OK = 1;
    const ERROR = 2;
    const UPLOAD_ERROR = 3;
    const MIME_TYPE_ERROR = 4;
    const NOT_UPLOADED_ERROR = 5;
    const EXCEPTION = 6;
}