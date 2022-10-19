import { fireEvent, render, screen } from "@testing-library/react"
import SelectItem from "../SelectItem";

const handleChangeSelect = () => {
}
const selectItemComponent = <SelectItem data={[1, 2, 3]} id='select'
    placeholder="select the cars"
    label="cars"
    onChange={() => handleChangeSelect}
/>

describe('SelectItem component', () => {
    test('should have select element in the document', () => {
        render(selectItemComponent);
        const selectElement = screen.getByTestId('select-box')
        expect(selectElement).toBeInTheDocument();
    })
    test('should render placeholder in the option tag', () => {
        render(selectItemComponent);
        const optionElement = screen.getByRole('option', { name: /select the cars/i });
        expect(optionElement).toBeInTheDocument();
    })
    test('should select the option', () => {
        render(selectItemComponent);
        const selectElement = screen.getByTestId('select-box');
        let options = screen.getAllByTestId('select-option')
        fireEvent.change(selectElement, { target: { value: 2 } })
        expect((options[1] as HTMLOptionElement).selected).toBeTruthy();
    })
})
