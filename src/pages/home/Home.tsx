import axios from 'axios';
import React, { useEffect, useState } from 'react';
import SelectItem from '../../components/select-item/SelectItem';
import config from '../../assets/config/config.json'
import styles from './home.module.css'
function Home() {
  const [colors, setColors] = useState([]);
  const [manufacturers, setManufacturers] = useState([]);
  useEffect(() => {
    fetchColors();
    fetchManufacturers();
  }, []);

  const fetchColors = async () => {
    try {
      const result = await (await axios.get(config.api+'colors')).data;
      setColors(result.colors);
    } catch (error) {

    }
  }
  const fetchManufacturers = async () => {
    try {
      const result = await (await axios.get(config.api+'manufacturers')).data;
      setManufacturers(result.manufacturers)
      
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
      <div className={styles.carListing}>

      </div>

    </main>
  )
}

export default Home