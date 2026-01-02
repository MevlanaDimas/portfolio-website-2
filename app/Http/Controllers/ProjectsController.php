<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProjectRequest;
use App\Http\Resources\ProjectsResourece;
use App\Models\Projects;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;
use Throwable;

class ProjectsController extends Controller
{
    public function index(Request $request): Response
    {
        $perPage = $request->input('perPage', 25);
        $search = $request->input('search', '');
        
        $query = Projects::query()
            ->with('images')
            ->filter($search)
            ->orderByDesc('id');

        if ($perPage == -1 || $perPage > 100) {
            $perPage = 100;
        }

        $projects = ProjectsResourece::collection($query->paginate($perPage));

        return Inertia::render('project/index', [
            'projects' => $projects
        ]);
    }

    public function store(ProjectRequest $request): RedirectResponse
    {
        try {
            DB::transaction(function () use ($request) {
                $data = $request->validated();
                
                $project = Projects::create($data);

                if (!empty($data['images'])) {
                    foreach ($data['images'] as $image) {
                        $this->processImage($project, $image);
                    }
                }
            });

            $this->clearCache();
            return redirect()->back()->with('success', 'Project has been added successfully.');
        } catch (Throwable $e) {
            Log::error('Project store error: ' . $e->getMessage());
            return redirect()->back()->with('error', 'Failed to add project.');
        }
    }

    public function update(ProjectRequest $request, int $id): RedirectResponse
    {
        try {
            DB::transaction(function () use ($request, $id) {
                $project = Projects::findOrFail($id);
                $data = $request->validated();

                $project->update($data);

                $incomingImages = $request->input('images', []);
                $keptImageIds = array_filter(array_column($incomingImages, 'id'));

                // Delete removed images
                $project->images()->whereNotIn('id', $keptImageIds)->get()->each(function ($img) {
                    $this->deleteImageFile($img->image_url);
                    $img->delete();
                });

                // Add or Update images
                foreach ($incomingImages as $image) {
                    if (!empty($image['id'])) {
                        $project->images()->where('id', $image['id'])->update([
                            'image_name' => $image['image_name'] ?? null
                        ]);
                    } else {
                        $this->processImage($project, $image);
                    }
                }
            });

            $this->clearCache();
            return redirect()->back()->with('success', 'Project has been updated successfully.');
        } catch (Throwable $e) {
            Log::error('Project update error: ' . $e->getMessage());
            return redirect()->back()->with('error', 'Failed to update project.');
        }
    }

    public function destroy(int $id): RedirectResponse
    {
        try {
            DB::transaction(function () use ($id) {
                $project = Projects::with('images')->findOrFail($id);
                
                foreach ($project->images as $img) {
                    $this->deleteImageFile($img->image_url);
                }
                
                $project->delete();
            });

            $this->clearCache();
            return redirect()->back()->with('success', 'Project has been deleted successfully.');
        } catch (Throwable $e) {
            Log::error('Project delete error: ' . $e->getMessage());
            return redirect()->back()->with('error', 'Failed to delete project.');
        }
    }

    private function processImage(Projects $project, array $imageData): void
    {
        if (isset($imageData['image']) && $imageData['image'] instanceof \Illuminate\Http\UploadedFile) {
            $file = $imageData['image'];
            $originalName = $imageData['image_name'] ?? $file->getClientOriginalName();
            // Sanitize filename
            $filename = time() . '-' . Str::slug(pathinfo($originalName, PATHINFO_FILENAME)) . '.' . $file->getClientOriginalExtension();
            
            $path = Storage::disk('gcs')->putFileAs('projects', $file, $filename, 'public');
            $url = Storage::disk('gcs')->url($path);
            
            $project->images()->create([
                'image_url' => $url,
                'image_name' => $originalName,
            ]);
        }
    }

    private function deleteImageFile(string $url): void
    {
        $filename = basename($url);
        Storage::disk('gcs')->delete('projects/' . $filename);
    }

    private function clearCache(): void
    {
        Cache::forget('home.data');
    }
}
