import React from 'react'
import { Router, useNavigate, useParams } from "react-router-dom"
import { Button } from 'react-bootstrap';
import { Container, Form, Step } from 'semantic-ui-react'

export default function PaiementEtape1() {

  let navigate = useNavigate()

    const StepExampleOrdered = () => (
        <Step.Group ordered>
          <Step active>
            <Step.Content>
              <Step.Title>Informations</Step.Title>
              <Step.Description>Adresse de livraison</Step.Description>
            </Step.Content>
          </Step>
      
          <Step inactive>
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

      const paiementEtape2 = () => {
        navigate(`/paiementEtape2`)
      }

    return (
        <Container>
            <h1>PAIEMENT</h1>

            {StepExampleOrdered()}

            <br/><br/>
            <div style={{marginLeft: "20%"}}>
                <Form >
                    <Form.Group>
                        <Form.Input label='Prenom' placeholder='Prenom' width={6} />
                        <Form.Input label='Nom' placeholder='Nom' width={6} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Input label="Adresse" placeholder='Adresse' width={10} />
                        <Form.Input label="Appartement" placeholder='No. Apt' width={2} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Input label="Ville" placeholder='Ville' width={4} />
                        <Form.Input label="Province" placeholder='Province' width={4} />
                        <Form.Input label="Code Postal" placeholder='Code Postal' width={4} />
                    </Form.Group>
                </Form>

                <br />

                <Button success onClick={paiementEtape2} style={{float: "right", marginRight: "25%"}}>Suivant</Button>
            </div>


        </Container>
    )
}
