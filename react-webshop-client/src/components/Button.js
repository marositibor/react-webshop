import React from "react";
import "./Button.css";

export default function Button(props) {
  let classNames = "button"
  if(!props.text) classNames+=' notext'
  if(!props.icon) classNames+=' noicon'
  if(props.disabled) classNames+=' disabled'
  
  return <div className={classNames} onClick={props.disabled ? undefined : props.onClick}>
      <div className="button-contents">
          <div className="button-icon">
            <i className={props.icon}></i>
          </div>
        <div className="button-spacer"></div>
        <div className="button-text">{props.text}</div>
      </div>
    </div>
}
