import { ChildrenProps } from "components/types/types"
import classes from "./Layout.module.css"

const Layout = (props:ChildrenProps) => {
  return (
    <div className={classes.container}>{props.children}</div>
  )
}

export default Layout