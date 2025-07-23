import { BaseLayout } from "@/components/layout/BaseLayout";
import ModalBase from "@/components/ui/ModalBase";
import { SectionCard } from "@/components/ui/SectionCard";
import { useEffect, useState } from "react";
import { PageActions } from "@/components/layout/PageActions";
import DashBoardList from "./DashBoardList";
import DashBoardCard from "./DashBoardCard";



const DashBoard = () => {
  return (
    <>
      <BaseLayout
        title={"Relatórios"}
        breadcrumb={["DashBoard", "Relatórios"]}
        versao="V 1.6.0"
        subTitle="Nesta visualizar os status de integrações e analise atraves de graficos."
      >
        <a href="" style={{color: "red"}}>ESTA TELA AINDA ESTA EM DEFINIÇÃO</a>
        <DashBoardList   />        

      </BaseLayout>
    </>
  );
};

export default DashBoard;
