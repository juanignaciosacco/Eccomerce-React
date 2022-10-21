import { useContext } from "react"
import { Link } from "react-router-dom"
import { CartContext } from "../../contextos/CartContext"
import './cart.css'
import ItemCart from "../itemCart/ItemCart"

const Cart = () => {

    const {productosAgregados, precioTotal} = useContext(CartContext)

    return (
        <div>
            <h1>Carrito</h1>
            <div className="carrito">
                {productosAgregados.length !== 0 ? 
                (<div className="items">
                {productosAgregados.map((prod) => (
                    <ItemCart imgUrl={prod.img} nombreProd={prod.nombre} tipoAnimal={prod.tipoAnimal} stock={null} cantidad={prod.cantidad} precio={prod.precio} key={prod.id} id={prod.id} />   
                ))}
                </div>
                ):(
                    <div className="emptyCartText">
                        <h4>No tienes productos en el carrito</h4>
                        <Link to={'/'}><button>Ir a comprar</button></Link>
                    </div>
                ) }
                
                <div className="cartInfo">
                    <h3>Informacion Carrito</h3>
                    <p>Precio total: ${precioTotal}</p>
                    <button>Comprar</button>
                </div>
            </div>
        </div>
    )
}

export default Cart