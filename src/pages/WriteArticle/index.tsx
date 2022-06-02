/**
 * 标题、分类、文章、(时间)
 */
interface ArticleType {
    blogTitle: string,
    blogNav: string,
    blogContent: string,
}
import React, { useEffect, useState } from 'react';
import { Card, Form, Input, Button, Select } from 'antd';
import MyEditor from '@/components/MyEditor';
const { Option } = Select
const WriteArticle: React.FC = () => {
    const [form] = Form.useForm<{ blogTitle: string; blogNav: string; blogContent: string }>();
    let getSonMsg = (editor: string) => {
        useEffect(() => {
            form.setFieldsValue({ blogContent: editor })
        })
    }
    let selectValue = [
        { value: "0", id: 0 },
        { value: "1", id: 1 },
        { value: "2", id: 2 },
    ]
    const onFinish = (value: ArticleType) => {
        console.log(value)
    }
    return (
        <>
            <Card >
                <Form initialValues={{ blogContent: '' }} onFinish={onFinish} form={form} >
                    <Form.Item label="标题" name='blogTitle'>
                        <div style={{ display: 'flex' }}>
                            <Input style={{ width: '100%' }} placeholder="请输入标题" />
                            <Button style={{ marginLeft: '25px' }} size='large' type='primary' htmlType='submit'>发布</Button>
                        </div>
                    </Form.Item>
                    <Form.Item label="分类" name='blogNav'>
                        <Select style={{ width: '100%' }} allowClear>
                            {selectValue.map(item => <Option key={item.id} value={item.id}>{item.value}</Option>)}
                        </Select>
                    </Form.Item>
                    <Form.Item label="文章" name='blogContent'>
                        <MyEditor getSonMsg={getSonMsg}></MyEditor>
                    </Form.Item>
                </Form>
            </Card>
        </>
    )
}
export default WriteArticle