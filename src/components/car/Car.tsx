import styles from './car.module.css';
import { useNavigate } from 'react-router-dom'
import { CarProps } from '../../assets/models/models';

function Car({ car }: CarProps) {
    const navigate = useNavigate();
    return (
        <div className="media border p-3">
            <img src={car.pictureUrl} alt={car.modelName} className="mr-3 mt-3" width={90} height={90} />
            <div className="media-body">
                <h4>{car.manufacturerName} {car.modelName}</h4>
                <p>
                    <span>Stock # {car.stockNumber} - </span>
                    <span>{car.mileage.number} {car.mileage.unit} - </span>
                    <span>{car.fuelType} - </span>
                    <span>{car.color}</span>
                </p>
                <span className={styles.viewDetails} onClick={() => navigate(`/car-details/${car.stockNumber}`)}>
                    View details
                </span>
            </div>
        </div>
    )
}

export default Car