import React, { useState, useEffect } from "react";
import DirigeantService from "../../services/DirigeantService";
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
  

const Dirigeant = props => {
  const initialDirigeantState = {
    idDirigeant: null,
    nom: "",
    prenom: "", 
    email:"",
    salaire:0
};
  const [currentDirigeant, setCurrentDirigeant] = useState(initialDirigeantState);
  const [message, setMessage] = useState("");
 
  const getDirigeant =idDirigeant => {
    DirigeantService.get(idDirigeant)
      .then(response => {
        setCurrentDirigeant(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  useEffect(() => {

    console.log(props.match.params.id);
    getDirigeant(props.match.params.id);
  }, [props.match.params.id]);


  const handleInputChange = event => {
    const { name, value } = event.target;
    setCurrentDirigeant({ ...currentDirigeant, [name]: value });
  };
  const updateDirigeant= (event) => {
    event.preventDefault();
    DirigeantService.update(currentDirigeant.idDirigeant, currentDirigeant)
      .then(response => {
        console.log(response.data);
        setMessage("Le dirigeant est modifié avec succée!");
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
            <h1>Modifier un Dirigeant </h1>
          </div>
 <div className="modal-body p-0">
 {currentDirigeant ? (
<Card className="bg-secondary shadow border-0">
  <CardBody className="px-lg-5 py-lg-5">
    
    <Form role="form" onSubmit={updateDirigeant}>
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
              value={currentDirigeant.nom}
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
              value={currentDirigeant.prenom}
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
              value={currentDirigeant.email}
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
              value={currentDirigeant.salaire}
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

export default Dirigeant;