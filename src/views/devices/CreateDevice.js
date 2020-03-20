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
  Container,
  Row,
  Col
} from "reactstrap";
// core components
//import UserHeader from "components/Headers/UserHeader.js";
import axios from "axios";

class CreateDevice extends React.Component {
  state = { name: "", serialNumber: "", device: {} };

  handleOnSubmit = e => {
    e.preventDefault();
    this.createDeviceApp();
  };
  async createDeviceApp() {
    let data = JSON.stringify({
      name: this.state.name,
      serialNumber: this.state.serialNumber
    });

    console.log("tg..token:", localStorage.getItem("token"));
    console.log("tg..data:", data);
    //let url = 'http://localhost:5000/api/devices';
    const response = await axios({
      baseURL: process.env.REACT_APP_DEVICE_SERVICE_URI,
      url: "/api/devices",
      method: "post",
      data,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token")
      }
    }).then(response => {
      console.log("tg..05 after axios response:", response);
      this.props.history.push("/admin/listdevices");

      console.log("response:", response);

      this.setState({ device: response.data });
    });

  }

  handleInputChange = e => {
    const { value, name } = e.target;
    this.setState({
      [name]: value
    });
    console.log(this.props.history);
  };

  render() {
    return (
      <>
        <Header />
        <Container fluid>
          <Row>
            <Col className="order-xl-1" xl="8">
              <Card className="bg-secondary shadow">
                <CardHeader className="bg-white border-0">
                  <Row className="align-items-center">
                    <Col xs="8">
                      <h3 className="mb-0">Create Device</h3>
                    </Col>
                    <Col className="text-right" xs="4"></Col>
                  </Row>
                </CardHeader>
                <CardBody>
                  <Form onSubmit={this.handleOnSubmit}>
                    <div className="pl-lg-4">
                      <Row>
                        <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="device-name"
                            >
                              Device Name
                            </label>
                            <Input
                              className="form-control-alternative"
                              id="device-name"
                              placeholder="Enter Device Name"
                              type="text"
                              name="name"
                              onChange={this.handleInputChange}
                            />
                          </FormGroup>
                        </Col>
                        <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="serial-number"
                            >
                              Serial Number
                            </label>
                            <Input
                              className="form-control-alternative"
                              id="serial-number"
                              placeholder="Enter Serial Number"
                              type="text"
                              name="serialNumber"
                              onChange={this.handleInputChange}
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <div>
                          <Button
                            type="submit"
                            color="success"
                            size="sm"
                            className="float-right"
                          >
                            Submit
                          </Button>
                        </div>
                      </Row>
                    </div>
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

export default CreateDevice;
