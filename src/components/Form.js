
import { useRef, useState } from 'react';
import style from './Form.module.css';
import { v4 } from 'uuid';
import {db, storage} from "./firebase";
import { collection, addDoc } from 'firebase/firestore';
import {ref, uploadBytes, getDownloadURL} from 'firebase/storage';

const Form  = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [picture, setPicture] = useState(null);
    const [uploadComplete, setUploadComplete] = useState(false);
    const [productPhoto, setProductPhoto] = useState('');
    
    const imageRef = useRef();
    

    
    let buttonDisable = true;
    const productCollectionRef = collection(db,"products");
    const uploadFile =  async() => {
        
       
        
        const imageRef =await ref(storage,`images/${picture.name + v4()}`);
        
        const upload = await uploadBytes(imageRef,picture);
        console.log(upload)
        const downloadURL = await getDownloadURL(upload.ref);

         setProductPhoto(downloadURL);
        
         setUploadComplete(true);
            
        
        
         

         
        
    }
   
    const imageChangeHandler = (event) => {
          setPicture(event.target.files[0]);
         
         
    }
    

    const imageUploadHandler =async () => {
        
        await uploadFile();
     
    
    }
    if(title && description && price && uploadComplete){
        
       buttonDisable = false;
       
    }
    
   
    

    const submitHandler = async (event) => {
        //event.preventDefault();
        if(picture == null) return;
         
        try{
            
            await addDoc(productCollectionRef, {
                title,
                description,
                price,
               photoURL: productPhoto,
            })
            setDescription("");
            setTitle("");
            setPrice("");
            imageRef.current.value = "";

        }catch (err) {
            console.error(err);
        }
        


    }
    return(
        <div className={style.formContainer}>
            <div className={style.form}>
                
                    <div>
                        <label htmlFor="title">Title</label>
                    </div>
                    <div>
                        <input id="title" value={title} type="text" onChange={ (e) => setTitle(e.target.value)}></input>
                    </div>
                    <div>
                        <label htmlFor="description">Description</label>
                    </div>
                    <div>
                        <textarea rows={4} cols={40} id="description" value={description} type="text"  onChange={ (e) => setDescription(e.target.value)}></textarea>
                    </div>
                    <div>
                        <label htmlFor="price">Price</label>
                    </div>
                    <div>
                        <input id="price" type="number" pattern="[0-9]*" value={price} onChange={ (e) => setPrice(e.target.value)}></input>
                    </div>
                    <div>
                        <label htmlFor="image">Image</label>
                    </div>
                    <div>
                        <input id="image" type="file" alt='product image' ref={imageRef}  onChange={imageChangeHandler}></input>
                        <button onClick={imageUploadHandler}>upload image</button>
                        <span>
                            {uploadComplete && <p>image upload done</p>}
                        </span>
                    </div>
                    <div>
                        <button disabled={buttonDisable} onClick={submitHandler}>Submit</button>
                    </div>
                
            </div>
        </div>
    )}
        
  export default Form;