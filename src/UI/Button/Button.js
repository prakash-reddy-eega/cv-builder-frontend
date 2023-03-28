import React from 'react';

import classes from './Button.module.css';

const Button = (props) => {
  const disabled = props.formValid? false: true
  const classesname = !disabled? `${classes.button} ${props.className}`: classes.disabled

  return (
    <button
      type={props.type || 'button'}
      onClick={props.onClick}
      disabled={disabled}
      className={classesname}
    >
      {props.children}
    </button>
  );
};

export default Button;