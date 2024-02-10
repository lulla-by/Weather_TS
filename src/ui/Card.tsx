import classes from './Card.module.css';
import { ChildrenProps } from 'components/types/types';

const Card = (props: ChildrenProps) => {
  return <div className={classes.card}>{props.children}</div>;
};

export default Card;
