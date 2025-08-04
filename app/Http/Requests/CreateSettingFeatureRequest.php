<?php

namespace App\Http\Requests;

use App\Models\Setting;
use Illuminate\Validation\Rule;
use Illuminate\Foundation\Http\FormRequest;

class CreateSettingFeatureRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        $setting = Setting::find($this->input('setting_id'));

        return $setting && $this->user()->can('update', $setting);
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'setting_id' => ['required', 'integer', 'exists:settings,id'],
            'feature_id' => ['required', 'integer', 'exists:features,id',
                Rule::unique('setting_features', 'feature_id')->where(function ($query) {
                    return $query->where('setting_id', $this->input('setting_id'));
                }),
            ],
        ];
    }
}
