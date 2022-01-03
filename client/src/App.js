import { Container, Image } from 'react-bootstrap';
import './App.css';
import Acceuil from './components/Acceuil';
import Header from './components/Header';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Regions from './components/Regions';
import VinsParRegion from './components/VinsParRegion';
import VinsIndividuel from './components/VinsIndividual';
import PaiementEtape1 from './components/PaiementEtape1';
import PaiementEtape2 from './components/PaiementEtape2';
import PaiementEtape3 from './components/PaiementEtape3';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Acceuil />} exact="true" />
          <Route path="/regions" element={<Regions />} />
          <Route path="/vinsParRegion/:regionID" element={<VinsParRegion/>} />
          <Route path="/vinsIndividuel/:vinsID" element={<VinsIndividuel/>} />
          <Route path="/paiementEtape1" element={<PaiementEtape1/>} />
          <Route path="/paiementEtape2" element={<PaiementEtape2/>} />
          <Route path="/paiementEtape3" element={<PaiementEtape3/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
