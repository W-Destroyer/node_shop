/**
 * Create By Piny
 * 2017.07.04
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Collapse, Table, Input, Button, Popconfirm, Modal, message, Icon } from 'antd/dist/antd';
const Panel = Collapse.Panel;

class AddModal extends Component {
    
    state = {
        data: this.props.data,
        visible: !!this.props.data.visible,
    }
    
    shouldComponentUpdate(nextProps, nextState) {
        return nextProps.data.visible !== this.state.data.visible ||
            nextState.data.key !== this.state.data.key;
    }

    showModal = () => {
        this.setState({
            visible: true,
        });
    }

    handleOk = () => {
        this.setState({
            confirmLoading: true,
        });
        setTimeout(() => {
            this.setState({
                visible: false,
                confirmLoading: false,
            });
            this.props.onAdd();
            message.success('添加成功！')
        }, 2000);
    }
    handleCancel = () => {
        if(this.state.confirmLoading === true) return;
        this.setState({
            visible: false,
        });
    }
    handleChange = (e) => {
        console.log(e.target.value)
    }
    render() {
        const { visible, confirmLoading } = this.state;
        const { title, data } = this.props;
        const titleStyle = {
            padding: '5px'
        }
        return (
            <div>
                <div style={{padding: '10px'}}>
                    <Button className="editable-add-btn" type="primary" onClick={this.showModal}>添加</Button>
                </div>
                
            </div>
        );
    }
}

class FriendlyLinkTableCell extends Component {
  
    state = {
        value: this.props.value,
        valueDOM: this.props.valueDOM,
        editable: this.props.editable || false,
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.editable !== this.state.editable) {
            this.setState({
                editable: nextProps.editable
            });
            if (nextProps.editable) {
                this.cacheValue = this.state.value;
            }
        }

        if (nextProps.status && nextProps.status !== this.props.status) {
            if (nextProps.status === 'save') {
                this.props.onChange(this.state.value);
            } else if (nextProps.status === 'cancel') {
                this.setState({ value: this.cacheValue });
                this.props.onChange(this.cacheValue);
            }
        }
    }
    shouldComponentUpdate(nextProps, nextState) {
        return nextProps.editable !== this.state.editable ||
            nextState.value !== this.state.value;
    }
    handleChange(e) {
        const value = e.target.value;
        console.log(value);
        this.setState({ value });
    }
    render() {
        const { value, valueDOM, editable } = this.state;

        return <div className="editable-row-text">{ valueDOM || value }</div>
    }
}

class FriendlyLink extends React.Component {
    constructor(props) {
        super(props);

        this.columns = [{
            title: '网站名称',
            dataIndex: 'name',
            width: '25%',
            render: (text, record, index) => this.renderColumns(this.state.data, index, 'name', text),
        }, {
            title: '网站地址',
            dataIndex: 'address',
            width: '65%',
            render: (text, record, index) => {
                var textDOM = <a href={text} target='_black'>{text}</a>;
                return this.renderColumns(this.state.data, index, 'address', text, textDOM)
            },
        }, {
            title: '操作',
            dataIndex: 'operation',
            render: (text, record, index) => {
                const { editable } = this.state.data[index].name;
                return (
                    <div className="editable-row-operations">
                        <div>
                            <a onClick={() => this.onEdit(index)}>
                                <Icon type="edit" />
                            </a>
                            <span>&nbsp;&nbsp;</span>
                            <Popconfirm title="确定删除？" onConfirm={() => this.onDelete(index)}>
                                <a><Icon type="delete" /></a>
                            </Popconfirm>
                        </div>
                    </div>
                );
            },
        }];

        this.state = {
            data: [{
                key: '0',
                name: {
                    value: '淘宝',
                },
                address: {
                    value: 'https://www.taobao.com',
                },
                visible: false,

            }, {
                key: '1',
                name: {
                    value: '天猫',
                },
                address: {
                    value: 'https://www.tmall.com',
                },
                visible: false,
            }],
        };
    }
    
    renderColumns(data, index, key, text, textDOM) {
        // const { editable, status } = data[index][key];
        // const itemKey = data[index].key;
        // if (typeof editable === 'undefined') {
        //   return text;
        // }
        // return (
        //     <FriendlyLinkTableCell
        //         itemKey={itemKey}
        //         editable={editable}
        //         value={text}
        //         valueDOM={textDOM}
        //         onChange={value => this.handleChange(key, index, value)}
        //         status={status}
        //     />
        // );
        return (<div className="editable-row-text">{ textDOM || text }</div>);
    }

    handleChange(key, index, value) {
        // 在这个位置将更改的数据保存到数据库中
        // fetch('/api/admin/addFriendlyLink');
        
        if(!value) {
            return this.onDelete(index);
        }

        const { data } = this.state;
        data[index][key].value = value;
        this.setState({ data });
    }

    onAdd() {

        const { data } = this.state;
        const newItem = {
            key: data.length.toString(),
            editable: false,
            name: {
                editable: false,
                value: '123456',
            },
            address: {
                editable: false,
                value: 'qwerty',
            },
        }
        var newData = [...data, newItem]
        this.setState({ data: newData });
    }

    onEdit(index) {
        const { data } = this.state;
        data[index].visible = true;
        // Object.keys(data[index]).forEach((item) => {
        //   if (data[index][item] && typeof data[index][item].editable !== 'undefined') {
        //     data[index][item].editable = true;
        //   }
        // });
        this.setState({ data });
    }

    onDelete(index) {
        // 在此删除数据库中该数据
        // fetch('/api/admin/deleteFriendLyLinkItem');

        const data = [...this.state.data];
        data.splice(index, 1);
        this.setState({ data });
    }

    editDone(index, type) {
        const { data } = this.state;
        Object.keys(data[index]).forEach((item) => {
            if (data[index][item] && typeof data[index][item].editable !== 'undefined') {
                data[index][item].editable = false;
                data[index][item].status = type;
            }
        });
        this.setState({ data }, () => {
            Object.keys(data[index]).forEach((item) => {
                if (data[index][item] && typeof data[index][item].editable !== 'undefined') {
                    delete data[index][item].status;
                }
            });
        });
    }
    
    render() {
        const { data } = this.state;
        const dataSource = data.map((item) => {
            const obj = {};
            Object.keys(item).forEach((key) => {
                obj[key] = key === 'key' ? item[key] : item[key].value;
            });
            return obj;
        });

        const editItem = data.find(item => item.visible === true) || {};

        const columns = this.columns;

        return (
            <div>
                <AddModal
                    data={editItem}
                    title='友情链接'
                    onAdd={() => this.onAdd()}
                />
                <Table bordered dataSource={dataSource} columns={columns} pagination={false} />
            </div>
        )
    }
}



const customPanelStyle = {
    // background: '#f7f7f7',
    borderRadius: 4,
    marginBottom: 24,
    border: 0,
};

class FullStation extends Component {
    render() {
        console.log(this.props)
        return (
            <Collapse bordered={false} defaultActiveKey={[]}>
                <Panel header={<div style={{fontWeight: 600}}>公司名称设置</div>} key="1" style={customPanelStyle}>
                    <div>江西艾麦达科技有限公司</div>
                </Panel>
                <Panel header={<span style={{fontWeight: 600}}>友情链接设置</span>} key="2" style={customPanelStyle}>
                    <FriendlyLink />
                </Panel>
                <Panel header={<span style={{fontWeight: 600}}>技术支持设置</span>} key="3" style={customPanelStyle}>
                    <FriendlyLink />
                </Panel>
                <Panel header={<span style={{fontWeight: 600}}>博客资讯设置</span>} key="4" style={customPanelStyle}>
                    <FriendlyLink />
                </Panel>
                <Panel header={<span style={{fontWeight: 600}}>关于公司设置</span>} key="5" style={customPanelStyle}>
                    <FriendlyLink />
                </Panel>
                <Panel header={<span style={{fontWeight: 600}}>备案号设置</span>} key="6" style={customPanelStyle}>
                    <FriendlyLink />
                </Panel>
            </Collapse>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    console.log(state);
    console.log(ownProps);

    return {
        nav: state.nav,
        user: state.user,
        product: state.product
    }
}
export default connect(mapStateToProps)(FullStation);
