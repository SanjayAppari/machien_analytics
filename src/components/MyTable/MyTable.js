import React, { useEffect } from 'react'
import '../MyTable/MyTable.css'

function MyTable({ colDefs, rowData, type }) {

    const styles = {
        head: {
            background: 'red'
        }
    }
    useEffect(()=>{
        console.log("row", rowData);
    }, [rowData])

    return (
        <div className="myTable">
            <table className="table">
                <thead className='table-warning'>
                    <tr>
                        <th scope="col">S.No</th>
                        {
                            colDefs.map((col, i) => {
                                return <th scope="col" key={i}>{col}</th>
                            })
                        }
                    </tr>
                </thead>
                <tbody>
                    {
                        rowData.map((row, i) => {
                            return (
                                <tr key={i}>
                                    <th scope="row">{i + 1}</th>
                                    <td>{row.date}</td>
                                    {
                                        type=="machine" && <>
                                            <td>{row.startTime}</td>
                                            <td>{row.endTime}</td>
                                            <td>{row.operatingTime}</td>
                                            <td>{row.shutdownTime}</td>
                                            <td>{row.totalProducts}</td>
                                        </>
                                    }
                                    <td>{row.downTime}</td>
                                    <td>{row.reason}</td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </div>
    )
}

export default MyTable
