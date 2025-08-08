<?php

namespace App\Http\Requests;

use App\Models\Point;
use Illuminate\Foundation\Http\FormRequest;

class UpdatePointRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        $point = Point::find($this->input('id'));

        return $point->getAttribute('creator_id') === $this->user()->getAttribute('id');
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'id' => ['required', 'integer', 'exists:points,id'],
            'text' => ['required', 'string'],
        ];
    }
}
