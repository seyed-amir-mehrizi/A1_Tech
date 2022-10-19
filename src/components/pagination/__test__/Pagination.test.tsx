import { fireEvent, render, screen } from "@testing-library/react";
import Pagination from "../Pagination";

const paginationComponent = <Pagination currentPage={1} limit={10}
    total={100}
    onPageChange={()=>{}}
/>

describe('Pagination component', () => {
    test('should have First and Last heading', () => {
        render(paginationComponent);
        const firstHeadingElement = screen.getByRole('heading', { name: 'First' });
        const lastHeadingElement = screen.getByRole('heading', { name: 'Last' });
        expect(firstHeadingElement).toHaveTextContent('First');
        expect(lastHeadingElement).toHaveTextContent('Last');
    })
    test('should render number of pages correctly', () => {
        render(paginationComponent);
        const pagingLabelElement = screen.getByRole('heading',
            { name: `Page ${1} of ${Math.ceil(100 / 10)}` });
        expect(pagingLabelElement).toBeInTheDocument();
    });
});