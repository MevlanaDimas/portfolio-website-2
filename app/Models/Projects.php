<?php

declare(strict_types=1);

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Projects extends Model
{
    protected $fillable = [
        'title',
        'description',
        'link',
        'github_link',
        'tags'
    ];

    public function images(): HasMany
    {
        return $this->hasMany(ProjectPhotos::class, 'project_id');
    }

    public function scopeFilter(Builder $query, string $search): void
    {
        $query->when($search, function ($q, $search) {
            $q->where(function ($subQ) use ($search) {
                $subQ->where('title', 'LIKE', "%{$search}%")
                     ->orWhere('description', 'LIKE', "%{$search}%")
                     ->orWhere('tags', 'LIKE', "%{$search}%")
                     ->orWhereHas('images', function ($imagesQuery) use ($search) {
                         $imagesQuery->where('image_name', 'LIKE', "%{$search}%");
                     });
            });
        });
    }
}
