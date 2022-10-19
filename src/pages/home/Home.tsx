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
  const [color, setColor] = useState('');
  const [manufacturer, setManufacturer] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const params = {
    manufacturer,
    color,
    page: currentPage
  }
  const [colors] = useFetch('colors') as any;
  const [manufacturers] = useFetch('manufacturers') as any;
  const [cars, carsError, carsLoading , fetchData] = useFetch('cars', params) as any;
  console.log(carsError)

  const handleChangeColor = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setColor(e.target.value)
  }

  const handleChangeManufacturer = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setManufacturer(e.target.value);
  }
  const filterCars = () => {
    setCurrentPage(1);
    fetchData();
  }

  useEffect(() => {
    fetchData();
  }, [currentPage])


  return (
    <main className='container-fluid d-flex h-100 w-100 py-4'>
      <div className={styles.filterContainer}>
        <div className="card">
          <div className="card-body">
            <SelectItem label='Color'
              id='color'
              placeholder='All Car Colors'
              data={colors.colors}
              onChange={handleChangeColor}
            />
            <SelectItem label='Manufacturer'
              id='manufacturer'
              placeholder='All Manufacturers'
              data={manufacturers.manufacturers}
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
        {carsError ? <AppToast show={true} errorMessage={carsError} /> : null}
        <h3>Available Cars</h3>
        {
          !carsLoading ? <h5 className='my-3'>Showing 10 of {cars.totalCarsCount} results</h5> :
            <Skeleton count={1} width={200} height={10} />
        }
        {
          !carsLoading && !carsError ?
            <div>
              <CarListing cars={cars.cars} />
              <Pagination
                currentPage={currentPage}
                onPageChange={setCurrentPage}
                limit={10}
                total={cars.totalCarsCount}
              />
            </div>

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

      </div>
    </main>
  )
}

export default Home