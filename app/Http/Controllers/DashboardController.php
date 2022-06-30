<?php

namespace App\Http\Controllers;

class DashboardController extends Controller
{
    public function review()
    {
        return $this->handleJsonResponse($this->service->review());
    }
}
