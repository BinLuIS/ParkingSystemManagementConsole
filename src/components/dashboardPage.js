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
				const words = (row.parkingBoy == null) ?  "未被指派停車員" :  "停車員: "+row.parkingBoy.name
				return ( 	<Col span={3}>
                        <div style={{ display: 'flex', padding: '5px 0'}}>
                            <Card title={row.name} bordered={false}>
                                <div>
                                    <Progress type="circle" percent={100*row.availableCapacity/row.capacity} format={() => `${availableCapacity}/${capacity}`}  /><br /><br /><span style={{ float: "right", position: "relative", right: "25%"}}><h3>停車情況</h3></span>
                                </div>
                                <span style ={{float: "right", position: "relative", right: "10%"}}>{words}</span>
                            </Card>
                        </div>
                    </Col>
			)}
		)		
	}
	

	
    render() {
        return (
            <div style={{ background: '#ECECEC', padding: '30px' }}>
                <Row gutter={30}>
					{this.listCards(this.state.rows)}
                </Row>
                
            
            </div>

        );
    }
}
export default dashboardPage;
