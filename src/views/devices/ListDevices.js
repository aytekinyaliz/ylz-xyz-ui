import React, { Component } from "react";
import {
  Badge,
  Table,
  Button,
  Container,
  CardHeader,
  Col,
  Row,
  Card
} from "reactstrap";
//import alertify from 'alertifyjs';
import axios from "axios";
// core components
import Header from "components/Headers/Header.js";

class ListDevices extends Component {
  state = { devices: [] };

  async componentDidMount() {
    console.log("func:cdm get products");

    let url = `${process.env.REACT_APP_DEVICE_SERVICE_URI}/api/devices`;
    console.log("tg..url01:", url);
    const response = await axios
      .get(url, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token")
        }
      })
      .then(response => {
        console.log("response:", response);

        this.setState({ devices: response.data });
        console.log(
          "tg..cdm..03 response:",
          response,
          " state.devices:",
          this.state.devices
        );
      });
  }

  createDevice = product => {
    console.log("func:createDevice get products");
    //this.props.addToCart({ quantity: 1, product })
    // alertify.success("product.productName" + ' added to cart' )
    this.props.history.push("/admin/createdevice");
  };

  render() {
    //console.log('tg..rend01 this.state.devices:', this.state.devices)
    return (
      <>
          <Header />
        <Container fluid>
          {/* <div>
          <Button color="success" size="sm" className="float-right" onClick={e => this.createDevice("product1")} >
            Create New Device
          </Button>
        </div> */}
          <Card>
            <CardHeader className="bg-white border-0">
              <Row className="align-items-center">
                <Col xs="8">
                  <h2 className="mb-0">Devices List</h2>
                </Col>
                <Col className="text-right" xs="4">
                  <Button
                    color="success"
                    onClick={e => this.createDevice("product1")}
                    size="sm"
                  >
                    Create New Device
                  </Button>
                </Col>
              </Row>
            </CardHeader>

            <Table
             className='align-items-center table-flush table-hover'
             responsive
            >
              <thead>
                <tr>
                  <th>id#</th>
                  <th>Device Name</th>
                  <th>Serial Number</th>
                  <th>Created By</th>
                  <th>Created At( seconds)</th>
                  <th></th>
                </tr>
              </thead>

              <tbody>
                {/* ???? NEDEN IF YAZILMIYOR {if (this.state.devices.length > 0){ console.log("length dolu")} */}
                {console.log("tg..rend04:" + this.state.devices.length)}

                {this.state.devices.map(product => {
                  return (
                    <tr key={product.id}>
                      <th scope="row">{product.id}</th>
                      <td>{product.name}</td>
                      <td>{product.serialNumber}</td>
                      <td>{product.createdBy}</td>
                      <td>{product.createdAt._seconds}</td>
                      <td></td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </Card>
        </Container>
      </>
    );
  }
}

export default ListDevices;
