import { BaseLayout } from "@/components/layout/BaseLayout";
import { PageActions } from "@/components/layout/PageActions";
import { SectionCard } from "@/components/ui/SectionCard";
import { Form,  message,} from "antd";
import { useState } from "react";

import ModalBase from "@/components/ui/ModalBase";
import { BandeiraForm } from "@/components/form/BandeiraForm";
import { BandeiraStore } from "@/store/useStore";
import BandeiraList from "./BandeiraList";
import { IBandeira } from "@/types/Bandeira";
const Bandeira = () => {
  const [form] = Form.useForm();
  const [openNew, setOpenNew] = useState(false);
  const { addBandeiras } = BandeiraStore();
  
  const handleSave = (values: IBandeira) => {
    setOpenNew(false);
    addBandeiras(values);
    form.resetFields();
  };

  return (
    <>
      <BaseLayout
        versao="V 1.6.0"
        title="Cadastro de Bandeira"
        subTitle="Aqui você pode cadastrar, visualizar e editar as bandeiras utilizadas nas finalizadoras."
        breadcrumb={["Cadastro", "Bandeira"]}
        actions={
          <PageActions
            createText="Nova Bandeira"
            onCreate={() => setOpenNew(true)}
          />
        }
        children={ <BandeiraList />}
      />
     
      <ModalBase
        onCancel={() => setOpenNew(false)}
        open={openNew}
        children={<BandeiraForm title="Cadastro" onSubmit={(e) => handleSave(e)} />}
      />
    </>
  );
};

export default Bandeira;
