import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Car from "../Car";

const carObject = {
    color: "red",
    fuelType: "Diesel",
    manufacturerName: "Fiat",
    mileage: {
        number: 100141,
        unit: "km"
    },
    modelName: "Marea",
    pictureUrl: "http://localhost:3001/car.svg",
    stockNumber: 41400
}
const carComponent = <MemoryRouter>
    <Car car={carObject} />
</MemoryRouter>

test('should render box for displaying each car list', async () => {
    render(carComponent);
    const divElement = screen.getByTestId('car-box');
    expect(divElement).toBeInTheDocument();
});

test('should render heading with modelName from the car props', async () => {
    render(carComponent);
    const headingElement = screen.getByRole('heading', { name: `${carObject.manufacturerName} ${carObject.modelName}` })
    expect(headingElement).toBeInTheDocument();
});

test('should render stock number of the car in the DOM', async () => {
    render(carComponent);
    const spanElement = await screen.findByTestId("stock-number")
    expect(spanElement).toBeInTheDocument();
});