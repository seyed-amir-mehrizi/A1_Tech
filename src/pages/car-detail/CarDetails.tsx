/* eslint-disable @typescript-eslint/no-unused-vars */
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Car } from '../../assets/models/models';
import Skeleton from 'react-loading-skeleton';
import { useFetch } from '../../hooks/useFetch';
import AppToast from '../../components/app-toast/AppToast';
import AppAlert from '../../components/alert/AppAlert';
function CarDetails() {
  const params = useParams();
  const [carlist, setCarlist] = useState<any[]>([]);
  const [isSelected, setIsSelected] = useState<boolean>(false);
  const [show, setShow] = useState(false);
  const [hasSelected, setHasSelected] = useState<boolean>(false);

  const [response , error , loading]  = useFetch(`cars/${params.stockNumber}`) as any;
  useEffect(() => {
    checkListOfFavoriteCars();
  }, []);

  const saveFavoriteCar = () => {
    if (carlist.length > 0) {
      const newArr = carlist.find((item) => item.stockNumber === response.car?.stockNumber);
      if (newArr) {
        setIsSelected(true);
        setHasSelected(false);
        return
      }
    }
    setCarlist([...carlist, response.car]);
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

      <AppToast show={show} errorMessage={error} />
      <div className="jumbotron bg-white text-center">
        {
          loading ? <Skeleton height={100} width={400} /> : <img src={response.car?.pictureUrl} alt={response.car?.modelName} />
        }
      </div>
      <div className="container d-flex align-items-center justify-content-between">
        <div className='text-left'>
          {
            loading ? <div className="media-body mr-3">
              <Skeleton width={60} height='100%' className='mb-3' />
              <p>
                <Skeleton count={3} width={800} height={10} />
              </p>
            </div> :
              <>
                <h3>{response.car?.manufacturerName} {response.car?.modelName}</h3>
                <h5>
                  <span>Stock # {response.car?.stockNumber} - </span>
                  <span>{response.car?.mileage.number} {response.car?.mileage.unit} - </span>
                  <span>{response.car?.fuelType} - </span>
                  <span>{response.car?.color}</span>
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
                <button className={loading ? 'disabled-button' : 'button'} onClick={saveFavoriteCar} disabled={loading}>Save</button>
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