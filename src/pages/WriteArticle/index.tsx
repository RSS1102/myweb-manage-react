import React, { useEffect, useState } from 'react';
import { Card, Form, Input, Button, Select, message, Modal } from 'antd';
import MyEditor from '@/components/MyEditor';
import { getBlogsNav } from '@/utils/http/blogsNav';
import { saveBlogs } from '@/utils/http/blogs';
import { blogNavType } from '@/types/classifyType';
import { ArticleFormType, blogNavsObj } from '@/types/articleTpye'
const { Option } = Select
const WriteArticle: React.FC = () => {
    const [blogNavVal, setBlogNavVal] = useState<Array<blogNavType>>()
    const [isModalVisible, setIsModalVisible] = useState<boolean>(false)
    // 获取分类
    useEffect(() => {
        const getBNav = async () => {
            const getBlogsNavVal = await getBlogsNav()
            console.log(getBlogsNavVal)
            setBlogNavVal(getBlogsNavVal)
        }
        getBNav()
    }, [])
    // 获取文章
    const [form] = Form.useForm<ArticleFormType>();
    let onEdit = (editor: string) => {
        form.setFieldsValue({ blogContent: editor })
    }
    // 发布文章
    const onPublic = () => {
        form.validateFields().then(async (values: ArticleFormType) => {
            setIsModalVisible(true)
        }).catch(err => { })
    }
    const onFinishCancel = () => {
        setIsModalVisible(false)
    }
    const onFinish = () => {
        console.log("1")
        let { blogTitle, blogNavs, blogContent } = form.getFieldsValue(true)
        let blogNavsObj: blogNavsObj = {
            blogTitle,
            blogContent,
            blogNav: blogNavs.label,
            blogNavId: blogNavs.value,

        }
        console.log(blogNavsObj)
        saveBlogs(blogNavsObj).then(res => {
            message.success('发布成功')
            setIsModalVisible(false)
        }).catch(err => {
            console.log(err)
            message.error('发布失败,请稍后再试')
            setIsModalVisible(false)
        })
    }
    return (
        <>
            <Modal title="是否发布文章" visible={isModalVisible} onOk={onFinish} onCancel={onFinishCancel}>
                <p>请仔细核对发布的内容。</p>
            </Modal>
            <Card >
                <Form initialValues={{ blogContent: null }} form={form} >
                    <Form.Item label="标题" name='blogTitle'
                        rules={[
                            { required: true, message: '请输入标题' },
                            { max: 20, message: '标题最多20个字符' }
                        ]}>
                        <div style={{ display: 'flex' }}>
                            <Input style={{ width: '100%' }} placeholder="请输入标题" />
                            <Button style={{ marginLeft: '25px' }} size='large' type='primary'
                                onClick={onPublic}>发布</Button>
                        </div>
                    </Form.Item>
                    <Form.Item label="分类" name='blogNavs'
                        rules={[{ required: true, message: '请选择分类' }]}>
                        <Select style={{ width: '100%' }} allowClear labelInValue>
                            {blogNavVal?.map(item =>
                                <Option key={item.id} value={item.id}>{item.blogNav}</Option>)}
                        </Select>
                    </Form.Item>
                    <Form.Item label="文章" name='blogContent'
                        rules={[
                            { required: true, message: '请输入文章' },
                            { max: 20000, message: '文章最多20000个字符' },
                        ]}
                    >
                        <MyEditor onEdit={onEdit}></MyEditor>
                    </Form.Item>
                </Form>
            </Card>
        </>
    )
}
export default WriteArticle