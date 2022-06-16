
import { message, Space, Switch, Table } from "antd";
import type { ColumnsType } from 'antd/lib/table';
import React, { useEffect } from "react";
import { blogsListType, blogsListReqType } from "@/types/manage";
import { getBlogs, changeArticleShow } from '@/utils/http/blogsList';
import { useState } from 'react'

function Manage() {
    const [blogsList, setBlogsList] = useState<Array<blogsListType>>([]);
    const [count, setCount] = useState<number>(0);
    const pagelimit = 10;
    const [offset, setOffset] = useState(0);
    const columns: ColumnsType<blogsListType> = [
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
            dataIndex: 'visitedNum',
        },
        {
            title: '发布时间',
            dataIndex: 'createdAt',
        },
        {
            title: '修改时间',
            dataIndex: 'updatedAt',
        },
        {
            title: '是否显示',
            dataIndex: 'articleShow',
            render: (val, record) => (
                <Space size="middle">
                    <Switch
                        loading={record.switchLoading ? true : false}
                        checkedChildren="开启" unCheckedChildren="关闭"
                        checked={record.articleShow ? true : false}
                        onChange={(e) => switchChange(e, record)} />
                </Space>
            )
        },
        {
            title: '操作',
            dataIndex: '',
            render: (val, record) => (
                <Space size="middle">
                    <a onClick={() => { editorTable(record) }}  >编辑</a>
                    <a onClick={() => { delTable(val) }}>Delete</a>
                </Space>
            )
        },
    ];

    // 分页请求
    useEffect(() => {
        let reqObj: blogsListReqType = {
            offset: offset,
            limit: pagelimit
        }
        const getBlogFun = async () => {
            const { rows, count } = await getBlogs(reqObj);
            setCount(count);
            setBlogsList(() => {
                return rows.map((item: blogsListType) => {
                    return { ...item, key: item.id.toString() }
                });
            });
        }
        getBlogFun()
    }, [offset])
    // 分页
    const paginationProps = {
        showSizeChanger: false,
        showQuickJumper: false,
        showTotal: () => `共${count}条`,
        pageSize: 10,
        current: offset + 1,
        total: count,
        onChange: (current: number) => changeonChangePage(current)
    };
    const changeonChangePage = (current: number) => {
        setOffset((current - 1) * pagelimit)
    }
    // 切换开关
    const switchChange = (checked: boolean, record: blogsListType) => {
        // console.log(checked, record)
        setBlogsList(() => {
            return blogsList.map((item: blogsListType) => {
                let params = { ...item, key: item.id.toString(), }
                return params.id === record.id ? { ...params, articleShow: checked, switchLoading: true } : params
            });
        });
        let params = { id: record.id, articleShow: checked }
        changeArticleShow(params).then(res => {
            message.success(checked ? '文章已开启展示' : '文章已关闭展示')
            setBlogsList(() => {
                return blogsList.map((item: blogsListType) => {
                    let params = { ...item, key: item.id.toString(), }
                    return params.id === record.id ? { ...params, articleShow: checked, switchLoading: false } : params
                });
            });
        }).catch(err => {
            message.error('修改失败')
            setBlogsList(() => {
                return blogsList.map((item: blogsListType) => {
                    let params = { ...item, key: item.id.toString(), }
                    return params.id === record.id ? { ...params, articleShow: checked, switchLoading: false } : params
                });
            });
        });
    }
    // 编辑表格
    const editorTable = (value: blogsListType) => {
        console.log(value)
    }
    // 删除表格
    const delTable = (value: blogsListType) => {
        console.log(value)
    }
    return (
        <>
            <Table dataSource={blogsList} columns={columns} pagination={paginationProps} />;
        </>
    )
}

export default Manage