<?php

namespace App\Http\Requests;

use App\Models\Block;
use App\Models\Story;
use Illuminate\Foundation\Http\FormRequest;

class StoreBlockConnectionRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        $story = Story::find($this->input('story_id'));

        return $story && $this->user()->can('create', [Block::class, $story]);
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'block_a_id' => ['required', 'integer', 'exists:blocks,id'],
            'block_b_id' => ['required', 'integer', 'exists:blocks,id'],
            'notes' => ['nullable', 'string'],
            'story_id' => ['required', 'integer', 'exists:stories,id'],
        ];
    }
}
