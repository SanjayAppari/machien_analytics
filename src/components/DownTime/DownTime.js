import React, { useEffect, useState } from 'react'
import '../DownTime/DownTime.css'
import MyTable from '../MyTable/MyTable'

function DownTime(props) {


    const reasonCount = props.downTimeArray.reduce((countMap, { reason }) => {
        countMap[reason] = (countMap[reason] || 0) + 1;
        return countMap;
      }, {});

    const downTimeCols = ["Date", "Down Time (Hours)", "Reason"];
    let downTimeData = []

    return (
        <div className="downtime">
            <div className="downtime_top">
                <span>Break Down Time Reasons Analysis</span>
            </div>
            <div className="downtime_container">
                <div className="downtime_wrapper">
                    {
                        // reasonCount.map((ele, i) => {
                        //     return (
                        //         <div className="reason_card">
                        //             <div className="count_div">
                        //                 <div className="reason_count">
                        //                     Count : 10
                        //                 </div>
                        //             </div>
                        //             <center><span>Lorem ipsum dolor sit amet Lorem ipsum ...</span></center>
                        //         </div>
                        //     )
                        // })
                        Object.entries(reasonCount).map(([reason, count]) => (
                            <div className="reason_card">
                                <div className="count_div">
                                    <div className="reason_count">
                                        Count : {count}
                                    </div>
                                </div>
                                <center><span>{reason}</span></center>
                            </div>
                        ))
                        
                    }
                </div>
            </div>
            <div className="downtime_bottom">
                <MyTable colDefs={downTimeCols} rowData={props.downTimeArray} />
            </div>
        </div>
    )
}

export default DownTime
