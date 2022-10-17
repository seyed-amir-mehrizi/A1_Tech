/* eslint-disable react-hooks/rules-of-hooks */
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import SelectItem from '../../components/select-item/SelectItem';
import config from '../../assets/config/config.json'
import styles from './home.module.css'
import { useFetch } from '../../hooks/useFetch';
import CarListing from '../../components/car-listing/CarListing';
import Skeleton from 'react-loading-skeleton';
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

  useEffect(() => {
    fetchColors();
    fetchManufacturers();
    fetchAllCars();
  }, []);

  const fetchColors = () => {
    useFetch('colors').then((res) => {
      setColors(res.colors);
    })
      .catch((error) => {
        console.log("errororororororo : ", error)
      });
  }
  const fetchManufacturers = () => {
    useFetch('manufacturers').then((res) => {
      setManufacturers(res.manufacturers);
    });
  }

  const fetchAllCars = async () => {
    setIsLoading(true);
    try {
      const params = {
        manufacturer,
        color,
        page: currentPage
      }
      const result = await (await axios.get(config.api + 'cars', { params })).data;
      setCars(result.cars);
      setNumberOfAllCars(result.totalCarsCount)
      setIsLoading(false);
      setTotalRecords(result.totalCarsCount)
    } catch (error) {

    }
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

  const onPageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
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
        <Pagination currentPage={currentPage} total={totalRecords}
          limit={10}
          onPageChange={(page: number) => onPageChange(page)}
        />
      </div>



    </main>
  )
}

export default Home