import React from 'react';
import { Link } from 'react-router-dom';

const Cancel = () => {
    return (
        <div>
            <h1>Transaction Canceled</h1>
            <p>Your purchase has been canceled.</p>
            {/* You can provide instructions or links to guide the user */}
            {/* retry trancation , and go to cart  */}

            <Link to='/cart'>
                <button className='btn btn-block '>Back to Cart</button>
            </Link>
        </div>
    );
};

export default Cancel;
