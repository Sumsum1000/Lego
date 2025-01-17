import { PaginationPropsType } from '../../utils/Types';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { useClickStore } from '../store/Store';
import { motion } from 'framer-motion';

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  nextPage,
  previousPage,
  drag,
}: PaginationPropsType) => {
  const clickStore = useClickStore();
  const { isLeftButton, canClick, setCanClick, setLeftClick, setRightClick } =
    clickStore;

  const handlePrevious = (): void => {
    // !isleftClicked
    //onPageChange(Math.max(currentPage - 1, 1));
    if (canClick) {
      setCanClick(false);
      setRightClick();
      previousPage();
    }
    setTimeout(() => {
      setCanClick(true);
    }, 1000);
  };

  const handleNext = (): void => {
    // isleftClicked
    //onPageChange(Math.min(currentPage + 1, totalPages));
    if (canClick) {
      setCanClick(false);
      setLeftClick();
      nextPage();
    }
    setTimeout(() => {
      setCanClick(true);
    }, 700);
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
          href='#'
          aria-current={i === currentPage ? 'page' : undefined}
          className={`relative inline-flex items-center justify-center w-14 h-14 text-sm font-semibold border ${
            i === currentPage
              ? 'z-10 shadow-[inset_0_2px_10px_0_#28d6fc]  text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 border'
              : 'text-white  border hover:bg-gray-700 focus:z-20 focus:outline-offset-0 '
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
    <div className='flex items-center justify-center z-[100]'>
      <nav
        className='isolate inline-flex -space-x-px rounded-md shadow-sm'
        aria-label='Pagination'
      >
        <a
          href='#'
          className='relative inline-flex items-center rounded-l-md w-14 h-14 justify-center text-white bg-gray-700 hover:bg-gray-700 focus:z-20 focus:outline-offset-0 border'
          onClick={handlePrevious}
        >
          <span className='sr-only'>Previous</span>
          <FaChevronLeft className='h-5 w-5' aria-hidden='true' />
        </a>
        {renderPageNumbers()}
        <a
          href='#'
          className='relative inline-flex items-center rounded-r-md w-14 h-14 justify-center text-white bg-gray-600 hover:bg-gray-700 focus:z-20 focus:outline-offset-0 border'
          onClick={handleNext}
        >
          <span className='sr-only'>Next</span>
          <FaChevronRight className='h-5 w-5' aria-hidden='true' />
        </a>
      </nav>
    </div>
  );
};

export default Pagination;
