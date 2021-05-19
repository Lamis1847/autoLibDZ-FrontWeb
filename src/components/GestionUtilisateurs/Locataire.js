import React, { useState, useEffect } from "react";
import LocataireService from "../../services/LocataireService";
import {
    Button,
    Card,
    CardBody,
    FormGroup,
    Form,
    Input,
    InputGroupAddon,
    InputGroupText,
    InputGroup,
    Container,
  } from "reactstrap";
  

const Locataire = props => {
  const initialLocataireState = {
    idLocataire: null,
    nom: "",
    prenom: "", 
    email:"",
    Active:"false"
};
  const [currentLocataire, setCurrentLocataire] = useState(initialLocataireState);
  const [message, setMessage] = useState("");
 
  const getLoacatire = idLocataire => {
    LocataireService.get(idLocataire)
      .then(response => {
        setCurrentLocataire(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  useEffect(() => {

    console.log(props.match.params.id);
    getLoacatire(props.match.params.id);
  }, [props.match.params.id]);


const updateActive = status => {
    LocataireService.block(currentLocataire.idLocataire)
      .then(response => {
        setCurrentLocataire({ ...currentLocataire, Active: status });
        console.log(response.data);
        setMessage("The status was updated successfully!");
      })
      .catch(e => {
        console.log(e);
      });
  };
  const handleInputChange = event => {
    const { name, value } = event.target;
    setCurrentLocataire({ ...currentLocataire, [name]: value });
  };
  const updateLocataire = () => {
    LocataireService.update(currentLocataire.idLocataire, currentLocataire)
      .then(response => {
        console.log(response.data);
        setMessage("The Locataire was updated successfully!");
      })
      .catch(e => {
        console.log(e);
      });
  };
  return (
    <React.Fragment>
    <div className="main-content">
      <div className="mt-40">
        <Container fluid >
          <div style={{padding:"12px"}}>
            <h1>Modifier un locataire </h1>
          </div>
 <div className="modal-body p-0">
 {currentLocataire ? (
<Card className="bg-secondary shadow border-0">
  <CardBody className="px-lg-5 py-lg-5">
    
    <Form role="form">
    <FormGroup>
        <InputGroup className="input-group-alternative">
          <InputGroupAddon addonType="prepend">
            <InputGroupText>
              <i className="ni ni-circle-08" />
            </InputGroupText>
          </InputGroupAddon>
          <Input 
            className="form-control"
            required
            type="text"
              id="nom"
              name="nom"
              value={currentLocataire.nom}
              onChange={handleInputChange} />
        </InputGroup>
      </FormGroup>
      <FormGroup>
        <InputGroup className="input-group-alternative">
          <InputGroupAddon addonType="prepend">
            <InputGroupText>
              <i className="ni ni-circle-08" />
            </InputGroupText>
          </InputGroupAddon>
          <Input 
            required
            type="text"
              className="form-control"
              id="prenom"
              name="prenom"
              value={currentLocataire.prenom}
              onChange={handleInputChange} />
        </InputGroup>
      </FormGroup>
      <FormGroup className="mb-3">
        <InputGroup className="input-group-alternative">
          <InputGroupAddon addonType="prepend">
            <InputGroupText>
              <i className="ni ni-email-83" />
            </InputGroupText>
          </InputGroupAddon>
          <Input 
           required
           type="text"
              className="form-control"
              id="email"
              name="email"
              value={currentLocataire.email}
              onChange={handleInputChange}/>
        </InputGroup>
      </FormGroup>   
      <div className="text-center">
      <div className="form-group">
            <label>
              <strong>Status : </strong>
            </label>
            {currentLocataire.Active ? " Actif" : " Bloqué"}
          </div>
      {currentLocataire.Active ? (
          <Button color="danger" type="button"   onClick={() => updateActive(false)}>
              Bloquer
            </Button>
        ) : (
            <Button color="success" type="button"   onClick={() => updateActive(true)}>
                Débloquer
          </Button>
        )}

            <Button color="default" type="submit" onClick={updateLocataire}>
                Modifier
          </Button>  
        </div>     
      </Form>
  </CardBody>
</Card>

    ) : (
      <div>
        <br />
        <p>Please click on a Locataire...</p>
      </div>
    )}
   
</div>
</Container>
        </div>
      </div>
    </React.Fragment>
    
  );
};

export default Locataire;