import { css } from "../../../../lib/styled-system/css";
import {
  Button,
  DatePicker,
  Divider,
  Form,
  Image,
  InputNumber,
  Rate,
  Select,
  Slider,
  Space,
  Switch,
} from "antd";
import FormItem from "antd/es/form/FormItem";
import Title from "antd/es/typography/Title";

export const PageHomeView = () => {
  return (
    <>
      <section
        style={{
          textAlign: "center",
          marginTop: 24,
          marginBottom: 40,
        }}
      >
        <h1
          className={css({
            fontSize: 20,
            fontWeight: "bold",
            mdDown: {
              fontSize: "xl",
              color: "blue.300",
            },
          })}
        >
          Hello 🐼!
        </h1>
        <Space align="start">
          <Image
            width={200}
            alt=""
            src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
          />
          <Title level={2} className={css({ marginBottom: 0 })}>
            Ant Design × Next.js (app router)
          </Title>
        </Space>
      </section>
      <Divider style={{ marginBottom: 32 }}>Form</Divider>
      <Form labelCol={{ span: 6 }} wrapperCol={{ span: 16 }}>
        <FormItem label="数値入力">
          <InputNumber min={1} max={10} defaultValue={3} />
        </FormItem>
        <FormItem label="スイッチ">
          <Switch />
        </FormItem>
        <FormItem label="スライダー">
          <Slider defaultValue={70} />
        </FormItem>
        <FormItem label="セレクタ">
          <Select
            defaultValue="lucy"
            style={{ width: 120 }}
            options={[
              { value: "jack", label: "Jack" },
              { value: "lucy", label: "Lucy" },
              { value: "Yiminghe", label: "yiminghe" },
              { value: "disabled", label: "Disabled", disabled: true },
            ]}

            // use clientのときにしか使えない↓
            // onChange={handleChange}
          />
        </FormItem>
        <FormItem label="日付選択">
          <DatePicker />
        </FormItem>
        <FormItem label="評価">
          <Rate defaultValue={5} />
        </FormItem>
        <FormItem wrapperCol={{ span: 8, offset: 8 }}>
          <Space>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
            <Button>Cancel</Button>
            <Button ghost href="/">
              Without Sub Components
            </Button>
          </Space>
        </FormItem>
      </Form>
    </>
  );
};
