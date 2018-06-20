import React, { Component } from 'react'; // eslint-disable-line no-unused-vars
import { VictoryLine, VictoryChart, VictoryAxis, VictoryContainer, VictoryLegend } from 'victory'; // eslint-disable-line no-unused-vars

class Response extends Component {
    render() {
        return (

            <VictoryChart containerComponent={< VictoryContainer responsive = {
                false
            } /> } padding={{
                top: 50,
                bottom: 24,
                left: 46,
                right: 0,
            }} width={720} height={220} scale={{
                x: 'time',
            }} >
                <VictoryLegend name="legend" x={300} y={0}
                    orientation="horizontal"
                    gutter={8}
                    style={{ labels: { fill: '#22292F', fontFamily: 'Quicksand', fontSize: 12 } }}
                    data={[
                        { name: 'eu-west-1a', symbol: { fill: '#EF904C', type: 'square' } },
                        { name: 'eu-west-1b', symbol: { fill: '#4EC0BE', type: 'square' } },
                        { name: 'eu-west-1c', symbol: { fill: '#9A6EDA', type: 'square' } },
                    ]}
                />
                <VictoryAxis dependentAxis domain={[0, 800]} crossAxis={false} tickCount={3} tickFormat={t => `${(t).toFixed(0)}ms`} style={{
                    axis: {
                        stroke: 'transparent',
                    },
                    grid: {
                        stroke: '#f3f3f3',
                    },
                    tickLabels: {
                        fontSize: 10,
                        fontWeight: 500,
                        fontFamily: 'Quicksand',
                        color: '#22292F',
                        paddingRight: 4,
                    },
                    ticks: {
                        stroke: '#ffffff',
                    },
                }}/>
                <VictoryAxis crossAxis={false} tickCount={6} tickFormat={t => `${t.toLocaleTimeString([], {
                    weekday: 'short',
                    hour: '2-digit', minute: '2-digit'
                })}`} style={{
                    axis: {
                        stroke: '#f3f3f3',
                    },
                    grid: {
                        stroke: '#f3f3f3',
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
                <VictoryLine name="line1" interpolation="natural" style={{

                    data: {
                        stroke: '#EF904C',
                        strokeWidth: '1',
                    },
                    parent: {
                        border: '1px solid #ccc',
                    },
                }} data={this.props.data1a} x="x" y="y"/>
                <VictoryLine name="line2" interpolation="natural" style={{
                    data: {
                        stroke: '#4EC0BE',
                        strokeWidth: '1',
                    },
                    parent: {
                        border: '1px solid #ccc',
                    },
                }} data={this.props.data1b} x="x" y="y"/>
                <VictoryLine name="line3" interpolation="natural" style={{
                    data: {
                        stroke: '#9A6EDA',
                        strokeWidth: '1',
                    },
                    parent: {
                        border: '1px solid #ccc',
                    },
                }} data={this.props.data1c} x="x" y="y"/>
            </VictoryChart>
        );
    }
}

export default Response;
