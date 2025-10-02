<?php

namespace App\Http\Requests;

use App\Models\Point;
use App\Models\Story;
use Illuminate\Foundation\Http\FormRequest;

class UpdatePointRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        $point = Point::find($this->input('id'));
        if(is_null($point)){
            $story = Story::find($this->input('story_id'));
            return $story && $this->user()->can('create', [Point::class, $story]);
        }else{
            $point = Point::find($this->input('id'));
            return $point->getAttribute('creator_id') === $this->user()->getAttribute('id');
        }
    }

    protected function prepareForValidation(): void
    {
        $id = $this->input('id');

        $this->merge([
            'id' => blank($id) || $id === 'null' ? null : $id,
        ]);
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'id' => ['nullable', 'integer'],
            'text' => ['nullable', 'string'],
            'scene_id' => ['nullable', 'integer', 'exists:scenes,id'],
            'story_id' => ['nullable', 'integer', 'exists:stories,id'],
        ];
    }
}
