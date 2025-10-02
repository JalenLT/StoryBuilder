<?php

namespace App\Http\Requests;

use App\Models\Setting;
use Illuminate\Foundation\Http\FormRequest;

class UpdateSettingRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        $setting = Setting::find($this->input('id'));

        return $setting && $this->user()->can('update', $setting);
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'id' => ['required', 'integer', 'exists:settings,id'],
            'name' => ['nullable', 'string', 'max:255'],
            'description' => ['nullable', 'string'],
            'world' => ['nullable', 'string', 'max:255'],
            'era' => ['nullable', 'string', 'max:255'],
            'climate' => ['nullable', 'string', 'max:255'],
            'story_id' => ['required', 'integer', 'exists:stories,id'],
        ];
    }
}
