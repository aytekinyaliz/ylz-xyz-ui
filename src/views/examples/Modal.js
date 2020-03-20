import React from 'react';

// reactstrap components
import {
    ListGroup,
    ListGroupItem,
    Modal
} from 'reactstrap';

class Modals extends React.Component {
    state = {
        exampleModal: false,
        project: this.props
    };
    toggleModal = state => {
        this.setState({
            [state]: !this.state[state]
        });
    };

    render() {
        let { projects } = this.state.project;
        return (
            <>
                {/* Button trigger modal */}

                <i
                    className='fas fa-search'
                    onClick={() => this.toggleModal('exampleModal')}
                ></i>
                {/* Modal */}
                <Modal
                    className='modal-dialog-centered'
                    isOpen={this.state.exampleModal}
                    toggle={() => this.toggleModal('exampleModal')}
                >
                    <div>
                        {
                            //
                            //     <h5 className='modal-title' id='exampleModalLabel'>
                            //         {this.state.project.projects.name}
                            //     </h5>
                            //     <button
                            //         aria-label='Close'
                            //         className='close'
                            //         data-dismiss='modal'
                            //         type='button'
                            //         onClick={() => this.toggleModal('exampleModal')}
                            //     >
                            //         <span aria-hidden={true}>×</span>
                            //     </button>
                            // </div>
                            // <div className='modal-body'>...</div>
                            // <div className='modal-footer'>
                            //     <Button
                            //         color='secondary'
                            //         data-dismiss='modal'
                            //         type='button'
                            //         onClick={() => this.toggleModal('exampleModal')}
                            //     >
                            //         Close
                            //     </Button>
                            //     <Button color='primary' type='button'>
                            //         Save changes
                            //     </Button>
                            //<Table bordered>
                            //     <tbody>
                            //         <tr>
                            //             <th scope='row'>Project Name</th>
                            //             <td>{projects.name}</td>
                            //         </tr>
                            //     </tbody>
                            // </Table>
                        }
                        <ListGroup>
                            <ListGroupItem active>
                                Project Details of{' '}
                                <strong>"{projects.name.toUpperCase()}"</strong>
                            </ListGroupItem>
                            <ListGroupItem>
                                Project Name: <strong>"{projects.name}"</strong>
                            </ListGroupItem>
                            <ListGroupItem>
                                Project Owner:{' '}
                                <strong>
                                    "
                                    {projects.owner.firstName.toUpperCase() +
                                        ' ' +
                                        projects.owner.lastName.toUpperCase()}
                                    "
                                </strong>
                            </ListGroupItem>
                            <ListGroupItem>
                                {projects.members.length > 0 ? (
                                    <div>
                                        Members:
                                        <strong>
                                            {projects.members.map(
                                                item =>
                                                    '|' +
                                                    item.firstName +
                                                    ' ' +
                                                    item.lastName +
                                                    '|'
                                            )}
                                        </strong>
                                    </div>
                                ) : (
                                    <div>
                                        Members:
                                        <strong> No member was found</strong>
                                    </div>
                                )}
                            </ListGroupItem>
                            <ListGroupItem>
                                {projects.members.length > 0 ? (
                                    <div>
                                        Devices:
                                        <strong>
                                            {projects.devices.map(
                                                item => '|' + item.name + '|'
                                            )}
                                        </strong>
                                    </div>
                                ) : (
                                    <div>
                                        Devices:
                                        <strong> No device was found</strong>
                                    </div>
                                )}
                            </ListGroupItem>
                            <ListGroupItem>
                                {projects.files.length < 1 ? (
                                    <div>
                                        Files:
                                        <strong>
                                            {projects.files.map(item => item)}
                                        </strong>
                                    </div>
                                ) : (
                                    <div>
                                        Files:
                                        <strong> No file was found</strong>
                                    </div>
                                )}
                            </ListGroupItem>
                        </ListGroup>
                    </div>
                </Modal>
            </>
        );
    }

