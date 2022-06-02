
import { Space, Table } from "antd";
import type { ColumnsType } from 'antd/lib/table';
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
    const dataSource: columnsType[] = [
        {
            key: '1',
            id: 1,
            blogTitle: '测试标题',
            blogNav: '测试分类',
            blogView: 1,
            blogTime: '测试发布时间',
            blogUpdate: '测试修改时间',
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
    return (
        <>
            <Table dataSource={dataSource} columns={columns} />;
        </>
    )
}

export default Manage