import React from 'react';
import classnames from 'classnames';
import { Container } from 'reactstrap';
import ListAbonnement from './Abonnement';
import http from '../../scripts/Network';
// reactstrap components
import {
  Card,
  CardBody,
  NavItem,
  NavLink,
  Nav,
  TabContent,
  TabPane,
} from 'reactstrap';
class Navs extends React.Component {
  state = {
    tabs: 1,
  };
  toggleNavs = (e, state, index) => {
    e.preventDefault();
    this.setState({
      [state]: index,
    });
  };
  render() {
    return (
      <React.Fragment>
        <div className='main-content'>
          <div className='mt-40'>
            <Container fluid>
              <div style={{ padding: '12px' }}>
                <h1>Liste des utilisateurs </h1>
              </div>
              <div className='nav-wrapper'>
                <Nav
                  className='nav-fill flex-column flex-md-row'
                  id='tabs-icons-text'
                  pills
                  role='tablist'
                ></Nav>
              </div>
              <Card className='shadow'>
                <ListAbonnement></ListAbonnement>
              </Card>
            </Container>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Navs;
