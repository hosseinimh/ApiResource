<!DOCTYPE html>
<html lang="en">

<head>
  <base href="./">
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, shrink-to-fit=no">
  <meta name="description" content="">
  <meta name="author" content="">
  <meta name="keyword" content="">
  <title>{{ __('general.title') }}</title>
  <link rel="apple-touch-icon" sizes="180x180" href="{{$THEME::FAVICONS_PATH}}/apple-touch-icon.png">
  <link rel="icon" type="image/png" sizes="32x32" href="{{$THEME::FAVICONS_PATH}}/favicon-32x32.png">
  <link rel="icon" type="image/png" sizes="16x16" href="{{$THEME::FAVICONS_PATH}}/favicon-16x16.png">
  <link rel="manifest" href="{{$THEME::FAVICONS_PATH}}/site.webmanifest">
  <link rel="mask-icon" href="{{$THEME::FAVICONS_PATH}}/safari-pinned-tab.svg" color="#5bbad5">
  <meta name="msapplication-TileColor" content="#da532c">
  <meta name="theme-color" content="#ffffff">
  <link rel="stylesheet" href="{{$THEME::VENDORS_PATH}}/simplebar/css/simplebar.css">
  <link rel="stylesheet" href="{{$THEME::CSS_PATH}}/vendors/simplebar.css">
  @php
  try {
  $filename = 'assets/css/style.css';
  $fileModified = substr(md5(filemtime($filename)), 0, 6);
  } catch (\Exception) {
  $fileModified = '';
  }
  @endphp
  <link href="{{$THEME::CSS_PATH}}/style.css?v={{$fileModified}}" rel="stylesheet">
</head>

<body>
  <div id="root"></div>
  <div id="loading" class="loading-wrapper" style="display: flex">
    <div class="loading"></div>
    <p>{{ __('general.loading') }}</p>
  </div>
  @php
  try {
  $filename = 'assets/js/index.js';
  $fileModified = substr(md5(filemtime($filename)), 0, 6);
  } catch (\Exception) {
  $fileModified = '';
  }
  @endphp
  <script src="{{$THEME::VENDORS_PATH}}/@coreui/coreui/js/coreui.bundle.min.js"></script>
  <script src="{{$THEME::VENDORS_PATH}}/simplebar/js/simplebar.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/prismjs@1.24.1/prism.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/prismjs@1.24.1/plugins/autoloader/prism-autoloader.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/prismjs@1.24.1/plugins/unescaped-markup/prism-unescaped-markup.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/prismjs@1.24.1/plugins/normalize-whitespace/prism-normalize-whitespace.js"></script>
  <script src="{{$THEME::VENDORS_PATH}}/@coreui/utils/js/coreui-utils.js"></script>
  <script src="{{$THEME::JS_PATH}}/main.js"></script>
  <script src="{{$THEME::JS_PATH}}/index.js?v={{$fileModified}}"></script>
  <script type="text/javascript">
    document.addEventListener("DOMContentLoaded", function(event) {
      document.getElementById('loading').style.display = 'none';
    });
  </script>
</body>

</html>