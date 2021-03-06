import './App.css';
import Acceuil from './components/Acceuil';
import Header from './components/Header';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import Regions from './components/Regions';
import VinsParRegion from './components/VinsParRegion';
import VinsIndividuel from './components/VinsIndividual';
import Panier from './components/Panier'
import PaiementEtape1 from './components/PaiementEtape1';
import PaiementEtape2 from './components/PaiementEtape2';
import PaiementEtape3 from './components/PaiementEtape3';
import Admin from './components/Admin/Admin'
import { ToastContainer, toast, Zoom, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Commande from './components/Commande';
import AdminRegions from './components/Admin/AdminRegions';
import AdminVins from './components/Admin/AdminVins';
import AdminCommandes from './components/Admin/AdminCommandes';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Acceuil />} exact />
          <Route path="/regions/:clientID" element={<Regions />} />
          <Route path="/vinsParRegion/:regionID/:clientID" element={<VinsParRegion/>} />
          <Route path="/vinsIndividuel/:vinsID/:clientID" element={<VinsIndividuel/>} />
          <Route path="/panier/:clientID" element={<Panier/>} />
          <Route path="/paiementEtape1/:clientID/:sousTotal" element={<PaiementEtape1/>} />
          <Route path="/paiementEtape2/:clientID/:sousTotal" element={<PaiementEtape2/>} />
          <Route path="/paiementEtape3/:clientID/:sousTotal" element={<PaiementEtape3/>} />
          <Route path="/admin" element={<Admin/>} />
          <Route path="/adminRegions" element={<AdminRegions/>} />
          <Route path="/adminVins" element={<AdminVins/>} />
          <Route path="/adminCommandes" element={<AdminCommandes/>} />
        </Routes>

        <ToastContainer
          position="top-right"
          autoClose={2500}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />

      </BrowserRouter>

    </div>
  );
}

export default App;
