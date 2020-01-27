import React from 'react';
import styles from './index.less';

class Bread extends React.Component {
  render() {
    const { title } = this.props;
    return (
      <div className={styles.bread}>
        <span className={styles.label}>{title}</span>
      </div>
    );
  }
}

export default Bread;
