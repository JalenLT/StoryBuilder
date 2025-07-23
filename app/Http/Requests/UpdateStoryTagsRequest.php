<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateStoryTagsRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        $story = Story::find($this->input('story_id'));

        return $story && $this->user()->can('update', $story);
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
            'tags' => ['required', 'array', 'min:1'],
            'tags.*' => ['required', 'integer', 'exists:tags,id'],
        ];
    }
}
