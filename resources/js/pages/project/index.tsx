import { CustomPagination } from "@/components/custom-pagination";
import { ProjectForm } from "@/components/project-form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import AppLayout from "@/layouts/app-layout";
import { handlePerPageChange } from "@/lib/utils";
import { index } from "@/routes/project";
import { BreadcrumbItem, Project, ProjectImages } from "@/types";
import { Head, router, usePage } from "@inertiajs/react";
import { ExternalLink, Github, TextSearch, X } from "lucide-react";
import { useState } from "react";


const breadcrumbs: BreadcrumbItem[] = [
    {
        title: "Project",
        href: index().url,
    },
];

function TagList({ tags }: { tags?: string | null }) {
    if (!tags) return <span className="text-muted-foreground">-</span>;

    const tagsArray = tags
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean);

    return (
        <div className="flex flex-wrap gap-2">
            {tagsArray.map((tag, i) => (
                <span key={i} className="text-xs text-muted-foreground px-2 py-0.5 rounded-md bg-muted/30">
                    {tag}
                </span>
            ))}
        </div>
    );
}

export default function ProjectIndex() {
  const { projects } = usePage().props as { projects: { data: Project[]; meta?: any } };
  const meta = projects?.meta;
  const path = index().url;
  const [search, setSearch] = useState("");

  const searchData = (e: React.FormEvent) => {
    e.preventDefault();
    router.get(path, { search }, { preserveScroll: true, replace: true });
  };

  const clearSearch = () => {
    setSearch("");
    router.get(path, { search: "" }, { preserveScroll: true, replace: true });
  };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head>
                <title>Project</title>
                <meta name="description" content="Browse through my collection of projects. See my skills in action across various technologies." />
            </Head>
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-5">
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <form onSubmit={searchData} className="w-full md:w-1/3">
                        <div className="relative">
                            <TextSearch className="absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                            <Input
                                type='text'
                                id="search"
                                name="search"
                                placeholder="Search project..."
                                onChange={(e) => setSearch(e.target.value)}
                                value={search}
                                className="pl-9"
                            />
                            {search && (
                                <button type="button" onClick={clearSearch} className="absolute right-2.5 top-1/2 -translate-y-1/2 cursor-pointer text-muted-foreground hover:text-foreground">
                                    <X size={16} />
                                </button>
                            )}
                        </div>
                    </form>
                    {meta && (
                        <div className="flex flex-row items-center gap-3">
                            <span className="text-sm">Row per page:</span>
                            <Select onValueChange={(value) => handlePerPageChange(parseInt(value), path)} defaultValue={String(meta.per_page)}>
                                <SelectTrigger className="w-[80px] cursor-pointer">
                                    <SelectValue placeholder="Row" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="25" className="cursor-pointer">25</SelectItem>
                                    <SelectItem value="50" className="cursor-pointer">50</SelectItem>
                                    <SelectItem value="100" className="cursor-pointer">100</SelectItem>
                                    <SelectItem value="-1" className="cursor-pointer">All</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    )}
                    <ProjectForm />
                </div>
                <div>
                    <Table>
                        <TableHeader className="border-b bg-muted">
                            <TableRow>
                                <TableHead className="w-[100px] text-center">No</TableHead>
                                <TableHead className="w-[150px]">Images</TableHead>
                                <TableHead className="w-[50px]">Title</TableHead>
                                <TableHead className="max-w-[400px]">Description</TableHead>
                                <TableHead className="w-[100px] text-center">Link</TableHead>
                                <TableHead className="w-[100px] text-center">Github</TableHead>
                                <TableHead className="w-[200px]">Tags</TableHead>
                                <TableHead className="w-[150px] text-center">Created At</TableHead>
                                <TableHead className="w-[150px] text-center">Updated At</TableHead>
                                <TableHead className="text-center">Action</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {projects.data.length > 0 ? (
                                projects.data.map((project: Project, index: number) => (
                                    <TableRow key={project.id} className="transition-colors hover:bg-muted-50">
                                        <TableCell className="text-center">{meta ? meta.from + index : index + 1}</TableCell>
                                        <TableCell>
                                            <div className="flex flex-wrap gap-2">
                                                {(project.images || []).map((image: ProjectImages) => (
                                                    <a key={image.id} href={image.image_url} target="_blank" rel="noreferrer" className="block">
                                                        <img src={image.image_url} alt={image.image_name || "Photo"} className="h-35 rounded-md object-cover border hover:scale-105 transition-transform" title={image.image_name} />
                                                    </a>
                                                ))}
                                            </div>
                                        </TableCell>
                                        <TableCell className="font-medium whitespace-normal">{project.title}</TableCell>
                                        <TableCell className="max-w-[400px]">
                                            <p className="whitespace-normal text-sm text-muted-foreground" title={project.description}>
                                                {project.description}
                                            </p>
                                        </TableCell>
                                        <TableCell className="text-center">
                                            {project.link && (
                                                <a href={project.link} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center text-muted-foreground hover:text-foreground">
                                                    <ExternalLink className="h-4 w-4" />
                                                </a>
                                            )}
                                        </TableCell>
                                        <TableCell className="text-center">
                                            {project.github && (
                                                <a href={project.github} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center text-muted-foreground hover:text-foreground">
                                                    <Github className="h-4 w-4" />
                                                </a>
                                            )}
                                        </TableCell>
                                        <TableCell>
                                            <TagList tags={project.tags} />
                                        </TableCell>
                                        <TableCell className="text-center text-xs text-muted-foreground">{project.created_at}</TableCell>
                                        <TableCell className="text-center text-xs text-muted-foreground">{project.updated_at}</TableCell>
                                        <TableCell>
                                            <div className="flex justify-center">
                                                <ProjectForm project={project} id={project.id} />
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))) : (
                                    <TableRow>
                                        <TableCell colSpan={10} className="text-center h-24 text-muted-foreground">
                                            No project data found.
                                        </TableCell>
                                    </TableRow>
                                
                            )}
                        </TableBody>
                    </Table>
                </div>
                {meta && (
                    <div>
                        <CustomPagination meta={meta} />
                    </div>
                )}
            </div>
        </AppLayout>
    )
}