<?php

declare(strict_types=1);

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ProjectPhotos extends Model
{
    protected $fillable = [
        'project_id',
        'image_url',
        'image_name'
    ];

    public function project(): BelongsTo
    {
        return $this->belongsTo(Projects::class, 'project_id');
    }
}
