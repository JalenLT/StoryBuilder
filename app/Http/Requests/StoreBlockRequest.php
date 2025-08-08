<?php

namespace App\Http\Requests;

use App\Models\Block;
use App\Models\Story;
use Illuminate\Foundation\Http\FormRequest;

class StoreBlockRequest extends FormRequest
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
            'story_id' => ['required', 'integer', 'exists:stories,id'],
            'title' => ['required', 'string', 'max:255'],
            'setting_id' => ['required', 'integer', 'exists:settings,id'],
        ];
    }
}
