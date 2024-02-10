import React, { ReactNode } from 'react'
import classes from "./Button.module.css"


interface ButtonProps {
  onClick?: () => void
  children:ReactNode;
  type?:string;
}
const Button = (props:ButtonProps) => {
  return (
    <button onClick={props.onClick} className={classes.btn}>{props.children}</button>
  )
}

export default Button