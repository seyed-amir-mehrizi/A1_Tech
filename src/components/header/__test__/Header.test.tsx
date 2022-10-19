import { fireEvent, render, screen } from "@testing-library/react"
import { BrowserRouter, MemoryRouter } from "react-router-dom";
import Header from "../Header";

const mockHeader = <BrowserRouter>
    <Header />
</BrowserRouter>

describe('Header Component', () => {
    test('should have header in the DOM', () => {
        render(mockHeader);
        const navElement = screen.getByTestId(/header-component/i);
        expect(navElement).toBeInTheDocument();
    });

    test('should have Favorite collections in the navbar', () => {
        render(mockHeader);
        const linkElement = screen.getByText(/Favorite collections/i);
        expect(linkElement).toBeInTheDocument();
    });

    test('should be the visibility over the Logo', () => {
        render(mockHeader);
        const linkElement = screen.getByRole('img', { name: /auto1 logo/i })
        expect(linkElement).toBeVisible();
    });
    test('click to logo and go to Home page', () => {
        render(<MemoryRouter initialEntries={['/favorite-collection']}>
            <Header />
        </MemoryRouter>);
        const linkElement = screen.getByRole('img', { name: /auto1 logo/i })
        fireEvent.click(linkElement);
        expect(window.location.pathname).toBe("/");
    });
})

