import React from 'react';
import classnames from 'classnames';
// reactstrap components
import {
  Button,
  Card,
  CardBody,
  CardImg,
  CardTitle,
  CardText,
  Row,
  Col,
} from 'reactstrap';

class Cards extends React.Component {
  render() {
    return (
      <>
        <div>
          <Card className='card-stats mb-0 mb-lg-0'>
            <CardBody>
              <Row>
                <div className='col'>
                  <CardTitle className='text-uppercase text-muted mb-0'>
                    Solde
                  </CardTitle>
                  <span className='h2 font-weight-bold mb-0'>350,897</span>
                </div>
                <Col className='col-auto'>
                  <div className='icon icon-shape bg-danger text-white rounded-circle shadow'>
                    <i className='fas fa-times' />
                  </div>
                </Col>
              </Row>
              <p className='mt-3 mb-0 text-muted text-sm'>
                <span className='text-nowrap'>Recharger</span>
              </p>
              <Row>
                <div className='col'></div>
                <Col className='col-auto'>
                  <button
                    style={{
                      padding: '0 30px',
                      backgroundColor: '#252834',
                      borderRadius: '4px',
                      color: 'white',
                      fontWeight: 'bold',
                      height: 40,
                      border: 0,
                    }}
                  >
                    Confirmer
                  </button>
                </Col>
              </Row>
            </CardBody>
          </Card>
        </div>
      </>
    );
  }
}

export default Cards;
