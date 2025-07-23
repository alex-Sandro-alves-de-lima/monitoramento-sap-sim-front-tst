
import { Card, Typography, Row, Col } from "antd";
// @ts-ignore
import logo from "/assets/portal.png"; // ajuste o caminho conforme sua estrutura

const { Title, Paragraph } = Typography;

const ErrorPage = () => {
  return (
    <Row
      justify="center"
      align="middle"
      style={{
        minHeight: "100vh",
        background: "linear-gradient(to bottom right, #f0f2f5, #d6e4ff)",
        padding: 24,
      }}
    >
      <Col xs={24} sm={20} md={16} lg={12} xl={8}>
        <Card
          bordered={false}
          style={{
            textAlign: "center",
            padding: 32,
            borderRadius: 16,
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
          }}
        >
          <img
            src={logo}
            alt="Logo"
            style={{ width: 120, marginBottom: 24 }}
          />
          <Title level={2} style={{ color: "#1d39c4" }}>
            Página não encontrada!
          </Title>
          <Paragraph>
            {/* Você não tem acesso a esta página.<br /> */}
            Acesse o menu lateral para navegação.
          </Paragraph>  
        </Card>
      </Col>
    </Row>
  );
};

export default ErrorPage;
