import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {Upload, message, Button, Row} from '../../utils/antd';
import PhotoIcon from '../../images/photo-icon.svg';

class UploadAvatar extends Component {
    state = {
        loading: false,
        fileList: [],        
        old: []
      };
      interval = null;
      handleChange = (info) => {
        if (info.file.status === 'uploading') {
          this.setState({ loading: true, old: [...this.state.old, info] });
          return;
        }
        if (info.file.status === 'done') {
          // Get this url from response in real world.
          
          this.getBase64(info.file.originFileObj, imageUrl => this.setState({
            imageUrl,
            loading: false,
          }));
        }
    }
    getBase64(img, callback) {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result));
        reader.readAsDataURL(img);
    }
    beforeUpload = (file) => {        
        const isJPG = file.type === 'image/jpeg' || file.type === 'image/png';
        if (!isJPG) {
          message.error('You can only upload JPG or PNG file!');
          return false;
        }
        const isLt2M = file.size / 1024 ;
        if (isLt2M > 512) {
          message.error('Image must smaller than 512Kb!');
          return false;
        }
        this.setState(({ fileList }) => ({
            fileList: [...fileList, file],
          }))
        return isJPG && isLt2M;
    }
    checkFileList = (data) =>{
        if (!this.interval){
            this.interval = setInterval(()=>{
                if (this.state.fileList.length === this.state.old.length){                    
                    clearInterval(this.interval);
                    this.sendFile(this.state.fileList);
                }
            }, 200)
        }
    }
    sendFile = (fileList) => {   
        const file = new FormData();
        fileList.forEach(data => {            
            file.append('files', data);             
        });    
        this.props.handleSaveFile(file);
    }    
    render() {      
        return (
            <div className='wrap-b-upload'>
                <Upload        
                    multiple={this.props.multiple}
                    className='b-upload'
                    showUploadList={false}
                    customRequest={this.checkFileList}            
                    beforeUpload={this.beforeUpload}
                    onChange={this.handleChange}
                    fileList= {this.state.fileList}
                >
                    <Row className='btntext-row'>
                        <div className='upload-btn-wrap'>
                            <Button>
                                <img src={PhotoIcon} alt=''/>
                                Upload Photos
                            </Button>                                      
                        </div>    
                        {this.props.children}
                    </Row>                                             
                </Upload>                
            </div>
            
        );
    }
}

UploadAvatar.propTypes = {
    handleSaveFile: PropTypes.func.isRequired
};

export default UploadAvatar;