import React, { useState, useEffect } from "react";
import OperateurService from "../../services/OperateurService";
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
  

const Operateur = props => {
  const initialOperateurState = {
    idOperateur: null,
    nom: "",
    prenom: "", 
    email:"",
    salaire:0
};
  const [currentOperateur, setCurrentOperateur] = useState(initialOperateurState);
  const [message, setMessage] = useState("");
 
  const getOperateur =idOperateur=> {
    OperateurService.get(idOperateur)
      .then(response => {
        setCurrentOperateur(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  useEffect(() => {

    console.log(props.match.params.id);
    getOperateur(props.match.params.id);
  }, [props.match.params.id]);


  const handleInputChange = event => {
    const { name, value } = event.target;
    setCurrentOperateur({ ...currentOperateur, [name]: value });
  };
  const updateOperateur= (event) => {
    event.preventDefault();
    OperateurService.update(currentOperateur.idOperateur, currentOperateur)
      .then(response => {
        console.log(response.data);
        setMessage("L'Operateur est modifié avec succée!");
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
            <h1>Modifier un Agent de maintenance </h1>
          </div>
 <div className="modal-body p-0">
 {currentOperateur ? (
<Card className="bg-secondary shadow border-0">
  <CardBody className="px-lg-5 py-lg-5">
    
    <Form role="form" onSubmit={updateOperateur}>
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
              value={currentOperateur.nom}
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
              value={currentOperateur.prenom}
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
           type="email"
              className="form-control"
              id="email"
              name="email"
              value={currentOperateur.email}
              onChange={handleInputChange}/>
        </InputGroup>
      </FormGroup>   
      <FormGroup className="mb-3">
        <InputGroup className="input-group-alternative">
          <InputGroupAddon addonType="prepend">
            <InputGroupText>
              <i className="ni ni-dolar" />
            </InputGroupText>
          </InputGroupAddon>
          <Input 
           required
           type="number"
              className="form-control"
              id="salaire"
              name="salaire"
              value={currentOperateur.salaire}
              onChange={handleInputChange}/>
        </InputGroup>
      </FormGroup>   
      <div className="text-center">   
            <Button color="default" type="submit">
                Modifier
          </Button>  
        </div>     
        <br></br>
        <br></br>
        <div className="text-center">
          <p>{message}</p>
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

export default Operateur;