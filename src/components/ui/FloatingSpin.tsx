
import { CheckCircleTwoTone, LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";
import { Button, notification } from 'antd';

interface FloatingSpinProps {
  status: "loading" | "success" | "none";
  message?: string;
}


export const FloatingSpin = ({ status, message }: FloatingSpinProps) => {
  if (status === "none") return null;
  const renderContent = () => {
    if (status === "loading") {
      return (
        <>
          <Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} />
          <span style={{ fontWeight: 500 }}>{message || "Processando..."}</span>
        </>
      );
    }

    if (status === "success") {
      return (
        <>
          <CheckCircleTwoTone twoToneColor="#52c41a" style={{ fontSize: 24 }} />
          <span style={{ fontWeight: 500 }}>{message || "Processado com sucesso!"}</span>
        </>
      );
    }
  };

  const openNotification = () => {
  notification.open({
    message: '',
    description:<>{renderContent}</>
  });
};

  return (
    <div
      style={{
        position: "fixed",
        bottom: 24,
        right: 24,
        backgroundColor: "#fff",
        boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
        padding: "16px 24px",
        borderRadius: "8px",
        display: "flex",
        alignItems: "center",
        gap: "12px",
        zIndex: 9999,
        transition: "all 0.3s ease-in-out",
      }}
    >

      
      {renderContent()}
    </div>
  );
};
