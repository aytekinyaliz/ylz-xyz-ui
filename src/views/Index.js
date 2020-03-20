import React from 'react';
// node.js library that concatenates classes (strings)
//import classnames from 'classnames';
// javascipt plugin for creating charts
import Chart from 'chart.js';
// react plugin used to create charts
//import { Line, Bar } from 'react-chartjs-2';
// reactstrap components
// import {
//     Button,
//     Card,
//     CardHeader,
//     CardBody,
//     NavItem,
//     NavLink,
//     Nav,
//     Progress,
//     Table,
//     Container,
//     Row,
//     Col
// } from 'reactstrap';

// core components
import {
    chartOptions,
    parseOptions
    // chartExample1,
    // chartExample2
} from '../variables/charts';

import Header from 'components/Headers/Header.js';
import Tables from '../views/examples/Tables';
// import Mo÷dals from './examples/Modal';

class Index extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            activeNav: 1,
            chartExample1Data: 'data1'
        };
        if (window.Chart) {
            parseOptions(Chart, chartOptions());
        }
    }
    toggleNavs = (e, index) => {
        e.preventDefault();
        this.setState({
            activeNav: index,
            chartExample1Data:
                this.state.chartExample1Data === 'data1' ? 'data2' : 'data1'
        });
    };
    render() {
        return (
            <>
                {<Header />}
                <Tables {...this.props} />

                {/* Page content */}
                {
                    //   <Container className='mt--7' fluid>
                    //     <Row>
                    //         <Col className='mb-5 mb-xl-0' xl='8'>
                    //            </Col>
                    //         <Col xl='4'>
                    //          </Col>
                    //     </Row>
                    //     <Row className='mt-5'>
                    //         <Col className='mb-5 mb-xl-0' xl='8'>
                    //             </Col>
                    //         <Col xl='4'>
                    //             </Col>
                    //     </Row>
                    // </Container>
                }
            </>
        );
    }
}

export default Index;
