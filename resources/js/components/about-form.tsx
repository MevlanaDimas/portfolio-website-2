import { destroy, store, update } from "@/routes/about";
import { About } from "@/types";
import { router, useForm } from "@inertiajs/react";
import { useState } from "react";
import { toast } from "sonner";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "./ui/button";
import { Minus, Upload, UserRoundPlus, View } from "lucide-react";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import InputError from "./input-error";
import { Input } from "./ui/input";
import { DeleteConfirmDialog } from "./delete-confirm-dialog";
import { useObjectUrlCleanup } from "@/hooks/use-object-url-cleanup";
import { ImageDropzone } from "./image-dropzone";


interface AboutFormProps {
    about?: About;
    id?: number;
}

export const AboutForm = ({ about, id }: AboutFormProps) => {
    const method = about ? 'patch' : 'post';
    const [open, setOpen] = useState<boolean>(false);
    const [previewUrl, setPreviewUrl] = useState<string[]>([]);

    useObjectUrlCleanup(previewUrl);

    const {data, setData, post, processing, errors, reset, clearErrors} = useForm({
        bio: about?.bio || '',
        photo_name: about?.photo_name || '',
        photo: null as File | null,
    });

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const commonCallbacks = {
            onSuccess: () => {
                reset();
                clearErrors();
                setOpen(false);
                toast.success(`About data has been ${about ? 'updated' : 'saved'} successfully.`);
            },
            onError: () => {
                toast.error(`Failed to ${about ? 'update' : 'save'} about data.`);
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
                toast.success('About data has been deleted successfully.');
            },
            onError: () => {
                toast.error('Failed to delete about data.');
            },
            preserveScroll: false
        });
    }

    const handleImageSelect = (file: File) => {
            const newPreview = URL.createObjectURL(file);
            
            if (previewUrl[0]?.startsWith('blob:')) {
                URL.revokeObjectURL(previewUrl[0]);
            }
            
            setData(data => ({
                ...data,
                photo: file,
                photo_name: file.name
            }));
            setPreviewUrl([newPreview]);
    }

    const handleRemoveFile = () => {
        if (previewUrl[0]?.startsWith('blob:')) {
            URL.revokeObjectURL(previewUrl[0]);
        }

        setData(data => ({
            ...data,
            photo: null,
            photo_name: ''
        }));
        setPreviewUrl([]);
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                {about ? (
                    <Button variant="secondary" size="icon" className="size-8 cursor-pointer">
                        <View size={16} />
                    </Button>
                ) : (
                    <Button variant="outline" className="cursor-pointer">
                        <UserRoundPlus className="mr-2 size-4" />
                        Add About
                    </Button>
                )}
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
                <DialogHeader>
                    <DialogTitle>About Form</DialogTitle>
                    <DialogDescription>
                        {about ? 'Update about infromation' : 'Fill out the form to add a new about'}
                    </DialogDescription>
                </DialogHeader>
                <div className="max-h-[60vh] overflow-y-auto pr-4">
                    <form className="flex flex-col space-y-2" onSubmit={handleSubmit}>
                        <h5 className="text-[14.3px] -mb-2">Photo</h5>
                        <div className="flex flex-row space-y-2 mt-2 border p-3 rounded-md relative">
                            <div className="w-full">
                                <ImageDropzone
                                    id="photo"
                                    previewUrl={previewUrl[0] || about?.photo_url}
                                    onImageSelect={handleImageSelect}
                                    imageClassName="max-h-48"
                                />
                                <Input type="text" id="photo_name" name="photo_name" value={data.photo_name} className="mt-5" readOnly />
                                <InputError message={errors.photo} />
                            </div>
                            {previewUrl.length > 0 && (
                                <Button type="button" variant="destructive" size="icon" onClick={handleRemoveFile} className="absolute top-1 right-1 -mt-3 -mr-3 size-6 rounded-full hover:!bg-red-900 cursor-pointer">
                                    <Minus size={14} />
                                </Button>
                            )}
                        </div>
                        <Label className="flex flex-col gap-1 cursor-text">
                            Bio
                            <Textarea
                                id="Bio"
                                name="Bio"
                                placeholder="Bio"
                                value={data.bio}
                                onChange={e => setData('bio', e.target.value)}
                            />
                            <InputError message={errors.bio} className="mt-1" />
                        </Label>
                        <DialogFooter className="gap-2 pt-4">
                            <div className="flex justify-between w-full">
                                {about && (
                                    <DeleteConfirmDialog 
                                        onDelete={handleDelete} 
                                        disabled={processing}
                                        description="This action cannot be undone. This will permanently delete this about data from the server."
                                    />
                                )}
                            </div>
                            <div className="flex gap-2">
                                <DialogClose asChild>
                                    <Button type="button" variant="secondary" className="cursor-pointer">Cancel</Button>
                                </DialogClose>
                                <Button type="submit" disabled={processing} className="cursor-pointer">
                                    {about ? 'Update' : 'Save'}
                                </Button>
                            </div>
                        </DialogFooter>
                    </form>
                </div>
            </DialogContent>
        </Dialog>
    )
}