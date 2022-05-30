import { Layout, Menu, Popconfirm } from 'antd'
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { HomeOutlined, EditOutlined, FileTextOutlined, FormOutlined, LogoutOutlined } from '@ant-design/icons';
import "./index.scss"
const { Header, Sider, Content } = Layout;
const PageLayout: React.FC = () => {
    // 获取当前路由
    const { pathname } = useLocation();
    // 跳转路由
    const navigate = useNavigate();
    // 获取菜单数据
    {/**
      * 数据概览：展示发送的频率、访问量
      * 文章发布：发布文章
      * 分类管理：管理文章分类的增删改查
      * 文章管理：管理文章的增删改查以及其他数据的查看
      */}
    const items = [
        { label: '数据概览', key: '/', icon: <HomeOutlined />, },
        { label: '文章发布', key: '/article', icon: <EditOutlined />, },
        { label: '分类管理', key: '/classify', icon: <FormOutlined />, },
        { label: '文章管理', key: '/manage', icon: <FileTextOutlined />, },]
    return (
        <>
            <Layout className='lay-out'>
                <Header style={{ background: '#F0F8FF' }}>
                    <span className='logo'>RSS1102</span>
                    <span className='user-concent'>
                        <span className='user-name'>user</span>
                        <span className='logout-out-lined'> <LogoutOutlined /> 退出</span>
                    </span>
                </Header>
                <Layout>
                    <Sider style={{ background: '#fff' }}>
                        <Menu defaultSelectedKeys={[pathname]} items={items} onSelect={(e) => { navigate(e.key) }} />
                    </Sider>
                    <Content><Outlet></Outlet></Content>
                </Layout>
            </Layout>
        </>
    )
}

export default PageLayout