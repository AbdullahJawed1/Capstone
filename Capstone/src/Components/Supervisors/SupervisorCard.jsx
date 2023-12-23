import React from "react";
import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBBtn,
  MDBTypography,
  MDBIcon,
} from "mdb-react-ui-kit";

export default function SupervisorsCard() {
  return (
    <div className="vh-100" style={{ backgroundColor: "#eee" }}>
      <MDBContainer className="supervisorCards">
        <MDBRow className="justify-content-center">
          {/* Card 1 */}
          <MDBCol md="4" className="mt-5">
            <MDBCard style={{ borderRadius: "15px", backgroundColor: "#54B4D3" }}>
              <MDBCardBody className="p-4 text-black">
                <div>
                  <MDBTypography tag="h6">Supervisor's domain</MDBTypography>
                </div>
                <div className="d-flex align-items-center mb-4">
                  <div className="flex-shrink-0">
                    <MDBCardImage
                      style={{ width: "70px" }}
                      className="img-fluid rounded-circle border border-dark border-3"
                      src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-profiles/avatar-2.webp"
                      alt="Generic placeholder image"
                      fluid
                    />
                  </div>
                  <div className="flex-grow-1 ms-3">
                    <div className="d-flex flex-row align-items-center mb-2">
                      <p className="mb-0 me-2">Supervisor's Name</p>
                      <ul
                        className="mb-0 list-unstyled d-flex flex-row"
                        style={{ color: "#1B7B2C" }}
                      >
                        <li>
                          <MDBIcon fas icon="star fa-xs" />
                        </li>
                        <li>
                          <MDBIcon fas icon="star fa-xs" />
                        </li>
                        <li>
                          <MDBIcon fas icon="star fa-xs" />
                        </li>
                        <li>
                          <MDBIcon fas icon="star fa-xs" />
                        </li>
                        <li>
                          <MDBIcon fas icon="star fa-xs" />
                        </li>
                      </ul>
                    </div>
                    <div>
                      <MDBBtn
                        outline
                        color="dark"
                        rounded
                        size="sm"
                        className="mx-1"
                      >
                        See profile
                      </MDBBtn>
                    </div>
                  </div>
                </div>
                <hr />
                <MDBBtn
                  outline
                  color="#DC4C64"
                  style={{ backgroundColor: "#DC4C64" }}
                  rounded
                  block
                  size="lg"
                >
                  <MDBIcon far icon="clock me-2" /> Book now
                </MDBBtn>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>

          {/* Card 2 */}
          <MDBCol md="4" className="mt-5">
            <MDBCard style={{ borderRadius: "15px", backgroundColor: "#54B4D3" }}>
              <MDBCardBody className="p-4 text-black">
                <div>
                  <MDBTypography tag="h6">Supervisor's domain</MDBTypography>
                </div>
                <div className="d-flex align-items-center mb-4">
                  <div className="flex-shrink-0">
                    <MDBCardImage
                      style={{ width: "70px" }}
                      className="img-fluid rounded-circle border border-dark border-3"
                      src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-profiles/avatar-2.webp"
                      alt="Generic placeholder image"
                      fluid
                    />
                  </div>
                  <div className="flex-grow-1 ms-3">
                    <div className="d-flex flex-row align-items-center mb-2">
                      <p className="mb-0 me-2">Supervisor's Name</p>
                      <ul
                        className="mb-0 list-unstyled d-flex flex-row"
                        style={{ color: "#1B7B2C" }}
                      >
                        <li>
                          <MDBIcon fas icon="star fa-xs" />
                        </li>
                        <li>
                          <MDBIcon fas icon="star fa-xs" />
                        </li>
                        <li>
                          <MDBIcon fas icon="star fa-xs" />
                        </li>
                        <li>
                          <MDBIcon fas icon="star fa-xs" />
                        </li>
                        <li>
                          <MDBIcon fas icon="star fa-xs" />
                        </li>
                      </ul>
                    </div>
                    <div>
                      <MDBBtn
                        outline
                        color="dark"
                        rounded
                        size="sm"
                        className="mx-1"
                      >
                        See profile
                      </MDBBtn>
                    </div>
                  </div>
                </div>
                <hr />
                <MDBBtn
                  outline
                  color="#DC4C64"
                  style={{ backgroundColor: "#DC4C64" }}
                  rounded
                  block
                  size="lg"
                >
                  <MDBIcon far icon="clock me-2" /> Book now
                </MDBBtn>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>


           {/* Card 2 */}
           <MDBCol md="4" className="mt-5">
            <MDBCard style={{ borderRadius: "15px", backgroundColor: "#54B4D3" }}>
              <MDBCardBody className="p-4 text-black">
                <div>
                  <MDBTypography tag="h6">Supervisor's domain</MDBTypography>
                </div>
                <div className="d-flex align-items-center mb-4">
                  <div className="flex-shrink-0">
                    <MDBCardImage
                      style={{ width: "70px" }}
                      className="img-fluid rounded-circle border border-dark border-3"
                      src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-profiles/avatar-2.webp"
                      alt="Generic placeholder image"
                      fluid
                    />
                  </div>
                  <div className="flex-grow-1 ms-3">
                    <div className="d-flex flex-row align-items-center mb-2">
                      <p className="mb-0 me-2">Supervisor's Name</p>
                      <ul
                        className="mb-0 list-unstyled d-flex flex-row"
                        style={{ color: "#1B7B2C" }}
                      >
                        <li>
                          <MDBIcon fas icon="star fa-xs" />
                        </li>
                        <li>
                          <MDBIcon fas icon="star fa-xs" />
                        </li>
                        <li>
                          <MDBIcon fas icon="star fa-xs" />
                        </li>
                        <li>
                          <MDBIcon fas icon="star fa-xs" />
                        </li>
                        <li>
                          <MDBIcon fas icon="star fa-xs" />
                        </li>
                      </ul>
                    </div>
                    <div>
                      <MDBBtn
                        outline
                        color="dark"
                        rounded
                        size="sm"
                        className="mx-1"
                      >
                        See profile
                      </MDBBtn>
                    </div>
                  </div>
                </div>
                <hr />
                <MDBBtn
                  outline
                  color="#DC4C64"
                  style={{ backgroundColor: "#DC4C64" }}
                  rounded
                  block
                  size="lg"
                >
                  <MDBIcon far icon="clock me-2" /> Book now
                </MDBBtn>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>


 {/* Card 2 */}
 <MDBCol md="4" className="mt-5">
            <MDBCard style={{ borderRadius: "15px", backgroundColor: "#54B4D3" }}>
              <MDBCardBody className="p-4 text-black">
                <div>
                  <MDBTypography tag="h6">Supervisor's domain</MDBTypography>
                </div>
                <div className="d-flex align-items-center mb-4">
                  <div className="flex-shrink-0">
                    <MDBCardImage
                      style={{ width: "70px" }}
                      className="img-fluid rounded-circle border border-dark border-3"
                      src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-profiles/avatar-2.webp"
                      alt="Generic placeholder image"
                      fluid
                    />
                  </div>
                  <div className="flex-grow-1 ms-3">
                    <div className="d-flex flex-row align-items-center mb-2">
                      <p className="mb-0 me-2">Supervisor's Name</p>
                      <ul
                        className="mb-0 list-unstyled d-flex flex-row"
                        style={{ color: "#1B7B2C" }}
                      >
                        <li>
                          <MDBIcon fas icon="star fa-xs" />
                        </li>
                        <li>
                          <MDBIcon fas icon="star fa-xs" />
                        </li>
                        <li>
                          <MDBIcon fas icon="star fa-xs" />
                        </li>
                        <li>
                          <MDBIcon fas icon="star fa-xs" />
                        </li>
                        <li>
                          <MDBIcon fas icon="star fa-xs" />
                        </li>
                      </ul>
                    </div>
                    <div>
                      <MDBBtn
                        outline
                        color="dark"
                        rounded
                        size="sm"
                        className="mx-1"
                      >
                        See profile
                      </MDBBtn>
                    </div>
                  </div>
                </div>
                <hr />
                <MDBBtn
                  outline
                  color="#DC4C64"
                  style={{ backgroundColor: "#DC4C64" }}
                  rounded
                  block
                  size="lg"
                >
                  <MDBIcon far icon="clock me-2" /> Book now
                </MDBBtn>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>



          {/* Card 3 */}
          <MDBCol md="4" className="mt-5">
            <MDBCard style={{ borderRadius: "15px", backgroundColor: "#54B4D3" }}>
              <MDBCardBody className="p-4 text-black">
                <div>
                  <MDBTypography tag="h6">Supervisor's domain</MDBTypography>
                </div>
                <div className="d-flex align-items-center mb-4">
                  <div className="flex-shrink-0">
                    <MDBCardImage
                      style={{ width: "70px" }}
                      className="img-fluid rounded-circle border border-dark border-3"
                      src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-profiles/avatar-2.webp"
                      alt="Generic placeholder image"
                      fluid
                    />
                  </div>
                  <div className="flex-grow-1 ms-3">
                    <div className="d-flex flex-row align-items-center mb-2">
                      <p className="mb-0 me-2">Supervisor's Name</p>
                      <ul
                        className="mb-0 list-unstyled d-flex flex-row"
                        style={{ color: "#1B7B2C" }}
                      >
                        <li>
                          <MDBIcon fas icon="star fa-xs" />
                        </li>
                        <li>
                          <MDBIcon fas icon="star fa-xs" />
                        </li>
                        <li>
                          <MDBIcon fas icon="star fa-xs" />
                        </li>
                        <li>
                          <MDBIcon fas icon="star fa-xs" />
                        </li>
                        <li>
                          <MDBIcon fas icon="star fa-xs" />
                        </li>
                      </ul>
                    </div>
                    <div>
                      <MDBBtn
                        outline
                        color="dark"
                        rounded
                        size="sm"
                        className="mx-1"
                        >
                          See profile
                        </MDBBtn>
                      </div>
                    </div>
                  </div>
                  <hr />
                  <MDBBtn
                    outline
                    color="#DC4C64"
                    style={{ backgroundColor: "#DC4C64" }}
                    rounded
                    block
                    size="lg"
                  >
                    <MDBIcon far icon="clock me-2" /> Book now
                  </MDBBtn>
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </div>
    );
  }
  
