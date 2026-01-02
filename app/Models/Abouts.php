<?php

declare(strict_types=1);

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;

class Abouts extends Model
{
    protected $fillable = [
        'photo_url',
        'photo_name',
        'bio',
        'activate'
    ];

    public function scopeFilter(Builder $query, string $search = ''): void
    {
        if ($search) {
            $query->where(function ($q) use ($search) {
                $q->where('photo_name', 'LIKE', "%{$search}%")
                  ->orWhere('bio', 'LIKE', "%{$search}%");
            });
        }
    }
}
