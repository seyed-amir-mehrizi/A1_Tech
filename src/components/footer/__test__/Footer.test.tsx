import { render, screen } from "@testing-library/react"
import Footer from "../Footer"

test('should have footer text in the document', () => {
    render(<Footer />);
    const spanElement = screen.getByText(/© AUTO1 Group 2018/i);
    expect(spanElement).toBeInTheDocument();
})