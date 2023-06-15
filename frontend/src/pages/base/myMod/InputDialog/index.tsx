/*
 * @文件描述: 首页
 * @公司: 山东大学
 * @作者: 李洪文
 * @LastEditors: 李洪文
 * @Date: 2019-05-09 15:40:17
 * @LastEditTime: 2020-04-01 12:20:55
 */
import { useEffect } from 'react';
import styles from './index.less';
import { Input, Form, Modal } from 'antd';
import { useForm } from 'antd/lib/form/Form';
const layout = {
  labelCol: {
    span: 4,
  },
  wrapperCol: { span: 20 },
};
const { TextArea } = Input;
export interface HomepageProps {
  visible: boolean;
  detailData?: defs.AccountingDTO;
  onClose: () => void;
  onSubmit: (data: defs.AccountingDTO) => void;
}

export default function InputForm(props: HomepageProps) {
  const [form] = useForm();
  useEffect(() => {
    if (props.detailData) {
      form.setFieldsValue(props.detailData);
    } else {
      form.resetFields();
    }
  }, [props.detailData, props.visible]);

  const onFinish = (values: any) => {
    props.onSubmit(values);
  };
  return (
    <Modal
      title={!!props.detailData ? '记账' : '新增账单'}
      visible={props.visible}
      width={500}
      okText="确定"
      centered
      getContainer={false}
      onCancel={() => {
        props.onClose();
      }}
      onOk={form.submit}
    >
      <Form
        {...layout}
        name="basic"
        form={form}
        className={styles.form}
        onFinish={onFinish}
      >
        <Form.Item
          label="账目："
          name="accountingName"
          rules={[{ required: true, message: '请输入账目名称' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="消费人："
          name="contact"
          rules={[{ required: true, message: '请输入消费人' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item label="花销：" name="description">
          <TextArea
            rows={2}
            placeholder="备注信息"
            allowClear={true}
            onChange={() => {}}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
}
