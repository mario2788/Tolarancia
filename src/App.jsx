import React from 'react' ;

import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ReactKeycloakProvider, useKeycloak } from "@react-keycloak/web";
import keycloak from "./keycloak.js"
import PrivateRoute from "./helpers/PrivateRoute";

import styled from 'styled-components' ;

import { Plot } from './Plot'  ;
// datos
import {datos} from './datos' ;
import {meanArray} from './meanArray';

const BoxPlot = styled.div`
     width: 100%;
     border: 0.2rem solid rgb(120,120,240,90);
     border-radius:0.2rem;
     padding:0.5rem;
     background:rgb(10,150,220,0.15);
`;

const Box = styled.div`
     width:30% ;
     margin: 1rem;
     display: flex;
     flex-wrap: nowrap;
     flex-direction: column;
     align-items: center;
`;

const Grid = styled.div`
     display:flex;
     flex-wrap: nowrap;
     justify-content: space-around;
`;

const Page = ()=> {

     const Cell = ({label,data}) => {
          return(
               <Box>
                    <h2 align='center'>
                         {label}
                    </h2>
                    <BoxPlot>
                         <Plot data={data} />
                    </BoxPlot>
               </Box>
          )
     }

     return(
          <div>
               <h1 align='center'>
                    Tolerancia
               </h1>
               <Grid>
                    {
                         ['Cota externa pieza impresa','Cota interna pieza impresa'].map( (label, idx) =>
                              <Cell
                                   label={label}
                                   key={idx}
                                   data={{
                                        cad: !idx
                                                  ? datos.abs.ext.cad
                                                  : datos.abs.int.cad,
                                        med:meanArray(
                                             !idx
                                                  ? datos.abs.ext.xMed
                                                  : datos.abs.int.xMed,
                                             !idx
                                                  ? datos.abs.ext.yMed
                                                  : datos.abs.int.yMed
                                        )
                                   }}
                              />
                         )
                    }
                    {
                         // ['Eje Circular','Agujero Circular'].map( (label, idx) =>
                         //      <Cell
                         //           label={label}
                         //           key={idx}
                         //           data={{
                         //                cad: !idx ? datos.cir.ext.cad : datos.cir.int.cad,
                         //                med:meanArray( !idx ? datos.cir.ext.xMed : datos.cir.int.xMed,
                         //                     !idx ? datos.cir.ext.yMed : datos.cir.int.yMed)
                         //           }}
                         //      />
                         // )
                    }
                    {
                         // ['Rectángulo Cuerpo','Rectángulo Vaciado'].map( (label, idx) =>
                         //      <Cell
                         //           label={label}
                         //           key={idx}
                         //           data={{
                         //                cad: !idx ? datos.cua.ext.cad: datos.cua.int.cad,
                         //                med:meanArray( !idx ? datos.cua.ext.xMed : datos.cua.int.xMed,
                         //                     !idx ? datos.cua.ext.yMed : datos.cua.int.yMed)
                         //           }}
                         //      />
                         // )
                    }
               </Grid>
          </div>
     )
}

const Nav = () => {

     const { keycloak, initialized } = useKeycloak();

     console.log( keycloak.authenticated, initialized );

     return(
          <div >
               {
                    !keycloak.authenticated
                    &&
                    (
                         <button
                              type="button"
                              onClick={() => keycloak.login()}
                         >
                              Login
                         </button>
                    )
               }

               {
                    !!keycloak.authenticated
                    &&
                    (
                         <button
                              type="button"
                              onClick={() => keycloak.logout()}
                         >
                              Logout ({keycloak.tokenParsed.preferred_username})
                         </button>
                    )
               }
          </div>
     );
};


const App = () => {

     console.clear();

     return (
          <BrowserRouter>
               <Routes>
                    <Route
                         exact path="/home"
                         element={
                              <div>
                                   Welcome to my page
                              </div>
                         }
                    />
                    <Route
                         path="/"
                         element={
                              <Page/>
                         }
                    />
               </Routes>
          </BrowserRouter>
     );

     // return (
     //      <div >
     //           <ReactKeycloakProvider authClient={keycloak}>
     //
     //                <Nav/>
     //
     //                <PrivateRoute>
     //                     <Page/>
     //                </PrivateRoute>
     //
     //           </ReactKeycloakProvider>
     //      </div>
     // );
     // return (
     //      <div >
     //           <ReactKeycloakProvider authClient={keycloak}>
     //
     //                <Nav/>
     //
     //                <BrowserRouter>
     //                     <Routes>
     //                          <Route
     //                               exact path="/home"
     //                               element={
     //                                    <div>
     //                                         Welcome to my page
     //                                    </div>
     //                               }
     //                          />
     //                          <Route
     //                               path="/"
     //                               element={
     //                                    <PrivateRoute>
     //                                         <Page/>
     //                                    </PrivateRoute>
     //                               }
     //                          />
     //                     </Routes>
     //                </BrowserRouter>
     //           </ReactKeycloakProvider>
     //      </div>
     // );
}

export default App;
