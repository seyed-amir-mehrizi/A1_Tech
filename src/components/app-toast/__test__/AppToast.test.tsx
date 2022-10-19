import { render, screen } from "@testing-library/react"
import AppToast from "../AppToast";

const toastComponent = <AppToast show={true} errorMessage="this is an error" />;

test('should have toast component in the DOM', async () => {
    render(toastComponent);
    const toastElement = await screen.findByTestId('toast-id');
    expect(toastElement).toBeInTheDocument();

});

test('should render Error message in the toast', async () => {
    render(toastComponent);
    const toastElement = await screen.findByText(/this is an error/i);
    expect(toastElement).toBeInTheDocument();
});
