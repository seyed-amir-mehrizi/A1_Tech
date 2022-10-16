/* eslint-disable react-hooks/rules-of-hooks */
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import SelectItem from '../../components/select-item/SelectItem';
import config from '../../assets/config/config.json'
import styles from './home.module.css'
import { useFetch } from '../../hooks/useFetch';
import CarListing from '../../components/car-listing/CarListing';
function Home() {
  const [colors, setColors] = useState([]);
  const [manufacturers, setManufacturers] = useState([]);
  const [cars, setCars] = useState([]);
  const [numberOfAllCars , setNumberOfAllCars] = useState<number>(0);
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
      const result = await (await axios.get(config.api + 'cars')).data;
      console.log(result);
      setCars(result.cars);
      setNumberOfAllCars(result.totalCarsCount)
    } catch (error) {

    }
  }


  const handleChangeColor = (e: React.ChangeEvent<HTMLSelectElement>) => {
    console.log("eeee : ", e.target.value)
  }

  const handleChangeManufacturer = (e: React.ChangeEvent<HTMLSelectElement>) => {
    console.log("eeee : ", e.target.value)

  }
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
              <button className='button'>Filter</button>
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

    </main>
  )
}

export default Home