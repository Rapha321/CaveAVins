import React from 'react'
import { Router, useNavigate, useParams } from "react-router-dom"
import { Container, Form, Radio, Step, Button } from 'semantic-ui-react'


export default function PaiementEtape3() {


    const StepExampleOrdered = () => (
        <Step.Group ordered>
          <Step completed>
            <Step.Content>
              <Step.Title>Informations</Step.Title>
              <Step.Description>Adresse de livraison</Step.Description>
            </Step.Content>
          </Step>
      
          <Step completed>
            <Step.Content>
              <Step.Title>Paiement</Step.Title>
              <Step.Description>Mode de paiement</Step.Description>
            </Step.Content>
          </Step>
      
          <Step active>
            <Step.Content>
              <Step.Title>Confirmation</Step.Title>
            </Step.Content>
          </Step>
        </Step.Group>
      )

    return (
        <div>
            <h1>ETAPE 3</h1>
            {StepExampleOrdered()}
        </div>
    )
}
