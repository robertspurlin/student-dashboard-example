<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class AdvanceStudentRequest extends FormRequest
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
        /**
         * Since we are not allowing any updates other than grade, 
         * it's the only actual validation rule that applies here. 
         * We can validate if the other fields are present and valid 
         * in the model but that might be a bit overkill. 
         */
        return [
            'id' => 'required|numeric',
            'grade' => 'required|numeric|between:1,12'
        ];
    }
}
