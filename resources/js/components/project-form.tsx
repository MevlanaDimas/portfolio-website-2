import { destroy, store, update } from "@/routes/project";
import { Project } from "@/types";
import { router, useForm } from "@inertiajs/react";
import { useState } from "react";
import { toast } from "sonner";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "./ui/button";
import { Cross, Plus, Trash2, Upload, View } from "lucide-react";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import InputError from "./input-error";
import { Input } from "./ui/input";
import { DeleteConfirmDialog } from "./delete-confirm-dialog";
import { useObjectUrlCleanup } from "@/hooks/use-object-url-cleanup";
import { ImageDropzone } from "./image-dropzone";


interface ProjectFormProps {
    project?: Project;
    id?: number;
}

export const ProjectForm = ({ project, id }: ProjectFormProps) => {
    const method = project ? 'patch' : 'post';
    const [open, setOpen] = useState<boolean>(false);
    
    // Initialize previews lazily based on project data
    const [previewUrl, setPreviewUrl] = useState<(string | null)[]>(() => {
        if (project?.images?.length) return project.images.map(i => i.image_url);
        return [null];
    });

    const {data, setData, post, processing, errors, reset, clearErrors} = useForm({
        title: project?.title || '',
        images: project?.images?.length ? project.images.map(i => ({
            id: i.id,
            image_url: i.image_url,
            image_name: i.image_name,
            image: null as File | null
        })) : [{ id: null, image_url: '', image_name: '', image: null as File | null }],
        link: project?.link || '',
        github: project?.github || '',
        description: project?.description || '',
        tags: project?.tags || ''
    });

    useObjectUrlCleanup(previewUrl);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const commonCallbacks = {
            onSuccess: () => {
                reset();
                clearErrors();
                // Reset previews to default state (empty or project initial)
                setPreviewUrl(project?.images?.length ? project.images.map(i => i.image_url) : [null]);
                setOpen(false);
                toast.success(`Project data has been ${project ? 'updated' : 'saved'} successfully.`);
            },
            onError: () => {
                toast.error(`Failed to ${project ? 'update' : 'save'} project data.`);
            }
        };

        if (method === 'post') {
            post(store().url, commonCallbacks);
        } else {
            post(update(id).url, commonCallbacks);
        }
    }

    const handleDelete = () => {
        if (!id) return;
        router.delete(destroy(id).url, {
            onSuccess: () => {
                reset();
                clearErrors();
                setOpen(false);
                toast.success('Project data has been deleted successfully.');
            },
            onError: () => {
                toast.error('Failed to delete project data.');
            },
            preserveScroll: false
        });
    }

    const handleImageSelect = (file: File, index: number) => {
            const newPreview = URL.createObjectURL(file);

            // Immediately revoke the old blob URL if it exists to free memory
            if (previewUrl[index]?.startsWith('blob:')) {
                URL.revokeObjectURL(previewUrl[index]!);
            }

            const newImages = [...data.images];
            newImages[index] = {
                ...newImages[index],
                image: file,
                image_name: file.name,
            };
            
            const newPreviews = [...previewUrl];
            newPreviews[index] = newPreview;
            
            setData('images', newImages);
            setPreviewUrl(newPreviews);
    }

    const handleRemoveImage = (index: number) => {
        // Revoke the blob URL if it exists
        if (previewUrl[index]?.startsWith('blob:')) {
            URL.revokeObjectURL(previewUrl[index]!);
        }

        const newImages = data.images.filter((_, i) => i !== index);
        const newPreviews = previewUrl.filter((_, i) => i !== index);
        setData('images', newImages);
        setPreviewUrl(newPreviews);
    }

    const handleAddImage = () => {
        setData('images', [...data.images, { id: null, image_url: '', image_name: '', image: null }]);
        setPreviewUrl([...previewUrl, null]);
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                {project ? (
                    <Button variant="secondary" size="icon" className="size-8 cursor-pointer">
                        <View size={16} />
                    </Button>
                ) : (
                    <Button variant="outline" className="cursor-pointer">
                        <Cross className="mr-2 size-4" />
                        Add Project
                    </Button>
                )}
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
                <DialogHeader>
                    <DialogTitle>Project Form</DialogTitle>
                    <DialogDescription>
                        {project ? 'Update project information' : 'Fill out the form to add a new project'}
                    </DialogDescription>
                </DialogHeader>
                <div className="max-h-[70vh] overflow-y-auto pr-4">
                    <form className="flex flex-col space-y-4" onSubmit={handleSubmit}>
                        
                        {/* Title */}
                        <div className="space-y-1">
                            <Label htmlFor="title">Title</Label>
                            <Input 
                                id="title" 
                                value={data.title} 
                                onChange={e => setData('title', e.target.value)} 
                                placeholder="Project Title"
                            />
                            <InputError message={errors.title} />
                        </div>

                        {/* Images */}
                        <div className="space-y-2">
                            <div className="flex items-center justify-between">
                                <Label>Images</Label>
                                <Button type="button" variant="outline" size="sm" onClick={handleAddImage} className="h-8 cursor-pointer">
                                    <Plus size={14} className="mr-1" /> Add Image
                                </Button>
                            </div>
                            
                            <div className="space-y-3">
                                {data.images.map((img, index) => (
                                    <div key={index} className="flex flex-row gap-3 items-start border p-3 rounded-md relative">
                                        <div className="flex-1 space-y-2">
                                            <ImageDropzone
                                                id={`image-${index}`}
                                                previewUrl={previewUrl[index] || img.image_url}
                                                onImageSelect={(file) => handleImageSelect(file, index)}
                                                label={`Click to upload image ${index + 1}`}
                                            />
                                            <Input 
                                                type="text" 
                                                placeholder="Image Name" 
                                                value={img.image_name} 
                                                className="h-8 text-xs"
                                                readOnly
                                            />
                                            <InputError message={errors[`images.${index}.image` as keyof typeof errors]} />
                                        </div>
                                        <Button 
                                            type="button" 
                                            variant="destructive" 
                                            size="icon" 
                                            onClick={() => handleRemoveImage(index)} 
                                            aria-label="Remove image"
                                            className="shrink-0 cursor-pointer hover:!bg-red-900"
                                        >
                                            <Trash2 size={16} />
                                        </Button>
                                    </div>
                                ))}
                            </div>
                            <InputError message={errors.images} />
                        </div>

                        {/* Description */}
                        <div className="space-y-1">
                            <Label htmlFor="description">Description</Label>
                            <Textarea
                                id="description"
                                placeholder="Project Description"
                                value={data.description}
                                onChange={e => setData('description', e.target.value)}
                                className="min-h-[100px]"
                            />
                            <InputError message={errors.description} />
                        </div>

                        {/* Links */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-1">
                                <Label htmlFor="link">Project Link</Label>
                                <Input 
                                    id="link" 
                                    value={data.link} 
                                    onChange={e => setData('link', e.target.value)} 
                                    placeholder="https://..."
                                />
                                <InputError message={errors.link} />
                            </div>
                            <div className="space-y-1">
                                <Label htmlFor="github">Github Link</Label>
                                <Input 
                                    id="github" 
                                    value={data.github} 
                                    onChange={e => setData('github', e.target.value)} 
                                    placeholder="https://github.com/..."
                                />
                                <InputError message={errors.github} />
                            </div>
                        </div>

                        {/* Tags */}
                        <div className="space-y-1">
                            <Label htmlFor="tags">Tags</Label>
                            <Input 
                                id="tags" 
                                value={data.tags} 
                                onChange={e => setData('tags', e.target.value)} 
                                placeholder="React, Laravel, Tailwind (comma separated)"
                            />
                            <InputError message={errors.tags} />
                        </div>

                        <DialogFooter className="gap-2 pt-4">
                            <div className="flex justify-between w-full">
                                {project && (
                                    <DeleteConfirmDialog 
                                        onDelete={handleDelete} 
                                        disabled={processing}
                                        description="This action cannot be undone. This will permanently delete this project data from the server."
                                    />
                                )}
                            </div>
                            <div className="flex gap-2 ml-auto">
                                <DialogClose asChild>
                                    <Button type="button" variant="secondary" className="cursor-pointer">Cancel</Button>
                                </DialogClose>
                                <Button type="submit" disabled={processing} className="cursor-pointer">
                                    {project ? 'Update' : 'Save'}
                                </Button>
                            </div>
                        </DialogFooter>
                    </form>
                </div>
            </DialogContent>
        </Dialog>
    )
}