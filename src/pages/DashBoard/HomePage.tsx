import { Card, Typography, Row, Col } from "antd";
const { Title, Paragraph } = Typography;

//@ts-ignore
import logo from "../../../public/assets/bygpa.png";
//@ts-ignore
import gpa from "../../../public/assets/SIMP_full.mp4";

const HomePage = () => {
  return (
    <div
      style={{
        //  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#fff",
        padding: "24px",
      }}
    >
  
      <Row
       gutter={[0, 12]}
        style={{
          flexDirection: "column",
          maxWidth: 900,
          width: "100%",
          borderRadius: "16px",
          textAlign: "center",
        }}
      >
        <Col style={{  margin: 10 }}>
          <video
            src={gpa}
            width="100%"
            autoPlay
            muted
            playsInline
            style={{
              borderRadius: "12px",
              maxHeight: 500,
              objectFit: "contain",
            }}
          >
            <img
              src={logo}
              alt="Logo ByGPA"
              style={{ height: 80, marginBottom: 16 }}
            />
          </video>
        </Col>
        <Col style={{margin: 10  }}>
          <Title level={2} style={{ marginBottom: 8 }}>
            Bem-vindo ao Portal GPA
          </Title>

          <Paragraph style={{ fontSize: 16, marginBottom: 32 }}>
            Monitoramento e Configuração de Integrações SAP
            <br />
            Utilize o menu lateral para navegar pelas funcionalidades.
          </Paragraph>
        </Col>

     
      </Row>
    </div>
  );
};

export default HomePage;
