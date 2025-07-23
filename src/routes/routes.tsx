
import { createBrowserRouter } from 'react-router-dom';
import PrivateRoute from './privateRoutes';
import App from '../App';
import ErrorPage from '../pages/Error.page';
import HomePage from '@/pages/DashBoard/HomePage';
import AppProt from '@/pages/AppPrincipal.page';
import Rede from '@/pages/Rede/Rede';
import Bandeira from '@/pages/Bandeira/Bandeira';
// import Finalizadora from '@/pages/Finalizadora/Finalizadora';
import Movimento from '@/pages/Movimento/Movimento';
import Teste from '@/pages/teste';
import DashBoard from '@/pages/DashBoard/DashBoard';
import Payment from '@/pages/Payment/Payment';
import Manutencao from '@/pages/manutencao.page';
import Analise from '@/pages/Analise/analise';
import Processamento from '@/pages/Processamento/processamento';
const router = createBrowserRouter([
  {
    // Rota principal
    path: "/",    element: (<PrivateRoute><AppProt/></PrivateRoute>),
    // path: "/",    element: (<PrivateRoute><AppProt1/></PrivateRoute>),
    //Rotas privadas
    children: [
        {        path: "0", element: ( <PrivateRoute tela='/painel/Monitoramento' role='Admin'><DashBoard/></PrivateRoute>),},   
        {        index: true, element: ( <PrivateRoute tela='/painel/Monitoramento' role='Admin'><HomePage/></PrivateRoute>),},    
        {        path: "1", element: ( <PrivateRoute tela='/painel/Monitoramento' role='Admin'><Analise/></PrivateRoute>),},    
        {        path: "2", element: ( <PrivateRoute tela='/painel/Monitoramento' role='Admin'><Rede/></PrivateRoute>),},    
        {        path: "3", element: ( <PrivateRoute tela='/painel/Monitoramento' role='Admin'><Bandeira/></PrivateRoute>),},    
        {        path: "4", element: ( <PrivateRoute tela='/painel/Monitoramento' role='Admin'><Processamento/></PrivateRoute>),},    
        {        path: "5", element: ( <PrivateRoute tela='/painel/Monitoramento' role='Admin'><Payment/></PrivateRoute>),},    
        {        path: "6", element: ( <PrivateRoute tela='/painel/Monitoramento' role='Admin'><Movimento/></PrivateRoute>),},    
      
        
     { path: '*', element: <ErrorPage />  }
    ],
    }, //Rota publica
    { path: 'login', element: <App />  },
    { path: '*', element: <ErrorPage />  },
    
]);
export default router;
