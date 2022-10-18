import { PaginationProps } from '../../assets/models/models';
import './pagination.module.css';
function Pagination({ currentPage, total, limit = 10, onPageChange }: PaginationProps) {
    const numberOfPages = Math.ceil(total / limit);
    return (
        <div className='d-flex align-items-center justify-content-center my-3'>
            <h5 className='cursor-pointer primary-text' onClick={() => onPageChange(1)}>First</h5>
            <h5 className='cursor-pointer primary-text mx-4' onClick={() => {
                if (currentPage - 1 <= 0) {
                    onPageChange(1);
                }
                else onPageChange(currentPage - 1)
            }}>Previous</h5>
            <h6 className='font-weight-bolder'>
                Page {currentPage} of {numberOfPages}
            </h6>
            <h5 className='cursor-pointer primary-text mx-4' onClick={() => {
                if (currentPage + 1 > numberOfPages) {
                    onPageChange(numberOfPages);
                }
                else onPageChange(currentPage + 1)
            }}>Next</h5>
            <h5 className='cursor-pointer primary-text' onClick={() => onPageChange(numberOfPages)}>Last</h5>
        </div>
    )
}

export default Pagination