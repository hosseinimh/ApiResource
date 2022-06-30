<?php

namespace App\Constants;

abstract class ErrorCodes
{
    const SERVER_ERROR = 500;
    const CLIENT_ERROR = 1000;
    
    const USER_NOT_FOUND = 1;
    
    const TOKEN_INVALID = 2;
    const TOKEN_EXPIRED = 3;
    const TOKEN_NOT_FOUND = 4;
    const TOKEN_BLACK_LISTED = 5;
    const TOKEN_NOT_PROVIDED = 6;

    const FORM_INPUT_INVALID = 7;
    const STORE_ERROR = 8;
    const ITEM_NOT_FOUND = 9;
    const UPDATE_ERROR = 10;
}