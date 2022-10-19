import React from 'react' ;

import { Plot } from './Plot'  ;
// datos
import {datos} from './datos' ;

const App = () => {
    
    return (
        <div>
            <h3>
                Tolerancia
            </h3>

            <Plot data={datos} />

        </div>
    );
}

export default App;
