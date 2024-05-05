<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use App\Models\Student;
use App\Http\Requests\StoreStudent;

class StudentController extends Controller
{
    /**
     * getStudents
     * 
     * Returns all Students.
     *
     * @return Response
     */
    public function getStudents(): Response
    {
        return response(Student::all(), '200');
    }


    /**
     * getStudent
     * 
     * Returns a Student given an ID.
     *
     * @param Student $student
     * @return Response
     */
    public function getStudent(Student $student): Response
    {
        return response($student, '200');
    }

    /**
     * updateStudentGrade
     * 
     * Updates the grade given a valid Student. 
     * See StoreStudent for validation of request.
     *
     * @param StoreStudent $request
     * @return Response
     */
    public function updateStudentGrade(StoreStudent $request): Response
    {
        $student = Student::findOrFail($request->id);
        $student->grade = $request->grade;
        $student->save();

        return response("Student updated", 200);
    }
}
