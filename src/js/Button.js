import React from 'react';

const Button = (props) => {
  return (
    <button type={props.type} name={props.name} className={props.class}>
      {props.text} {/*text on button*/}
    </button>
  );
};

export default Button;
