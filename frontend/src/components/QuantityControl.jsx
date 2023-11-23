import React, { useState } from 'react';

const QuantityControl = ({ initialQuantity, onQuantityChange }) => {
    const [quantity, setQuantity] = useState(initialQuantity);

    const handleIncrement = () => {
        setQuantity(quantity + 1);
        onQuantityChange(quantity + 1);
    };

    const handleDecrement = () => {
        if (quantity > 0) {
            setQuantity(quantity - 1);
            onQuantityChange(quantity - 1);
        }
    };

    return (
        <div className="quantity-control" styles={styles.quantityControl}>
            <button className='btn' onClick={handleDecrement}>-</button>
            <span>{quantity}</span>
            <button className='btn' onClick={handleIncrement}>+</button>
        </div>
    );
};

const styles = {
    quantityControl: {
        // display: 'flex',
        // alignItems: 'center',
        // justifyContent: 'center',
        // width: '100px',
        // height: '30px',
        padding: '0px',
        marginLeft: '0px',
        border: '1px solid #ccc',
        borderRadius: '5px',
    },
}
export default QuantityControl;
