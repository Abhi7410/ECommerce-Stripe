import React from 'react';
import { Link } from 'react-router-dom';

const Success = () => {
  return (
    <div>
      <h1>Transaction Successful</h1>
      <p>Thank you for your purchase!</p>
      {/* You can add more details or links to other pages */}
      {/* back to store button  */}

      <Link to='/store'>
        <button className='btn btn-block'>Back to Store</button>
      </Link>
    </div>
  );
};

export default Success;
