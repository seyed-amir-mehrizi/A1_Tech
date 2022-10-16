/* eslint-disable react-hooks/rules-of-hooks */
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import SelectItem from '../../components/select-item/SelectItem';
import config from '../../assets/config/config.json'
import styles from './home.module.css'
import { useFetch } from '../../hooks/useFetch';
import CarListing from '../../components/car-listing/CarListing';
import Pagination from 'react-bootstrap/Pagination'
function Home() {
  const [colors, setColors] = useState([]);
  const [manufacturers, setManufacturers] = useState([]);
  const [cars, setCars] = useState([]);
  const [numberOfAllCars, setNumberOfAllCars] = useState<number>(0);
  const [color, setColor] = useState('');
  const [manufacturer, setManufacturer] = useState('');
  const [paging, setPaging] = useState(1)
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
      })
      ;
  }
  const fetchManufacturers = () => {
    useFetch('manufacturers').then((res) => {
      setManufacturers(res.manufacturers);
    });
  }

  const fetchAllCars = async () => {
    try {
      const params = {
        manufacturer,
        color,
        page: paging
      }
      const result = await (await axios.get(config.api + 'cars', { params })).data;
      console.log(result);
      setCars(result.cars);
      setNumberOfAllCars(result.totalCarsCount)
    } catch (error) {

    }
  }


  const handleChangeColor = (e: React.ChangeEvent<HTMLSelectElement>) => {
    // console.log("eeee : ", e.target.value)
    setColor(e.target.value)
  }

  const handleChangeManufacturer = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setManufacturer(e.target.value);
    // console.log("eeee : ", e.target.value)

  }

  const filterCars = () => {
    setPaging(1);
    fetchAllCars();
  }

  const handlePageChange = (pageNumber: number) => {
    setPaging(pageNumber);
  };

  useEffect(() => {
    fetchAllCars();
  }, [paging])


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
          cars && <CarListing cars={cars} />
        }
      </div>
      <Pagination className="px-4">
        {cars.map((_, index) => {
          return (
            <Pagination.Item
              onClick={() => handlePageChange(index + 1)}
              key={index + 1}
              active={index + 1 === paging}
            >
              {index + 1}
            </Pagination.Item>
          );
        })}
      </Pagination>

    </main>
  )
}

export default Home