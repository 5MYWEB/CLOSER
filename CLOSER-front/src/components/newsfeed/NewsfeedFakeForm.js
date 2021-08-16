import React from 'react';
import { withRouter  } from 'react-router-dom';
import { RippleButton } from '../../styles/index';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImages } from "@fortawesome/free-solid-svg-icons";
import { Row, Col, Container } from 'react-bootstrap';

const NewsfeedFakeForm = ({ history }) => {

  const onClick = ( ) => {
    setTimeout( function() {
      history.push('/login')
    }, 350);
  }
  
  return (
      <>
          <div className="mx-5 mt-4 mb-3">
            <form 
              onClick={() => { history.push('/login')}} 
              encType="multipart/form-data" >
              <Container>
                <Row className="mb-3 g-0">
                  <Col xs={11}>
                    <input 
                      type="text" 
                      className="form-control my-0" 
                      placeholder="무슨 생각을 하고 계신가요?"
                    />
                  </Col>
                  <Col xs={1} >
                    <label className="input-file-button" htmlFor="input-file">
                      <FontAwesomeIcon icon={faImages} style={{ color: "#5552FF", width: "100%"}}/> 
                    </label>
                    <input type="file" id="input-file" multiple style={{display:"none"}}/>
                  </Col>
                </Row>
              </Container>
            </form>
              <div className="d-flex justify-content-center">
                <RippleButton onClick={onClick} cclass="cbtn cbtn-primary cbtn-lg" children="업로드"/>
              </div>
          </div>
      </>
  )
}

export default withRouter(NewsfeedFakeForm);