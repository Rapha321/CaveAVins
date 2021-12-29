import React from 'react'
import { Container, Form, FormLabel, InputGroup } from 'react-bootstrap'
import CombineLoginSignup from './CombineLoginSignup'
import pouring from '../images/pouring.gif'
import collections from '../images/collections.jpg'
import bienvenue from '../images/bienvenue.jpg'
import zoneLivraison from '../images/zone-livraison.jpg'

export default function Acceuil() {
    return (
        <Container>

            <div className='acceuil' style={{margin: "100px auto"}}>
                <div style={{width: "60vw", textAlign: "left", marginTop: "20px"}}>
                    <h1 style={{width: "40vw", textAlign: "left", marginTop: "20px", marginBottom: "25px"}}>BIENVENUE!!!</h1>
                    <img src={bienvenue} alt="Wine pouring" width="90%" height="40%" style={{textAlign:"left"}}/>
                    <h3 style={{width: "90%", textAlign:"left", marginTop: "35px"}}>
                        À La Cave à Vins, nous privilégions les vins de petites productions de 
                        vignobles de proximité. Aussi, nous avons la chance de mettre la main 
                        sur des produits exclusifs, créés par des vignerons amoureux de notre 
                        terroir. On se fait dailleurs littéralement remercier par les vignobles 
                        de rendre les produits disponibles en ligne.
                    </h3>
                    
                </div>
                <CombineLoginSignup />
            </div>

            <hr />

            <div style={{margin: "100px auto"}}>
                <h2>ZONE DE LIVRAISON</h2>                
                <img src={zoneLivraison} alt="Wine pouring" width="70%" height="10%"/>
                <h5 style={{width: "70%", textAlign: "left", marginLeft: "15%", marginTop: "15px"}}>
                    Le service de livraison en main propre est offert à Montréal, 
                    à Laval ainsi que dans une partie de la Rive-Sud. La livraison 
                    est possible à votre domicile ou à votre lieu de travail.
                </h5>
            </div>

            <hr />

            <div style={{display: "flex", flexDirection: "column", margin: "100px auto", width: "90%" }}>
                <div style={{display: "flex"}}>
                    <div><img src={collections} alt="note collections" width="350" style={{marginLeft: "50px"}}/> </div>
                    <div style={{width: "40%", margin: "auto"}}>
                        <h3>Nous avons une sélection de vins de plus d'une 
                        soixantaine de vignobles de notre belle province, en plus de quelques 
                        bières, cidres et boissons sans alcool du Québec! </h3>
                    </div>
                </div>

                <div style={{display: "flex"}}>
                    <div style={{width: "40%", margin: "auto"}}>
                        <h3>On vous remercie de boire local et de votre intérêt envers les 
                        vignerons du Québec, qui nont pas toujours la reconnaissance quils méritent.
                        </h3>
                    </div>
                    <div><img src={pouring} alt="Wine pouring" width="350"/> </div>
                </div>
            </div>

        </Container>
    )
}
