import React, { Component } from 'react';
import {withRouter} from 'react-router';
import {connect} from 'react-redux';
import {userAction} from '../../store/user';
import {commonActions} from '../../store/common';
import {getAvatarFile, getImageFiles} from '../../store/common/selectors';
import {getUser} from '../../store/user/selectors';
import {Content, Header, Row, Button, Col, Form, message} from '../../utils/antd';
import MenuRegClient from '../../components/MenuRegClient';
import MenuRegSupplier from '../../components/MenuRegSupplier';
import MenuRegUser from '../../components/MenuRegUser';
import CompanyLogo from '../../images/icons-company.svg';
import FactoryLogo from '../../images/icons-factory.svg';
import UserLogo from '../../images/icons-user.png';
import CompanyForm from '../../components/CompanyForm';
import CompanyDetailsForm from '../../components/CompanyDetailsForm';
import SupplierForm from '../../components/SupplierForm';
import UserForm from '../../components/UserForm';
import CompletedSignUp from '../../components/CompletedSignUp';
import {validateName, validateRequired, validatePhone, validateEmail, validatePassword, validateConfirmPassword} from '../../utils/validate';
import * as constant from '../../utils/constant';
import './styles.less';

class CompleteRegistration extends Component {
    constructor(props){
        super(props);
        this.state = this.initState();
    }
    componentWillMount() {
        if (!this.props.user.role || this.props.user.statusRegistration !== constant.REGISTRATION_EMAIL_VERIFIED){
            this.props.history.push('/');
        }
    }
    componentDidMount() {
        window.addEventListener('scroll', this.handleScroll);
    }
    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll);
    }
    handleScroll = (event) => {
        const scrollTop = event.srcElement.scrollingElement.scrollTop;
        this.setState({scrollTop});
    }
    componentWillReceiveProps(nextProps){
        if (nextProps.signUpCompleteStatus === constant.SUCCESS) {
            this.setState({signUpComplete: true});
        }
        if (this.props.errorCommon !== nextProps.errorCommon && nextProps.errorCommon){
            message.warning(nextProps.errorCommon);
        }
    }
    handleClickMenu = (e) =>{
        if (e.key !== 'userInformation') {
            setTimeout(() => document.scrollingElement.scrollBy(0,-260));
        }
        this.setState({currentMenu: e.key});
    }

    /**
     * CompanyForm
     */
    handleChangeName = (value) =>{
        this.setState({
            companyName: {
                ...validateRequired(value),
                value
            }
        });
    }
    handleSaveFile = (files) =>{
        this.props.dispatch(commonActions.clearError());
        this.props.dispatch(commonActions.uploadFile(files));
    }
    handleChangeAdressLine_1 = (value) =>{
        this.setState({
            adressLine_1: {
                ...validateRequired(value),
                value
            }
        });
    }
    handleChangeAdressLine_2 = (value) =>{
        this.setState({
            adressLine_2: {
                value
            }
        });
    }
    handleChangeZip =(value) =>{
        this.setState({
            zip: {
                ...validateRequired(value),
                value
            }
        });
    }
    handleChangeCountry = (value) =>{
        this.setState({
            country: {
                ...validateRequired(value),
                value
            }
        });
    }
    handleChangeTelephoneCompany = (value) =>{
        this.setState({
            telephoneCompany: {
                value
            }
        });
    }
    handleChangeWebsite = (value) =>{
        this.setState({
            website: {
                ...validateRequired(value),
                value
            }
        });
    }

    /**
     * CompanyDetailsForm
     */
    handleChangeAbout =(value) =>{
       this.setState({
           about: {
               ...validateRequired(value),
               value
           }
       });
    }
    handleSelectStaff =(value) => {
        this.setState({
            staff: {
                ...validateRequired(value),
                value
            }
        });
    }
    handleSelectRevenue =(value) =>{
        this.setState({
            revenue: {
                ...validateRequired(value),
                value
            }
        });
    }
    handleSelectEstablished =(value) =>{
        this.setState({
            established: {
                ...validateRequired(value.toString()),
                value
            }
        });
    }

    /**
     * UserForm
     */
    handleChangeFullName= (value) =>{
       this.setState({
           fullName: {
               ...validateRequired(value),
               value
           }
       });
    }
    handleChangePosition = (value) =>{
        this.setState({
            position: {
                value
            }
        });
    }
    handleChangeTelephone = (value) =>{
        this.setState({
            telephone: {
                ...validatePhone(value),
                value
            }
        });
    }
    handleChangeEmail = (value) =>{
        this.setState({
            email: {
                ...validateEmail(value),
                value
            }
        });
    }

    /**
     * SupplierForm
     */
    handleChangeProducts= (value) =>{
      this.setState({
          products: {
              ...validateRequired(value),
              value
          }
      });
    }
    clickUSA= () =>{
        this.setState({isUSA: !this.state.isUSA});
    }
    clickEuropa= () =>{
        this.setState({isEuropa: !this.state.isEuropa});
    }
    clickAsia= () =>{
        this.setState({isAsia: !this.state.isAsia});
    }
    clickSoutchAmerica= () =>{
        this.setState({isSoutchAmerica: !this.state.isSoutchAmerica});
    }
    clickAustralia= () =>{
        this.setState({isAustralia: !this.state.isAustralia});
    }
    handleChangeCustomers= (value) =>{
      this.setState({
          customers: {
              ...validateRequired(value),
              value
          }
      });
    }
    handleChangeMachineList= (value) =>{
      this.setState({
          machineList: {
              value
          }
      });
    }
    handleChangeBusinessTerms= (value) =>{
      this.setState({
          businessTerms: {
              value
          }
      });
    }
    handleChangeR_D_Staff= (value) =>{
      this.setState({
          R_D_Staff: {
              value
          }
      });
    }
    handleChangeSalesStaff= (value) =>{
      this.setState({
          salesStaff: {
              value
          }
      });
    }
    handleChangeOtherStaff= (value) =>{
      this.setState({
          otherStaff: {
              value
          }
      });
    }
    handleChangeQ_C_Staff= (value) =>{
      this.setState({
          Q_C_Staff: {
              value
          }
      });
    }
    handleChangeOperationsStaff= (value) =>{
      this.setState({
          operationsStaff: {
              value
          }
      });
    }
    handleSaveImages = (files) =>{
        this.props.dispatch(commonActions.clearError());
        this.props.dispatch(commonActions.uploadImages(files));
    }
    removePhoto = (photo) =>{
        if (!photo) return;
        this.props.dispatch(commonActions.removeImage(photo));
        this.props.dispatch(commonActions.clearError());
        this.props.dispatch(commonActions.removeImageFromS3(photo));
    }
    handleChangePass = (value)=>{
        this.setState({
            password: {
                ...validatePassword(value),
                value
            }
        });
    }
    handleChangeConfirmPass = (value)=>{
        this.setState({
            confirmPassword: {
                ...validateConfirmPassword(value, this.state.password.value),
                value: value
            }
        });
    }

    saveCompany = () => {
      const company = {
          companyName: {...validateName(this.state.companyName.value), value: this.state.companyName.value},
          logo: {value: this.props.avatarFile},
          addressLine1: {...validateRequired(this.state.adressLine_1.value), value: this.state.adressLine_1.value},
          addressLine2: {value: this.state.adressLine_2.value},
          zip: {...validateRequired(this.state.zip.value), value: this.state.zip.value},
          country: {...validateRequired(this.state.country.value), value: this.state.country.value},
          phone: {...validatePhone(this.state.telephoneCompany.value), value: this.state.telephoneCompany.value},
          website: {...validateRequired(this.state.website.value), value: this.state.website.value},
          fullName: {value: this.state.fullName.value},
          position: {value: this.state.position.value},
          email: {value: this.state.email.value},
          userPhone: {...validatePhone(this.state.telephone.value), value: this.state.telephone.value},
          userId: {value: this.props.user.id},
          about: {value: this.state.about.value},
          staff: {...validateRequired(this.state.staff.value), value: this.state.staff.value},
          revenue: {...validateRequired(this.state.revenue.value), value: this.state.revenue.value},
          established: {...validateRequired(this.state.established.value), value: this.state.established.value},
          products: {value: this.state.products.value},
          markets: {value: (() => {
              const markets = [];
              if (this.state.isUSA) {
                  markets.push('USA');
              }
              if (this.state.isEuropa) {
                  markets.push('Europe');
              }
              if (this.state.isAsia) {
                  markets.push('Asia');
              }
              if (this.state.isSoutchAmerica) {
                  markets.push('SoutchAmerica');
              }
              if (this.state.isAustralia) {
                  markets.push('Australia');
              }
              return markets.join(',');
          })()},
          customers: {value: this.state.customers.value},
          machineList: {value: this.state.machineList.value},
          businessTerms: {value: this.state.businessTerms.value},
          rndStaff: {value: this.state.R_D_Staff.value},
          qcStaff: {value: this.state.Q_C_Staff.value},
          salesStaff: {value: this.state.salesStaff.value},
          operationsStaff: {value: this.state.operationsStaff.value},
          otherStaff: {value: this.state.otherStaff.value},
          imageFiles: {value: this.props.imageFiles},
      }

      for (var key in company) {
          const field = company[key];
          if(field.validateStatus && field.validateStatus === constant.ERROR) {
              return this.setState({
                  companyName: company.companyName,
                  avatarFile: company.logo,
                  adressLine_1: company.addressLine1,
                  adressLine_2: company.addressLine2,
                  zip: company.zip,
                  country: company.country,
                  telephoneCompany: company.phone,
                  website: company.website,
                  fullName: company.fullName,
                  position: company.position,
                  email: company.email,
                  telephone: company.userPhone,
                  about: company.about,
                  staff: company.staff,
                  revenue: company.revenue,
                  established: company.established,
                  products: company.products,
                  customers: company.customers,
                  machineList: company.machineList,
                  businessTerms: company.businessTerms,
                  R_D_Staff: company.rndStaff,
                  Q_C_Staff: company.qcStaff,
                  salesStaff: company.salesStaff,
                  operationsStaff: company.operationsStaff,
                  otherStaff: company.otherStaff
              });
          }
          company[key] = field.value;
      }
      this.props.dispatch(userAction.clearError());
      this.props.dispatch(userAction.completeSignUp(company));
    }

    saveUser = () => {
      const email =  {...validateEmail(this.state.email.value),  value: this.state.email.value};
      const fullName =  {...validateName(this.state.fullName.value),  value: this.state.fullName.value};
      const password =  {...validatePassword(this.state.password.value),  value: this.state.password.value};
      const confirmPassword =  {...validateConfirmPassword(this.state.confirmPassword.value, this.state.password.value),  value: this.state.confirmPassword.value};
      const phone =  {...validatePhone(this.state.telephone.value),  value: this.state.telephone.value};
      const position = this.state.position.value;

      if (
          email.validateStatus === constant.ERROR ||
          fullName.validateStatus === constant.ERROR ||
          password.validateStatus === constant.ERROR ||
          confirmPassword.validateStatus === constant.ERROR
      ) {
          return this.setState({email, fullName, password, confirmPassword, phone});
      }

      this.props.dispatch(userAction.clearError());
      this.props.dispatch(userAction.completeSignUpUser({
          ...this.props.user,
          email: email.value,
          fullName: fullName.value,
          password: password.value,
          confirmPassword: confirmPassword.value,
          phone: phone.value,
          position
      }));
    }

    onSave = (role)=> {
        if (role !== constant.USER) {
          return this.saveCompany;
        }
        return this.saveUser;
    }

    render() {
        const {user ={}, imageFiles, avatarFile} = this.props;
        const {currentMenu, companyName, adressLine_1, adressLine_2, zip, telephoneCompany, country, website} = this.state;
        const {about, staff, revenue, established, telephone, position, fullName, email, password, confirmPassword} = this.state;
        const {products, customers, machineList, businessTerms, R_D_Staff, salesStaff, otherStaff, Q_C_Staff, operationsStaff} = this.state;
        const {isUSA, isEuropa, isAsia, isSoutchAmerica, isAustralia, signUpComplete} = this.state;
        const shouldHeaderStick = this.state.scrollTop >= 100;
         return (
            <Row className='complete-registration'>
                <Header className={'complete-registration-header' + (shouldHeaderStick ? ' stick' : '')}>
                  <Row className="header-container">
                    <Row className='b-caption'>
                        <Col span={3}>
                            { user && user.role === constant.USER &&
                                <img src={UserLogo} alt='user'/>
                            }
                            { user && user.role === constant.CLIENT &&
                                <img src={CompanyLogo} alt='company'/>
                            }
                            {
                                user && user.role === constant.SUPPLIER &&
                                <img src={FactoryLogo} alt='factory'/>
                            }
                        </Col>
                        <Col span={21} className='title'>
                            Complete Registration
                        </Col>
                    </Row>
                    <Row className='slogan'>
                        Please complete the full registration to begin using Importist.
                    </Row>
                    <Row>
                        { user && user.role === constant.USER &&
                            <MenuRegUser
                                currentMenu={currentMenu}
                                handleClickMenu={this.handleClickMenu}
                                />
                        }
                        { user && user.role === constant.CLIENT &&
                            <MenuRegClient
                                currentMenu={currentMenu}
                                handleClickMenu={this.handleClickMenu}
                                />
                        }
                        {
                            user && user.role === constant.SUPPLIER &&
                            <MenuRegSupplier
                                currentMenu={currentMenu}
                                handleClickMenu={this.handleClickMenu}
                                />
                        }
                    </Row>
                  </Row>
                </Header>
                <Content className={'complete-registration-content' + (shouldHeaderStick ? ' offset' : '')}>
                  <Form>
                      { user && (user.role === constant.SUPPLIER || user.role === constant.CLIENT) &&
                      <CompanyForm
                          handleChangeName={this.handleChangeName}
                          handleSaveFile={this.handleSaveFile}
                          handleChangeAdressLine_1={this.handleChangeAdressLine_1}
                          handleChangeAdressLine_2={this.handleChangeAdressLine_2}
                          handleChangeTelephone={this.handleChangeTelephoneCompany}
                          handleChangeCountry = {this.handleChangeCountry}
                          handleChangeWebsite={this.handleChangeWebsite}
                          handleChangeZip={this.handleChangeZip}
                          companyName= {companyName}
                          adressLine_1= {adressLine_1}
                          zip= {zip}
                          telephone= {telephoneCompany}
                          adressLine_2= {adressLine_2}
                          country= {country}
                          website= {website}
                          avatarFile={avatarFile}
                      />
                      }
                      { user && (user.role === constant.SUPPLIER || user.role === constant.CLIENT) &&
                      <CompanyDetailsForm
                          handleSelectEstablished={this.handleSelectEstablished}
                          handleSelectRevenue={this.handleSelectRevenue}
                          handleSelectStaff={this.handleSelectStaff}
                          handleChangeAbout={this.handleChangeAbout}
                          about= {about}
                          staff= {staff}
                          revenue= {revenue}
                          established= {established}/>
                      }
                      { user && user.role === constant.SUPPLIER &&
                          <SupplierForm
                              handleChangeProducts={this.handleChangeProducts}
                              clickUSA={this.clickUSA}
                              clickEuropa={this.clickEuropa}
                              clickAsia={this.clickAsia}
                              clickSoutchAmerica={this.clickSoutchAmerica}
                              clickAustralia={this.clickAustralia}
                              handleChangeCustomers={this.handleChangeCustomers}
                              handleChangeMachineList={this.handleChangeMachineList}
                              handleChangeBusinessTerms={this.handleChangeBusinessTerms}
                              handleChangeR_D_Staff={this.handleChangeR_D_Staff}
                              handleChangeSalesStaff={this.handleChangeSalesStaff}
                              handleChangeOtherStaff={this.handleChangeOtherStaff}
                              handleChangeQ_C_Staff={this.handleChangeQ_C_Staff}
                              handleChangeOperationsStaff={this.handleChangeOperationsStaff}
                              handleSaveFile={this.handleSaveImages}
                              removePhoto={this.removePhoto}
                              imageFiles={imageFiles}

                              products={products}
                              customers={customers}
                              machineList={machineList}
                              businessTerms={businessTerms}
                              R_D_Staff={R_D_Staff}
                              salesStaff={salesStaff}
                              otherStaff={otherStaff}
                              Q_C_Staff={Q_C_Staff}
                              operationsStaff={operationsStaff}
                              isUSA={isUSA}
                              isEuropa={isEuropa}
                              isAsia={isAsia}
                              isSoutchAmerica={isSoutchAmerica}
                              isAustralia={isAustralia}
                          />
                      }

                      <UserForm
                          handleChangeTelephone={this.handleChangeTelephone}
                          handleChangePosition={this.handleChangePosition}
                          handleChangeEmail={this.handleChangeEmail}
                          handleChangeFullName={this.handleChangeFullName}
                          handleChangePass={this.handleChangePass}
                          handleChangeConfirmPass={this.handleChangeConfirmPass}
                          telephone={telephone}
                          position={position}
                          fullName={fullName}
                          email={email}
                          role={user.role}
                          password={password}
                          confirmPassword={confirmPassword}
                          />
                  </Form>
                  <Col span={24} className={'btn-block'}>
                      <Button
                          type="primary"
                          className='btn-blue'
                          onClick={this.onSave(user.role)}>
                          Save & Continue
                      </Button>
                  </Col>
                </Content>
                { signUpComplete &&
                  <CompletedSignUp />
                }
            </Row>
        );
    }

    initState = () =>{
        return {
            scrollTop: 0,
            currentMenu: 'company',
            companyName: {},
            adressLine_1: {},
            zip: {},
            telephoneCompany: {},
            adressLine_2: {},
            country: {},
            website: {},
            about: {},
            staff: {},
            revenue: {},
            established: {},
            telephone: { value: this.props.user.phone },
            position: {},
            fullName: { value: this.props.user.fullName && this.props.user.fullName.trim() },
            email: { value: this.props.user.email },
            products:{},
            customers:{},
            machineList:{},
            businessTerms:{},
            R_D_Staff:{},
            salesStaff:{},
            otherStaff:{},
            Q_C_Staff:{},
            operationsStaff:{},
            isUSA:false,
            isEuropa:false,
            isAsia:false,
            isSoutchAmerica:false,
            isAustralia:false,
            password:{},
            confirmPassword:{},
            signUpComplete: false
        }
    }
}
function mapStateToProps(state) {
    return {
        user: getUser(state),
        signUpStatus: state.userReducer.signUpStatus,
        signUpCompleteStatus: state.userReducer.signUpCompleteStatus,
        error: state.userReducer.error,
        errorCommon: state.common.error,
        avatarFile: getAvatarFile(state),
        imageFiles: getImageFiles(state)
    }
}
export default withRouter(connect(mapStateToProps)(CompleteRegistration));
