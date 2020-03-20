import React from 'react';
import { Link } from 'react-router-dom';

// reactstrap components
import {
    Button,
    Card,
    CardBody,
    FormGroup,
    Form,
    Input,
    InputGroupAddon,
    InputGroupText,
    InputGroup,
    Row,
    Col
} from 'reactstrap';

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            error: ''
        };
        this.onSubmit = this.onSubmit.bind(this);
    }

    handleInputChange = event => {
        const { value, name } = event.target;
        this.setState({
            [name]: value
        });
    };

    onSubmit = event => {
        event.preventDefault();
        const url = process.env.REACT_APP_IAM_SERVICE_URI + '/api/users/signIn';
        fetch(url, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: this.state.email,
                password: this.state.password
            })
        })
            .then(res => {
                if (res.status === 200) {
                    return res.json();
                } else {
                    const error = new Error(res.error);
                    throw error;
                }
            })
            .then(response => {
                localStorage.setItem('token', response.token);
                localStorage.setItem('email',this.state.email)
                this.props.history.push('/admin/projects');
            })
            .catch(err => {
                this.setState({
                    error: 'Wrong email or password!'
                });
            });
    };
    render() {
        return (
            <>
                <Col lg='5' md='7'>
                    <Card className='bg-secondary shadow border-0'>
                        <CardBody className='px-lg-5 py-lg-5'>
                            <div className='text-center text-muted mb-4'>
                                <small>Sign in</small>
                            </div>
                            <Form role='form' onSubmit={this.onSubmit}>
                                <FormGroup className='mb-3'>
                                    <InputGroup className='input-group-alternative'>
                                        <InputGroupAddon addonType='prepend'>
                                            <InputGroupText>
                                                <i className='ni ni-email-83' />
                                            </InputGroupText>
                                        </InputGroupAddon>
                                        <Input
                                            placeholder='Email'
                                            type='email'
                                            autoComplete='new-email'
                                            name='email'
                                            onChange={this.handleInputChange}
                                        />
                                    </InputGroup>
                                </FormGroup>
                                <FormGroup>
                                    <InputGroup className='input-group-alternative'>
                                        <InputGroupAddon addonType='prepend'>
                                            <InputGroupText>
                                                <i className='ni ni-lock-circle-open' />
                                            </InputGroupText>
                                        </InputGroupAddon>
                                        <Input
                                            placeholder='Password'
                                            type='password'
                                            autoComplete='new-password'
                                            name='password'
                                            onChange={this.handleInputChange}
                                        />
                                    </InputGroup>
                                </FormGroup>
                                {this.state.error && (
                                    <p
                                        style={{
                                            color: 'red',
                                            fontSize: '14px'
                                        }}
                                    >
                                        {this.state.error}
                                    </p>
                                )}
                                <div className='custom-control custom-control-alternative custom-checkbox'>
                                    <input
                                        className='custom-control-input'
                                        id=' customCheckLogin'
                                        type='checkbox'
                                    />
                                    <label
                                        className='custom-control-label'
                                        htmlFor=' customCheckLogin'
                                    >
                                        <span className='text-muted'>
                                            Remember me
                                        </span>
                                    </label>
                                </div>
                                <div className='text-center'>
                                    <Button
                                        className='my-4'
                                        color='primary'
                                        type='submit'
                                    >
                                        Sign in
                                    </Button>
                                </div>
                            </Form>
                        </CardBody>
                    </Card>
                    <Row className='mt-3'>
                        <Col xs='6'></Col>
                        <Col className='text-right' xs='6'>
                            <small>
                                <Link
                                    className='text-light'
                                    to='/auth/register'
                                >
                                    Create new account
                                </Link>
                            </small>
                        </Col>
                    </Row>
                </Col>
            </>
        );
    }
}

export default Login;
