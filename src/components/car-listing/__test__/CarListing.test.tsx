import { render, screen } from "@testing-library/react"
import { BrowserRouter } from "react-router-dom"
import cars from '../../../mocks/cars.json'
import CarListing from "../CarListing"

describe('Car Listing Component', () => {
    test('should render 10 cars ', () => {
        render(<BrowserRouter>
            <CarListing cars={cars} />
        </BrowserRouter>);
        expect(screen.getAllByTestId('cars-list').length).toBe(10)
    })
})