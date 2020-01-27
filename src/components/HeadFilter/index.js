import React from 'react';
import { Select } from 'antd';
import styles from './index.less';
import { relative } from 'upath';

const Option = Select.Option;
class HeadFilter extends React.Component {
  render() {
    const { title, options, handleChange, handleDropdown } = this.props;
    return (
      <div className={styles.selectcard} id="options">
        <span className={styles.label}>{title}</span>
        <Select
          className={styles.select}
          defaultValue="所有门店"
          onChange={handleChange}
          onDropdownVisibleChange={handleDropdown}
        >
          <Option value="">所有门店</Option>
          {options
            ? options.map(v => (
              <Option value={v.name} key={v.id}>
                {v.name}
              </Option>
            ))
            : ''}
        </Select>
      </div>
    );
  }
}
export default HeadFilter;
