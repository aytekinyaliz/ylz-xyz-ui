/*!

=========================================================
* Argon Dashboard React - v1.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
import Header from "components/Headers/Header.js";
// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  Label,
  Container,
  Row,
  FormText,
  Col
} from "reactstrap";
// core components
import UserHeader from "components/Headers/UserHeader.js";
import axios from "axios";

class CreateProject extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      members: [],
      devices: []
    };
  }

  componentDidMount() {
    const membersUrl = process.env.REACT_APP_IAM_SERVICE_URI + "/api/users/";
    fetch(membersUrl, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token")
      }
    })
      .then(response => response.json())
      .then(response => this.setState({ members: response }));
    const devicesUrl =
      process.env.REACT_APP_DEVICE_SERVICE_URI + "/api/devices/";

    fetch(devicesUrl, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token")
      }
    })
      .then(response => response.json())
      .then(response => this.setState({ devices: response }));
  }

  postProject = () => {
    console.log(process.env.REACT_APP_PROJECT_SERVICE_URI);
    const url = process.env.REACT_APP_PROJECT_SERVICE_URI + "/api/projects/";
    console.log(url);
    fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token")
      },
      body: JSON.stringify({
        name: document.getElementById("projectName").value
        // password: this.state.password
      })
    }).then(res => {
      if (res.status === 201) {
        console.log("deneme");
        this.props.history.push("/admin/projects");
      }
    });
  };

  handleGoMain = () => {
    this.props.history.push("/admin/projects");
  };

  render() {
    let { members, devices } = this.state;
    {
      console.log(this.props);
    }
    return (
      <>
        <Header />
        <Container fluid>
          <Row>
            <Col className="order-xl-1" xl="12">
              <Card className="bg-secondary shadow">
                <CardHeader className="bg-white border-0">
                  <Row className="align-items-center">
                    <Col xs="8">
                      <h2 className="mb-0">Create Project</h2>
                    </Col>
                    <Col className="text-right" xs="4">
                      <Button
                        color="success"
                        size="sm"
                        onClick={this.handleGoMain}
                      >
                        Cancel
                      </Button>
                    </Col>
                  </Row>
                </CardHeader>
                <CardBody>
                  <Form>
                    <FormGroup row>
                      <Label
                        for="exampleEmail"
                        className="col-sm-2 col-form-label col-form-label-me"
                      >
                        Project Name
                      </Label>
                      <Input
                        className="col-sm-9"
                        type="text"
                        placeholder="Project Name"
                        id="projectName"
                      />
                    </FormGroup>

                    <FormGroup check row>
                      <Col sm={{ size: 10, offset: 2 }}>
                        <Button color="primary" onClick={this.postProject}>
                          Create
                        </Button>
                      </Col>
                    </FormGroup>
                  </Form>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </>
    );
  }
}

export default CreateProject;
