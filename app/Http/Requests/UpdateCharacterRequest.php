<?php

namespace App\Http\Requests;

use App\Models\Character;
use Illuminate\Foundation\Http\FormRequest;

class UpdateCharacterRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        $character = Character::find($this->input('id'));

        return $character && $this->user()->can('update', $character);
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'id' => ['required', 'integer', 'exists:characters,id'],
            'first_name' => ['nullable', 'string', 'max:255'],
            'last_name' => ['nullable', 'string', 'max:255'],
            'alias' => ['nullable', 'string', 'max:255'],
            'description' => ['nullable', 'string'],
            'background' => ['nullable', 'string'],
            'age' => ['nullable', 'integer'],
            'gender' => ['nullable', 'string', 'max:255'],
            'motivation' => ['nullable', 'string'],
            'story_id' => ['nullable', 'integer', 'exists:stories,id'],
            'setting_id' => ['nullable', 'integer', 'exists:settings,id'],
        ];
    }
}
