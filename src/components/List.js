import React, { useEffect, useState } from 'react'
import style from './List.module.css';
import {getDocs, collection} from 'firebase/firestore';
import { db } from './firebase';
import Product from './Product';

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
    
  },[])
  
    
   
  return (
    <div className={style.listContainer}>
    {productList.map((data) => (
      <Product title={data.title} description={data.description} photoURL={data.photoURL} price={data.price} key={data.id} id={data.id} />
    ))}
    
    </div>
    
  )
}
