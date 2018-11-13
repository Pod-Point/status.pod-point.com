import React, { Component } from 'react'; // eslint-disable-line no-unused-vars
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid #F1F5F8;
  border-radius: 6px;
`;

const Item = styled.div`
  width: auto;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding-left: 16px;
  padding-right: 16px;
  padding-top: 2px;
  padding-bottom: 2px;
  border-bottom: 1px solid #F1F5F8;
  font-family: Quicksand, sans-serif;

  :last-child {
    border-bottom: none;
  }
`;

const ItemStatus = styled.div`
  width: 8px;
  height: 8px;
  border-radius: 8px;
  background: #51D88A;
  margin-right: 8px;
`;

const ItemTitle = styled.p`
  font-size: 16px;
  font-weight: 600;
  font-family: 'Quicksand', sans-serif;
  color: #22292F;
  flex-grow: 1;
`;

const ItemUptime = styled.p`
  color: #333333;
  font-size: 16px;
  font-weight: 500;
`;

class Availability extends Component {
    render() {
        const services = this.props.data;
        return (
            <Container>
                {services.map((service, index) => <Item
                    key={index}>
                    <ItemStatus />
                    <ItemTitle>{service.name}</ItemTitle>
                    <ItemUptime>{service.uptime}%</ItemUptime></Item>)}
            </Container>

        );
    }
}

export default Availability;
