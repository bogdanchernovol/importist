import React from 'react';
import PropTypes from 'prop-types';
import {Row, Col, FormItem, Divider, TextArea, Select, Option} from '../../utils/antd';
import * as constant from '../../utils/constant';

const CompanyDetailsForm = props => {
    const formItemLayout = {
        labelCol: { span: 24 },
        wrapperCol: { span: 24 },
    };
    const max = new Date().getFullYear(),
    min = max - 100;
    let years = [];
    for (let i = min; i<=max; i++){
       years.push(i);
    }
    return (
        <Row className='page-block'>
            <Row>
                <Col span={24}>
                    <div className='sub-title' id="companyDetails">Company Details</div>
                </Col>
                <Col span={24}>
                    <FormItem
                        {...formItemLayout}   
                        validateStatus={props.about.validateStatus}
                        help={props.about.errorMsg}                                       
                        label="About"                    
                        >
                        <TextArea     
                            value={props.about.value}            
                            rows={4}
                            onChange={(e)=>props.handleChangeAbout(e.target.value)}
                        />                     
                    </FormItem>  
                </Col>
            </Row>            
            <Row gutter={20}>   
                <Col span={12}>                    
                    <FormItem
                        {...formItemLayout}
                        label="Staff"       
                        validateStatus={props.staff.validateStatus}
                        help={props.staff.errorMsg}                 
                        >
                        <Select value={props.staff.value} className='full-width' 
                                onChange={props.handleSelectStaff}>
                                {
                                    constant.COUNT_STAFF.map((val, key) =>{
                                        return (
                                            <Option key={key} value={val}>{val}</Option>
                                        )
                                    })
                                }                                          
                        </Select>                         
                    </FormItem>                                            
                </Col>
                <Col span={12}>
                    <FormItem
                        {...formItemLayout}
                        validateStatus={props.revenue.validateStatus}
                        help={props.revenue.errorMsg}     
                        label="Revenue"                        
                        >
                        <Select defaultValue={max} value={props.revenue.value} className='full-width' 
                                onChange={props.handleSelectRevenue}>
                                {
                                    constant.REVENUE_AMOUNT.map((val, key) =>{
                                        return (
                                            <Option key={key} value={val}>{val}</Option>
                                        )
                                    })
                                }                                          
                        </Select>                         
                    </FormItem>                       
                </Col>
            </Row>
            <Row gutter={20}>   
                <Col span={12}>  
                    <FormItem
                        {...formItemLayout}
                        label="Established"
                        validateStatus={props.established.validateStatus}
                        help={props.established.errorMsg}                        
                        >
                        <Select defaultValue={max} value={props.established.value} className='full-width' 
                                onChange={props.handleSelectEstablished}>
                                {
                                    years.map((val, key) =>{
                                        return (
                                            <Option key={key} value={val}>{val}</Option>
                                        )
                                    })
                                }                                          
                        </Select>                         
                    </FormItem> 
                </Col>
            </Row>
            <Divider type='horizontal' className='divider'/>
        </Row>
    );
};

CompanyDetailsForm.propTypes = {
    handleSelectEstablished: PropTypes.func.isRequired,
    handleSelectRevenue: PropTypes.func.isRequired,
    handleSelectStaff: PropTypes.func.isRequired,
    handleChangeAbout: PropTypes.func.isRequired,
    about: PropTypes.object.isRequired,
    staff: PropTypes.object.isRequired,
    revenue: PropTypes.object.isRequired,
    established: PropTypes.object.isRequired,
};
export default CompanyDetailsForm;