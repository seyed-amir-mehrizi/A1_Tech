import { render, screen } from "@testing-library/react"
import { BrowserRouter } from "react-router-dom"
import cars from '../../../mocks/cars.json'
import CarListing from "../CarListing"
import { setupServer } from 'msw/node'
import { rest } from 'msw';
import carsMock from '../../../mocks/cars.json'
const server = setupServer(
    rest.get('https://auto1-mock-server.herokuapp.com/api/cars?manufacturer=&color=&page=1', (req, res, ctx) => {
        return res(
            ctx.json(carsMock)
        )
    })
);

beforeAll(() => {
    server.listen();
})

afterEach(() => {
    server.resetHandlers();
});

afterAll(() => {
    server.close();
})

describe('CarListing Component', () => {
    test('should render 10 list of cars', async () => {
        render(<BrowserRouter>
            <CarListing cars={carsMock} />
        </BrowserRouter>);
        const articleElement = await screen.findAllByRole('article');
        expect(articleElement.length).toBe(10);
    })
})