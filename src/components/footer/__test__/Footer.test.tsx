import { render, screen } from "@testing-library/react"
import Footer from "../Footer"

describe('Footer component', () => {
    test('should have footer text in the document', () => {
        render(<Footer />);
        const spanElement = screen.getByText(/© Test LAB Group 2018/i);
        expect(spanElement).toBeInTheDocument();
    })
})
