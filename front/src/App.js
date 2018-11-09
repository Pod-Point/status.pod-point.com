import React, { Component } from 'react'; // eslint-disable-line no-unused-vars
import styled from 'styled-components';

import logo from './logo.svg';
import Availability from './Availability'; // eslint-disable-line no-unused-vars

const PageContainer = styled.div` 
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
`;

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 720px;
  margin-top: 64px;
`;

const H1 = styled.h1`
  font-family: 'Quicksand', sans-serif;
  font-size: 16px;
  font-weight: 600;
  color: #22292F;
`;

const H2 = styled.h2`
  font-family: 'Quicksand', sans-serif;
  font-size: 14px;
  font-weight: 600;
  color: #22292F;
  text-transform: uppercase;
`;

const Logo = styled.img`
  display: inline-block;
  width: 24px;
  height: 24px;
`;

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            availability: [],
            updated: 'Updating...',
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
        const availability = this.processServiceUptime(json.uptime);
        this.setState({
            isLoading: false, availability,
        });
    }

    componentWillUnmount() {
        clearInterval(this.refresh);
    }

  processServiceUptime = param => {
      let data = [];
      param.forEach(service => {
          const arr = {
              name: service.scope,
              uptime: `${Math.round(service.average * 100) / 100}`,
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
          <PageContainer>
              <ContentContainer>
                  <Logo src={logo} alt="Logo" /><H1>Pod Point Status</H1>
              </ContentContainer>
              <ContentContainer>
                  <H2>Availability</H2>
                  <Availability data={this.state.availability} />
              </ContentContainer>
          </PageContainer>
      );
  }
}

export default App;
