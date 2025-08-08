<?php

namespace App\Http\Requests;

use App\Models\Character;
use Illuminate\Foundation\Http\FormRequest;

class StoreCharacterInvolvementRequest extends FormRequest
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
            'character_id' => ['required', 'integer', 'exists:characters,id'],
            'setting_id' => ['nullable', 'integer', 'exists:settings,id'],
            'feature_id' => ['nullable', 'integer', 'exists:features,id'],
            'block_id' => ['nullable', 'integer', 'exists:blocks,id'],
        ];
    }
}
