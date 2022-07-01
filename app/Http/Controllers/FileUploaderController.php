<?php

namespace App\Http\Controllers;

use App\Constants\UploadedFile;
use App\Helpers\Helper;
use Illuminate\Http\Request;
use Exception;

class FileUploaderController extends Controller
{
    private $bookImageStorage;

    function __construct()
    {
        $this->bookImageStorage = 'public/img/books';
    }

    public function uploadBookImage(Request $request, $entity)
    {
        $result = ['uploaded' => UploadedFile::NOT_UPLOADED_ERROR, 'uploadedText' => ''];

        if ($request->hasFile('image') && $request->file('image')->isValid()) {
            $fileMimeType = $request->file('image')->getMimeType();

            if ($fileMimeType === 'image/jpeg' || $fileMimeType === 'image/png') {
                $path = $request->image->store($this->bookImageStorage);
                Helper::resizeImage(storage_path('app') . '/' . $path, 1000);

                if ($path) {
                    @unlink(storage_path('app') . '/' . $this->bookImageStorage . '/' . $entity->image);

                    $data = ['image' => basename($path)];

                    if ($entity->update($data)) {
                        $result['uploaded'] = UploadedFile::OK;
                    } else {
                        $result['uploaded'] = UploadedFile::ERROR;
                    }
                } else {
                    $result['uploaded'] = UploadedFile::UPLOAD_ERROR;
                }
            } else {
                $result['uploaded'] = UploadedFile::MIME_TYPE_ERROR;
            }
        } else {
            $result['uploaded'] = UploadedFile::NOT_UPLOADED_ERROR;
        }

        $result['uploadedText'] = $this->getUploadedText($result['uploaded']);

        return $result;
    }

    private function getUploadedText($uploaded)
    {
        $text = __('general.uploaded_undefined');

        if ($uploaded >= 1 && $uploaded <= 6) {
            $text = __('general.uploaded_' . $uploaded);
        }

        return $text;
    }
}
