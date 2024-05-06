<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use App\Models\Student;
use App\Http\Requests\AdvanceStudentRequest;
use App\Http\Requests\DeleteStudentRequest;
use App\Http\Requests\SaveNewStudentRequest;
use App\Http\Requests\SaveEditedStudentRequest;

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
        return response(Student::all(), 200);
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
        return response($student, 200);
    }

    /**
     * advanceStudent
     * 
     * Updates the grade given a valid Student. 
     * See AdvanceStudentRequest for validation of request.
     *
     * @param AdvanceStudentRequest $request
     * @return Response
     */
    public function advanceStudent(AdvanceStudentRequest $request): Response
    {
        $student = Student::findOrFail($request->id);
        $student->grade = $request->grade;
        $student->save();

        return response("Student updated", 200);
    }

    /**
     * deleteStudent
     * 
     * Delete the user given a valid Student.
     * See AdvanceStudentRequest for validation of request.
     *
     * @param DeleteStudentRequest $request
     * @return Response
     */
    public function deleteStudent(DeleteStudentRequest $request): Response 
    {
        $student = Student::findOrFail($request->id);
        $student->delete();

        return response("Student deleted", 200);
    }

    /**
     * createNewStudent
     * 
     * Creates new Student. 
     *
     * @param SaveNewStudentRequest $request
     * @return Response
     */
    public function createNewStudent(SaveNewStudentRequest $request): Response
    {
        Student::create($request->student);
        return response("Student created", 201);
    }


    /**
     * saveEditedStudent
     * 
     * Save an edited student.
     *
     * @param SaveEditedStudentRequest $request
     * @return Response
     */
    public function saveEditedStudent(SaveEditedStudentRequest $request): Response 
    {
        $student = Student::findOrFail($request->id);
        $student->first_name = $request->first_name;
        $student->last_name = $request->last_name;
        $student->grade = $request->grade;
        $student->classes = $request->classes;
        $student->save();

        return response("Student saved", 200);
    }
}
