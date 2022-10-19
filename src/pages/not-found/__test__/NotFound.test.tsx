import { render, screen } from "@testing-library/react"
import { BrowserRouter } from "react-router-dom";
import NotFound from "../NotFound";

const notFoundComponent = <BrowserRouter>
<NotFound />
</BrowserRouter>

describe('Not Found Component', () => {
    test('should have 404 - not found text in the DOM', () => {
        render(notFoundComponent);
        const headingElement = screen.getByRole('heading', { name: '404 - Not Found' });
        expect(headingElement).toBeInTheDocument();
    })
    test('should have logo of the company', () => {
        render(notFoundComponent);
        const imgElement = screen.getByRole('img', { name: /auto1 logo/i })
        expect(imgElement).toBeVisible();
    })
})