
import { useRef, useState } from 'react';
import style from './Form.module.css';
import { v4 } from 'uuid';
import {db, storage} from "./firebase";
import { collection, addDoc } from 'firebase/firestore';
import {ref, uploadBytes, getDownloadURL} from 'firebase/storage';

const Form  = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState();
    const [picture, setPicture] = useState(null);
    const imageRef = useRef();
    

    let photo = "";
    const productCollectionRef = collection(db,"products");
    const uploadFile = async () => {
        
        const imageRef =await ref(storage,`images/${picture.name + v4()}`);
        
        const upload = await uploadBytes(imageRef,picture);
        const downloadURL = (await getDownloadURL(upload.ref)).toString();
        
         photo = downloadURL;
         await console.log(photo)
         

         
        
    }
    

    const submitHandler = async (event) => {
        //event.preventDefault();
        if(picture == null) return;
        await uploadFile();
        try{
            
            await addDoc(productCollectionRef, {
                title,
                description,
                price,
               photoURL: photo,
            })
            setDescription("");
            setTitle("");
            setPrice();
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
                        <input id="price" type="number" value={price} onChange={ (e) => setPrice(Number(e.target.value))}></input>
                    </div>
                    <div>
                        <label htmlFor="image">Image</label>
                    </div>
                    <div>
                        <input id="image" type="file" alt='product image' ref={imageRef}  onChange={ (e) => setPicture(e.target.files[0])}></input>
                    </div>
                    <div>
                        <button onClick={submitHandler}>Submit</button>
                    </div>
                
            </div>
        </div>
    )
}
 export default Form;