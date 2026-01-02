<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ProjectRequest extends FormRequest
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
            'title' => 'required|string|max:255',
            'images' => 'required|array|min:1',
            'images.*.id' => 'nullable|integer',
            'images.*.image' => 'nullable|image|mimes:png,jpg,jpeg',
            'images.*.image_name' => 'nullable|string|max:255',
            'link' => 'nullable|url',
            'github' => 'nullable|url',
            'description' => 'required|string|max:1000',
            'tags' => 'nullable|string'
        ];
    }

    /**
     * Get the vaidation messages that apply to the request.
     * 
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'title.required' => 'Title is required.',
            'title.string' => 'Title must be a string.',
            'title.max' => 'Title must be less than 255 characters.',
            'images.required' => 'Image is required.',
            'images.array' => 'Image must be an array.',
            'image.min' => 'At least one image is required.',
            'images.*.id.integer' => 'Image ID must be an integer.',
            'images.*.image.image' => 'Image must be an image.',
            'images.*.image.mimes' => 'Image must be a png, jpg or jpeg',
            'images.*.image_name.string' => 'Image must be a string.',
            'images.*.image_name.max' => 'Image must be less than 255 characters.',
            'link.url' => 'Link must be a URL.',
            'github.url' => 'Github link must be a URL.',
            'description.required' => 'Description is required.',
            'description.string' => 'Description must be a string.',
            'description.max' => 'Description must be less than 1000 characters.',
            'tags.string' => 'Tags must be a string.'
        ];
    }
}
