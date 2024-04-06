import React from 'react';

function Error() {
  const goBack = () => {
    window.history.back();
  };

  return (
    <div id='error' style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
      <h1 className="notFoundTitle">Oops! That page can’t be found.</h1>
      <p className="notFoundDesc">
        It looks like nothing was found at this location.
        Please click  <a  href="#" onClick={goBack} size='sm'>Back</a>  to go to the previous page.
      </p>
    </div>
  );
}

export default Error;
