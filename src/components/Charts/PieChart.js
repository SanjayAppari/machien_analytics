import React, { useEffect, useRef, useState } from 'react'
import Charts from 'chart.js/auto';

function PieChartComponent(props) {
    const chartRef = useRef(null);
    const chartInstance = useRef(null);



    useEffect(() => {
        if (chartInstance.current) {
            chartInstance.current.destroy();
        }
        const myChartRef = chartRef.current.getContext("2d");

        chartInstance.current = new Charts(myChartRef, {
            type: "pie",
            data: {
                labels: props.labels,
                datasets: [{
                    data: props.data,
                    fill: false,
                    borderColor: 'rgb(255, 184, 5)',
                    borderWidth: 2,
                    backgroundColor: [
                        'yellow', 'red', 'green', 'blue'
                    ]
                }],
            }
        })
        return (() => {
            if (chartInstance.current) {
                chartInstance.current.destroy();
            }
        })
    }, [props.data])
    const styles = {
        container: {
            position: 'relative',
            width: "50%",
            display: "flex",
            flexDirection: "column",
            backgroundColor: 'white',
            borderRadius: "15px",
            paddingBottom:'10px'
        },
        chart: {
            backgroundColor: "white",
            height: "142px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "0 0 15px 15px",
            border: '1px solid #ccc'
        },
        filter: {
            visibility: "hidden",
            position: 'relative',
            width: "100%",
            height: "40px",
            padding: "0px 23px",
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            gap: '10px'
        },
        icon: {
            width:'30px',
            height:'30px',
            fontSize: '24px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'rgb(255, 184, 5)',
            cursor: 'pointer',
        }
    }

    return (
        <div style={styles.container}>
            <div>
                <canvas ref={chartRef} style={{height: '10px', width:'10px'}} />
            </div>
        </div>
    )
}

export default PieChartComponent
