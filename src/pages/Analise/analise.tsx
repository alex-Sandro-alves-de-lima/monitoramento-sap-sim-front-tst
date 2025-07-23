import { BaseLayout } from "@/components/layout/BaseLayout";
import { PageActions } from "@/components/layout/PageActions";
import React from "react";
import AnaliseList from "./analiseList";

const Analise = () => {
  return (
    <div>
      <BaseLayout
        
        title="Análise de registros"
        subTitle="Esta tela permite consultar e acompanhar as movimentações operacionais das lojas que foram processadas ou estão pendentes de integração com o SAP."
        breadcrumb={["Análise", "Registros."]}
        // actions={<PageActions onExcel={() => alert("Baixar Excel...")} />}
        children={
            <AnaliseList/>
        }
      />
    </div>
  );
};

export default Analise;
