import { Row, Col } from "antd"
import {UpcomingEvents,DealsChart} from "@/components"


export const Home = () => {
    return (
        <div> 
            <Row gutter={[32,32]} style={{ marginTop:"32px"}}>
                <Col xs={24} sm={24} xl={8} style={{height:"460px"}}><UpcomingEvents></UpcomingEvents></Col>
                <Col xs={24} sm={24} xl={8} style={{height:"460px"}}><DealsChart></DealsChart></Col>
            </Row>
        </div>
    
    )
}
