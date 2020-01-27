import React from 'react';
import { connect } from 'dva';
import PropTypes from 'prop-types';
import { Row, Col } from 'antd';
import { Page, HeadFilter } from 'components';
import { RentalPeak, RentIncome, Scoring, UsageRate } from './components';
import styles from './index.less';

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      slectedStore: ''
    };
  }

  handleChange = value => {
    this.setState({
      slectedStore: value
    });
  };

  handleDropdown = () => {
    this.props.dispatch({ type: 'dashboard/getStoreOptions' })
  }

  render() {
    const {
      dashboard: { storePull }
    } = this.props;
    return (
      <Page className={styles.dashboard}>
        <Row gutter={24}>
          <Col lg={24} md={24}>
            <HeadFilter
              title="数据分析"
              options={storePull}
              handleChange={this.handleChange}
              handleDropdown={this.handleDropdown}
            />
          </Col>
          {
            window.localStorage.getItem('userRolePermission') &&
              JSON.parse(window.localStorage.getItem('userRolePermission')).filter(v => v.id == 807).length != 0
              ?
              <Col lg={24} md={24}>
                <RentalPeak slectedStore={this.state.slectedStore} />
              </Col>
              : ''
          }
          {
            window.localStorage.getItem('userRolePermission') &&
              JSON.parse(window.localStorage.getItem('userRolePermission')).filter(v => v.id == 808).length != 0
              ?
              <Col lg={24} md={24}>
                <UsageRate slectedStore={this.state.slectedStore} />
              </Col>
              : ''
          }
          {
            window.localStorage.getItem('userRolePermission') &&
            JSON.parse(window.localStorage.getItem('userRolePermission')).filter(v => v.id == 809).length != 0
              ?
              <Col lg={24} md={24}>
                <RentIncome slectedStore={this.state.slectedStore} />
              </Col>
              : ''
          }
          {
            window.localStorage.getItem('userRolePermission') &&
            JSON.parse(window.localStorage.getItem('userRolePermission')).filter(v => v.id == 810).length != 0
              ?
              <Col lg={24} md={24}>
                <Scoring slectedStore={this.state.slectedStore} />
              </Col>
              : ''
          }
        </Row>
      </Page>
    );
  }
}

Dashboard.propTypes = {
  dashboard: PropTypes.object
};

export default connect(({ dashboard }) => ({ dashboard }))(Dashboard);
