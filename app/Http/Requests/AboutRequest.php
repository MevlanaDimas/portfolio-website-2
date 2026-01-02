<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class AboutRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'photo' => 'nullable|image|mimes:png,jpg,jpeg',
            'photo_name' => 'nullable|string|max:255',
            'bio' => 'required|string|max:1000',
        ];
    }

    /**
     * Get the validation messages that apply to the request.
     * 
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'photo.image' => 'Photo must be an image.',
            'photo.mimes' => 'Photo must be a png, jpg or jpeg image.',
            'photo_name.string' => 'Photo name must be a string.',
            'photo_name.max' => 'Photo name must be less than 255 characters.',
            'bio.required' => 'Bio is required.',
            'bio.string' => 'Bio must be a string.',
            'bio.max' => 'Bio must be less than 1000 characters.'
        ];
    }
}
