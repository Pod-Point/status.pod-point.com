import React, { Component } from 'react';
import { VictoryLine, VictoryChart, VictoryAxis, VictoryContainer } from 'victory';

class Events extends Component {
    render() {
        return (

            <VictoryChart containerComponent={< VictoryContainer responsive = {
                false
            } />} padding={{
                top: 20,
                bottom: 30,
                left: 38,
                right: 0,
            }} width={590} height={200} scale={{
                x: 'time',
            }}>
                <VictoryAxis dependentAxis crossAxis={false} dependentAxis domain={[4400, 5400]} tickCount={4} tickFormat={t => `${t.toFixed(0)}`} style={{
                    axis: {
                        stroke: 'transparent',
                    },
                    grid: {
                        stroke: '#F1F5F8',
                    },
                    tickLabels: {
                        fontSize: 10,
                        fontWeight: 500,
                        fontFamily: 'Quicksand',
                        color: '#22292F',
                        paddingRight: 0,
                    },
                }}/>
                <VictoryAxis crossAxis={false} tickCount={6} tickFormat={t => `${t.toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit',
                })}`} style={{
                    axis: {
                        stroke: '#F1F5F8',
                    },
                    tickLabels: {
                        fontSize: 10,
                        fontWeight: 500,
                        fontFamily: 'Quicksand',
                        color: '#22292F',
                    },
                    ticks: {
                        stroke: '#F1F5F8',
                        size: 4,
                    },
                }}/>
                <VictoryLine interpolation="natural" style={{
                    data: {
                        stroke: '#5bc0de',
                        strokeWidth: '1',
                    },
                    parent: {
                        border: '1px solid #ccc',
                    },
                }} data={this.props.data} x="x" y="y"/>
            </VictoryChart>
        );
    }
}

export default Events;
