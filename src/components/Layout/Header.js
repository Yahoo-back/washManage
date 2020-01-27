import React from 'react'
import PropTypes from 'prop-types'
import { Menu, Icon, Popover, Layout } from 'antd'
import { logo, hide } from '../../../assets'
import styles from './Header.less'
import Menus from './Menu'

const { SubMenu } = Menu
const crrstyle = {
  submenu: {
    float: 'left'
  }
}

const Header = ({
  user,
  logout,
  switchSider,
  siderFold,
  isNavbar,
  menuPopoverVisible,
  location,
  switchMenuPopover,
  navOpenKeys,
  changeOpenKeys,
  menu,
}) => {
  let handleClickMenu = e => e.key === 'logout' && logout()
  const menusProps = {
    menu,
    siderFold: false,
    darkTheme: true,
    isNavbar,
    handleClickNavMenu: switchMenuPopover,
    location,
    navOpenKeys,
    changeOpenKeys,
  }
  return (
    <Layout.Header className={styles.header}>

      <div className={styles.logo}>
        {siderFold ? '' :
          <p className={styles.title}>
            <img alt="logo" src={logo} />
            <span>博世洗悦管理后台</span>
          </p>
        }
        {isNavbar ? (
          <Popover
            placement="bottomLeft"
            onVisibleChange={switchMenuPopover}
            visible={menuPopoverVisible}
            overlayClassName={styles.popovermenu}
            trigger="click"
            content={<Menus {...menusProps} />}
          >
            <div className={styles.button}>
              <Icon type="bars" />
            </div>
          </Popover>
        ) : (
            <div className={styles.button} onClick={switchSider}>
              <img src={hide}/>
            </div>
          )}
      </div>
      <div className={styles.rightWarpper}>
        <Menu mode="horizontal" onClick={handleClickMenu}>
          <SubMenu
            style={crrstyle.submenu}
            title={
              <span>
                {user.nickName}
                <Icon type="down" className={styles.down} />
              </span>
            }
          >
            <Menu.Item key="logout">注销登录</Menu.Item>
          </SubMenu>
        </Menu>
      </div>
    </Layout.Header>
  )
}

Header.propTypes = {
  menu: PropTypes.array,
  user: PropTypes.object,
  logout: PropTypes.func,
  switchSider: PropTypes.func,
  siderFold: PropTypes.bool,
  isNavbar: PropTypes.bool,
  menuPopoverVisible: PropTypes.bool,
  location: PropTypes.object,
  switchMenuPopover: PropTypes.func,
  navOpenKeys: PropTypes.array,
  changeOpenKeys: PropTypes.func,
}

export default Header
