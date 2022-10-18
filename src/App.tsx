import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom'
import './App.css';
import Footer from './components/footer/Footer';
import Header from './components/header/Header';
const Home = lazy(() => import('./pages/home/Home'));
const CarDetails = lazy(() => import('./pages/car-detail/CarDetails'));
const FavoriteCollection = lazy(() => import('./pages/favorite-collection/FavoriteCollection'));
const NotFound = lazy(() => import('./pages/not-found/NotFound'));


function App() {
  return (
    <>
      <Header />
      <div className='content p-2'>
        <Suspense fallback={<div>...Loading</div>}>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/favorite-collection' element={<FavoriteCollection />} />
            <Route path='/car-details/:stockNumber' element={<CarDetails />} />
            <Route path='*' element={<NotFound />} />
          </Routes>
        </Suspense>
      </div>
      <Footer />
    </>
  );
}

export default App;
