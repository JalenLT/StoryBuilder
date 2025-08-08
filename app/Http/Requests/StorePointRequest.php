<?php

namespace App\Http\Requests;

use App\Models\Point;
use App\Models\Story;
use Illuminate\Foundation\Http\FormRequest;

class StorePointRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        $story = Story::find($this->input('story_id'));

        return $story && $this->user()->can('create', [Point::class, $story]);
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'text' => ['required', 'string'],
            'story_id' => ['required', 'integer', 'exists:stories,id'],
        ];
    }
}
