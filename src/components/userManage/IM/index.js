import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Modal, Button, Input, Form, message } from 'antd';
import classnames from 'classnames'
import styles from './index.less';
import { sessionApi, sessionStorageNum } from '../../../utils/config';
import * as date from '../../../utils/date';
const { TextArea } = Input;
const FormItem = Form.Item;

function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}

const imStyles = {
  sessionContainer: {
    padding: '0 20px'
  },
  sessionContent: {
    height: '300px',
    padding: '0 10px',
    overflow: 'auto',
    border: '1px solid #e5e5e5',
  },
  textLeft: {
    textAlign: 'left',
    marginBottom: '10px',
  },
  textRight: {
    textAlign: 'right',
    marginBottom: '10px',
  },
  textContent: {
    padding: '0 10px',
  },
  linkClose: {
    textAlign: 'center',
    color: 'red',
  }
}
class ImModal extends PureComponent {
  constructor(props) {
    super(props);
    const sessions = window.localStorage.getItem(`${props.userInfo.openid}-session`);
    this.state = {
      wsSession: null,
      sessions: sessions ? JSON.parse(sessions) : [],
      sessionHint: false,
    }
    this.scrollIntoBottom();
  }


  componentDidMount() {
    const { userInfo: { openid, nickname } } = this.props;
    try {
      this.state.wsSession = new WebSocket(`${sessionApi}`);
      this.state.wsSession.onopen = res => this.setState({ sessionHint: false });
      this.state.wsSession.onmessage = res => {
        this.setSession(nickname, res.data)
      };
      this.state.wsSession.onerror = res => this.setState({ sessionHint: '连接错误，请重试' });
      this.state.wsSession.onclose = res => this.setState({ sessionHint: '连接已断开' });
    } catch (e) {
      this.setState({ sessionHint: '连接已断开' });
    }
  }

  componentWillUnmount() {
    const { sessions } = this.state;
    const sessionStorage = sessions.length > sessionStorageNum ? sessions.slice(sessions.length - sessionStorageNum) : sessions;
    window.localStorage.setItem(`${this.props.userInfo.openid}-session`, JSON.stringify(sessionStorage));
    this.state.wsSession && this.state.wsSession.close();
  }

  //发送信息
  sendSession = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (err) return;
      try {
        this.state.wsSession.send(JSON.stringify({ openid: this.props.userInfo.openid, content: values.content }));
      } catch (err) {
      }
      this.setSession('admin', values.content);
      this.props.form.resetFields();
    });
  }

  //设置会话数据
  setSession = (name, content) => {
    this.setState({
      sessions: [
        ...this.state.sessions,
        {
          name,
          content,
          time: date.getTimestamp(),
        }]
    })
    this.scrollIntoBottom();
  }

  //滚动到聊天框底部
  scrollIntoBottom = () => {
    setTimeout(() => {
      const sessionBottom = document.getElementById("sessionBottom");
      sessionBottom && sessionBottom.scrollIntoView();
    }, 0)
  }

  render() {
    const { getFieldDecorator, getFieldsError } = this.props.form;
    const { visible, handleOk, onHideModal, sure, titleText, width, } = this.props;
    const { sessions, sessionHint } = this.state;
    return (
      <Modal
        title={null}
        visible={visible}
        footer={null}
        className={styles.modal}
        width={width}
        onCancel={onHideModal}
      >
        <div className={styles.title}>IM会话</div>
        {sessionHint && <div style={imStyles.linkClose}>{sessionHint}</div>}
        <div style={imStyles.sessionContainer}>
          <div style={imStyles.sessionContent}>
            {
              sessions.map((s, i) => {
                return (
                  <div style={s.name == 'admin' ? imStyles.textRight : imStyles.textLeft} key={s.name + s.time}>
                    <div>{s.name} {date.getDateTime(s.time)}</div>
                    <div style={imStyles.textContent}>{s.content}</div>
                  </div>
                )
              })
            }
            <div id="sessionBottom"></div>
          </div>
          <Form onSubmit={this.sendSession}>
            <FormItem
              style={{ width: '100%' }}
            >
              {getFieldDecorator('content', {
                rules: [{ required: true, message: '请输入信息' }],
              })(
                <TextArea
                  rows={3}
                  onPressEnter={this.sendSession} />
              )}
            </FormItem>
            <FormItem wrapperCol={{ offset: 20 }}>
              <Button
                type="primary"
                htmlType="submit"
                className={styles.textarea}
                disabled={hasErrors(getFieldsError())}
              >
                发送
              </Button>
            </FormItem>
          </Form>
        </div>
      </Modal>
    )
  }
}

ImModal.propTypes = {
  visible: PropTypes.bool
}

export default Form.create()(ImModal)