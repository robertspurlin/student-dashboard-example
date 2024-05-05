<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\StudentController;

Route::controller(StudentController::class)->group(function() {
    Route::get('/getStudents', 'getStudents');
    Route::get('/getStudent/{student}', 'getStudent');
    Route::post('/updateStudentGrade', 'updateStudentGrade');
});
