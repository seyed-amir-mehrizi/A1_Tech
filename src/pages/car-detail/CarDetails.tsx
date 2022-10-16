import styles from './carDetails.module.css';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useFetch } from '../../hooks/useFetch';
import axios from 'axios';
import config from '../../assets/config/config.json'
import { Car } from '../../assets/models/models';
function CarDetails() {
  const params = useParams();
  const [car, setCar] = useState<Car | undefined>();
  const [carlist, setCarlist] = useState<any[]>([]);
  useEffect(() => {
    fetchCarDetails();
    checkListOfFavoriteCars();

  }, []);

  const fetchCarDetails = async () => {
    const result = await (await axios.get(config.api + `cars/${params.stockNumber}`)).data;
    setCar(result.car)
  }

  const saveFavoriteCar = () => {
    setCarlist([...carlist, car])
  }

  useEffect(() => {
    localStorage.setItem('cars', JSON.stringify(carlist));
  }, [carlist])

  const checkListOfFavoriteCars = () => {
    const result = JSON.parse(localStorage.getItem('cars') as any);
    if (result) setCarlist(result);

  }
  return (
    <div className="container-fluid">
      <div className="jumbotron bg-white">
        <img src={car?.pictureUrl} />
      </div>
      <div className="container d-flex align-items-center justify-content-between">
        <div className='text-left'>
          <h3>{car?.manufacturerName} {car?.modelName}</h3>
          <h5>
            <span>Stock # {car?.stockNumber} - </span>
            <span>{car?.mileage.number} {car?.mileage.unit} - </span>
            <span>{car?.fuelType} - </span>
            <span>{car?.color}</span>
          </h5>
          <p>
            This car is Currently available and can be delivered as soon as
            tomorrow morning. Please be aware that delivery times shown in
            this page are not definitive and may change due to bad weather conditions.
          </p>
        </div>
        <div className='card'>
          <div className="card-body">
            <p>
              If you like this car, click the button and
              save it in your collection of favorite items.
            </p>
            <div className='d-flex justify-content-end'>
              <button className='button' onClick={saveFavoriteCar}>Save</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CarDetails