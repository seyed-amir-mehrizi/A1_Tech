import { useEffect, useState } from 'react';
import { Car } from '../../assets/models/models';
import { FaTrashAlt, FaEye } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

function FavoriteCollection() {
    const navigate = useNavigate();
    const [carsList, setCarsList] = useState([]);
    useEffect(() => {
        const result = JSON.parse(localStorage.getItem('cars') as string);
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
            <table className="table table-striped mt-3" data-testid="favorite-cars">
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
                            carsList.map((car: Car, index) => {
                                return <tr key={car?.stockNumber}>
                                    <td>{car?.stockNumber}</td>
                                    <td>{car?.manufacturerName}</td>
                                    <td>{car?.modelName}</td>
                                    <td>{car?.fuelType}</td>
                                    <td>{car?.color}</td>
                                    <td className='d-flex align-items-center justify-content-center'>
                                        <FaTrashAlt
                                            color='red'
                                            className='cursor-pointer mr-4'
                                            onClick={() => deleteCar(car?.stockNumber)}
                                        />
                                        <span data-testid={`view-button-${index}`} onClick={() => navigate(`/car-details/${car?.stockNumber}`)}>
                                            <FaEye
                                                className='cursor-pointer text-info'
                                            />
                                        </span>
                                    </td>
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