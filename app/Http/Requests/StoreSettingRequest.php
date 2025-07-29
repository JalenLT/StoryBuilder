<?php

namespace App\Http\Requests;

use App\Models\Setting;
use Illuminate\Validation\Rule;
use Illuminate\Foundation\Http\FormRequest;

class StoreSettingRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return $this->user()->can('create', Setting::class);
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'max:255', Rule::unique(Setting::class, 'name')],
            'description' => ['required', 'string'],
            'world' => ['nullable', 'string', 'max:255'],
            'era' => ['nullable', 'string', 'max:255'],
            'climate' => ['nullable', 'string', 'max:255'],
            'story_id' => ['required', 'integer', 'exists:stories,id'],
        ];
    }
}
