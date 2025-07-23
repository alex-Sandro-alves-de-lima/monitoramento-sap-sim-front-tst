import React, { useState } from "react";

//@ts-ignore
import logo from "../../public/assets/simp_f.png";

import {
  DesktopOutlined,
  LogoutOutlined,
  PieChartOutlined,
  SettingOutlined,
  UserOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import {
  Avatar,
  Button,
  Dropdown,
  Layout,
  Menu,
  Row,
  Space,
  theme,
  Tooltip,
  Typography,
} from "antd";
import { Outlet, useNavigate } from "react-router-dom";

const { Header, Content, Sider, Footer } = Layout;
const { Title, Paragraph, Text } = Typography;
type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[]
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

const itemsMenu: MenuItem[] = [
  getItem("Dashboard", "0", <PieChartOutlined />),
  getItem("Análise", "sub2", <DesktopOutlined />, [
    getItem("Registros", "1"),
    getItem("Procesamentos", "4")
  ]),
  getItem("Cadastro", "sub3", <SettingOutlined />, [
    getItem("Rede", "2"),
    getItem("Bandeira", "3"),
    // getItem("Processamento", "6"),
    getItem("Meio de pagamento", "5"),
    // getItem("Teste", "5"),
  ]),
];

const siderStyle: React.CSSProperties = {
  position: "sticky",
  overflow: "hidden",
  height: "100vh",
  // position: "sticky",overflow: "auto", /// rolar caso tenha bastante item
  insetInlineStart: 0,
  top: 0,
  bottom: 0,
  scrollbarWidth: "thin",
  scrollbarGutter: "stable",
};

const headerStyle: React.CSSProperties = {
  position: "sticky",
  top: 0,
  zIndex: 1,
  width: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
};

const logoStyle: React.CSSProperties = {
  height: "64px",
  margin: "16px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const ContentStyle: React.CSSProperties = {
  minHeight: 360,
  padding: 24,
  overflow: 'auto', // mostra a barra quando precisa
};

const layoutPrincipal: React.CSSProperties = {
  minHeight: "100vh",
};

const AppProt: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();

  const items: MenuProps["items"] = [
    {
      // label: "Configuração do usuário",
      key: "1",
      icon: (
        <>
          <Space align="center" size="small">
            <Avatar size="default" icon={<UserOutlined />} />
            <Row
              style={{
                display: "flex",
                flexDirection: "column",
                lineHeight: 1,
              }}
            >
              <Title level={1} style={{ margin: 2, fontSize: 12 }}>
                Alex Sandro Alves Lima
              </Title>
              <span style={{ fontWeight: "bold", fontSize: 12 }}>TC021864</span>
            </Row>
          </Space>
        </>
      ),
    },

    {
      // label: "Permissões",
      key: "3",
      icon: (
        <Row
          style={{
            display: "flex",
            flexDirection: "column",
            lineHeight: 1,
          }}
        >
          <Title level={1} style={{ margin: 2, fontSize: 12 }}>
            Permissões
          </Title>
          <Paragraph type="secondary" style={{ margin: 2, fontSize: 12 }}>
            <ul>
              <li>
                <Tooltip
                  title="Acessos e permições exclusivas para excluir e cadastrar."
                  placement="left"
                >
                  monitoramento.consulta
                </Tooltip>
              </li>
              <li>
                <Tooltip
                  title="Acessos e permições exclusivas para excluir e cadastrar."
                  placement="left"
                >
                  monitoramento.admin
                </Tooltip>
              </li>
              <li>
                <Tooltip
                  title="Acessos e permições exclusivas para excluir e cadastrar."
                  placement="left"
                >
                  monitoramento.sustentacao
                </Tooltip>
              </li>
            </ul>
          </Paragraph>
        </Row>
      ),

      // disabled: true,
    },
    {
      // label: "Permissões",
      key: "4",
      icon: (
        <Row
          style={{
            display: "flex",
            flexDirection: "column",
            lineHeight: 1,
          }}
        >
          <Title level={1} style={{ margin: 2, fontSize: 12 }}>
            Versão
          </Title>
          <Paragraph type="secondary" style={{ margin: 2, fontSize: 12 }}>
            <Tooltip
              title="MAJOR (versão principal).MINOR (versão secundária).PATCH  (correções)"
              placement="left"
            >
              <span style={{ fontWeight: "bold", fontSize: 12 }}>1.6.0</span>
            </Tooltip>
          </Paragraph>
        </Row>
      ),

      // disabled: true,
    },
  ];
  const menuProps = { items };
  const handleSelect = (key: string) => {
    navigate(key);
  };

  return (
    <Layout style={layoutPrincipal}>
      {/* <Badge.Ribbon text={"versao"} /> */}
      <Sider
        style={siderStyle}
        // trigger={null} /// botao de recolher
        // style={{ border: "solid 5px green" }}
        //  breakpoint="lg"
        // collapsedWidth="0"
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)} /// recolher menu sem nome
        width={220}
        collapsedWidth={80}
      >
        <div style={logoStyle}>
          <img src={logo} onClick={()=>(navigate("/"))} alt="Logo GPA" width="60" />
        </div>

          <Row
             style={{
              alignItems: "center",
              // margin: 8,
              marginBottom:10,
              padding: 0,
              // borderTop: "1px solid rgba(212, 204, 204, 0.1)",
              width: "100%",
              flexDirection: "column",
            }}
             >
              <Dropdown menu={menuProps}>
                {!collapsed ? (
                  <Space align="center" size="small" style={{ color: "rgba(212, 204, 204, 0.57)" }}>
                    <Avatar size="default" icon={<UserOutlined />} />
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        lineHeight: 1,
                      }}
                    >
                      <Title
                        level={1}
                        style={{ margin: 2, fontSize: 12, color: "rgba(212, 204, 204, 0.57)" }}
                      >
                        Alex Sandro Alves de Lima
                      </Title>
                      <span style={{ fontWeight: "bold" }}></span>
                      <span style={{ fontSize: 10 }}>TC021864</span>
                    </div>
                  </Space>
                ):(
                   <Avatar size="default" icon={<UserOutlined />} />
                )}
              </Dropdown>
            </Row>
    
        <Menu
          theme="dark"
          defaultSelectedKeys={["/dashboard"]}
          mode="inline"
          items={itemsMenu}
          onClick={(e) => handleSelect(e.key)}
          inlineCollapsed={collapsed}
        />
        <Row
          style={{
            position: "absolute",
            bottom: 50,
            width: "100%",
            padding: 8,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexDirection: "column",
            background: "#001529",
          }}
        >
          
          
          

          <Row
            style={{
              alignItems: "center",
              // margin: 8,
              padding: 0,
              borderTop: "1px solid rgba(212, 204, 204, 0.1)",
              width: "100%",
              flexDirection: "column",
            }}
          >
            <Button
              type="text"
              icon={<LogoutOutlined />}
              style={{ color: "#fff" }}
              // onClick={handleLogout}
              title="Sair do sistema"
            >
               {!collapsed && ( "Sair do sistema")}
            </Button>
          </Row>
        </Row>
      </Sider>

      <Layout>
        {/* <Header style={headerStyle}>
          <div>
            <Space align="center" size="small" style={{ color: "white" }}>
              <Avatar size="default" icon={<UserOutlined />} />
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  lineHeight: 1,
                }}
              >
                <span style={{ fontWeight: "bold" }}>Alex Lima</span>
                <span style={{ fontSize: 12 }}>Cad: TC021864</span>
              </div>
              <LogoutOutlined style={{ cursor: "pointer", color: "white" }} />
            </Space>
          </div>
        </Header> */}
        <Content style={ContentStyle}>
          <Outlet />
        </Content>
        {/* <Footer style={{ textAlign: "center" }}>
          GPA ©{new Date().getFullYear()} Created by TecdSistemas
        </Footer> */}
      </Layout>
    </Layout>
  );
};

export default AppProt;
