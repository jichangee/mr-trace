import React, { useState } from 'react'
import { Button, Modal, Input, Form } from 'antd'
import { connect } from 'react-redux'
import { setEmail } from '../../redux/actions'

function EmailBox(props) {
  const [form] = Form.useForm()
  const [isShowEmail, setIsShowEmail] = useState(false)

  function handleOk() {
    form.validateFields().then((formValue) => {
      const { email } = formValue
      props.setEmail(email)
      setIsShowEmail(false)
    })
  }

  function handleCancel() {
    setIsShowEmail(false)
  }

  function showSetEmail() {
    setIsShowEmail(true)
  }
  return (
    <>
      {
        <Button type="link" onClick={showSetEmail}>
          {props.email ? '修改邮箱' : '设置邮箱'}
        </Button>
      }
      <Modal
        title="设置邮箱地址"
        visible={isShowEmail}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="确认"
        cancelText="取消"
      >
        <Form form={form} initialValues={{ email: props.email }}>
          <Form.Item
            label="邮箱地址"
            name="email"
            rules={[
              { required: true, message: '请输入邮箱地址' },
              { type: 'email', message: '请输入正确的邮箱地址' },
            ]}
          >
            <Input placeholder="请输入"></Input>
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
}

export default connect(
  (state) => ({
    email: state.index.email,
  }),
  {
    setEmail,
  },
  null,
  {
    forwardRef: true,
  }
)(EmailBox)
