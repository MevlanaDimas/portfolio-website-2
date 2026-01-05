<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Spatie\Sitemap\Sitemap;
use Spatie\Sitemap\Tags\Url;
use App\Models\Projects;

class GenerateSitemap extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:generate-sitemap';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Generate the sitemap for the website';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $sitemap = Sitemap::create()
            ->add(Url::create(route('home'))
                ->setPriority(1.0)
                ->setChangeFrequency(Url::CHANGE_FREQUENCY_DAILY));

        // NOTE: Based on your routes/web.php, the 'project' routes are currently protected by auth.
        // If you create a public route for projects (e.g., Route::get('/project/{id}', ...)->name('project.show')),
        // you can uncomment the code below to add them to the sitemap dynamically using your Model.
        
        /*
        Projects::all()->each(function (Projects $project) use ($sitemap) {
            // Assuming you have a named route 'project.show'
            // $sitemap->add(Url::create(route('project.show', $project->id))
            //     ->setPriority(0.8)
            //     ->setChangeFrequency(Url::CHANGE_FREQUENCY_WEEKLY));
        });
        */

        $sitemap->writeToFile(public_path('sitemap.xml'));
        
        $this->info('Sitemap generated successfully.');
    }
}
