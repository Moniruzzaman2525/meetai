import { Button } from "@/components/ui/button";

interface Props {
    page: number;
    totalPages: number;
    onChangePage: (page: number) => void
}

export const DataPagination = ({ page, totalPages, onChangePage }: Props) => {
    return (
        <div className="flex items-center justify-between">
            <div className="flex-1 text-sm text-muted-foreground">
                Page {page} of {totalPages || 1}
            </div>
            <div className="flex items-center justify-end space-x-2 py-4">
                <Button variant="outline" size="sm" onClick={() => onChangePage(Math.max(1, page - 1))} disabled={page === 1}>Previous</Button>
                <Button variant="outline" size="sm" onClick={() => onChangePage(Math.min(totalPages, page + 1))} disabled={page === totalPages || totalPages === 0}>Next</Button>
            </div>
        </div>
    )
}
