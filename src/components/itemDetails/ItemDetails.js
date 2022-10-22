import { useParams, Link } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import './itemDetails.css';
import ItemCount from '../itemCount/ItemCount';
import { CartContext } from "../../contextos/CartContext";
import { getFirestore, getDoc, doc } from "firebase/firestore";

const ItemDetails = () => {

    const [producto, setProducto] = useState({})
    const [contador, setContador] = useState(0)
    const {id} = useParams()
    const {addItemToCartList} = useContext(CartContext)

    useEffect(() => {
        const db = getFirestore()
        const itemFromId = doc(db, 'items', id)
        getDoc(itemFromId).then((snapshot) => setProducto({id: snapshot.id, ...snapshot.data()}))
    },[id])

    const addCounterState = (ev) => {
        setContador(ev)
    }

    const buttonClickHandler = () => {
        const productoACarrito = {...producto, cantidad:contador}
        addItemToCartList(productoACarrito)
    }

    return (
        <div className="itemsDetails">
            <div className="imgDetails">
            <img src={producto.img} alt='Imagen Producto' />
            </div>
            <div className="infoDetails">
                <h3>{producto.nombre}</h3>
                <p>{producto.tipoAnimal}</p>
                <p>{producto.descripcion}</p>
                <p>Stock: {producto.stock}</p>
                <p>${producto.precio}</p>
                <p>Cantidad seleccionada: {contador}</p>
                {contador === 0 ? <ItemCount stock={producto.stock} onAdd={addCounterState}/> : <Link to={'/Cart'}><button onClick={buttonClickHandler}>Finalizar compra</button></Link>}
            </div>
        </div>
        )
}

export default ItemDetails