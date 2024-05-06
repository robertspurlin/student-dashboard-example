<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\StudentController;

Route::controller(StudentController::class)->group(function() {
    Route::get('/getStudents', 'getStudents');
    Route::get('/getStudent/{student}', 'getStudent');
    Route::post('/advanceStudent', 'advanceStudent');
    Route::post('/deleteStudent', 'deleteStudent');
    Route::post('/createNewStudent', 'createNewStudent');
    Route::post('/saveEditedStudent', 'saveEditedStudent');
});
