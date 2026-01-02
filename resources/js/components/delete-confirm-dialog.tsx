import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

interface DeleteConfirmDialogProps {
    onDelete: () => void;
    triggerText?: string;
    title?: string;
    description?: string;
    disabled?: boolean;
}

export function DeleteConfirmDialog({ 
    onDelete, 
    triggerText = "Delete", 
    title = "Are you absolutely sure?", 
    description = "This action cannot be undone. This will permanently delete this data from the server.",
    disabled = false
}: DeleteConfirmDialogProps) {
    return (
        <AlertDialog>
            <AlertDialogTrigger asChild disabled={disabled}>
                <Button type="button" variant="destructive" className="hover:!bg-red-900 cursor-pointer">{triggerText}</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>{title}</AlertDialogTitle>
                    <AlertDialogDescription>{description}</AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel className="cursor-pointer">Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={onDelete} className="bg-red-600 hover:bg-red-700 text-white cursor-pointer">Delete</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
