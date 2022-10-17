import { Routes, Route } from 'react-router-dom'
import './App.css';
import Footer from './components/footer/Footer';
import Header from './components/header/Header';
import CarDetails from './pages/car-detail/CarDetails';
import FavoriteCollection from './pages/favorite-collection/FavoriteCollection';
import Home from './pages/home/Home';
import NotFound from './pages/not-found/NotFound';

function App() {
  return (
    <>
      <Header />
      <div className='content p-2'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/favorite-collection' element={<FavoriteCollection />} />
          <Route path='/car-details/:stockNumber' element={<CarDetails />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </div>
      <Footer />
    </>
  );
}

export default App;
