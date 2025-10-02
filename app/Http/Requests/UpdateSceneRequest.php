<?php

namespace App\Http\Requests;

use App\Models\Scene;
use Illuminate\Foundation\Http\FormRequest;

class UpdateSceneRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        $scene = Scene::find($this->input('id'));

        return $scene && $this->user()->can('update', $scene);
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'id' => ['required', 'integer', 'exists:scenes,id'],
            'title' => ['required', 'string', 'max:255'],
            'setting_id' => ['nullable', 'integer', 'exists:settings,id'],
        ];
    }
}
