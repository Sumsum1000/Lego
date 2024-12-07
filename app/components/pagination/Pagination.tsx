import { PaginagionType } from '@/app/utils/Types';
import React, { useEffect } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { useStore } from 'zustand';
import {useClickStore, useLevelStore} from '../store/Store';
import { useDirectionFlowStore } from '../store/Store';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  nextPage: () => void;
  previousPage: () => void;
}

const Pagination = ({ currentPage, totalPages, onPageChange, nextPage, previousPage}: PaginationProps) => {




  const levelStore = useLevelStore()
  const setNextLevel = levelStore.setNextLevel
  const setPreviousLevel = levelStore.setPreviousLevel

  const clickStore = useClickStore()
  const {isLeftButton ,canClick, setCanClick, setLeftClick, setRightClick} = clickStore

  const directionFlowStore = useDirectionFlowStore();
  const directionFlow = directionFlowStore.directionFlow;
  const {setDirectionFlow} = directionFlowStore;

  const handlePrevious = (): void => {
    // !isleftClicked
    //onPageChange(Math.max(currentPage - 1, 1));
    if(canClick){
      setCanClick(false);
      setDirectionFlow('backward');
      setRightClick();
      //setPreviousLevel();  
      previousPage();         
    }
    setTimeout(() => {
      setCanClick(true);
    }, 1000)  
  };

  const handleNext = (): void => {
    // isleftClicked
    //onPageChange(Math.min(currentPage + 1, totalPages));
    if(canClick){
      setCanClick(false);
      setDirectionFlow('forward');
      setLeftClick()
      //setNextLevel();
      nextPage();
    }
    setTimeout(() => {
      setCanClick(true);
    }, 700)  
  };

  const renderPageNumbers = (): JSX.Element[] => {
    const pageNumbers: JSX.Element[] = [];
    let startPage = Math.max(currentPage - 2, 1);
    let endPage = Math.min(startPage + 4, totalPages);

    // Adjust start page if we're at the end
    if (endPage === totalPages) {
      startPage = Math.max(endPage - 4, 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(
        <a
          key={i}
          href="#"
          aria-current={i === currentPage ? 'page' : undefined}
          className={`relative inline-flex items-center justify-center w-10 h-10 text-sm font-semibold ${
            i === currentPage
              ? 'z-10 bg-indigo-600 text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
              : 'text-white bg-gray-600 hover:bg-gray-700 focus:z-20 focus:outline-offset-0'
          }`}
          onClick={() => onPageChange(i)}
        >
          {i}
        </a>
      );
    }
    return pageNumbers;
  };

  return (
    <div className="flex flex-1 items-center justify-center">
      <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
        <a
          href="#"
          className="relative inline-flex items-center rounded-l-md w-10 h-10 justify-center text-white bg-gray-600 hover:bg-gray-700 focus:z-20 focus:outline-offset-0"
          onClick={handlePrevious}
        >
          <span className="sr-only">Previous</span>
          <FaChevronLeft className="h-5 w-5" aria-hidden="true" />
        </a>
        {renderPageNumbers()}
        <a
          href="#"
          className="relative inline-flex items-center rounded-r-md w-10 h-10 justify-center text-white bg-gray-600 hover:bg-gray-700 focus:z-20 focus:outline-offset-0"
          onClick={handleNext}
        >
          <span className="sr-only">Next</span>
          <FaChevronRight className="h-5 w-5" aria-hidden="true" />
        </a>
      </nav>
    </div>
  );
};

export default Pagination;











