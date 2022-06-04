
import { Space, Switch, Table } from "antd";
import type { ColumnsType } from 'antd/lib/table';
import tableData from '@/data/manageData'
interface columnsType {
    key: string
    id: number,
    blogTitle: string,
    blogNav: string,
    blogView: number,
    blogTime: string,
    blogUpdate: string,
}

function Manage() {
    const columns: ColumnsType<columnsType> = [
        {
            title: 'ID',
            dataIndex: 'id',
        },
        {
            title: '标题',
            dataIndex: 'blogTitle',
        },
        {
            title: '分类',
            dataIndex: 'blogNav',
        },
        {
            title: '浏览人数',
            dataIndex: 'blogView',
        },
        {
            title: '发布时间',
            dataIndex: 'blogTime',
        },
        {
            title: '修改时间',
            dataIndex: 'blogUpdate',
        },
        {
            title: '是否显示',
            dataIndex: 'action',
            render: (val, record) => (
                <Space size="middle">
                    <Switch checkedChildren="开启" unCheckedChildren="关闭" defaultChecked onChange={(e) => switchChange(e, record)} />
                </Space>
            )
        },
        {
            title: '操作',
            dataIndex: 'action',
            render: (val, record) => (
                <Space size="middle">
                    <a onClick={() => { editorTable(record) }}  >编辑</a>
                    <a onClick={() => { delTable(val) }}>Delete</a>
                </Space>
            )
        },
    ];

    // 编辑表格
    const editorTable = (value: columnsType) => {
        console.log(value)
    }
    // 删除表格
    const delTable = (value: columnsType) => {
        console.log(value)
    }
    // 分页
    let dataSource: Array<columnsType> = tableData
    const paginationProps = {
        showSizeChanger: false,
        showQuickJumper: false,
        showTotal: () => `共${dataSource.length}条`,
        pageSize: 10,
        current: 1,
        total: dataSource.length,
        onChange: (current: number) => changePage(current)
    };
    const changePage = (current: number) => {
        paginationProps.current = current
        dataSource = tableData.slice((current - 1) * 10, current * 10)
        console.log('changePage', current, dataSource)
    }
    // 切换开关
    const switchChange = (checked: boolean, record: columnsType) => {
        console.log(checked, record)
    }
    return (
        <>
            <Table dataSource={dataSource} columns={columns} pagination={paginationProps} />;
        </>
    )
}

export default Manage