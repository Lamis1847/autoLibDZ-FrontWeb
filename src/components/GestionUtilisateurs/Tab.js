import React from "react";
import classnames from "classnames";
import { Container } from "reactstrap";
import ListLocataires from "./ListLocataires"
import ListAdmin from "./ListAdministrateurs"
import ListAgents from "./ListAgents"
import ListOperateurs from "./ListOperateur"
import ListDirigeants from "./ListDirigeant"
// reactstrap components
import {
  Card,
  CardBody,
  NavItem,
  NavLink,
  Nav,
  TabContent,
  TabPane
} from "reactstrap";
class Navs extends React.Component {
  state = {
    tabs: 1
  };
  toggleNavs = (e, state, index) => {
    e.preventDefault();
    this.setState({
      [state]: index
    });
  };
  render() {
    return (

        <React.Fragment>
        <div className="main-content">
          <div className="mt-40">
            <Container fluid >
            <div style={{padding:"12px"}}>
              <h1>Liste des utilisateurs </h1>
            </div>
        <div className="nav-wrapper">
          <Nav
            className="nav-fill flex-column flex-md-row"
            id="tabs-icons-text"
            pills
            role="tablist"
          >
              
            <NavItem >
              <NavLink
                aria-selected={this.state.tabs === 1}
                className={classnames("mb-sm-3 mb-md-0", {
                  active: this.state.tabs === 1
                })}
                onClick={e => this.toggleNavs(e, "tabs", 1)}
                href="#pablo"
                role="tab"
              >
            
                Locataires
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                aria-selected={this.state.tabs === 2}
                className={classnames("mb-sm-3 mb-md-0", {
                  active: this.state.tabs === 2
                })}
                onClick={e => this.toggleNavs(e, "tabs", 2)}
                href="#pablo"
                role="tab"
              >
                    Admins
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
            
                aria-selected={this.state.tabs === 3}
                className={classnames("mb-sm-3 mb-md-0", {
                  active: this.state.tabs === 3
                })}
                onClick={e => this.toggleNavs(e, "tabs", 3)}
                href="#pablo"
                role="tab"
              >
        
                Agents
              </NavLink>
              
            </NavItem>
            <NavItem>
              <NavLink
            
                aria-selected={this.state.tabs === 4}
                className={classnames("mb-sm-3 mb-md-0", {
                  active: this.state.tabs === 4
                })}
                onClick={e => this.toggleNavs(e, "tabs", 4)}
                href="#pablo"
                role="tab"
              >
                  Operateurs
              </NavLink>
              </NavItem>
              <NavItem>
              <NavLink
            
            aria-selected={this.state.tabs === 5}
            className={classnames("mb-sm-3 mb-md-0", {
              active: this.state.tabs === 5
            })}
            onClick={e => this.toggleNavs(e, "tabs", 5)}
            href="#pablo"
            role="tab"
          >
              Dirigeants
          </NavLink>
             
              
              
            </NavItem>
            
          </Nav>
        </div>
        <Card className="shadow">
          <CardBody>
            <TabContent activeTab={"tabs" + this.state.tabs}>
              <TabPane tabId="tabs1">
                <ListLocataires></ListLocataires>
              </TabPane>
              <TabPane tabId="tabs2">
                <p className="description">
                  <ListAdmin></ListAdmin>
                </p>
              </TabPane>
              <TabPane tabId="tabs3">
                <p className="description">
                  <ListAgents></ListAgents>
                </p>
              </TabPane>
              <TabPane tabId="tabs4">
                <p className="description">
                  <ListOperateurs></ListOperateurs>
                </p>
              </TabPane>
              <TabPane tabId="tabs5">
                <p className="description">
                  <ListDirigeants></ListDirigeants>
                </p>
              </TabPane>
            </TabContent>
          </CardBody>
        </Card>
      </Container>
      </div>
      </div>
    </React.Fragment>
    );
  }
}

export default Navs;