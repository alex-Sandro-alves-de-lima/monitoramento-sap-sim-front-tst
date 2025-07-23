import { useEffect, useState } from "react";
import {
  Button,
  Checkbox,
  Divider,
  Form,
  Input,
  Select,
  Space,
} from "antd";
import {
  BarcodeOutlined,
  SaveOutlined,
  TagsOutlined,
} from "@ant-design/icons";
import { StandardDescriptionsForm } from "../ui/StandardDescriptions";
import { IRede } from "@/types/Rede";

const { Option } = Select;

export interface IRedeFormValues {
  idRede: string;
  descricao: string;
  listBandeira: IListBandeiraFormValues[];
  migrado?: boolean;
  cancelamento?: string;
}

export interface IListBandeiraFormValues {
  idBandeira: string;
  descricaoBandeira: string;
  date_create?: string;
  date_update?: string;
}

interface RedeFormProps {
  initialValues?: IRede | null;
  onSubmit: (values: IRede) => void;
  title: string;
  loading?: boolean;
}

export const RedeForm = ({
  title,
  initialValues,
  onSubmit,
  loading,
}: RedeFormProps) => {
  const [form] = Form.useForm<IRedeFormValues>();
  const [migrado, setMigrado] = useState<boolean>(initialValues?.migrado || false);

  useEffect(() => {
    form.setFieldsValue({ migrado });
  }, [migrado]);

  const handleFinish = (values: IRedeFormValues) => {
    onSubmit({
      ...values,
      date_create: initialValues?.date_create,
      date_update: initialValues?.date_update,
    } as IRede);
  };

  const handleMigradoChange = (e: any) => {
    const isChecked = e.target.checked;
    setMigrado(isChecked);
    form.setFieldsValue({ cancelamento: undefined }); 
  };

  return (
    <Form
      form={form}
      layout="inline"
      initialValues={{
        ...initialValues,
        migrado: initialValues?.migrado || false,
      }}
      onFinish={handleFinish}
      variant="underlined"
    >
      <Divider orientation="left">{title || "Cadastro de rede"}</Divider>

      <StandardDescriptionsForm
        data={[
          {
            label: (
              <>
                <BarcodeOutlined style={{ marginRight: 8 }} />
                Código de rede
              </>
            ),
            children: (
              <Form.Item
                name="idRede"
                rules={[
                  { required: true, message: "Informe o código da rede" },
                  {
                    pattern: /^\d{3}$/,
                    message: "O código deve conter exatamente 3 números",
                  },
                ]}
              >
                <Input allowClear disabled={!!initialValues?.idRede} />
              </Form.Item>
            ),
          },
          {
            label: (
              <>
                <TagsOutlined style={{ marginRight: 8 }} />
                Descrição
              </>
            ),
            children: (
              <Form.Item name="descricao" rules={[{ required: true }]}>
                <Input allowClear />
              </Form.Item>
            ),
          }
        ]}
        column={1}
      />
      <StandardDescriptionsForm
      title="Operação de migração PSI"
    
      data={[ {
            label: "Rede já foi migrada?",
            children: (
              <Form.Item  name="migrado" valuePropName="checked" noStyle>
                <Checkbox  onChange={handleMigradoChange} />
              </Form.Item>
            ),
          },
          {
            label: "Tipo de Cancelamento",
            children: (
              <Form.Item name="cancelamento" rules={[{ required: true }]}>
                <Select placeholder="Selecione uma opção">
                  {migrado ? (
                    <Option value="parcial">Cancelamento parcial</Option>
                  ) : (
                    <>
                      <Option value="total">Cancelamento total</Option>
                      <Option value="nao_trata">Não trata parcelamento</Option>
                    </>
                  )}
                </Select>
              </Form.Item>
            ),
          },]}
      column={1}
      />

      <Form.Item style={{ width: "100%" }}>
        <Space
          style={{
            display: "flex",
            justifyContent: "flex-end",
            width: "100%",
          }}
        >
          <Button
            type="primary"
            htmlType="submit"
            icon={<SaveOutlined />}
            loading={loading}
          >
            Salvar
          </Button>
          {!initialValues?.idRede && (
            <Button onClick={() => form.resetFields()}>Limpar</Button>
          )}
        </Space>
      </Form.Item>
    </Form>
  );
};
