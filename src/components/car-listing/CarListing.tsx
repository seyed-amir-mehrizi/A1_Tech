import Car from '../car/Car';
import styles from './carListing.module.css';

type CarListingProps = {
    cars: {
        color: string,
        fuelType: string,
        manufacturerName: string,
        mileage: {
            number: number,
            unit: string
        },
        modelName: string,
        pictureUrl: string,
        stockNumber: number
    }[]
}

function CarListing({ cars }: CarListingProps) {
    return (
        <>{
            cars.map((carItem) => {
                return<div key={carItem.stockNumber} className='mb-3'> <Car car={carItem} /></div>
            })
        }</>
    )
}

export default CarListing