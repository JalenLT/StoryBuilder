<?php

namespace App\Http\Requests;

use App\Models\Character;
use Illuminate\Foundation\Http\FormRequest;

class StoreCharacterRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return $this->user()->can('create', Character::class);
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'first_name' => ['required', 'string', 'max:255'],
            'last_name' => ['required', 'string', 'max:255'],
            'alias' => ['nullable', 'string', 'max:255'],
            'description' => ['required', 'string'],
            'background' => ['nullable', 'string'],
            'age' => ['required', 'integer'],
            'gender' => ['required', 'string', 'max:255'],
            'motivation' => ['nullable', 'string'],
            'story_id' => ['required', 'integer', 'exists:stories,id'],
            'setting_id' => ['nullable', 'integer', 'exists:settings,id'],
        ];
    }
}
