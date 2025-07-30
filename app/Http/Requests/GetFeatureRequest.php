<?php

namespace App\Http\Requests;

use App\Models\Feature;
use Illuminate\Foundation\Http\FormRequest;

class GetFeatureRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        $feature = Feature::find($this->input('id'));

        return $feature && $this->user()->can('view', $feature);
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'id' => ['required', 'integer', 'exists:features,id'],
        ];
    }
}
