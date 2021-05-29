import React, { useState, useEffect } from "react";
import AdminService from "../../services/AdministrateurService";
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
  

const Admin = props => {
  const initialAdminState = {
    idAdministrateur: null,
    nom: "",
    prenom: "", 
    email:"",
    salaire:0
};
  const [currentAdmin, setCurrentAdmin] = useState(initialAdminState);
  const [message, setMessage] = useState("");
 
  const getAdmin = idAdministrateur => {
    AdminService.get(idAdministrateur)
      .then(response => {
        setCurrentAdmin(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  useEffect(() => {

    console.log(props.match.params.id);
    getAdmin(props.match.params.id);
  }, [props.match.params.id]);


  const handleInputChange = event => {
    const { name, value } = event.target;
    setCurrentAdmin({ ...currentAdmin, [name]: value });
  };
  const updateAdmin = (event) => {
    event.preventDefault();
    AdminService.update(currentAdmin.idAdministrateur, currentAdmin)
      .then(response => {
        console.log(response.data);
        setMessage("L'administrateur est modifié avec succée!");
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
            <h1>Modifier un Administrateur </h1>
          </div>
 <div className="modal-body p-0">
 {currentAdmin ? (
<Card className="bg-secondary shadow border-0">
  <CardBody className="px-lg-5 py-lg-5">
    
    <Form role="form" onSubmit={updateAdmin}>
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
              value={currentAdmin.nom}
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
              value={currentAdmin.prenom}
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
              value={currentAdmin.email}
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
              value={currentAdmin.salaire}
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

export default Admin;