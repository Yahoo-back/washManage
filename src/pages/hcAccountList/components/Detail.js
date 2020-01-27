import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import { Card, Button, Row, Col, Form, Input } from 'antd';
import { Link } from 'react-router-dom';
import { Page, NowModal } from 'components';
import styles from './Detail.less';

const checkModal = {
    modalText: {
        display: 'block',
        marginLeft: '45px'
    }
};
const FormItem = Form.Item;
const formItemLayout = {
    labelCol: {
        span: 7
    },
    wrapperCol: {
        span: 14
    }
};

class Detail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            edit: false,
            visible: false,
            data: [],
            remark: '',
            id: '',
            inputValue: '',
            edit: false,
            data: {}
        };
    }

    //详情修改
    editFn = () => {
        this.setState({
            edit: true
        });
    };

    saveFn = () => {
        const { dispatch } = this.props;
        const { inputValue } = this.state;
        const id = window.location.href
            .split('?')[1]
            .split('=')[1]
            .split('&')[0];
        dispatch({ type: 'hcAccount/update', payload: { id, remark: inputValue } });
        this.setState({
            edit: false
        });
    };

    handelChange = e => {
        this.setState({ inputValue: e.target.value });
    };

    //取消按钮
    cancle = () => {
        this.setState({
            edit: false
        });
    };

    //查看密码弹框
    showModal = async () => {
        this.setState({
            visible: true
        });
    };

    onCreate = () => {
        this.setState({
            visible: false
        });
    };

    handleCancel = () => {
        this.setState({
            visible: false
        });
        const {
            form: { resetFields }
        } = this.props;
        resetFields();
    };

    //确定查看密码
    handleSubmit = () => {
        const { dispatch } = this.props;
        this.props.form.validateFields((err, values) => {
            if (err) {
                return;
            }
            this.setState({
                visible: false
            });
            dispatch({ type: 'hcAccount/check', payload: values });
            this.props.form.resetFields();
        });
    };

    render() {
        const { edit } = this.state;
        const { checkPsd } = this.props.hcAccount;
        const { homeAccountName, mail, associateStore, remark, ctime, password } = this.props.hcAccount.detail;
        const { getFieldDecorator } = this.props.form;
        return (
            <div>
                <Page>
                    <Card
                        title="账号详情"
                        extra={
                            !edit ? (
                                <div>
                                    <Link to="/hcAccountList">
                                        <Button>返回</Button>
                                    </Link>
                                    {window.localStorage.getItem('userRolePermission') &&
                                    JSON.parse(window.localStorage.getItem('userRolePermission')).filter(
                                        v => v.id == 824
                                    ) != [] ? (
                                        <Button type="primary" className={styles.btn} onClick={this.editFn}>
                                            修改
                                        </Button>
                                    ) : (
                                        ''
                                    )}
                                </div>
                            ) : (
                                <div>
                                    <Button onClick={this.cancle}>取消</Button>
                                    <Button type="primary" className={styles.btn} onClick={this.saveFn}>
                                        保存
                                    </Button>
                                </div>
                            )
                        }
                    >
                        <div className={styles.up}>
                            <Row type="flex" justify="space-around" className={styles.title}>
                                <Col span={4}>HomeConnect账号：</Col>
                                <Col span={4}>邮箱：</Col>
                                <Col span={4}>密码：</Col>
                            </Row>
                            <Row type="flex" justify="space-around" className={styles.content}>
                                <Col span={4}>{homeAccountName}</Col>
                                <Col span={4}>{mail}</Col>
                                <Col span={4}>
                                    <div>
                                        <div>
                                            {!checkPsd ? (
                                                <div>
                                                    <span>******</span>{' '}
                                                    {window.localStorage.getItem('userRolePermission') &&
                                                    JSON.parse(
                                                        window.localStorage.getItem('userRolePermission')
                                                    ).filter(v => v.id == 820) != [] ? (
                                                        <Button
                                                            type="default"
                                                            className={styles.btn}
                                                            onClick={this.showModal}
                                                        >
                                                            查看密码
                                                        </Button>
                                                    ) : (
                                                        ''
                                                    )}
                                                </div>
                                            ) : (
                                                password
                                            )}
                                        </div>
                                        <NowModal
                                            titleText="查看"
                                            sure="确认"
                                            visible={this.state.visible}
                                            handleOk={this.handleSubmit}
                                            onCancel={this.handleCancel}
                                            cancelText="取消"
                                        >
                                            <p style={checkModal.modalText}>
                                                为了确保账号安全，查看密码前请输入您的登录账号和密码：
                                            </p>
                                            <Form onSubmit={this.handleSubmit}>
                                                <FormItem label="登录账号" hasFeedback {...formItemLayout}>
                                                    {getFieldDecorator('username', {
                                                        initialValue: this.state.user ? this.state.user.username : null,
                                                        rules: [
                                                            {
                                                                required: true,
                                                                message: '请输登录入账号!',
                                                                whitespace: true
                                                            }
                                                        ]
                                                    })(<Input />)}
                                                </FormItem>
                                                <FormItem label="登录密码" hasFeedback {...formItemLayout}>
                                                    {getFieldDecorator('password', {
                                                        initialValue: this.state.user ? this.state.user.password : null,
                                                        rules: [
                                                            {
                                                                required: true,
                                                                message: '请输入密码!',
                                                                whitespace: true
                                                            }
                                                        ]
                                                    })(<Input />)}
                                                </FormItem>
                                            </Form>
                                        </NowModal>
                                    </div>
                                </Col>
                            </Row>
                        </div>
                        <div className={styles.down}>
                            <Row type="flex" justify="space-around" className={styles.title}>
                                <Col span={4}>关联门店：</Col>
                                <Col span={4}>备注：</Col>
                                <Col span={4}>添加时间：</Col>
                            </Row>
                            <Row type="flex" justify="space-around" className={styles.content}>
                                <Col span={4}>{associateStore}</Col>
                                <Col span={4}>
                                    {edit ? (
                                        <div>
                                            <Input defaultValue={remark} onChange={e => this.handelChange(e)} />
                                        </div>
                                    ) : (
                                        <div>{`${remark}`}</div>
                                    )}
                                </Col>
                                <Col span={4}>{ctime}</Col>
                            </Row>
                        </div>
                    </Card>
                </Page>
            </div>
        );
    }
}

Detail.propTypes = {
    form: PropTypes.object.isRequired,
    onCancel: PropTypes.func,
    create: PropTypes.object
};

export default connect(({ hcAccount }) => ({ hcAccount }))(Form.create()(Detail));
