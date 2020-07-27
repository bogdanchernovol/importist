import React from 'react';
import PropTypes from 'prop-types';
import {Row, Col, FormItem, Input, Divider, Select, Option} from '../../utils/antd';
import UploadAvatar from '../UploadAvatar';
import {country} from '../../utils/country';

const CompanyForm = props => {
    const formItemLayout = {
        labelCol: { span: 24 },
        wrapperCol: { span: 24 },
    };
    const avatarUrl = props.avatarFile ? props.avatarFile.location : '';
    return (
        <Row className='page-block'>
            <Col span={24}>
                <div className='sub-title' id='company'>Company</div>
            </Col>
            <Row gutter={20}>
                <Col span={12}>
                    <FormItem
                        {...formItemLayout}
                        validateStatus={props.companyName.validateStatus}
                        help={props.companyName.errorMsg}
                        label="Company Name"
                        >
                        <Input
                            value={props.companyName.value}
                            onChange={(e)=>props.handleChangeName(e.target.value)}
                        />
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="Logo"
                        >
                        <UploadAvatar
                            handleSaveFile = {props.handleSaveFile}
                            avatarUrl={props.avatarUrl}>
                            <div className='text-size'> Max file size: 512Kb </div>
                        </UploadAvatar>
                    </FormItem>
                    <div className='avatar-prnt'>
                    {
                        avatarUrl &&
                        <div className='avatar' style={{ backgroundImage: `url(${avatarUrl})`}} ></div>
                    }
                    </div>
                </Col>
            </Row>
            <Row gutter={20}>
                <Col span={12}>
                    <FormItem
                        {...formItemLayout}
                        validateStatus={props.adressLine_1.validateStatus}
                        help={props.adressLine_1.errorMsg}
                        label="Address Line 1"
                        >
                        <Input
                            value={props.adressLine_1.value}
                            onChange={(e)=>props.handleChangeAdressLine_1(e.target.value)}
                        />
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        validateStatus={props.zip.validateStatus}
                        help={props.zip.errorMsg}
                        label="Zip / Postal Code"
                        >
                        <Input
                            value={props.zip.value}
                            onChange={(e)=>props.handleChangeZip(e.target.value)}
                        />
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        validateStatus={props.telephone.validateStatus}
                        help={props.telephone.errorMsg}
                        label="Telephone"
                        >
                        <Input
                            value={props.telephone.value}
                            onChange={(e)=>props.handleChangeTelephone(e.target.value)}
                        />
                    </FormItem>
                </Col>

                <Col span={12}>
                    <FormItem
                        {...formItemLayout}
                        label="Address Line 2"
                        >
                        <Input
                            value={props.adressLine_2.value}
                            onChange={(e)=>props.handleChangeAdressLine_2(e.target.value)}
                        />
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        validateStatus={props.country.validateStatus}
                        help={props.country.errorMsg}
                        label="Country"
                        >
                        <Select value={props.country.value} className='full-width'
                                onChange={props.handleChangeCountry}>
                                {
                                    country.map((val, key) =>{
                                        return (
                                            <Option key={key} value={val.name.common}>{val.name.common}</Option>
                                        )
                                    })
                                }
                        </Select>
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        validateStatus={props.website.validateStatus}
                        help={props.website.errorMsg}
                        label="Website"
                        >
                        <Input
                            value={props.website.value}
                            onChange={(e)=>props.handleChangeWebsite(e.target.value)}
                        />
                    </FormItem>

                </Col>
            </Row>
            <Divider type='horizontal' className='divider'/>
        </Row>
    );
};

CompanyForm.propTypes = {
    handleChangeName: PropTypes.func.isRequired,
    handleSaveFile: PropTypes.func.isRequired,
    handleChangeAdressLine_1: PropTypes.func.isRequired,
    handleChangeAdressLine_2: PropTypes.func.isRequired,
    handleChangeTelephone: PropTypes.func.isRequired,
    handleChangeCountry: PropTypes.func.isRequired,
    handleChangeWebsite: PropTypes.func.isRequired,
    handleChangeZip: PropTypes.func.isRequired,
    companyName: PropTypes.object.isRequired,
    adressLine_1: PropTypes.object.isRequired,
    zip: PropTypes.object.isRequired,
    telephone: PropTypes.object,
    adressLine_2: PropTypes.object,
    country: PropTypes.object.isRequired,
    website: PropTypes.object.isRequired,
};

export default CompanyForm;
