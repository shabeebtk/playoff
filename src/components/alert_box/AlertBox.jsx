import React from 'react';

const AlertBox = (props) => {
  return (
    <div className="bg-red-100 border flex gap-10 border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
      <div className=''>
        <span className="block sm:inline">{props.error}</span>
      </div>

      <div>
      
      </div>
    </div>
  );
};

export default AlertBox;
