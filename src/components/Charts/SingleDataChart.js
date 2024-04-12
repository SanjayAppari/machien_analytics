import React, { useEffect, useRef, useState } from 'react'
import Charts from 'chart.js/auto';

function SingleDataChart(props) {
    const workLogs = [
        {
          "date": "2024-03-10",
          "start_time": "8:30",
          "end_time": "18:00",
          "operating_time": 6,
          "break_down_time": 1,
          "shut_down_time": 2,
          "products_count": 800,
          "scrap_count": 10,
          "down_time_reasons": null,
        },
        {
          "date": "2024-03-11",
          "start_time": "8:30",
          "end_time": "18:00",
          "operating_time": 6,
          "break_down_time": 2,
          "shut_down_time": 2,
          "products_count": 800,
          "scrap_count": 10,
          "down_time_reasons": null,
        },{
          "date": "2024-03-12",
          "start_time": "8:30",
          "end_time": "18:00",
          "operating_time": 6,
          "break_down_time": 0,
          "shut_down_time": 2,
          "products_count": 800,
          "scrap_count": 10,
          "down_time_reasons": null,
        },{
          "date": "2024-03-13",
          "start_time": "8:30",
          "end_time": "15:00",
          "operating_time": 6,
          "break_down_time": 0,
          "shut_down_time": 2,
          "products_count": 800,
          "scrap_count": 10,
          "down_time_reasons": null,
        },    
      ];
    const chartRef = useRef(null);
    const chartInstance = useRef(null);
    const [type,setType] = useState(props.type);
    let labels = []
    let data = []
    let color = 'orange'

    const calculateTotalTime = (startTime, endTime) => {
        // Parse start and end times into Date objects
        let startDate = new Date();
        let [startHours, startMinutes] = startTime.split(':').map(Number);
        startDate.setHours(startHours);
        startDate.setMinutes(startMinutes);
        startDate.setSeconds(0); // Ensure seconds are set to zero for accurate calculation
    
        let endDate = new Date();
        let [endHours, endMinutes] = endTime.split(':').map(Number);
        endDate.setHours(endHours);
        endDate.setMinutes(endMinutes);
        endDate.setSeconds(0); // Ensure seconds are set to zero for accurate calculation
    
        // Calculate the difference in milliseconds
        let differenceInMilliseconds = endDate.getTime() - startDate.getTime();
    
        // Convert milliseconds to hours
        let differenceInHours = differenceInMilliseconds / (1000 * 60 * 60);
        return differenceInHours;
      }

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
                    if(props.title === "Utilization Chart"){
                        const a = Math.floor((item.operating_time/calculateTotalTime(item.start_time, item.end_time))*100);
                        data.push(Math.floor((item.operating_time/a)*100))
                    }
                    else{
                        const b = (item.products_count - item.scrap_count)/item.products_count;
                        data.push(b*100);
                    }
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

        if(props.title==="Utilization Chart"){
            color="orange";
        }
        else{
            color="green"
        }
        chartInstance.current = new Charts(myChartRef, {
            type: type,
            data: {
                labels: labels,
                datasets: [{
                    label: props.title,
                    data: data,
                    fill: false,
                    borderColor: color,
                    borderWidth: 2
                }],
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
                <div style={styles.icon} onClick={()=>setType("line")}>
                    <i class="fa-solid fa-chart-line"></i>
                </div>
                <div style={styles.icon} onClick={()=>setType("bar")}>
                    <i class="fa-solid fa-chart-column"></i>
                </div>
            </div>
            <div style={styles.chart}>
                <canvas ref={chartRef} />
            </div>
        </div>
    )
}

export default SingleDataChart
