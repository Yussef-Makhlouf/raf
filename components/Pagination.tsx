'use client'
import { ChevronRight } from 'lucide-react'

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({ currentPage = 1, totalPages = 5, onPageChange }: PaginationProps) {
  if (totalPages <= 0) return null;

  const pageNumbers = Array.from({ length: totalPages }, (_, index) => totalPages - index);

  return (
    <div className="flex justify-center my-16">
      <div className="relative flex items-center h-20 border border-[#540f6b] rounded-[5px] bg-white">
        {/* Left Navigation Button */}
        {/* <button 
          className="flex items-center justify-center w-20 h-full border-l border-[#540f6b] relative group"
          onClick={() => onPageChange(Math.max(1, currentPage - 1))}
          disabled={currentPage === 1}
        >
          <div className="flex gap-1">
            <ChevronRight className="w-6 h-6 text-[#540f6b] rotate-180" />
            <ChevronRight className="w-6 h-6 text-[#540f6b] rotate-180" />
            <ChevronRight className="w-6 h-6 text-[#540f6b] rotate-180" />
          </div>
        </button> */}

        {/* Page Numbers */}
        {pageNumbers.map((pageNumber) => (
          <button
            key={pageNumber}
            onClick={() => onPageChange(pageNumber)}
            className={`relative w-[92px] h-full text-[30px] font-bold font-cairo text-[#540f6b] border-l border-[#540f6b] transition-colors
              ${currentPage === pageNumber ? 'bg-[#540f6b]/5' : 'hover:bg-[#540f6b]/5'}`}
          >
            {pageNumber}
          </button>
        ))}

        {/* Right Navigation Button */}
        {/* <button 
          className="flex items-center justify-center w-20 h-full border-l border-[#540f6b] relative group"
          onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
          disabled={currentPage === totalPages}
        >
          <div className="flex gap-1">
            <ChevronRight className="w-6 h-6 text-[#540f6b]" />
            <ChevronRight className="w-6 h-6 text-[#540f6b]" />
            <ChevronRight className="w-6 h-6 text-[#540f6b]" />
          </div>
        </button> */}
      </div>
    </div>
  )
}
