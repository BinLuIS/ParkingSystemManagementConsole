import { Card, Col, Row } from 'antd';
import React, { Component } from 'react';
import { Progress } from 'antd';

class dashboardPage extends Component {
    render() {
        return (
            <div style={{ background: '#ECECEC', padding: '30px' }}>
                <Row gutter={30}>
                    <Col span={3}>
                        <div style={{ display: 'flex', padding: '5px 0'}}>
                            <Card title="停車場A" bordered={false}>
                                <div>
                                    <Progress type="circle" percent={30} format={percent => `${percent / 10}/10`}  /><br /><br /><span style={{ float: "right", position: "relative", right: "25%"}}><h3>停車情況</h3></span>
                                </div>
                                <span style ={{float: "right", position: "relative", right: "10%"}}>停車員: 停車員A</span>
                            </Card>
                        </div>
                    </Col>
                    <Col span={3}>
                        <div style={{ display: 'flex', padding: '5px 0' }}>
                            <Card title="停車場B" bordered={false}>
                                <div>
                                    <Progress type="circle" percent={40} format={percent => `${percent / 10}/10`}  /><br /><br /><span style={{ float: "right", position: "relative", right: "25%"}}><h3>停車情況</h3></span>
                                </div>
                                <span style ={{float: "right", position: "relative", right: "10%"}}>停車員: 停車員B</span>
                            </Card>
                        </div>
                    </Col>
                    <Col span={3}>
                        <div style={{ display: 'flex', padding: '5px 0' }}>
                            <Card title="停車場C" bordered={false}>
                                <div>
                                    <Progress type="circle" percent={60} format={percent => `${percent / 10}/10`}  /><br /><br /><span style={{ float: "right", position: "relative", right: "25%"}}><h3>停車情況</h3></span>
                                </div>
                                <span style ={{float: "right", position: "relative", right: "10%"}}>停車員: 停車員C</span>
                            </Card>
                        </div>
                    </Col>
                    <Col span={3}>
                        <div style={{ display: 'flex', padding: '5px 0' }}>
                            <Card title="停車場D" bordered={false}>
                                <div>
                                    <Progress type="circle" percent={100} format={percent => `${percent / 10}/10`}  /><br /><br /><span style={{ float: "right", position: "relative", right: "25%"}}><h3>停車情況</h3></span>
                                </div>
                                <span style ={{float: "right", position: "relative", right: "10%"}}>停車員: 停車員D</span>
                            </Card>
                        </div>
                    </Col>
                    <Col span={3}>
                        <div style={{ display: 'flex', padding: '5px 0' }}>
                            <Card title="停車場E" bordered={false}>
                                <div>
                                    <Progress type="circle" percent={10} format={percent => `${percent / 10}/10`}  /><br /><br /><span style={{ float: "right", position: "relative", right: "25%"}}><h3>停車情況</h3></span>
                                </div>
                                <span style ={{float: "right", position: "relative", right: "10%"}}>停車員: 停車員E</span>
                            </Card>
                        </div>
                    </Col>
                    <Col span={3}>
                        <div style={{ display: 'flex', padding: '5px 0' }}>
                            <Card title="停車場F" bordered={false}>
                                <div>
                                    <Progress type="circle" percent={90} format={percent => `${percent / 10}/10`}  /><br /><br /><span style={{ float: "right", position: "relative", right: "25%"}}><h3>停車情況</h3></span>
                                </div>
                                <span style ={{float: "right", position: "relative", right: "10%"}}>停車員: 停車員F</span>
                            </Card>
                        </div>
                    </Col>
                    <Col span={3}>
                        <div style={{ display: 'flex', padding: '5px 0' }}>
                            <Card title="停車場G" bordered={false}>
                                <div>
                                    <Progress type="circle" percent={0} format={percent => `${percent / 10}/10`}  /><br /><br /><span style={{ float: "right", position: "relative", right: "25%"}}><h3>停車情況</h3></span>
                                </div>
                                <span style ={{float: "right", position: "relative", right: "10%"}}>停車員: 停車員G</span>
                            </Card>
                        </div>
                    </Col>
                    <Col span={3}>
                        <div style={{ display: 'flex', padding: '5px 0' }}>
                            <Card title="停車場H" bordered={false}>
                                <div>
                                    <Progress type="circle" percent={50} format={percent => `${percent / 10}/10`}  /><br /><br /><span style={{ float: "right", position: "relative", right: "25%"}}><h3>停車情況</h3></span>
                                </div>
                                <span style ={{float: "right", position: "relative", right: "10%"}}>停車員: 停車員H</span>
                            </Card>
                    
                        </div>
                    </Col>
                    <Col span={3}>
                        <div style={{ display: 'flex', padding: '5px 0'}}>
                            <Card title="停車場I" bordered={false}>
                                <div>
                                    <Progress type="circle" percent={20} format={percent => `${percent / 10}/10`}  /><br /><br /><span style={{ float: "right", position: "relative", right: "25%"}}><h3>停車情況</h3></span>
                                </div>
                                <span style ={{float: "right", position: "relative", right: "10%"}}>停車員: 停車員I</span>
                            </Card>
                    
                        </div>
                    </Col>
                </Row>
                
            
            </div>

        );
    }
}
export default dashboardPage;