import React, { Component } from 'react'
import { Tree, Icon, Popconfirm } from 'antd'

const TreeNode = Tree.TreeNode;
const styles = {
  icon: {
    marginLeft: '1em'
  }
};

class PermissionTree extends Component {
  constructor(props) {
    super(props)
    this.state = {
      expandedKeys: [],
      autoExpandParent: true,
      selectedKeys: [],
    }
  }

  onExpand = (expandedKeys) => {
    this.setState({
      expandedKeys,
      autoExpandParent: false,
    })
  }

  renderTree = (t) => {
    const { select, edit, add } = this.props;
    if (!t) {
      return (
        <span>
          根权限
					{
            select
              ? null
              : <Icon type="plus-circle-o" style={styles.icon} onClick={() => add({ id: 0 })} />
          }
        </span>
      );
    }
    if (select) return t.permissionName;
    return (
      <span>
        {t.permissionName}
        <Icon type="edit" style={styles.icon} onClick={() => { edit(t) }} ></Icon>
        <Popconfirm
          title="确定删除该权限吗？"
          onConfirm={() => this.props.delete(t)}
          okText="确定"
          cancelText="取消"
        >
          <Icon type="delete" style={styles.icon}></Icon>
        </Popconfirm>
        <Icon type="plus-circle-o" style={styles.icon} onClick={() => add(t)} ></Icon>
      </span>
    )
  }

  renderTreeNodes = (data, id) => {
    return data.filter(t => t.pPermissionId === id).map(t => {
      const props = {
        title: this.renderTree(t),
        key: t.id
      };
      if (data.some(l => l.pPermissionId === t.id)) props.children = this.renderTreeNodes(data, t.id);
      return <TreeNode {...props} />;
    });
  }

  render() {
    const { list } = this.props
    return (
      <Tree
        showLine
        onExpand={this.onExpand}
        expandedKeys={this.state.expandedKeys}
        autoExpandParent={this.state.autoExpandParent}
        selectedKeys={this.state.selectedKeys}
        defaultExpandedKeys={['0']}
      >
        <TreeNode title={this.renderTree()} key="0">
          {this.renderTreeNodes(list, 0)}
        </TreeNode>
      </Tree>
    )
  }
}

export default PermissionTree