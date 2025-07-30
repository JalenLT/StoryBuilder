<?php

namespace App\Http\Requests;

use App\Models\Genre;
use Illuminate\Validation\Rule;
use Illuminate\Foundation\Http\FormRequest;

class StoreGenreRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return $this->user()->can('create', Genre::class);
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'max:255', Rule::unique(Genre::class, 'name')],
            'description' => ['required', 'string'],
            'image' => ['required', 'string', 'max:255'],
        ];
    }
}
