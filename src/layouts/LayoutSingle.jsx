import React from "react";
import { Layout } from "antd";
const { Content } = Layout;

const LayoutSingle = (props) => {
  return (
    <Layout className="layoutSingle">
      <Content className="content">{props.children}</Content>
    </Layout>
  );
};
export default LayoutSingle;
