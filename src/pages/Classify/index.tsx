import { Button, Card, Form, Input, Select, Popconfirm, message } from "antd"
import { ArrowRightOutlined } from "@ant-design/icons"
import React, { useState, useEffect } from "react"
import { getBlogsNav, addBlogsNav, delBlogsNav, editBlogsNav } from "@/utils/http/blogsNav"
import { blogNavType, addBlogNavType, delBlogNavType, editBlogNavType, backNavType } from "@/types/classifyType";
import "./index.scss"
import { match } from "assert";
function Classify() {
    const [confBlooean, setConfBlooean] = useState<number>(0)
    // 查询分类
    const [blogsNav, setBlogsNav] = useState<Array<blogNavType>>([])
    // 增加分类
    const [addBlogsNavVal, setAddBlogsNavVal] = useState<string>('')
    // 删除分类
    const [delBlogNavVal, setDelBlogNavVal] = useState<number>(0)
    // 编辑分类
    const [editBlogNavId, setEditBlogNavId] = useState<number>(0)
    const [editBlogNavVal, setEditBlogNavVal] = useState<string>('')
    // 表单验证
    const [addform] = Form.useForm()
    const [delform] = Form.useForm()
    const [editform] = Form.useForm()
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
    const addBNav = async (addValue: addBlogNavType) => {
        addform.validateFields()
            .then(async (values) => {
                addBlogsNav(addValue)
                    .then(res => {
                        setConfBlooean(Math.random())
                        res.code === 200 ?
                            message.info(addBlogsNavVal + '\t' + '添加成功') :
                            message.warning(addBlogsNavVal + '\t' + '重复添加')
                    }).catch(err => {
                        message.error(addBlogsNavVal + '\t' + '添加失败');
                        console.log(err)
                    })
            }).catch(err => { })
    }

    // 删除分类
    const delBNav = (delValue: delBlogNavType) => {
        delform.validateFields()
            .then(async (values) => {
                // 返回第一个符合条件的元素
                const delBNavName = blogsNav.find(item => item.id == delValue.id)
                delBlogsNav(delValue).then(res => {
                    setConfBlooean(Math.random())
                    res.code === 200 ?
                        message.info(delBNavName?.blogNav + '\t' + '删除成功') :
                        message.error(delBNavName?.blogNav + '\t' + '删除失败')
                }).catch(err => {
                    message.error(delBNavName?.blogNav + '\t' + '删除失败');
                })
            }).catch(err => { })
    }
    // 修改分类

    const editBNav = (editValue: editBlogNavType) => {
        editform.validateFields()
            .then(async (values) => {
                const editBNavName = blogsNav.find(item => item.id == editValue.id)
                console.log(editBNavName)
                editBlogsNav(editValue).then(res => {
                    setConfBlooean(Math.random())
                    if (res.code === 200) {
                        message.info(editBNavName?.blogNav + '\t' + "修改为" + '\t' + editBlogNavVal + '\t' + '成功')
                    } else if (res.code === 304) {
                        message.warning(editBNavName?.blogNav + '\t' + "与" + '\t' + editBlogNavVal + '\t' + '重复,不得修改！')
                    } else {
                        message.error(editBNavName?.blogNav + '\t' + "修改为" + '\t' + editBlogNavVal + '\t' + '失败')
                    }

                }).catch(err => {
                    message.error(editBNavName?.blogNav + '\t' + "修改为" + '\t' + editBlogNavVal + '\t' + '失败')
                })
            }).catch(err => { })
    }

    return (
        <div>
            <div style={{ display: 'flex' }}>
                {/* 增 */}
                <Card className="classify-card">
                    <Form layout="inline" form={addform}>
                        <Form.Item label="添加分类" name="blogNav"
                            rules={[{ required: true, message: 'blogNav不能为空' }]}>
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
                {/* 删 */}
                <Card className="classify-card">
                    <Form layout="inline" form={delform}>
                        <Form.Item label="删除分类" name="id" style={{ width: '50%' }}
                            rules={[{ required: true, message: '选择不能为空' }]}>
                            <Select placeholder="请选择blogsNav" onChange={(e) => { setDelBlogNavVal(e) }} allowClear>
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
                                <Button style={{ marginLeft: '25px' }} size='large' type='primary' >确定</Button>
                            </Popconfirm>
                        </Form.Item>
                    </Form>
                </Card>
            </div >
            <div>
                {/* 改 */}
                <Card style={{ height: 100 }} >
                    <Form layout="inline" form={editform} >
                        <Form.Item label="修改分类" name="id" style={{ width: '36%' }}
                            rules={[{ required: true, message: 'blogNav不能为空' }]}>
                            <Select placeholder="请选择blogsNav" onChange={(e) => { setEditBlogNavId(e) }}>
                                {blogsNav.map(item => <Select.Option key={item.id} value={item.id}>{item.blogNav} </Select.Option>)}
                            </Select>
                        </Form.Item>
                        <Form.Item>
                            <ArrowRightOutlined />
                        </Form.Item>
                        <Form.Item name="blogNav" style={{ width: '36%' }}
                            rules={[{ required: true, message: '选择不能为空' }]} >
                            <Input onChange={(e) => { setEditBlogNavVal(e.target.value) }} placeholder="请输入blogsNav"></Input>
                        </Form.Item>
                        <Form.Item >
                            <Popconfirm
                                title={"确定添加分类:" + addBlogsNavVal + "吗？"}
                                onConfirm={() => { editBNav({ id: editBlogNavId, blogNav: editBlogNavVal }) }}
                                okText="Yes"
                                cancelText="No"
                            >
                                <Button style={{ marginLeft: '25px' }} size='large' type='primary'>确定</Button>
                            </Popconfirm>
                        </Form.Item>
                    </Form>
                </Card>
            </div>
        </div>
    )
}
export default Classify