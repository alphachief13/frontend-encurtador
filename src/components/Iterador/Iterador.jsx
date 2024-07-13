import PropTypes from 'prop-types'
import './Iterador.css'

function Iterador({ lista, titulo }){
    return(
        <div>
            <h2 className='titulo'>{ titulo }</h2>
            <ul className='lista'>

                {lista.map((valor, index)=>(
                    <li className='item-lista' key={index}>{valor}</li>
                ))}
            
            </ul>


        </div>
    )   
}

Iterador.propTypes = {
    lista: PropTypes.array.isRequired,
    titulo: PropTypes.string.isRequired
}

export default Iterador;