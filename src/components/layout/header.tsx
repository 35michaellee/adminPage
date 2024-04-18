
import CurrentUser from "./current-user"
import {Layout, Space} from 'antd'
const Header = () => {
  const headerStyles: React.CSSProperties ={
    background: 'white',
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    padding: '0 20px',
    position: 'sticky',
    boxShadow: '0 2px 8px rgba(0,0,0,0.09)',
    top:0,
    zIndex: 999,
    
  }
  return (
    <Layout.Header style={headerStyles}>
      <Space align="center"  size="middle">
        <CurrentUser></CurrentUser>
        </Space>
    </Layout.Header>
    
  )
}

export default Header