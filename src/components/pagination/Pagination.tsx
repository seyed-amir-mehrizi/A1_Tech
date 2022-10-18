import './pagination.module.css';

type PaginationProps = {
    currentPage: number,
    total: number,
    limit: number,
    onPageChange: (e: number) => void
}


function Pagination({ currentPage, total, limit = 10, onPageChange }: PaginationProps) {

 const numberOfPages = Math.ceil(total / limit);
    return (
        <div className='d-flex align-items-center justify-content-center my-3'>
            <span className='cursor-pointer primary-text' onClick={() => onPageChange(1)}>First</span>
            <span className='cursor-pointer primary-text mx-2' onClick={() => {
                if (currentPage - 1 <= 0) {
                    onPageChange(1);
                }
                else onPageChange(currentPage - 1)
            }}>Previous</span>
            <span>
                Page {currentPage} of {numberOfPages}
            </span>
            <span className='cursor-pointer primary-text mx-2' onClick={() => {
                if (currentPage + 1 > numberOfPages) {
                    onPageChange(numberOfPages);
                }
                else onPageChange(currentPage + 1)
            }}>Next</span>
            <span className='cursor-pointer primary-text' onClick={() => onPageChange(numberOfPages)}>Last</span>
        </div>
    )
}

export default Pagination