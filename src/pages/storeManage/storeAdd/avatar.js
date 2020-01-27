import React from 'react'
import { Upload, Icon, message } from 'antd';
import { request, config } from 'utils'

const { api } = config
const { storeAvator } = api

function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}

function beforeUpload(file) {
  const isJPG = file.type === 'image/jpeg';
  const isPNG = file.type === 'image/png';
  const isJNG =isPNG || isJPG
  if (!isJNG) {
    message.error('请上传JPG/PNG格式的图片');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('图片小于2M！');
  }
  return isJNG && isLt2M;
}

class Avatar extends React.Component {
  state = {
    loading: false,
  };
  handleChange = (info) => {
    const {onAvator}=this.props
    if (info.file.status === 'uploading') {
      this.setState({ loading: true });
      return;
    }
    if (info.file.status === 'done') {
      onAvator(info)
    }
  }

  render() {
    const uploadButton = (
      <div>
        <Icon type={this.state.loading ? 'loading' : 'plus'} />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    const {imageUrl} = this.props;
const headers={
  Authorization:window.localStorage.getItem('token')
}
    return (
      <Upload
        name="file"
        listType="picture-card"
        className="avatar-uploader"
        showUploadList={false}
        action={storeAvator}
        beforeUpload={beforeUpload}
        headers={headers}
        onChange={this.handleChange}
      >
        {imageUrl ? <img src={imageUrl} alt="avatar" height={150} width={150} /> : uploadButton}
      </Upload>
    );
  }
}
export default Avatar