import React, { Component } from 'react';
import { Link, browserHistory } from 'react-router';
import { bindActionCreators } from 'redux';
import { push } from 'react-router-redux';

// import Header from './header';
// import Nav from "./nav";
// import Body from './body';
// import Notify from 'module/notify/index';

import { Layout, Breadcrumb, Icon} from 'antd/dist/antd';
const { Footer, Sider, Content } = Layout;

import { connect } from 'react-redux';

import Header from './header';
import Nav from './navigation';

import '../../../css/admin/admin.less';


class HeaderBreadcrumb extends Component {
    constructor() {
        super();
    }
    render() {
        const { pathname } = this.props;
        var routes = pathname.split('/').slice(2);
        var href = '/admin'
        const breadcrumbItem = routes.map((item, index) => {
            href += '/' + item;
            return (
                <Breadcrumb.Item key={index}>
                    <Link to={href}><Icon type="user" /><span>{item}</span></Link>
                </Breadcrumb.Item>
            )
        });
        return (
            <header className='container-header'>
                <Breadcrumb separator=">">
                    <Breadcrumb.Item>
                        当前位置： 
                        <Link to="/admin"><Icon type="home" /> 主页</Link>
                    </Breadcrumb.Item>
                    { breadcrumbItem }
                </Breadcrumb>
            </header>
        )
    }
}

class App extends Component {
    // constructor() {
    //     super();
    //     this.name = 'Piny';
    //     this.company = '江西艾麦达科技有限公司';
    // }

    shouldComponentUpdate(nextProps, nextState) {
        // return nextProps.location.path === '/admin'
        return true;
    }

    onClick = e => {
        const { dispatch } = this.props;
        dispatch(push('/admin/pagesetting/' + Math.random()))
    }

    render() {
        
        const { dispatch, location, baseinfo } = this.props;
        const { pathname } = location;
        return (
            <div>
                <Layout style={{overflow: 'hidden'}}>
                    <Header />
                    <Layout className='layout'>
                        <Sider className='sider' width='auto'>
                            <Nav params={pathname}/>
                        </Sider>
                        <Layout className='content'>
                            <Content className='container'>
                                <HeaderBreadcrumb pathname={pathname} />
                                <section className="container-body" style={{background: '#fff'}}>
                                    { this.props.children }
                                </section>
                                <Footer className='footer' > &copy; {baseinfo.companyName}  <div style={{float: 'right'}}>Power By {baseinfo.authorName}</div></Footer>
                            </Content>
                        </Layout>
                    </Layout>
                </Layout>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        nav: state.nav,
        user: state.user,
        product: state.product,
        baseinfo: state.baseinfo
    }
}

const mapDispatchToProps = dispatch => {
    return {
        dispatch
    }
}

export default connect(mapStateToProps)(App);