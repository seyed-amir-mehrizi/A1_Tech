import { render, screen } from "@testing-library/react"
import { MemoryRouter } from "react-router-dom";
import Header from "../Header";
test('should have Favorite collections in the navbar', () => {
    render(<MemoryRouter>
        <Header />
    </MemoryRouter>);
    const linkElement = screen.getByText(/Favorite collections/i);
    expect(linkElement).toBeInTheDocument();
});
