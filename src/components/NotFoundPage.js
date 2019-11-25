import React from 'react'
import { MDBCol, MDBCard, MDBRow, MDBCardBody } from 'mdbreact';

const NotFoundPage = () => {
  return (
    <React.Fragment>
      <div className="full">
        <MDBRow className="pleaseSubscribe bad-gateway-row">
          <MDBCol md="8">
            {/*<img alt="Error 404" className="img-fluid" hieght="20px" src={logo}/>*/}
            <h2 className="h2-responsive mt-3 mb-2">Please Subscribe For more Access.</h2>
            <h4>The requested URL is restricted for Access.Please subscribe to Access this page.</h4>
          </MDBCol>
          <MDBCol md="4">
            <img alt="Error 404" className="img-fluid" src="https://mdbootstrap.com/img/Others/grafika404-bf.png" />
          </MDBCol>
        </MDBRow>

      </div>
    </React.Fragment>
  )
}

export default NotFoundPage;