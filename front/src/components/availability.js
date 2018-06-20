import React, { Component } from 'react'; // eslint-disable-line no-unused-vars

const container = {
    display: 'grid',
    gridTemplateRows: 'repeat(4, 1fr)',
    gridColumnGap: '32px',
    gridAutoFlow: 'column',
    minHeight: '200px',
};

const item = {
    width: 'auto',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 0,
    borderBottom: '1px solid #F1F5F8',
    fontFamily: 'Quicksand, sans-serif',
};

const itemContent = {
    fontSize: 14,
    fontWeight: 400,
    fontFamily: 'Quicksand, sans-serif',
    color: '#22292F',
    flexGrow: 1,
};

const itemBadge = {
    minHeight: 14,
    minWidth: 24,
    background: '#F1F5F8',
    paddingTop: 5,
    paddingBottom: 3,
    paddingLeft: 6,
    paddingRight: 6,
    borderRadius: 4,
    color: '#8795A1',
    fontSize: 10,
    fontWeight: 500,
};

class Availability extends Component {
    render() {
        const services = this.props.data;
        return (
            <div style={container}>
                {services.map((service, index) => <div
                    style={item} key={index}>

                    <p style={itemContent}>{service.name}</p>
                    <span style={itemBadge}>{service.uptime}</span></div>)}
            </div>

        );
    }
}

export default Availability;
