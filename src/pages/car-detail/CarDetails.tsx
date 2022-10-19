import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Car } from '../../assets/models/models';
import Skeleton from 'react-loading-skeleton';
import { useFetch } from '../../hooks/useFetch';
import AppToast from '../../components/app-toast/AppToast';
import AppAlert from '../../components/alert/AppAlert';
function CarDetails() {
  const params = useParams();
  const [car, setCar] = useState<Car | undefined>();
  const [carlist, setCarlist] = useState<any[]>([]);
  const [isSelected, setIsSelected] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [show, setShow] = useState(false);
  const [hasSelected, setHasSelected] = useState<boolean>(false);

  useEffect(() => {
    let isCanceled = false;
    if (!isCanceled) {
      fetchCarDetails();
    }
    checkListOfFavoriteCars();
    return () => {
      isCanceled = true;
    }
  }, []);

  const fetchCarDetails = async () => {
    setIsLoading(true);
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useFetch(`cars/${params.stockNumber}`)
      .then((res) => {
        setCar(res.car);
        setIsLoading(false);
      }).catch((error) => {
        setErrorMessage(error.message);
        setShow(true)
      })

  }

  const saveFavoriteCar = () => {
    if (carlist.length > 0) {
      const newArr = carlist.find((item) => item.stockNumber === car?.stockNumber);
      if (newArr) {
        setIsSelected(true);
        setHasSelected(false);
        return
      }
    }
    setCarlist([...carlist, car]);
    setHasSelected(true);
  }

  useEffect(() => {
    localStorage.setItem('cars', JSON.stringify(carlist));
  }, [carlist])

  const checkListOfFavoriteCars = () => {
    const result = JSON.parse(localStorage.getItem('cars') as string);
    if (result) setCarlist(result);

  }
  return (
    <div className="container-fluid">

      <AppToast show={show} errorMessage={errorMessage} />
      <div className="jumbotron bg-white text-center">
        {
          isLoading ? <Skeleton height={100} width={400} /> : <img src={car?.pictureUrl} alt={car?.modelName} />
        }
      </div>
      <div className="container d-flex align-items-center justify-content-between">
        <div className='text-left'>
          {
            isLoading ? <div className="media-body mr-3">
              <Skeleton width={60} height='100%' className='mb-3' />
              <p>
                <Skeleton count={3} width={800} height={10} />
              </p>
            </div> :
              <>
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
              </>
          }

        </div>
        <div className='d-flex flex-column'>
          <div className='card'>
            <div className="card-body">
              <p>
                If you like this car, click the button and
                save it in your collection of favorite items.
              </p>
              <div className='d-flex justify-content-end'>
                <button className={isLoading ? 'disabled-button' : 'button'} onClick={saveFavoriteCar} disabled={isLoading}>Save</button>
              </div>
            </div>
          </div>
          {
            isSelected ? <AppAlert className="alert alert-danger my-2"
              message='You have selected This Car.'
            /> : null
          }
          {
            hasSelected ?
              <AppAlert className="alert alert-success my-2"
                message='The is Selected'
              /> : null
          }
        </div>


      </div>
    </div>
  )
}

export default CarDetails