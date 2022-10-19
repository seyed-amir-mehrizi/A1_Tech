
import { render, screen } from "@testing-library/react"
import AppAlert from "../AppAlert";

const AlertComponent = <AppAlert message="my message" className="test-class" />
describe('AppAlert component', () => {

    test('should render alert box in the Dom', async () => {
        render(AlertComponent);
        const divElement = screen.getByTestId('alert-box');
        expect(divElement).toBeInTheDocument();
    });

    test('should render same message pass into alert div', async () => {
        render(AlertComponent);
        const divElement = screen.getByText(/my message/i);
        expect(divElement).toBeInTheDocument();
    });

})

