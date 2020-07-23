import React from 'react';
import { ResponsiveLine } from '@nivo/line';

const TemperatureGraph = ({ list, topic }) => (
    
    list[0].data.length > 0 ? (
        
        <ResponsiveLine
            data={list}
            curve='basis'
            lineWidth= {4}
            enableArea={true}
            areaBlendMode="overlay"
            margin={{ top: 50, right: 120, bottom: 100, left: 120 }}
            xScale={{ type: 'linear' }}
            yScale={{ type: 'point', min: 'auto', max: 'auto', stacked: true, reverse: false }}
            axisTop={null}
            axisRight={null}
            axisBottom={{
                orient: 'bottom',
                tickSize: 7,
                tickPadding: 5,
                tickRotation: 0,
                legend: 'Hora',
                legendOffset: 60,
                legendPosition: 'middle'
            }}
            axisLeft={{
                orient: 'left',
                tickSize: 7,
                tickPadding: 5,
                tickRotation: 0,
                legend: topic,
                legendOffset: -80,
                legendPosition: 'middle'
            }}
            colors={{ scheme: 'accent' }}
            pointSize={10}
            pointColor={{ theme: 'background' }}
            pointBorderWidth={2}
            pointBorderColor={{ from: 'serieColor' }}
            pointLabel="y"
            pointLabelYOffset={-12}
            useMesh={true}
            legends={[
                {
                    anchor: 'bottom-right',
                    direction: 'column',
                    justify: false,
                    translateX: 100,
                    translateY: 0,
                    itemsSpacing: 0,
                    itemDirection: 'left-to-right',
                    itemWidth: 80,
                    itemHeight: 20,
                    itemOpacity: 0.75,
                    symbolSize: 12,
                    symbolShape: 'circle',
                    symbolBorderColor: 'rgba(0, 0, 0, .5)',
                    effects: [
                        {
                            on: 'hover',
                            style: {
                                itemBackground: 'rgba(0, 0, 0, .03)',
                                itemOpacity: 1
                            }
                        }
                    ]
                }
            ]}
        />
    ) : <h5 className="chart-empty-list-text">No hay datos de {topic} para mostrar</h5>
)

export default TemperatureGraph;