import React from 'react'
import { Router, useNavigate, useParams } from "react-router-dom"
import { Container, Form, Radio, Step, Button } from 'semantic-ui-react'
import visa from "../images/visa.jpg"
import amex from "../images/amex.jpg"
import masterCard from "../images/masterCard.jpg"

export default function PaiementEtape2() {

    let navigate = useNavigate()

    const StepExampleOrdered = () => (
        <Step.Group ordered>
          <Step completed>
            <Step.Content>
              <Step.Title>Informations</Step.Title>
              <Step.Description>Adresse de livraison</Step.Description>
            </Step.Content>
          </Step>
      
          <Step active>
            <Step.Content>
              <Step.Title>Paiement</Step.Title>
              <Step.Description>Mode de paiement</Step.Description>
            </Step.Content>
          </Step>
      
          <Step inactive>
            <Step.Content>
              <Step.Title>Confirmation</Step.Title>
            </Step.Content>
          </Step>
        </Step.Group>
      )

      const paiementEtape3 = () => {
        navigate(`/paiementEtape3`)
      }


    return (
        <Container>
            <h1>PAIEMENT</h1>
            {StepExampleOrdered()}

            <br/><br/>
            <div style={{marginLeft: "20%", textAlign: "left"}}>
                <Form >
                    <Form.Group inline>
                        <label>Sélectionnez votre méthode de paiement:</label>
                        <Form.Field
                            label={<img src={visa} />}
                            control='input'
                            type='radio'
                            name='carteCredit'
                        /> 
                        <Form.Field
                            label={<img src={amex} />}
                            control='input'
                            type='radio'
                            name='carteCredit'
                        />  
                        <Form.Field
                            label={<img src={masterCard} />}
                            control='input'
                            type='radio'
                            name='carteCredit'
                        />  
                    </Form.Group>
                    <Form.Group>
                        <Form.Input label='Numero Carte' placeholder='Numero Carte' width={8} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Input label="Date d'expiration" placeholder='MM/YY' width={4} />
                        <Form.Input label="CVC / CVV" placeholder='123' width={4} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Input label="Ville" placeholder='Ville' width={4} />
                        <Form.Input label="Province" placeholder='Province' width={4} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Input label="Nom du titulaire" placeholder='John Doe' width={8} />
                    </Form.Group>
                </Form>

                <br />

                <Button success onClick={paiementEtape3} style={{float: "right", marginRight: "25%"}}>Suivant</Button>
            </div>
            
        </Container>
    )
}
