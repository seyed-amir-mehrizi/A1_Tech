import React from 'react'
import styles from './home.module.css'
function Home() {
  return (
    <main className='container-fluid d-flex h-100 w-100 py-4'>
      <div className={styles.filterContainer}>
        <div className="card">
          <div className="card-body">
            <div className="form-group">
              <label htmlFor="sel1">Color</label>
              <select className="form-control" id="sel1">
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="sel1">Manufacturer</label>
              <select className="form-control" id="sel1">
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
              </select>
            </div>
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