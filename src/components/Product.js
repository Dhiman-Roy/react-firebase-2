import React from 'react';
import style from './Product.module.css';

export default function Product(props) {
  return (
    <div>
        <div className={style.list}>
      <div className={style.imageContainer}>
        <img src={props.photoURL} alt='image' className={style.image}></img>
      </div>
    <div>
        <h2>{props.title}</h2>
        <p>{props.description}</p>
        <p>{props.price}</p>
    </div>
    </div>
    </div>
  )
}
