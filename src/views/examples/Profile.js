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
import React from 'react';
import axios from 'axios';
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
} from 'reactstrap';
// core components
import UserHeader from 'components/Headers/UserHeader.js';

class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            project: [],
            id: props.match.params.id,
            members: [],
            devices: [],
            selectedMember: '',
            selectedDevice: '',
            file: '',
            fileName: 'Choose File'
        };
    }

    componentDidMount() {
        const projectUrl =
            process.env.REACT_APP_PROJECT_SERVICE_URI +
            `/api/projects/${this.state.id}`;
        fetch(projectUrl, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + localStorage.getItem('token')
            }
        })
            .then(response => response.json())
            // .then(response => response.find(item => item.id === this.state.id))
            .then(response => this.setState({ project: response }));

        const membersUrl =
            process.env.REACT_APP_IAM_SERVICE_URI + '/api/users/';
        fetch(membersUrl, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + localStorage.getItem('token')
            }
        })
            .then(response => response.json())
            .then(response => this.setState({ members: response }));

        const devicesUrl =
            process.env.REACT_APP_DEVICE_SERVICE_URI + '/api/devices/';
        fetch(devicesUrl, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + localStorage.getItem('token')
            }
        })
            .then(response => response.json())
            .then(response => this.setState({ devices: response }));
    }

    fileInputChange = event => {
        this.setState({
            file: event.target.files[0],
            fileName: event.target.files[0].name
        });

        // postMember = () => {
        //     const option = document.getElementById('member').value;
        //     console.log(option);

        // document.getElementById("result").innerHTML = result;
        // console.log(process.env.REACT_APP_PROJECT_SERVICE_URI);
        // const url =
        //     process.env.REACT_APP_PROJECT_SERVICE_URI + '/api/projects/';
        // console.log(url);
        // fetch(url, {
        //     method: 'POST',
        //     headers: {
        //         Accept: 'application/json',
        //         'Content-Type': 'application/json',
        //         Authorization: 'Bearer ' + localStorage.getItem('token')
        //     },
        //     body: JSON.stringify({
        //         name: document.getElementById('projectName').value
        //         // password: this.state.password
        //     })
        // }).then(res => {
        //     if (res.status === 201) {
        //         console.log('deneme');
        //         this.props.history.push('/admin/projects');
        //     }
        // });
    };

    handleOnChange = event => {
        const { value, name } = event.target;
        this.setState(
            {
                [name]: value
            },
            () => {
                console.log(this.state);
            }
        );
        console.log(value, name, 'deneme', this.state);
    };

    handleFileUpload = async e => {
        e.preventDefault();
        if (this.state.file) {
            const formData = new FormData();
            console.log(this.state.file);
            formData.append('file', this.state.file);
            try {
                const url =
                    process.env.REACT_APP_FILE_SERVICE_URI +
                    `/api/files?projectId=${this.state.id}`;
                const res = await axios.post(url, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        Authorization: 'Bearer ' + localStorage.getItem('token')
                    }
                });

                const projectUrl =
                    process.env.REACT_APP_PROJECT_SERVICE_URI +
                    `/api/projects/${this.state.id}`;
                fetch(projectUrl, {
                    method: 'GET',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                        Authorization: 'Bearer ' + localStorage.getItem('token')
                    }
                })
                    .then(response => response.json())
                    // .then(response => response.find(item => item.id === this.state.id))
                    .then(response => this.setState({ project: response }));
            } catch (err) {
                if (err.response.status === 500) {
                    console.log('There was a problem with server');
                } else {
                    console.log(err.response.data.message);
                }
            }
        }
    };

    handleAssignDevice = () => {
        if (this.state.selectedDevice !== '') {
            const url =
                process.env.REACT_APP_PROJECT_SERVICE_URI +
                `/api/projects/${this.state.id}/addDevice`;
            console.log(url);

            console.log(this.state);
            fetch(url, {
                method: 'PUT',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + localStorage.getItem('token')
                },
                body: JSON.stringify({
                    deviceId: this.state.selectedDevice
                })
            })
                .then(res => {
                    if (res.status === 200) {
                        const projectUrl =
                            process.env.REACT_APP_PROJECT_SERVICE_URI +
                            `/api/projects/${this.state.id}`;
                        fetch(projectUrl, {
                            method: 'GET',
                            headers: {
                                Accept: 'application/json',
                                'Content-Type': 'application/json',
                                Authorization:
                                    'Bearer ' + localStorage.getItem('token')
                            }
                        })
                            .then(response => response.json())
                            // .then(response => response.find(item => item.id === this.state.id))
                            .then(response =>
                                this.setState({ project: response })
                            );
                        console.log(res);
                    }
                    // else {
                    //     const error = new Error(res.error);
                    //     throw error;
                    // }
                })
                .catch(err => console.log(JSON.stringify(err)));
        }
    };

    handleAssignMember = () => {
        const url =
            process.env.REACT_APP_PROJECT_SERVICE_URI +
            `/api/projects/${this.state.id}/addMember`;
        fetch(url, {
            method: 'PUT',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + localStorage.getItem('token')
            },
            body: JSON.stringify({
                email: this.state.selectedMember
            })
        })
            .then(res => {
                if (res.status === 200) {
                    const projectUrl =
                        process.env.REACT_APP_PROJECT_SERVICE_URI +
                        `/api/projects/${this.state.id}`;
                    fetch(projectUrl, {
                        method: 'GET',
                        headers: {
                            Accept: 'application/json',
                            'Content-Type': 'application/json',
                            Authorization:
                                'Bearer ' + localStorage.getItem('token')
                        }
                    })
                        .then(response => response.json())
                        // .then(response => response.find(item => item.id === this.state.id))
                        .then(response => this.setState({ project: response }));
                    console.log(res);
                }
                // else {
                //     const error = new Error(res.error);
                //     console.log(res);
                //     throw error;
                // }
            })
            .catch(err => console.log(JSON.stringify(err)));
    };

    render() {
        let { project, members, devices } = this.state;
        console.log(this.selectedDevice);
        return !project ? null : (
            <Container className='mt-5' fluid>
                <Row>
                    <Col className='order-xl-1' xl='12'>
                        <Card className='bg-secondary shadow'>
                            <CardHeader className='bg-white border-0'>
                                <Row className='align-items-center'>
                                    <Col xs='8'>
                                        <h2 className='mb-0'>
                                            Name: {project.name}
                                        </h2>
                                    </Col>
                                </Row>
                            </CardHeader>
                            <CardBody>
                                <Form>
                                    <FormGroup row>
                                        <Label
                                            for='exampleEmail'
                                            className='col-sm-2 col-form-label col-form-label-me'
                                        >
                                            Project Owner
                                        </Label>
                                        <Label className='col-sm-8 col-form-label col-form-label-me'>
                                            {project.owner
                                                ? project.owner.firstName +
                                                  ' ' +
                                                  project.owner.lastName
                                                : ''}
                                        </Label>
                                    </FormGroup>
                                    <FormGroup row>
                                        <Label
                                            for='exampleText'
                                            className='col-sm-2 col-form-label col-form-label-me'
                                        >
                                            Members
                                        </Label>
                                        <Label className='col-sm-8 col-form-label col-form-label-me'>
                                            {project.members
                                                ? project.members.map(
                                                      item =>
                                                          item.firstName +
                                                          ' ' +
                                                          item.lastName +
                                                          ','
                                                  )
                                                : ''}
                                        </Label>
                                    </FormGroup>
                                    <FormGroup row>
                                        <Label
                                            for='exampleSelect'
                                            sm={2}
                                        ></Label>
                                        <Col sm={7}>
                                            <Input
                                                size='sm'
                                                type='select'
                                                name='selectedMember'
                                                id='select'
                                                onChange={this.handleOnChange}
                                            >
                                                {members.map(m => (
                                                    <option
                                                        id='member'
                                                        value={m.email}
                                                        key={m.id}
                                                    >
                                                        {m.firstName +
                                                            ' ' +
                                                            m.lastName}
                                                    </option>
                                                ))}
                                            </Input>
                                        </Col>
                                        <FormGroup check row>
                                            <Col sm={{ size: 3, offset: 7 }}>
                                                <Button
                                                    color='primary'
                                                    size='sm'
                                                    onClick={
                                                        this.handleAssignMember
                                                    }
                                                >
                                                    Add Member
                                                </Button>
                                            </Col>
                                        </FormGroup>
                                    </FormGroup>

                                    <FormGroup row>
                                        <Label
                                            for='exampleText'
                                            className='col-sm-2 col-form-label col-form-label-me'
                                        >
                                            Devices
                                        </Label>
                                        <Label className='col-sm-8 col-form-label col-form-label-me'>
                                            {project.devices
                                                ? project.devices.map(
                                                      item => item.name + ', '
                                                  )
                                                : ''}
                                        </Label>
                                    </FormGroup>
                                    <FormGroup row>
                                        <Label
                                            for='exampleSelect'
                                            sm={2}
                                        ></Label>
                                        <Col sm={7}>
                                            <Input
                                                size='sm'
                                                type='select'
                                                name='selectedDevice'
                                                id='exampleSelect'
                                                onChange={this.handleOnChange}
                                            >
                                                {devices.map(d => (
                                                    <option
                                                        value={d.id}
                                                        key={d.id}
                                                    >
                                                        {d.name}
                                                    </option>
                                                ))}
                                            </Input>
                                        </Col>
                                        <FormGroup check row>
                                            <Col sm={{ size: 3, offset: 7 }}>
                                                <Button
                                                    size='sm'
                                                    color='primary'
                                                    onClick={
                                                        this.handleAssignDevice
                                                    }
                                                >
                                                    Add Device
                                                </Button>
                                            </Col>
                                        </FormGroup>
                                    </FormGroup>
                                    <FormGroup row>
                                        <Label
                                            for='exampleText'
                                            className='col-sm-2 col-form-label col-form-label-me'
                                        >
                                            Files
                                        </Label>
                                        <Label className='col-sm-8 col-form-label col-form-label-me'>
                                            {project.files
                                                ? project.files.map(
                                                      item => item + ', '
                                                  )
                                                : ''}
                                        </Label>
                                    </FormGroup>
                                    <FormGroup row>
                                        <Label for='exampleFile' sm={2}></Label>
                                        <Col sm={7}>
                                            <Input
                                                type='file'
                                                name='file'
                                                onChange={this.fileInputChange}
                                            />
                                            <FormText color='muted'>
                                                This is some placeholder
                                                block-level help text for the
                                                above input. It's a bit lighter
                                                and easily wraps to a new line.
                                            </FormText>
                                        </Col>
                                        <FormGroup check row>
                                            <Col sm={{ size: 3, offset: 7 }}>
                                                <Button
                                                    onClick={
                                                        this.handleFileUpload
                                                    }
                                                    size='sm'
                                                    color='primary'
                                                >
                                                    Upload File
                                                </Button>
                                            </Col>
                                        </FormGroup>
                                    </FormGroup>
                                </Form>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default Profile;
