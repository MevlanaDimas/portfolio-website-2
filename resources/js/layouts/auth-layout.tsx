import AuthLayoutTemplate from '@/layouts/auth/auth-simple-layout';
import { usePage } from '@inertiajs/react';
import { useEffect } from 'react';
import { toast, Toaster } from 'sonner';

export default function AuthLayout({
    children,
    title,
    description,
    ...props
}: {
    children: React.ReactNode;
    title: string;
    description: string;
}) {
    const { flash }: any = usePage().props;

    useEffect(() => {
        if (flash && flash.success) {
            toast.success(flash.success);
        }
        if (flash && flash.error) {
            toast.error(flash.error);
        }
        if (flash && flash.warning) {
            toast.warning(flash.warning);
        }
        if (flash && flash.info) {
            toast.info(flash.info);
        }
    }, [flash]);

    return (

        <AuthLayoutTemplate title={title} description={description} {...props}>
            <Toaster position='top-center' duration={3000} richColors />
            {children}
        </AuthLayoutTemplate>
    );
}
