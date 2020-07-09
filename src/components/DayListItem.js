import React from "react";
import classnames from 'classnames/bind';
import "components/DayListItem.scss";

export default function DayListItem(props) {
  const dayClass = classnames("day-list__item", {
    "day-list__item--selected": props.selected,
    "day-list__item--full": props.spots === 0
  });

  const formatSpots = (props) => {
    return (
      props.spots === 0 ? "no spots remaining" :
      props.spots === 1 ? "1 spot remaining": 
      `${props.spots} spots remaining`
    )
  }

  return (
    <li className={dayClass} onClick={props.setDay}>
      <h2 className="text--regular">{props.name}</h2>
      <h3 className="text--light">{formatSpots(props.spots)}</h3>
    </li>
  );
}