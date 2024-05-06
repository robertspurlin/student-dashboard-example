<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class SaveNewStudentRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'student' => 'required|array',
            'student.*.first_name' => 'required|string',
            'student.*.last_name' => 'required|string',
            'student.*.grade' => 'required|numeric|between:1,12',
            'student.*.classes' => 'required|string'
        ];
    }
}
