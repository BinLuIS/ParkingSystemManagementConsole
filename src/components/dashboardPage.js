import { Card, Col, Row } from 'antd';
import React, { Component } from 'react';
import { Progress } from 'antd';
import { getAllParkingLots } from '../util/APIUtils'

class dashboardPage extends Component {
	
	state = {
		rows:[]
	}
	componentDidMount(){
	getAllParkingLots().
	then(res => {
                this.setState({ rows: res });
            });
	
	}
	
	getParkingBoyFromParkingLotId = (parkingLotId) =>{
		let parkingBoyName = ""
		
		
	}
	
	listCards= (rows)=>{
		let allCards = []
		return rows.map( (row) =>  
			
			{	const capacity = row.capacity
				const availableCapacity = row.availableCapacity
				const words = (row.parkingBoy == null) ?  "Unassigned" : row.parkingBoy.name
				return ( 	<Col span={4} key={row.id}>
                        <div style={{ display: 'flex', padding: '100px 100px 100px;'}}>
                            <Card title={row.name} bordered={false}>
                                <div>
                                    <Progress type="circle" percent={100*row.availableCapacity/row.capacity} format={() => `${availableCapacity}/${capacity}`}  /><br /><br />
									<span><h3 style={{ textAlign: "center"}}>{words}</h3></span>
								</div>
                            </Card>
                        </div>
                    </Col>
			)}
		)		
	}
	

	
    render() {
        return (
            <div style={{ background: '#ECECEC', padding: '30px' }}>
				<h1 style={{ textAlign: "center"}}>Parking Lots Utilization</h1>
                <Row gutter={30}>
					{this.listCards(this.state.rows)}
                </Row>
                
            
            </div>

        );
    }
}
export default dashboardPage;
