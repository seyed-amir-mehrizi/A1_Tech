import './pagination.module.css';

type PaginationProps = {
    currentPage: number,
    total: number,
    limit: number,
    onPageChange: (e: number) => void
}

const createArrayPage = (length: number) => [...Array(length)];

function Pagination({ currentPage, total, limit, onPageChange }: PaginationProps) {

    const pageNumber = [];
    for (let index = 1; index <= Math.ceil(total / limit); index++) {
        pageNumber.push(index);

    }

    return (
        <nav className='d-flex justify-content-center'>
            <ul className='pagination flex-wrap'>
                {
                    pageNumber.map((number, i) => {
                        const activeClass = currentPage === number ? 'active' : '';
                        return <li key={number} className={`m-1 page-item ${activeClass}`}
                            onClick={() => onPageChange(number)}>
                            <a className="page-link cursor-pointer">
                                {number}
                            </a>
                        </li>
                    })
                }
            </ul>
        </nav>
    )
}

export default Pagination