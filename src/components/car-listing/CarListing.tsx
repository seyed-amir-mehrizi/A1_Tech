import { CarListingProps } from '../../assets/models/models';
import Car from '../car/Car';
import styles from './carListing.module.css';



function CarListing({ cars }: CarListingProps) {
    return (
        <>{
            cars && cars.map((carItem) => {
                return <article key={carItem.stockNumber.toString()} className='mb-3' data-testid="cars-list"> <Car car={carItem} /></article>
            })
        }</>
    )
}

export default CarListing