import React from 'react';
import PropTypes from 'prop-types';
import {Row, Col, FormItem, Input, TextArea, Divider} from '../../utils/antd';
import UploadAvatar from '../../components/UploadAvatar';
import removeIcon from '../../images/muted.svg';

const SupplierForm = props => {
    const {imageFiles=[]}= props;
    const blockPhotos = []
    for(let i=0; i < 5; i++){
        const location = imageFiles[i] ? imageFiles[i].location : '';
        blockPhotos.push(
                <div className='avatar-prnt' key={i}>
                    <img src={removeIcon} alt='' onClick={()=>props.removePhoto(imageFiles[i])}/>
                    <div className='avatar' style={{ backgroundImage: `url(${location})`}} ></div>
                </div>
        )
    }
    const formItemLayout = {
        labelCol: { span: 24 },
        wrapperCol: { span: 24 },
    };
    return (
        <Row className='page-block'>
            <Col span={24}>
                <div className='sub-title' id='supplierInformation'>Supplier Profile</div>
            </Col>
            <Row>
                <Col span={24}>
                    <FormItem
                            {...formItemLayout}
                            validateStatus={props.products.validateStatus}
                            help={props.products.errorMsg}
                            label="Products"
                            >
                            <Input
                                value={props.products.value}
                                onChange={(e)=>props.handleChangeProducts(e.target.value)}
                            />
                        </FormItem>
                </Col>
            </Row>
            <Row>
                <Col span={24}>
                    <FormItem
                            {...formItemLayout}
                            label="Markets"
                            >
                            <Row className='flex-row-start'>
                                <div
                                    onClick={props.clickUSA}
                                    className={props.isUSA ? 'btn-blue markets-btn' : 'btn-gray markets-btn'}>
                                    USA / North America
                                </div>
                                <div
                                    onClick={props.clickEuropa}
                                    className={props.isEuropa ? 'btn-blue markets-btn' : 'btn-gray markets-btn'}>
                                        Europe
                                </div>
                                <div
                                    onClick={props.clickAsia}
                                    className={props.isAsia ? 'btn-blue markets-btn' : 'btn-gray markets-btn'}>
                                    Asia
                                </div>
                                <div
                                    onClick={props.clickSoutchAmerica}
                                    className={props.isSoutchAmerica ? 'btn-blue markets-btn' : 'btn-gray markets-btn'}>
                                    South America
                                </div>
                                <div
                                    onClick={props.clickAustralia}
                                    className={props.isAustralia ? 'btn-blue markets-btn' : 'btn-gray markets-btn'}>
                                    Australasia
                                </div>
                            </Row>
                            </FormItem>
                </Col>
            </Row>
            <Row>
                <Col span={24}>
                    <FormItem
                            {...formItemLayout}
                            validateStatus={props.customers.validateStatus}
                            help={props.customers.errorMsg}
                            label={
                                <Row>
                                    <Row className='big-label-text'>
                                        Customers
                                    </Row>
                                    <Row className='little-label-text'>
                                        Please give some examples of companies you work with.
                                    </Row>
                                </Row>
                            }
                            >
                            <Input
                                value={props.customers.value}
                                onChange={(e)=>props.handleChangeCustomers(e.target.value)}
                            />
                        </FormItem>
                </Col>
            </Row>
            <Row>
                <FormItem
                    {...formItemLayout}
                    label="Photos"
                    >
                    <UploadAvatar
                        multiple={true}
                        handleSaveFile = {props.handleSaveFile}
                        avatarUrl={props.avatarUrl}>
                            <Row>
                                <div className='text-size'> Max file size: 512Kb </div>
                                <div className='text-size'> Max files: 5 </div>
                            </Row>
                    </UploadAvatar>
                </FormItem>
                <div className='block-photo'>
                {
                    blockPhotos
                }
                </div>
            </Row>
            <Row>
                <Col span={24}>
                    <FormItem
                            {...formItemLayout}
                            label="Machine List"
                            >
                            <TextArea
                                rows={4}
                                value={props.machineList.value}
                                onChange={(e)=>props.handleChangeMachineList(e.target.value)}
                            />
                        </FormItem>
                </Col>
            </Row>
            <Row>
                <Col span={24}>
                    <FormItem
                        {...formItemLayout}
                        label="Business Terms"
                        >
                        <Input
                            value={props.businessTerms.value}
                            onChange={(e)=>props.handleChangeBusinessTerms(e.target.value)}
                        />
                    </FormItem>
                </Col>
            </Row>
            <Row gutter={20}>
                <Col span={12}>
                    <FormItem
                        {...formItemLayout}
                        label="R&D Staff"
                        >
                        <Input
                            value={props.R_D_Staff.value}
                            onChange={(e)=>props.handleChangeR_D_Staff(e.target.value)}
                        />
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="Sales Staff"
                        >
                        <Input
                            value={props.salesStaff.value}
                            onChange={(e)=>props.handleChangeSalesStaff(e.target.value)}
                        />
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="Other Staff"
                        >
                        <Input
                            value={props.otherStaff.value}
                            onChange={(e)=>props.handleChangeOtherStaff(e.target.value)}
                        />
                    </FormItem>
                </Col>
                <Col span={12}>
                    <FormItem
                        {...formItemLayout}
                        label="QC Staff"
                        >
                        <Input
                            value={props.Q_C_Staff.value}
                            onChange={(e)=>props.handleChangeQ_C_Staff(e.target.value)}
                        />
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="Operations Staff"
                        >
                        <Input
                            value={props.operationsStaff.value}
                            onChange={(e)=>props.handleChangeOperationsStaff(e.target.value)}
                        />
                    </FormItem>

                </Col>
            </Row>
            <Divider type='horizontal' className='divider'/>
        </Row>
    )
};

SupplierForm.propTypes = {
    handleChangeProducts: PropTypes.func.isRequired,
    clickUSA: PropTypes.func.isRequired,
    clickEuropa: PropTypes.func.isRequired,
    clickAsia: PropTypes.func.isRequired,
    clickSoutchAmerica: PropTypes.func.isRequired,
    clickAustralia: PropTypes.func.isRequired,
    handleChangeCustomers: PropTypes.func.isRequired,
    handleChangeMachineList: PropTypes.func.isRequired,
    handleChangeBusinessTerms: PropTypes.func.isRequired,
    handleChangeR_D_Staff: PropTypes.func.isRequired,
    handleChangeSalesStaff: PropTypes.func.isRequired,
    handleChangeOtherStaff: PropTypes.func.isRequired,
    handleChangeQ_C_Staff: PropTypes.func.isRequired,
    handleChangeOperationsStaff: PropTypes.func.isRequired,

    products: PropTypes.object.isRequired,
    customers: PropTypes.object.isRequired,
    machineList: PropTypes.object,
    businessTerms: PropTypes.object,
    R_D_Staff: PropTypes.object,
    salesStaff: PropTypes.object,
    otherStaff: PropTypes.object,
    Q_C_Staff: PropTypes.object,
    operationsStaff: PropTypes.object,
    isUSA: PropTypes.bool.isRequired,
    isEuropa: PropTypes.bool.isRequired,
    isAsia: PropTypes.bool.isRequired,
    isSoutchAmerica: PropTypes.bool.isRequired,
    isAustralia: PropTypes.bool.isRequired,

};

export default SupplierForm;
