import { Routes, Route } from 'react-router-dom'
import './App.css';
import Header from './components/header/Header';
import CarDetails from './pages/car-detail/CarDetails';
import Home from './pages/home/Home';
import NotFound from './pages/not-found/NotFound';

function App() {
  return (
    <>


      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/car-details/:id' element={<CarDetails />} />
        <Route path='*' element={<NotFound />} />
      </Routes>





      <footer className="footer mt-auto py-3 bg-danger">
        <div className="container">
          <span className="text-white">Place sticky footer content here.</span>
        </div>
      </footer>
    </>
  );
}

export default App;
