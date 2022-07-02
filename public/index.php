<?php

use Illuminate\Contracts\Http\Kernel;
use Illuminate\Http\Request;

define('LARAVEL_START', microtime(true));

$localhost = 1;
$framework = $localhost === 1 ? '//../' : '//../frm/';

if (file_exists(__DIR__ . $framework . 'storage/framework/maintenance.php')) {
    require __DIR__ . $framework . 'storage/framework/maintenance.php';
}

require __DIR__ . $framework . 'vendor/autoload.php';

$app = require_once __DIR__ . $framework . 'bootstrap/app.php';

$kernel = $app->make(Kernel::class);

$response = tap($kernel->handle(
    $request = Request::capture()
))->send();

$kernel->terminate($request, $response);
