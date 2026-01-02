<?php

namespace App\Http\Controllers;

use App\Http\Resources\AboutsResource;
use App\Http\Resources\ProjectsResourece;
use App\Models\Abouts;
use App\Models\Projects;
use App\Models\User;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Illuminate\Support\Facades\Cache;
use Inertia\Inertia;
use Inertia\Response;
use Laravel\Fortify\Features;

class HomeController extends Controller
{
    private function getActivateAbout(): AnonymousResourceCollection
    {
        return AboutsResource::collection(Abouts::where('activate', true)->get());
    }

    private function getProjects(): AnonymousResourceCollection
    {
        return ProjectsResourece::collection(Projects::with('images')->get());
    }

    public function index(): Response
    {
        $data = Cache::remember('home.data', now()->addMonth(1), function () {
            $about = $this->getActivateAbout();
            $projects = $this->getProjects();
            return [
                'about' => $about,
                'projects' => $projects
            ];
        });

        return Inertia::render('welcome', [
            'data' => $data,
            'canRegister' => Features::enabled(Features::registration()) && User::doesntExist(),
        ]);
    }
}
