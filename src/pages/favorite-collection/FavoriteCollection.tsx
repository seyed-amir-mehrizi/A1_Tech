import { useEffect, useState } from 'react';
import { Car } from '../../assets/models/models';
import styles from './favorite.module.css';
import { FaTrashAlt } from 'react-icons/fa';
function FavoriteCollection() {
    const [carsList, setCarsList] = useState([]);

    useEffect(() => {
        const result = JSON.parse(localStorage.getItem('cars') as any);
        setCarsList(result);
    }, []);


    const deleteCar = (stockNumber: number) => {
        const newCars = [...carsList].filter((car: Car) => {
            return car.stockNumber !== stockNumber
        });
        setCarsList(newCars);
    }

    useEffect(() => {
        localStorage.setItem('cars', JSON.stringify(carsList))
    }, [carsList])


    return (
        <div className='container'>
            <h3 className='my-3'>
                Favorite Cars
            </h3>
            <table className="table table-striped mt-3">
                <thead>
                    <tr>
                        <th>Stock Number</th>
                        <th>Manufacturer Name</th>
                        <th>Model Name</th>
                        <th>Fuel Type</th>
                        <th>Color</th>
                        <th></th>

                    </tr>
                </thead>
                <tbody>
                    {
                        carsList && carsList.length > 0 ?
                            carsList.map((car: Car) => {
                                return <tr key={car.stockNumber}>
                                    <td>{car.stockNumber}</td>
                                    <td>{car.manufacturerName}</td>
                                    <td>{car.modelName}</td>
                                    <td>{car.fuelType}</td>
                                    <td>{car.color}</td>
                                    <td className='cursor-pointer' onClick={() => deleteCar(car.stockNumber)}><FaTrashAlt color='red' /></td>
                                </tr>
                            }) : <tr>
                                <td colSpan={6}>
                                    <h5 className='mt-3'>The List Of Favorite Cars Is Empty ...</h5>
                                </td>
                            </tr>
                    }



                </tbody>
            </table>

        </div>
    )
}

export default FavoriteCollection