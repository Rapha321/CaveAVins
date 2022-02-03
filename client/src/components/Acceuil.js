import React from 'react'
import { Container } from 'react-bootstrap'
import Header from '../components/Header';
import CombineLoginSignup from './CombineLoginSignup'
import bienvenue from '../images/banner_acceuil.jpg'
import zoneLivraison from '../images/zone-livraison.jpg'
import hrImage from "../images/hr-Img.jpeg"
import wineCollections from "../images/wineCollections.jpg"
import wineGlasses from "../images/wineGlass.jpg"
import Signup from './Signup';

export default function Acceuil() {

    return (

        // PAGE ACCEUIL
        <Container >
            
            <Header/>

            {/* Section Message de bienvenue */}
            <div className='acceuil' style={{margin: "60px auto", display: "flex", justifyContent: "center"}}>
                <div style={{width: "50vw", textAlign: "left"}}>
                    <h1 style={{width: "40vw", 
                                textAlign: "left", 
                                marginTop: "20px", 
                                marginBottom: "25px",
                                fontFamily: 'Island Moments',
                                fontWeight: 'bold',
                                fontSize: "55px",
                                marginBottom: "0"
                               }}>
                                    Bienvenue!!!
                    </h1>
                    <img src={bienvenue} alt="Wine pouring" width="90%" height="20%" style={{textAlign:"left", borderRadius: "5px"}}/>
                    <h3 style={{width: "90%", 
                                textAlign:"left", 
                                marginTop: "35px", 
                                fontFamily: 'Island Moments',
                                fontSize: "35px"}}>
                        À La Cave à Vins, nous privilégions les vins de petites productions de 
                        vignobles de proximité. Aussi, nous avons la chance de mettre la main 
                        sur des produits exclusifs, créés par des vignerons amoureux de notre 
                        terroir. On se fait d'ailleurs littéralement remercier par les vignobles 
                        de rendre les produits disponibles en ligne.
                    </h3>
                </div>

                {/* Section Signup et Login */}
                <CombineLoginSignup />
            </div>

            {/* Ligne horizontal */}
            <hr style={{  border: "0",
                          height: "45px",
                          backgroundImage: `url(${hrImage})`,
                          backgroundSize: "150px",
                          backgroundRepeat: "repeat"
                          }}/>

            {/* Zone de livraison */}
            <div style={{margin: "100px auto"}}>
                <h2>ZONE DE LIVRAISON</h2>   
                <br/>             
                <img src={zoneLivraison} alt="Wine pouring" width="70%" height="10%"/>
                <h5 style={{width: "70%", textAlign: "left", marginLeft: "15%", marginTop: "15px"}}>
                    Le service de livraison en main propre est offert à Montréal, 
                    à Laval ainsi que dans une partie de la Rive-Sud. La livraison 
                    est possible à votre domicile ou à votre lieu de travail.
                </h5>
            </div>

            {/* Ligne horizontal */}
            <hr style={{  border: "0",
                          height: "45px",
                          backgroundImage: `url(${hrImage})`,
                          backgroundSize: "150px",
                          backgroundRepeat: "repeat",
                          color: "green"
                          }}/>

            {/* Images et message informationnel */}
            <div style={{display: "flex", flexDirection: "column", margin: "100px auto", width: "80%" }}>
                <div style={{display: "flex", marginBottom: "30px"}}>
                    <div>
                        <img src={wineCollections} alt="note collections" style={{marginLeft: "50px", width: "370px", borderRadius: "5px"}}/> 
                    </div>
                    <div style={{width: "40%", margin: "auto"}}>
                        <h4 style={{textAlign: "left"}}>Nous avons une sélection de vins de plus d'une 
                        soixantaine de vignobles de notre belle province, en plus de quelques 
                        bières, cidres et boissons sans alcool du Québec! </h4>
                    </div>
                </div>

                <div style={{display: "flex"}}>
                    <div style={{width: "40%", margin: "auto"}}>
                        <h4 style={{textAlign: "right"}}>On vous remercie de boire local et de votre intérêt envers les 
                        vignerons du Québec, qui n'ont pas toujours la reconnaissance qu'ils méritent.
                        </h4>
                    </div>
                    <div style={{marginRight: "40px"}}>
                        <img src={wineGlasses} alt="Wine pouring" style={{width: "370px", borderRadius: "5px"}}/> 
                    </div>
                </div>
            </div>

            <br />
           
        </Container>
    )
}
