import React from "react"

import PrimaryVisitsEcharts from '@/components/Chart/PrimaryVisitsEcharts'
function Home() {

    return (
        <div style={{ display: 'flex', width: "100%" }}>
            <div style={{ width: "70%" }}>
                <PrimaryVisitsEcharts></PrimaryVisitsEcharts>
            </div>
            <div style={{ width: "30%" }}>
                <div>提示</div>


            </div>
        </div>
    )
}

export default Home