import React, { useEffect, useRef } from 'react'
import Charts from 'chart.js/auto';
function MultiDataChart(props) {
    const chartRef = useRef(null);
    const chartInstance = useRef(null);


    let labels = []
    let data = []
    let shutDown = []
    let brekDown = []

    useEffect(()=>{
        const startDate = props.startDate;
        const endDate = new Date(props.endDate);
        let currentDate = new Date(startDate);
        labels=[];
        data = [];
        while (currentDate <= endDate) {
            for(let item of props.workLogs){
                const date = new Date(item.date);
                if(date.getDate() == currentDate.getDate()){
                    labels.push(item.date);
                    data.push(item.operating_time)
                    shutDown.push(item.shut_down_time)
                    brekDown.push(item.break_down_time) 
                }
            }
            currentDate.setDate(currentDate.getDate() + 1); // Increment the date by one day
        }
        
    },[props.startDate, props.endDate]);

    useEffect(() => {
        if (chartInstance.current) {
            chartInstance.current.destroy();
        }
        const myChartRef = chartRef.current.getContext("2d");

        chartInstance.current = new Charts(myChartRef, {
            data: {
                labels: labels,
                datasets: [
                    {
                        type: "line",
                        label: "Shut Down Time",
                        data: shutDown,
                        fill: false,
                        borderColor: 'red',
                        borderWidth: 2
                    },
                    {
                        type: "line",
                        label: "operating time",
                        data: data,
                        fill: false,
                        borderColor: 'rgb(255, 184, 5)',
                        borderWidth: 2
                    },
                    {
                        type: "line",
                        label: "Down time",
                        data: brekDown,
                        fill: false,
                        borderColor: 'blue',
                        borderWidth: 2
                    }
                ],
            }
        })
        return (() => {
            if (chartInstance.current) {
                chartInstance.current.destroy();
            }
        })
    }, [props.startDate, props.endDate])

    const styles = {
        container: {
            position: 'relative',
            width: "98%",
            display: "flex",
            flexDirection: "column",
            backgroundColor: 'white',
            borderRadius: "15px",
            paddingBottom:'10px'
        },
        chart: {
            backgroundColor: "white",
            width: "100%",
            height: "450px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "0 0 15px 15px"
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
            <div style={styles.filter}>
                <div style={styles.icon}>
                    <i class="fa-solid fa-chart-line"></i>
                </div>
                <div style={styles.icon}>
                    <i class="fa-solid fa-chart-column"></i>
                </div>
            </div>
            <div style={styles.chart}>
                <canvas ref={chartRef} />
            </div>
        </div>
    )
}

export default MultiDataChart
