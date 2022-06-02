import { Button, Card, Form, Input, Select } from "antd"
import { ArrowRightOutlined } from "@ant-design/icons"
import { Interface } from "readline"

function Classify() {
    // 添加分类
    interface addBlogNavType {
        blogNav: string,
    }
    const addBlogNav = (addValue: addBlogNavType) => {
        console.log(addValue)
    }
    // 删除分类
    interface delBlogNavType {
        id: number
    }
    const delBlogNav = (delValue: delBlogNavType) => {
        console.log(delValue)
    }
    // 修改分类
    interface editBlogNavType {
        blogNav: string,
        id: number
    }
    const editBlogNav = (editValue: editBlogNavType) => {
        console.log(editValue)
    }
    const selectValue = [
        { id: 0, label: "0" },
        { id: 1, label: "1" },
        { id: 2, label: "2" },
    ]
    return (
        <div>
            <div style={{ display: 'flex' }}>
                <Card style={{ width: '50%' }}>
                    <Form onFinish={addBlogNav} layout="inline" >
                        <Form.Item label="添加分类" name="blogNav" >
                            <Input ></Input>
                        </Form.Item>
                        <Form.Item>
                            <Button style={{ marginLeft: '25px' }} size='large' type='primary' htmlType='submit' >确定</Button>
                        </Form.Item>
                    </Form>
                </Card>
                <Card style={{ width: '50%' }}>
                    <Form onFinish={delBlogNav} layout="inline">
                        <Form.Item label="删除分类" name="id" style={{ width: '50%' }}>
                            <Select >
                                {selectValue.map(item => <Select.Option key={item.id} value={item.id}>{item.label} </Select.Option>)}
                            </Select>
                        </Form.Item>
                        <Form.Item>
                            <Button style={{ marginLeft: '25px' }} size='large' type='primary' htmlType='submit' >确定</Button>
                        </Form.Item>
                    </Form>
                </Card>
            </div >
            <div>
                <Card>
                    <Form layout="inline" onFinish={editBlogNav}>
                        <Form.Item label="修改分类" name="id" style={{ width: '36%' }}>
                            <Select >
                                {selectValue.map(item => <Select.Option key={item.id} value={item.id}>{item.label} </Select.Option>)}
                            </Select>
                        </Form.Item>
                        <Form.Item>
                            <ArrowRightOutlined />
                        </Form.Item>
                        <Form.Item name="blogNav" style={{ width: '36%' }}>
                            <Input></Input>
                        </Form.Item>
                        <Form.Item >
                            <Button style={{ marginLeft: '25px' }} size='large' type='primary' htmlType='submit' >确定</Button>
                        </Form.Item>
                    </Form>
                </Card>
            </div>
        </div>
    )
}
export default Classify