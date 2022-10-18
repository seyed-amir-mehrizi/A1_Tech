/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useState } from 'react';
import SelectItem from '../../components/select-item/SelectItem';
import styles from './home.module.css'
import { useFetch } from '../../hooks/useFetch';
import CarListing from '../../components/car-listing/CarListing';
import Skeleton from 'react-loading-skeleton';
import AppToast from '../../components/app-toast/AppToast';
import Pagination from '../../components/pagination/Pagination';

const createArray = (length: number) => [...Array(length)];
function Home() {
  const [colors, setColors] = useState([]);
  const [manufacturers, setManufacturers] = useState([]);
  const [cars, setCars] = useState([]);
  const [numberOfAllCars, setNumberOfAllCars] = useState<number>(0);
  const [color, setColor] = useState('');
  const [manufacturer, setManufacturer] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalRecords, setTotalRecords] = useState(1);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [show, setShow] = useState(false);
  useEffect(() => {
    let isCanceled = false;
    if (!isCanceled) {
      fetchColors();
      fetchManufacturers();
      fetchAllCars();
    }
    return () => {
      isCanceled = true;
    }
  }, []);

  const fetchColors = () => {
    useFetch('colors').then((res) => {
      setColors(res.colors);
    })
      .catch((error) => {
        setErrorMessage(error.message);
        setShow(true)
      })
  }
  const fetchManufacturers = () => {
    useFetch('manufacturers').then((res) => {
      setManufacturers(res.manufacturers);
    }).catch((error) => {
      setErrorMessage(error.message);
      setShow(true)
    });
  }

  const fetchAllCars = () => {
    setIsLoading(true);
    const params = {
      manufacturer,
      color,
      page: currentPage
    }
    useFetch('cars', params)
      .then((result) => {
        setCars(result.cars);
        setNumberOfAllCars(result.totalCarsCount)
        setIsLoading(false);
        setTotalRecords(result.totalCarsCount)
      }).catch((error) => {
        setErrorMessage(error.message);
        setShow(true)
      })
  }


  const handleChangeColor = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setColor(e.target.value)
  }

  const handleChangeManufacturer = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setManufacturer(e.target.value);
  }

  const filterCars = () => {
    setCurrentPage(1);
    fetchAllCars();
  }

  useEffect(() => {
    fetchAllCars();
  }, [currentPage])


  return (
    <main className='container-fluid d-flex h-100 w-100 py-4'>

      <div className={styles.filterContainer}>
        <div className="card">
          <div className="card-body">
            <SelectItem label='Color'
              id='color'
              placeholder='All Car Colors'
              data={colors}
              onChange={handleChangeColor}
            />
            <SelectItem label='Manufacturer'
              id='manufacturer'
              placeholder='All Manufacturers'
              data={manufacturers}
              onChange={handleChangeManufacturer}
              name='name'
            />
            <div className='d-flex justify-content-end'>
              <button className='button' onClick={filterCars}>Filter</button>
            </div>
          </div>
        </div>
      </div>
      <div className={`${styles.carListing} px-3`}>
        <AppToast show={show} errorMessage={errorMessage} />
        <h3>Available Cars</h3>
        <h5 className='my-3'>Showing 10 of {numberOfAllCars} results</h5>
        {
          !isLoading ?
            <CarListing cars={cars} />
            :
            createArray(10).map((item, i) => {
              return <div key={i} className="media border p-3 my-2">
                <Skeleton height={100} width={100} />
                <div className="media-body ml-3">
                  <Skeleton width={60} height='100%' className='mb-3' />
                  <p>
                    <Skeleton count={3} width={150} height={10} />
                  </p>
                </div>
              </div>
            })
        }
        <Pagination
          currentPage={currentPage}
          onPageChange={setCurrentPage}
          limit={10}
          total={totalRecords}
        />
        {/* <div className='d-flex align-items-center justify-content-center my-3'>
          <span className='cursor-pointer primary-text' onClick={() => setCurrentPage(1)}>First</span>
          <span className='cursor-pointer primary-text mx-2' onClick={() => {
            if (currentPage - 1 <= 0) {
              setCurrentPage(1);
            }
            else setCurrentPage((pre) => pre - 1)
          }}>Previous</span>
          <span>
            Page {currentPage} of {Math.ceil(totalRecords / 10)}
          </span>
          <span className='cursor-pointer primary-text mx-2' onClick={() => {
            if (currentPage + 1 > Math.ceil(totalRecords / 10)) {
              setCurrentPage(Math.ceil(totalRecords / 10));
            }
            else setCurrentPage((pre) => pre + 1)
          }}>Next</span>
          <span className='cursor-pointer primary-text' onClick={() => setCurrentPage(Math.ceil(totalRecords / 10))}>Last</span>
        </div> */}

      </div>



    </main>
  )
}

export default Home