import {
  AlertFilled,
  ArrowUpOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons";
import { Card, Col, Divider, Progress, Row, Space, Statistic, Typography } from "antd";
import Grafico1 from "./Grafico/Grafico1";
import Grafico2 from "./Grafico/Grafico2";
import Grafico4 from "./Grafico/Grafico4";
const BaseCardScroll = () => {
  const { Title, Paragraph } = Typography;
  const cardsScroll = [
    { title: "Card A", description: "Descrição A", progress : true },
    { title: "Card B", description: "Descrição B" },
    { title: "Card C", description: "Descrição C",progress : true },
    { title: "Card D", description: "Descrição D" },
  ];

  return (
    <>
     
      <Row style={{overflowX: "auto" ,display: "flex",gap: "0px",paddingBottom: "24px",flexWrap: "nowrap"}} >
        {cardsScroll.map((card, index) => (
          <Col key={index} xs={24} sm={12} md={8} lg={6}>
            <Card key={index}  style={{ minWidth: 100, flex: "0 0 auto", padding: 8 }} bodyStyle={{ padding: 3}} >
            <Row gutter={[10, 10]} style={{ display: "flex",  flexDirection: "column"  }} >
                <Col>
                  <Row justify="space-between" align="middle">
                    <Col>
                      <Typography.Text strong style={{ fontSize: 14 }}>{card.title} </Typography.Text>
                    </Col>
                    <Col>
                      <InfoCircleOutlined style={{ color: "red", fontSize: 18 }} />
                    </Col>
                  </Row>
                </Col>
              <Col>
                  <Statistic value={11.28} precision={1} valueStyle={{ fontSize: 18 }} prefix={<ArrowUpOutlined />}  suffix="%" />
              </Col>
              <Col>
                <div style={{ height: 100, marginTop: 10 }}> {!card.progress ? <Grafico2 />:   <Grafico4/>} </div>
              </Col>
             <Col>
              <Row justify="space-between" style={{ marginTop: 10 }}>
                <Typography.Text        style={{ fontSize: 13 }}>Tipo: </Typography.Text>
                <Typography.Text strong style={{ fontSize: 13 }}>100%  </Typography.Text>
              </Row>
              </Col>
            </Row>
          </Card>
          </Col>
        ))}
      </Row>
    </>
  );
};

const DashBoardCard = () => {
  return (
    <div>
      <BaseCardScroll />
    </div>
  );
};

export default DashBoardCard;
