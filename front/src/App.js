import React, { Component } from 'react'; // eslint-disable-line no-unused-vars
import './App.css';

import Availability from './components/availability'; // eslint-disable-line no-unused-vars
import Response from './components/response'; // eslint-disable-line no-unused-vars
import Events from './components/events'; // eslint-disable-line no-unused-vars

const containerPage = {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'center',
};

const containerContent = {
    display: 'flex',
    flexDirection: 'column',
    width: '720px',
    justifyContent: 'center',
    paddingTop: 64,
};

const containerSection = {
    width: '100%',
    marginTop: 48,
};

const headingStyle = {
    fontFamily: 'Quicksand',
    fontWeight: 700,
    color: '#22292F',
};

const h1 = {
    fontSize: 16,
};

const h2 = {
    fontSize: 12,
    letterSpacing: 0.5,
    textTransform: 'uppercase',
};

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            availability: [],
        };
    }

    componentDidMount() {
        this.setState({ isLoading: true });
        this.fetchData();
        this.refresh = setInterval(() => this.fetchData(), 300000);
    }

    async fetchData() {
        const response = await fetch('https://n2hvdpqs9l.execute-api.eu-west-1.amazonaws.com/production');
        const json = await response.json();
        const status = json.status.aws;
        const podEvents = this.appendXY(json.metrics.podEvents[0].pointlist);
        const responseTime1a = this.appendXY(json.metrics.responseTime[0].pointlist);
        const responseTime1b = this.appendXY(json.metrics.responseTime[1].pointlist);
        const responseTime1c = this.appendXY(json.metrics.responseTime[2].pointlist);
        const availability = this.processServiceUptime(json.uptime);
        this.setState({
            isLoading: false, status, podEvents, responseTime1a, responseTime1b, responseTime1c, availability,
        });
    }

    componentWillUnmount() {
        clearInterval(this.refresh);
    }

    appendXY = param => {
        let data = [];
        param.forEach(element => {
            const arr = {
                x: element[0],
                y: element[1],
            };
            data = [
                ...data,
                arr,
            ];
        });
        return data;
    }

    processServiceUptime = param => {
        console.log(param);
        let data = [];
        param.forEach(service => {
            const arr = {
                name: service.scope,
                uptime: `${Math.round(service.average * 100) / 100}%`,
            };
            data = [
                ...data,
                arr,
            ];
        });
        return data;
    }


    render() {
        return (
            <div style={containerPage}>
                <div style={containerContent}>

                    {/* <div style={{
                        width: 'auto',
                        paddingTop: 12,
                        paddingBottom: 12,
                        paddingLeft: 16,
                        paddingRight: 16,
                        background: '#FCEBEA',
                        border: '1px solid #EF5753',
                        borderRadius: 4,
                        overflow: 'hidden'
                    }}>
                        <strong style={{
                            color: '#CC1F1A',
                            fontSize: 14,
                            fontWeight: 700,
                            fontFamily: 'Quicksand'
                        }}>Holy smokes!
                        </strong>
                        <span style={{
                            color: '#CC1F1A',
                            fontSize: 14,
                            fontWeight: 400,
                            fontFamily: 'Quicksand'
                        }}> Something seriously bad happened.</span>
                    </div> */}


                    <h1 style={{ ...headingStyle, ...h1 }}>Pod Point Status</h1>

                    <div style={containerSection}>
                        <h2 style={{ ...headingStyle, ...h2 }}>Availability</h2>
                        <Availability data={this.state.availability} />
                    </div>

                    <div style={containerSection}>
                        <h2 style={{ ...headingStyle, ...h2 }}>API Response</h2>
                        <Response data1a={this.state.responseTime1a} data1b={this.state.responseTime1b} data1c={this.state.responseTime1c}/>
                    </div>

                    <div style={containerSection}>
                        <h2 style={{ ...headingStyle, ...h2 }}>Pod Events</h2>
                        <Events data={this.state.podEvents} />
                    </div>
                    <div style={containerSection} />
                </div>
            </div>
        );
    }
}

export default App;
