
import { Card, Typography, Row, Col } from "antd";
// @ts-ignore
import logo from "/assets/portal.png"; 
const { Title, Paragraph } = Typography;
const Manutencao = () => {
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
            Sistema em Manutenção
          </Title>
          <Paragraph>
            Estamos realizando melhorias no sistema para melhor atendê-lo. <br />
            Por favor, volte mais tarde. Agradecemos a compreensão!
          </Paragraph>
        </Card>
      </Col>
    </Row>
  );
};

export default Manutencao;
