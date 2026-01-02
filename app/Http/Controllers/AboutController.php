<?php

namespace App\Http\Controllers;

use App\Http\Requests\AboutRequest;
use App\Http\Resources\AboutsResource;
use App\Models\Abouts;
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

class AboutController extends Controller
{
    public function index(Request $request): Response
    {
        $perPage = $request->input('perPage', 25);
        $search = $request->input('search', '');
        
        $query = Abouts::query()->filter($search)
            ->orderByDesc('id');

        if ($perPage == -1 || $perPage > 100) {
            $perPage = 100;
        }

        $abouts = AboutsResource::collection($query->paginate($perPage));

        return Inertia::render('about/index', [
            'abouts' => $abouts
        ]);
    }

    public function activate(int $id): RedirectResponse
    {
        try {
            DB::transaction(function () use ($id) {
                Abouts::where('activate', true)->update([
                    'activate' => false
                ]);

                Abouts::findOrFail($id)->update([
                    'activate' => true
                ]);
            });

            $this->clearCache();
            return redirect()->back()->with('success', 'The selected about has been activated.');
        } catch (Throwable $e) {
            Log::error('About activation error: ' . $e->getMessage());
            return redirect()->back()->with('error', 'Failed to activate the selected about.');
        }
    }

    public function store(AboutRequest $request): RedirectResponse
    {
        try {
            DB::transaction(function () use ($request) {
                $data = $request->validated();
                
                if ($request->hasFile('photo')) {
                    $data['photo_url'] = $this->uploadPhoto($request->file('photo'), $request->photo_name);
                }
                
                Abouts::create($data);
            });

            $this->clearCache();
            return redirect()->back()->with('success', 'About has been added successfully.');
        } catch (Throwable $e) {
            Log::error('About store error: ' . $e->getMessage());
            return redirect()->back()->with('error', 'Failed to add about.');
        }
    }

    public function update(AboutRequest $request, int $id): RedirectResponse
    {
        try {
            DB::transaction(function () use ($request, $id) {
                $about = Abouts::findOrFail($id);
                $data = $request->validated();

                if ($request->hasFile('photo')) {
                    $data['photo_url'] = $this->uploadPhoto($request->file('photo'), $request->photo_name);
                }

                $about->update($data);
            });

            $this->clearCache();
            return redirect()->back()->with('success', 'About has been updated successfully.');
        } catch (Throwable $e) {
            Log::error('About update error: ' . $e->getMessage());
            return redirect()->back()->with('error', 'Failed to update about.');
        }
    }

    public function destroy(int $id): RedirectResponse
    {
        try {
            DB::transaction(function () use ($id) {
                Abouts::findOrFail($id)->delete();
            });

            $this->clearCache();
            return redirect()->back()->with('success', 'About has been deleted successfully.');
        } catch (Throwable $e) {
            Log::error('About delete error: ' . $e->getMessage());
            return redirect()->back()->with('error', 'Failed to delete about.');
        }
    }

    private function uploadPhoto($file, $customName = null): string
    {
        $name = $customName ?? $file->getClientOriginalName();
        $filename = time() . '-' . Str::slug(pathinfo($name, PATHINFO_FILENAME)) . '.' . $file->getClientOriginalExtension();
        $path = Storage::disk('gcs')->putFileAs('photos', $file, $filename, 'public');
        return Storage::disk('gcs')->url($path);
    }

    private function clearCache(): void
    {
        Cache::forget('home.data');
    }
}
