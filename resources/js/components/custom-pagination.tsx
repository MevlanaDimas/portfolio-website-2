import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { Meta } from '@/types';
import { cn } from '@/lib/utils';

interface CustomPaginationProps {
    meta: Meta;
}

export const CustomPagination = ({ meta }: CustomPaginationProps) => {
    if (!meta?.links?.length) return null;

    return (
        <Pagination aria-label="Page navigation">
            <PaginationContent className="w-full justify-center gap-1">
                {meta.links
                    .filter((item) => !item.label.toLowerCase().includes('pagination'))
                    .map((item, index) => {
                        const label = item.label.replace(/&laquo;|&raquo;/g, '').trim();
                        const isPrevious = item.label.includes('&laquo;') || label === 'Previous';
                        const isNext = item.label.includes('&raquo;') || label === 'Next';
                        const isEllipsis = label === '...';
                        const key = `${label}-${index}`;

                        if (isEllipsis) {
                            return (
                                <PaginationItem key={key}>
                                    <PaginationEllipsis />
                                </PaginationItem>
                            );
                        }

                        if (isPrevious) {
                            return (
                                <PaginationItem key={key}>
                                    <PaginationPrevious
                                        href={item.url || '#'}
                                        className={cn(!item.url && "pointer-events-none opacity-50")}
                                        aria-disabled={!item.url}
                                    />
                                </PaginationItem>
                            );
                        }

                        if (isNext) {
                            return (
                                <PaginationItem key={key}>
                                    <PaginationNext
                                        href={item.url || '#'}
                                        className={cn(!item.url && "pointer-events-none opacity-50")}
                                        aria-disabled={!item.url}
                                    />
                                </PaginationItem>
                            );
                        }

                        return (
                            <PaginationItem key={key}>
                                <PaginationLink
                                    href={item.url || '#'}
                                    isActive={item.active}
                                    className={cn(
                                        "cursor-pointer",
                                        !item.url && "pointer-events-none opacity-50"
                                    )}
                                >
                                    {label}
                                </PaginationLink>
                            </PaginationItem>
                        );
                    })}
            </PaginationContent>
        </Pagination>
    );
}