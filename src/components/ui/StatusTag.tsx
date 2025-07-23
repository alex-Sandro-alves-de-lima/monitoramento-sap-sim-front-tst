import { CheckCircleOutlined, ClockCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";
import { Tag } from "antd";


interface FinalizadoraViewProp {
  status: string | null;
}

export const StatusTag : React.FC<FinalizadoraViewProp> = ({status}) => {
  switch (status) {
    case "1":
      return (
        <Tag icon={<CheckCircleOutlined />} bordered={false} color="blue">
          Sucesso
        </Tag>
      );
    case "2":
      return (
        <Tag icon={<ClockCircleOutlined />} bordered={false} color="warning">
          Enviando
        </Tag>
      );
    case "3":
      return (
        <Tag icon={<CloseCircleOutlined />} bordered={false} color="red">
          Falha Integração
        </Tag>
      );
        case "4":
      return (
        <Tag icon={<CloseCircleOutlined />} bordered={false} color="red">
          Falha SAP
        </Tag>
      );

        case "5":
      return (
        <Tag icon={<ClockCircleOutlined />} bordered={false} color="gold">
          Aguardando processamento
        </Tag>
      );
    default:
      return <Tag color="default">Desconhecido</Tag>;
  }
};
