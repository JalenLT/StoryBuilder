<?php

namespace App\Http\Requests;

use App\Models\Story;
use Illuminate\Foundation\Http\FormRequest;

class StoreEdgeRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return $this->user()->can('create', Story::class);
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'source' => ['required', 'integer', 'exists:nodes,id'],
            'target' => ['required', 'integer', 'exists:nodes,id'],
            'type' => ['required', 'string', 'max:255'],
            'label' => ['required', 'string', 'max:255'],
            'story_id' => ['required', 'integer', 'exists:stories,id'],
        ];
    }
}
