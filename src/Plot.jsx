import React, { useRef, useEffect, useState } from 'react' ;
import * as d3 from 'd3' ;
import styled from 'styled-components' ;

const plot = (datos, svgSindro) => {

     const svgEl = d3.select(svgSindro.current);
     svgEl.selectAll("*").remove(); // Clear svg content before adding new elements

     const width = svgEl._groups[0][0].clientWidth  ;
     const height = svgEl._groups[0][0].clientHeight  ;

     console.log( height, width );

     const svg = svgEl.append("g")
          .attr("width", `${width}`)
          .attr("height",`${height}`);

     const margin = { left: 25,  top:20, right:20, bottom:20 } ;

     const errorAbs = datos.cad.map( (item,idx) => {
          return(
               Math.abs(item- datos.med[idx])/item*100
          )
     }) ;

     // Parametros del objeto
     const xScale = d3.scaleLinear()
                    .domain( d3.extent(datos.cad) )
                    .range( [margin.left, width-margin.right] );

     const yScale = d3.scaleLinear()
                    .domain( d3.extent(errorAbs) )
                    .range( [height-margin.top, margin.bottom] );

     const x_axis = d3.axisBottom()
                    .scale(xScale)
                    .ticks(10) ;

     const yAxis = d3.axisLeft()
                    .scale(yScale)
                    .tickSize(-width + margin.right + margin.left )
                    .ticks(10) ;

     // Insercion del eje x
     svg.append("g")
          .attr("transform", `translate(0, ${height-margin.bottom})`)
          .call(x_axis)
          .attr("color", 'black' )
          .attr('opacity','0.85')

     // Insercion del eje y
     svg.append("g")
          .attr("transform", `translate(${margin.left} ,0)`)
          .call(yAxis)
          .attr("color", 'black' )
          .attr('opacity','0.85')
          // .call(g => g.select(".domain") // Quita la primera linea continua y la linea vertical continua
          //      .remove()
          // )
          .call(g => g.selectAll("line") // .tick:not(:first-of-type)
               .attr("stroke-opacity", "0.3")
          ) ;


     // Grafica : datos
     svg.append("path")
          .datum(errorAbs)
          .attr("fill", 'none')
          .attr("stroke", 'rgb(30,240,50,100)')
          .attr("stroke-width", '2')
          .attr("d", d3.line()
               .x( (d,i) => xScale(datos.cad[i]) )
               .y( (d,i) => yScale(d) )
               .curve( d3.curveCatmullRom )
          );

     svg.selectAll('circle')
          .data(errorAbs)
          .enter()
          .append('circle')
          .attr('cx', (d,i) => xScale(datos.cad[i]))
          .attr('cy', (d,i) => yScale(d) )
          .attr('r',5)
          .attr('fill', 'rgb(12,240,90,1)')


};

const Field = styled.div`
     margin-block: 0.5rem
`;
const Label = styled.span`
     margin-right:0.5rem
`;

const CalcTolerancia = ({data, diametro='true'}) => {

     const errorAbs = data.cad.map( (item,idx) => {
          return(
               Math.abs(item- data.med[idx])/item*100
          )
     }) ;

     const scale = d3.scalePow()//d3.scaleSqrt()
                    .domain( errorAbs )
                    .range( data.cad );

     const [cota, setCota] = useState( data.cad[1] ) ;

     const handleChange = (e) => {
          e.preventDefault();
          setCota( e.target.value );
     };

     return(
          <div style={{paddingLeft:'1rem',paddingTop:'1rem'}}>
               <Field>
                    <Label> Cota a corregir: </Label>
                    <input value={cota} size={5} onChange={ e => handleChange(e)} style={{textAlign:'center'}}/>
               </Field>

               <Field>
                    <Label> Error Relativo: </Label>
                    { scale.invert(cota).toFixed(3) }

               </Field>
               <Field>
                    <Label> Cota corregida: </Label>
                     { ( (1 + scale.invert(cota)/100 )*cota).toFixed(2) }
               </Field>

               <Field>
                    <Label> Diferencia : </Label>
                     { Math.abs( cota - (1 + scale.invert(cota)/100 )*cota ).toFixed(2) }
               </Field>
          </div>
     )
}


export const Plot = ({data}) => {

     const svgSindro = useRef(null);

     useEffect( () => {
          plot( data, svgSindro );
     },[data, svgSindro]);


     return(
          <>
               <svg ref={svgSindro} width={'100%'} height={'26rem'}/>
               <CalcTolerancia data={data} />
          </>
     );
};