    // render() {
    //     return (
    //         <Row>
    //             <Col xs='6' md='4'>
    //                 <i
    //                     className='fas fa-search'
    //                     onClick={() => this.toggleModal('formModal')}
    //                 ></i>
    //                 <Modal
    //                     className='modal-dialog-centered'
    //                     size='sm'
    //                     isOpen={this.state.formModal}
    //                     toggle={() => this.toggleModal('formModal')}
    //                 >
    //                     <div className='modal-body p-0'>
    //                         <Card className='bg-secondary shadow border-0'>
    //                             <CardHeader className='bg-transparent pb-5'>
    //                                 <div className='text-muted text-center mt-2 mb-3'>
    //                                     <small>Sign in with</small>
    //                                 </div>
    //                                 <div className='btn-wrapper text-center'>
    //                                     <Button
    //                                         className='btn-neutral btn-icon'
    //                                         color='default'
    //                                         href='#pablo'
    //                                         onClick={e => e.preventDefault()}
    //                                     >
    //                                         <span className='btn-inner--icon'>
    //                                             <img
    //                                                 alt='...'
    //                                                 src={require('assets/img/icons/common/github.svg')}
    //                                             />
    //                                         </span>
    //                                         <span className='btn-inner--text'>
    //                                             Github
    //                                         </span>
    //                                     </Button>
    //                                     <Button
    //                                         className='btn-neutral btn-icon'
    //                                         color='default'
    //                                         href='#pablo'
    //                                         onClick={e => e.preventDefault()}
    //                                     >
    //                                         <span className='btn-inner--icon'>
    //                                             <img
    //                                                 alt='...'
    //                                                 src={require('assets/img/icons/common/google.svg')}
    //                                             />
    //                                         </span>
    //                                         <span className='btn-inner--text'>
    //                                             Google
    //                                         </span>
    //                                     </Button>
    //                                 </div>
    //                             </CardHeader>
    //                             <CardBody className='px-lg-5 py-lg-5'>
    //                                 <div className='text-center text-muted mb-4'>
    //                                     <small>
    //                                         Or sign in with credentials
    //                                     </small>
    //                                 </div>
    //                                 <Form role='form'>
    //                                     <FormGroup className='mb-3'>
    //                                         <InputGroup className='input-group-alternative'>
    //                                             <InputGroupAddon addonType='prepend'>
    //                                                 <InputGroupText>
    //                                                     <i className='ni ni-email-83' />
    //                                                 </InputGroupText>
    //                                             </InputGroupAddon>
    //                                             <Input
    //                                                 placeholder='Email'
    //                                                 type='email'
    //                                             />
    //                                         </InputGroup>
    //                                     </FormGroup>
    //                                     <FormGroup>
    //                                         <InputGroup className='input-group-alternative'>
    //                                             <InputGroupAddon addonType='prepend'>
    //                                                 <InputGroupText>
    //                                                     <i className='ni ni-lock-circle-open' />
    //                                                 </InputGroupText>
    //                                             </InputGroupAddon>
    //                                             <Input
    //                                                 placeholder='Password'
    //                                                 type='password'
    //                                             />
    //                                         </InputGroup>
    //                                     </FormGroup>
    //                                     <div className='custom-control custom-control-alternative custom-checkbox'>
    //                                         <input
    //                                             className='custom-control-input'
    //                                             id=' customCheckLogin'
    //                                             type='checkbox'
    //                                         />
    //                                         <label
    //                                             className='custom-control-label'
    //                                             htmlFor=' customCheckLogin'
    //                                         >
    //                                             <span className='text-muted'>
    //                                                 Remember me
    //                                             </span>
    //                                         </label>
    //                                     </div>
    //                                     <div className='text-center'>
    //                                         <Button
    //                                             className='my-4'
    //                                             color='primary'
    //                                             type='button'
    //                                         >
    //                                             Sign in
    //                                         </Button>
    //                                     </div>
    //                                 </Form>
    //                             </CardBody>
    //                         </Card>
    //                     </div>
    //                 </Modal>
    //             </Col>
    //         </Row>
    //     );
    // }
}

export default Modals;
