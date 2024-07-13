import { useState } from 'react'
import PropTypes from 'prop-types'

function Contador({ valor_inicial }){
    const [contador, setContador] = useState(valor_inicial);
    
    return(
        <div>
            <h1>Contador: { contador } </h1>
            <button onClick={()=>{setContador(contador+1)}}>+1</button>
        </div>
    )
}

Contador.propTypes = {
    valor_inicial : PropTypes.number,
}

Contador.defaultProps = {
    valor_inicial: 0,
}

export default Contador;