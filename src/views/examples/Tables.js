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

// reactstrap components
import {
    Button,
    Card,
    CardHeader,
    CardFooter,
    Col,
    Table,
    Container,
    Row
} from 'reactstrap';
// core components
import detailIcon from '../../assets/img/search3.png';

class Tables extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            projects: []
        };
    }

    componentDidMount() {
        const url =
            process.env.REACT_APP_PROJECT_SERVICE_URI + '/api/projects/';
        fetch(url, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + localStorage.getItem('token')
            }
        })
            .then(response => response.json())
            .then(response => this.setState({ projects: response }))
            .catch(err => console.log(err));
    }

    handleShowDetails = e => {
        const id = e.target.getAttribute('name');
        this.props.history.push({ pathname: `/admin/projects/${id}` });
    };

    handleCreate = () => {
        this.props.history.push(`/admin/createproject`);
    };

    render() {
        let { projects } = this.state;
        console.log(projects);
        return !projects ? null : (
            <>
                {/* Page content */}
                <Container fluid>
                    {/* Table */}
                    <Row>
                        <div className='col'>
                            <Card className='shadow'>
                                <CardHeader className='bg-white border-0'>
                                    <Row className='align-items-center'>
                                        <Col xs='8'>
                                            <h2 className='mb-0'>
                                                Projects List
                                            </h2>
                                        </Col>
                                        <Col className='text-right' xs='4'>
                                            <Button
                                                color='success'
                                                onClick={e =>
                                                    this.handleCreate(e)
                                                }
                                                size='sm'
                                            >
                                                Create Project
                                            </Button>
                                        </Col>
                                    </Row>
                                </CardHeader>
                                <Table
                                    className='align-items-center table-flush table-hover'
                                    responsive
                                >
                                    <thead className='thead-light'>
                                        <tr>
                                            <th scope='col'>Project Name</th>
                                            <th scope='col'>Project Owner</th>
                                            <th scope='col'>Members</th>
                                            <th scope='col'>Devices</th>
                                            <th scope='col' />
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {projects.map(item => (
                                            <tr key={item.id}>
                                                <th scope='row'>
                                                    <span className='mb-0 text-sm'>
                                                        {item.name}
                                                    </span>
                                                </th>
                                                <td>
                                                    <span className='mb-0 text-sm'>
                                                        {(
                                                            item.owner
                                                                .firstName +
                                                            ' ' +
                                                            item.owner.lastName
                                                        ).toUpperCase()}
                                                    </span>
                                                </td>
                                                <td>
                                                    <span className='mb-0 text-sm'>
                                                        {item.members.map(
                                                            item =>
                                                                item.firstName +
                                                                ' ' +
                                                                item.lastName +
                                                                ','
                                                        )}
                                                    </span>
                                                </td>
                                                <td>
                                                    <span className='mb-0 text-sm'>
                                                        {item.devices.map(
                                                            item =>
                                                                item.name + ','
                                                        )}
                                                    </span>
                                                </td>
                                                <td
                                                    className='text-right'
                                                    style={{
                                                        cursor: 'pointer'
                                                    }}
                                                >
                                                    {/*<Modals projects={item} />*/}
                                                    <img
                                                        src={detailIcon}
                                                        alt='search'
                                                        name={item.id}
                                                        onClick={e =>
                                                            this.handleShowDetails(
                                                                e
                                                            )
                                                        }
                                                    />
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </Table>
                                <CardFooter className='py-4'></CardFooter>
                            </Card>
                        </div>
                    </Row>
                    {/* Dark table */}
                </Container>
            </>
        );
    }
}

export default Tables;
