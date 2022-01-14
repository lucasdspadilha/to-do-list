import React, { useState } from 'react'

import 'antd/dist/antd.css'
import './App.css'
import './index.css'
import {
  Row,
  Col,
  Layout,
  Table,
  Divider,
  Form,
  Input,
  Button,
  InputNumber,
  message,
  Typography,
  Progress,
} from 'antd'

const { Header, Footer, Content } = Layout
const { Text } = Typography

function App() {
  const columns = [
    {
      title: 'Tasks',
      dataIndex: 'tasks',
      render: (text, record) =>
        record.stateCheckbox ? (
          <Text delete>{text}</Text>
        ) : (
          <Text strong>{text}</Text>
        ),
    },
    {
      title: 'Priority',
      dataIndex: 'priority',
      sorter: (a, b) => a.priority - b.priority,
    },
    {
      title: 'Comments',
      dataIndex: 'comments',
    },
    {},
  ]

  const Aplication = () => {
    const [data, setData] = useState([])
    const selectionType = useState('checkbox')
    const [form] = Form.useForm()

    const onChangeCheckState = (selectedKey) => {
      setData(
        data.map((item, index) => {
          if (selectedKey.indexOf(index) !== -1) {
            item.stateCheckbox = true
          } else {
            item.stateCheckbox = false
          }
          return item
        })
      )
    }

    const onChange = (selectedRowKeys, selectedRows) => {
      console.log(
        `selectedRowKeys: ${selectedRowKeys}`,
        'selectedRows: ',
        selectedRows
      )

      onChangeCheckState(selectedRowKeys)
    }

    const rowSelection = { onChange }

    const onFinish = (values) => {
      setData((prevState) => [
        ...prevState,
        {
          ...values,
          stateCheckbox: false,
          key: data.length,
        },
      ])
      form.resetFields()

      // console.log('Success:', data)
      message.success('Submit success!')
    }

    const onFinishFailed = (errorInfo) => {
      // console.log('Failed:', errorInfo)
      message.error('Submit failed!')
    }

    // function onChangePriority(value) {
    //   console.log('changed', value)
    // }

    const progress = () => {
      let checkedTask = data.filter(
        (state) => state.stateCheckbox === true
      ).length

      return (checkedTask * 100) / data.length
    }

    return (
      <div>
        <Divider />
        <Progress percent={progress()} />
        <Table
          rowSelection={{
            type: selectionType,
            ...rowSelection,
          }}
          columns={columns}
          dataSource={data}
          footer={() => (
            <Form
              form={form}
              name="basic"
              initialValues={{
                remember: true,
              }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
            >
              <Row>
                <Col span={17}>
                  <Form.Item
                    label="Tasks"
                    name="tasks"
                    rules={[
                      {
                        required: true,
                        message: 'Please, enter your task',
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
                <Col span={1}></Col>
                <Col span={6}>
                  <Form.Item label="Priority" name="priority">
                    <InputNumber
                      min={1}
                      max={3}
                      defaultValue={''}
                      // onChange={onChangePriority}
                    />
                  </Form.Item>
                </Col>
              </Row>
              <Row>
                <Col span={17}>
                  <Form.Item label="Comments" name="comments">
                    <Input />
                  </Form.Item>
                </Col>
                <Col span={3}></Col>
                <Col span={2}>
                  <Form.Item>
                    <Button type="primary" htmlType="submit">
                      Submit
                    </Button>
                  </Form.Item>
                </Col>
              </Row>
            </Form>
          )}
        />
      </div>
    )
  }

  return (
    <>
      <Layout>
        <Header>
          <Row>
            <Col span={24}>
              <div class="titleToDo">TooDoo</div>
            </Col>
          </Row>
        </Header>
        <Content class="pageContent">
          <Row>
            <Col class="sideBackgroud" span={4}></Col>
            <Col class="content" span={16}>
              <Aplication />
            </Col>
            <Col class="sideBackgroud" span={4}></Col>
          </Row>
        </Content>
        <Footer class="footerPage">
          <Row>
            <Col span={24}>
              <div class="footerToDo">List TooDoo - 2022</div>
            </Col>
          </Row>
        </Footer>
      </Layout>
    </>
  )
}

export default App
