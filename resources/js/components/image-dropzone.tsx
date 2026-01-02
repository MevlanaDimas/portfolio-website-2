import { compressImage } from "@/lib/image-compression";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Upload } from "lucide-react";
import { ChangeEvent, DragEvent, useState } from "react";

interface ImageDropzoneProps {
    previewUrl?: string | null;
    onImageSelect: (file: File) => void;
    id: string;
    label?: string;
    className?: string;
    imageClassName?: string;
}

export function ImageDropzone({ previewUrl, onImageSelect, id, label = "Click to upload image", className, imageClassName = "max-h-32" }: ImageDropzoneProps) {
    const [isDragging, setIsDragging] = useState(false);

    const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files?.length) {
            const file = e.target.files[0];
            const compressed = await compressImage(file);
            onImageSelect(compressed);
            e.target.value = ''; // Reset so the same file can be selected again if needed
        }
    };

    const handleDragOver = (e: DragEvent) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = (e: DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
    };

    const handleDrop = async (e: DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
        if (e.dataTransfer.files?.length) {
            const file = e.dataTransfer.files[0];
            if (file.type.startsWith('image/')) {
                const compressed = await compressImage(file);
                onImageSelect(compressed);
            }
        }
    };

    return (
        <Label 
            htmlFor={id} 
            onDragOver={handleDragOver} onDragLeave={handleDragLeave} onDrop={handleDrop}
            className={`flex flex-col w-full justify-center items-center text-center gap-1 pt-2 cursor-pointer border-2 border-dashed rounded-md p-4 transition-colors ${isDragging ? 'border-primary bg-primary/10' : 'hover:bg-muted/50'} ${className}`}
        >
            {previewUrl ? (
                <img src={previewUrl} alt="Preview" className={`${imageClassName} object-contain rounded-md`} />
            ) : (
                <div className="flex flex-col items-center text-muted-foreground">
                    <Upload size={20} className="mb-2" />
                    <span className="text-xs">{label}</span>
                </div>
            )}
            <Input type="file" id={id} accept="image/*" onChange={handleFileChange} className="hidden" />
        </Label>
    );
}
