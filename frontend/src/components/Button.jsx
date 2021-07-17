import React from 'react';

import classNames from 'classnames';

function Button({ className, outline, circle, children, onClick, type, style }) {
  return (
    <button
      style={style}
      type={type}
      onClick={onClick}
      className={classNames('button', className, {
        'button--outline': outline,
        'button--circle': circle,
      })}>
      {children}
    </button>
  );
}

export default Button;
