

export const meanArray = (ar1, ar2) => {
     return(
          ar1.map( (d,i) => (d+ar2[i])/2 )
     )
};
