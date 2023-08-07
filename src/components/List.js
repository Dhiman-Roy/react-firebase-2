import React, { useEffect, useState } from 'react'
import style from './List.module.css';
import {getDocs, collection} from 'firebase/firestore';
import { db } from './firebase';

export default function List() {
  const [productList, setProductList] = useState([]);
 const productRef = collection(db,"products");

  const getList = async () => {
    try{
      const data = await getDocs(productRef);
      const filteredData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      
      }));
      setProductList(filteredData);
    }catch (err){
      console.error(err);
    }
  }
  useEffect(() => {
    getList();
  },[productList])
   

    
   
  return (
    <div className={style.listContainer}>
    {productList.map((data) => (
      <div className={style.list}>
      <div className={style.imageContainer}>
        <img src={data.photoURL} alt='image' className={style.image}></img>
      </div>
    <div>
        <h2>{data.title}</h2>
        <p>{data.description}</p>
        <p>{data.price}</p>
    </div>
    </div>
    ))}
    
    </div>
    
  )
}
