import React, { useRef, useEffect } from 'react' ;
import * as d3 from 'd3' ;

const plot = (datos, svgSindro) => {

     const svgEl = d3.select(svgSindro.current);
     svgEl.selectAll("*").remove(); // Clear svg content before adding new elements

     const width = svgEl._groups[0][0].clientWidth  ;
     const height = svgEl._groups[0][0].clientHeight  ;

     const svg = svgEl.append("g")
          .attr("width", `${width}`)
          .attr("height",`${height}`)
          ;

     const margin = { right:10, top:5, left: 40, bottom: 17 } ;

     // Parametros del objeto
     const xScale = d3.scaleLinear()
                    .domain( [0, datos.cad.length] )
                    .range( [margin.left, width-margin.right] );

     const yScale = d3.scaleLinear()
                    .domain( d3.extent(datos.cad).reverse() )
                    .range( [margin.top, width-117] );

     const x_axis = d3.axisBottom()
                    .scale(xScale) ;

     const yAxis = d3.axisLeft()
                    .scale(yScale)
                    .tickSize(-width + margin.right + margin.left )
                    .ticks(5) ;

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
          // .call(g => g.selectAll("line") // .tick:not(:first-of-type)
          //      .attr("stroke-opacity", "0.3")
          // ) ;


     // Grafica : datos
     svg.append("path")
          .datum(datos.cad)
          .attr("fill", 'none')
          .attr("stroke", 'rgb(30,240,50,100)')
          .attr("stroke-width", '2')
          .attr("d", d3.line()
               .x( (d,i) => xScale(i) )
               .y( (d,i) => yScale(d) )
               .curve( d3.curveCatmullRom )
          );

     svg.append("path")
          .datum(datos.med)
          .attr("fill", 'none')
          .attr("stroke", 'rgb(240,50,50,100)')
          .attr("stroke-width", '2')
          .attr("d", d3.line()
               .x( (d,i) => xScale(i) )
               .y( (d,i) => yScale(d) )
               .curve( d3.curveCatmullRom )
          );
};

export const Plot = ({data}) => {


     const svgSindro = useRef(null);

     useEffect( ()=> {
          plot( data, svgSindro );
     },[data, svgSindro]);

     const styleSvg = {
          position: 'relative',
          bottom: '2rem',
          left: 'calc(30%)'
     };

     return(
          <svg ref={svgSindro} width={'600px'} height={'500px'}  style={styleSvg}/>
     );
};
