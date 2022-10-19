import {  render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import FavoriteCollection from "../FavoriteCollection";


const favoriteCollectionComponent = <BrowserRouter>
    <FavoriteCollection />
</BrowserRouter>

describe('Favorite collection component', () => {
    test('should have table title in the DOM', () => {
        render(favoriteCollectionComponent);
        const headingElement = screen.getByRole('heading', { name: 'Favorite Cars' });
        expect(headingElement).toBeInTheDocument();
    });

    test('should have table for displaying the cars', async () => {
        render(favoriteCollectionComponent);
        const tableElement = await screen.findByTestId('favorite-cars');
        expect(tableElement).toBeTruthy();
    });

    test('should render empty message for car list', async () => {
        render(favoriteCollectionComponent);
        expect(screen.getByRole('heading' , {name : 'The List Of Favorite Cars Is Empty ...'})).toBeInTheDocument();
    });

})