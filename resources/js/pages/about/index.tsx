import { AboutForm } from "@/components/about-form";
import { CustomPagination } from "@/components/custom-pagination";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import AppLayout from "@/layouts/app-layout";
import { handlePerPageChange } from "@/lib/utils";
import { index, acivate } from "@/routes/about";
import { About, BreadcrumbItem } from "@/types";
import { Head, router, usePage } from "@inertiajs/react";
import { Check, TextSearch, X } from "lucide-react";
import { useState } from "react";


const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'About',
        href: index().url
    }
];

export default function AboutIndex() {
    const { abouts }: any = usePage().props;
    const meta = abouts.meta;
    const path = index().url;
    const [search, setSearch] = useState('');

    const searchData = (e: React.FormEvent) => {
        e.preventDefault();
        router.get(path, { search: search}, { preserveScroll: true, replace: true});
    }

    const clearSearch = () => {
        setSearch('');
        router.get(path, { search: '' }, { preserveScroll: true, replace: true});
    }

    const handleActivate = (id: number) => {
        router.patch(acivate(id).url);
    }

    const activateStatus = (active: number) => {
        if (active === 1) {
            return (
                <Check className="size-5 text-green-500 mx-auto" />
            )
        } else {
            return (
                <X className="size-5 text-red-500 mx-auto" />
            )
        }
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="About" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-5">
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <form onSubmit={searchData} className="w-full md:w-1/3">
                        <div className="relative">
                            <TextSearch className="absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                            <Input
                                type='text'
                                id="search"
                                name="search"
                                placeholder="Search about..."
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
                    <AboutForm />
                </div>
                <div>
                    <Table>
                        <TableHeader className="border-b bg-muted">
                            <TableRow>
                                <TableHead className="w-[100px] text-center">No</TableHead>
                                <TableHead className="w-[150px] text-center">Photo</TableHead>
                                <TableHead className="text-center">Photo Name</TableHead>
                                <TableHead className="max-w-[750px] text-center">Bio</TableHead>
                                <TableHead className="w-[100px] text-center">Active</TableHead>
                                <TableHead className="w-[150px] text-center">Created At</TableHead>
                                <TableHead className="w-[150px] text-center">Updated At</TableHead>
                                <TableHead className="text-center">Action</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {abouts.data.length > 0 ? (
                                abouts.data.map((about: About, index: number) => (
                                    <TableRow key={about.id} className="transition-colors hover:bg-muted-50">
                                        <TableCell className="text-center">{meta ? meta.from + index : index + 1}</TableCell>
                                        <TableCell>
                                            <div className="flex justify-center">
                                                <img src={about.photo_url} alt="Photo" className="size-50 rounded-md object-cover border" />
                                            </div>
                                        </TableCell>
                                        <TableCell className="font-medium">{about.photo_name}</TableCell>
                                        <TableCell>
                                            <p className="whitespace-pre-wrap text-sm text-muted-foreground" title={about.bio}>
                                                {about.bio}
                                            </p>
                                        </TableCell>
                                        <TableCell className="text-center">{activateStatus(about.active)}</TableCell>
                                        <TableCell className="text-center text-xs text-muted-foreground">{about.created_at}</TableCell>
                                        <TableCell className="text-center text-xs text-muted-foreground">{about.updated_at}</TableCell>
                                        <TableCell>
                                            <div className="flex items-center justify-center gap-2">
                                                <Button onClick={() => handleActivate(about.id)} variant="outline" size="icon" className="cursor-pointer size-8" >
                                                    <Check className={about.active ? "text-green-500" : "text-muted-foreground"} size={16} />
                                                </Button>
                                                <AboutForm about={about} id={about.id} />
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))) : (
                                    <TableRow>
                                        <TableCell colSpan={8} className="text-center h-24 text-muted-foreground">
                                            No about data found.
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