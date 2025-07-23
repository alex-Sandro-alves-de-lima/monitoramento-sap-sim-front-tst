import { BaseLayout } from "@/components/layout/BaseLayout";
import { PageActions } from "@/components/layout/PageActions";
import { SectionCard } from "@/components/ui/SectionCard";
import { Form,  message,} from "antd";
import { useState } from "react";
import { IRede } from "@/types/Rede";
import ModalBase from "@/components/ui/ModalBase";
import { RedeForm } from "@/components/form/RedeForm";
import { redeStore } from "@/store/useStore";
import RedeList from "./RedeList";
const Rede = () => {
  const [form] = Form.useForm();
  const [openNew, setOpenNew] = useState(false);
  const { addRedes } = redeStore();
  
  const handleSave = (values: IRede) => {
  
    setOpenNew(false);
    addRedes(values);
    form.resetFields();
  };

  return (
    <>
      <BaseLayout
        versao="V 1.6.0" 
        title="Cadastro de Rede"
        breadcrumb={["Cadastro", "Rede"]}
        subTitle="Aqui você pode cadastrar, visualizar e editar as redes utilizadas nas finalizadoras."
        actions={
          <PageActions
            createText="Nova Rede"
            onCreate={() => setOpenNew(true)}
          />
        }
      >
      <RedeList />
      </BaseLayout>
      {/*Modal base da tela */}
      <ModalBase
        onCancel={() => setOpenNew(false)}
        open={openNew}
        children={<RedeForm title="Cadastro" onSubmit={(e) => handleSave(e)} />}
      />
    </>
  );
};

export default Rede;
