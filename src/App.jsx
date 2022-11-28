import React from 'react' ;

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

const App = () => {

     console.clear();

     const Cell = ({label,data}) => {
          return(
               <Box>
                    <p align='center'>
                         {label}
                    </p>
                    <BoxPlot>
                         <Plot data={data} />
                    </BoxPlot>
               </Box>
          )
     }
     return (
          <div >
               <h1 align='center'>
                    Tolerancia
               </h1>
               <Grid>
                    {
                         ['Circulos - Externos','Circulos - Internos'].map( (label, idx) =>
                              <Cell
                                   label={label}
                                   key={idx}
                                   data={{
                                        cad: !idx ? datos.cir.ext.cad : datos.cir.int.cad,
                                        med:meanArray( !idx ? datos.cir.ext.xMed : datos.cir.int.xMed,
                                             !idx ? datos.cir.ext.yMed : datos.cir.int.yMed)
                                   }}
                              />
                         )
                    }
                    {
                         ['Rectangulos - Externos','Rectangulos - Internos'].map( (label, idx) =>
                              <Cell
                                   label={label}
                                   key={idx}
                                   data={{
                                        cad: !idx ? datos.cua.ext.cad: datos.cua.int.cad,
                                        med:meanArray( !idx ? datos.cua.ext.xMed : datos.cua.int.xMed,
                                             !idx ? datos.cua.ext.yMed : datos.cua.int.yMed)
                                   }}
                              />
                         )
                    }
               </Grid>
          </div>
     );
}

export default App;
