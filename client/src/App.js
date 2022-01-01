import { Container, Image } from 'react-bootstrap';
import './App.css';
import Acceuil from './components/Acceuil';
import Header from './components/Header';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Regions from './components/Regions';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Acceuil />} exact="true" />
          <Route path="/regions" element={<Regions />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
