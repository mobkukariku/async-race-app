import { useState } from "react";

export function usePagination(items: any[], itemsPerPage: number) {
    const [currentPage, setCurrentPage] = useState(1);

    if(!items.length) return { currentPage, totalPages: 0, currentItems: [], nextPage: () => {}, prevPage: () => {} };
    
    const totalPages = Math.ceil(items.length / itemsPerPage);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = items.slice(indexOfFirstItem, indexOfLastItem);

    const nextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(prev => prev + 1);
        }
    };

    const prevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(prev => prev - 1);
        }
    };

    return { currentPage, totalPages, currentItems, nextPage, prevPage };
}
