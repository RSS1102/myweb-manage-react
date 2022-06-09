import { Button, Card, Form, Input, Select, Popconfirm, message } from "antd"
import { ArrowRightOutlined } from "@ant-design/icons"
import React, { useState, useEffect } from "react"
import { getBlogsNav, addBlogsNav, delBlogsNav, editBlogsNav } from "@/utils/http/blogsNav"
import { blogNavType, addBlogNavType, delBlogNavType, editBlogNavType, backNavType } from "@/types/classifyType";

function Classify() {
    const [confBlooean, setConfBlooean] = useState<backNavType["code"]>(0)
    // 查询分类
    const [blogsNav, setBlogsNav] = useState<Array<blogNavType>>([])
    // 增加分类
    const [addBlogsNavVal, setAddBlogsNavVal] = useState<string>('')
    // 删除分类
    const [delBlogNavVal, setDelBlogNavVal] = useState<number>(0)
    // 编辑分类
    const [editBlogNavId, setEditBlogNavId] = useState<number>(0)
    const [editBlogNavVal, setEditBlogNavVal] = useState<string>('')


    // 获取博客导航
    useEffect(() => {
        async function getBNav() {
            const theBlogsNav = await getBlogsNav()
            setBlogsNav(theBlogsNav)
            console.log(theBlogsNav)
        }
        getBNav()
    }, [confBlooean])
    // 添加分类
    const addBNav = (addValue: addBlogNavType) => {
        addBlogsNav(addValue)
            .then(res => {
                setConfBlooean(res.code)
                res.code === 200 ?
                    message.info(addBlogsNavVal + '\t' + '添加成功') :
                    message.warning(addBlogsNavVal + '\t' + '重复添加')
            }).catch(err => {
                message.error(addBlogsNavVal + '\t' + '添加失败');
                console.log(err)
            })
    }

    // 删除分类
    const delBNav = (delValue: delBlogNavType) => {
        console.log(delValue)
        delBlogsNav(delValue).then(res => {
            setConfBlooean(res.code)
            res.code === 200 ?
                message.info(delBlogNavVal + '\t' + '删除成功') :
                message.warning(delBlogNavVal + '\t' + '删除失败')
        }).catch(err => {
            message.error(delBlogNavVal + '\t' + '删除失败');
        })
    }
    // 修改分类

    const editBNav = (editValue: editBlogNavType) => {
        console.log(editValue)
        editBlogsNav(editValue).then(res => {
            setConfBlooean(res.code)
            res.code === 200 ?
                message.info(editBlogNavVal + '\t' + '修改成功') :
                message.warning(editBlogNavVal + '\t' + '修改失败')
        }).catch(err => {
            message.error(editBlogNavVal + '\t' + '修改失败');
        })
    }

    return (
        <div>

            <div style={{ display: 'flex' }}>
                <Card style={{ width: '50%' }}>
                    <Form layout="inline" >
                        <Form.Item label="添加分类" name="blogNav" >
                            <Input onChange={(e) => { setAddBlogsNavVal(e.target.value) }} placeholder="请输入blogsNav"></Input>
                        </Form.Item>
                        <Form.Item>
                            <Popconfirm
                                title={"确定添加分类:" + addBlogsNavVal + "吗？"}
                                onConfirm={() => { addBNav({ blogNav: addBlogsNavVal }) }}
                                okText="Yes"
                                cancelText="No"
                            >
                                <Button style={{ marginLeft: '25px' }} size='large' type='primary'>确定</Button>
                            </Popconfirm>
                        </Form.Item>
                    </Form>
                </Card>

                <Card style={{ width: '50%' }}>
                    <Form layout="inline">
                        <Form.Item label="删除分类" name="id" style={{ width: '50%' }}>
                            <Select placeholder="请选择blogsNav" onChange={(e) => { setDelBlogNavVal(e) }}>
                                {blogsNav.map(item => <Select.Option key={item.id} value={item.id}>{item.blogNav} </Select.Option>)}
                            </Select>
                        </Form.Item>
                        <Form.Item>
                            <Popconfirm
                                title={"确定删除分类:" + addBlogsNavVal + "吗？"}
                                onConfirm={() => { delBNav({ id: delBlogNavVal }) }}
                                okText="Yes"
                                cancelText="No"
                            >
                                <Button style={{ marginLeft: '25px' }} size='large' type='primary' htmlType='submit' >确定</Button>
                            </Popconfirm>
                        </Form.Item>
                    </Form>
                </Card>
            </div >
            <div>
                <Card>
                    <Form layout="inline" >
                        <Form.Item label="修改分类" name="id" style={{ width: '36%' }}>
                            <Select placeholder="请选择blogsNav" onChange={(e) => { setEditBlogNavId(e) }}>
                                {blogsNav.map(item => <Select.Option key={item.id} value={item.id}>{item.blogNav} </Select.Option>)}
                            </Select>
                        </Form.Item>
                        <Form.Item>
                            <ArrowRightOutlined />
                        </Form.Item>
                        <Form.Item name="blogNav" style={{ width: '36%' }}>
                            <Input onChange={(e) => { setEditBlogNavVal(e.target.value) }} placeholder="请输入blogsNav"></Input>
                        </Form.Item>
                        <Form.Item >
                            <Popconfirm
                                title={"确定添加分类:" + addBlogsNavVal + "吗？"}
                                onConfirm={() => { editBNav({ id: editBlogNavId, blogNav: editBlogNavVal }) }}
                                okText="Yes"
                                cancelText="No"
                            >
                                <Button style={{ marginLeft: '25px' }} size='large' type='primary' htmlType='submit' >确定</Button>
                            </Popconfirm>
                        </Form.Item>

                    </Form>
                </Card>
            </div>
        </div>
    )
}
export default Classify