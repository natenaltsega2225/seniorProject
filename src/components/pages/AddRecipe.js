import React, { useState,useEffect } from 'react';
import Navbar from './../Navbar';
import { getAuth, createUserWithEmailAndPassword} from 'firebase/auth'
import {
    collection,
    addDoc,
    serverTimestamp,
    doc,
    setDoc,
    updateDoc,
    deleteField 
  } from "firebase/firestore";
  import { getStorage, ref, uploadString, getDownloadURL } from "firebase/storage";
  import { db,storage } from '../../fireConfig';
import { async } from '@firebase/util';
import { Link, useNavigate,useLocation} from "react-router-dom";

export default function AddRecipe() {
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [ingredients, setIngredients] = useState([])
    const [ingredient, setIngredient] = useState('')
    const [prepAndCookTime, setPrepAndCookTime] = useState('')
    const [img, setImg] = useState('')
    const [category, setCategory] = useState('Beef')
    const [steps, setSteps] = useState([])
    const [step, setStep] = useState([])
    const [imageToPost, setImageToPost] = useState(null);
    const auth = getAuth();
    const location = useLocation();

    const handleSubmit= async()=>{
        let recipie = {
            title,
            description,
            ingredients,
            steps,
            prepAndCookTime,
            category,
            img,
            Uid:auth?.lastNotifiedUid,
            status:'pending'
        }
        console.log(recipie,auth.lastNotifiedUid)
        try {
            if(location?.state?.id){
                const docRef = doc(db, "recipe", location?.state?.id);
                updateDoc(docRef, recipie)
                .then(docRef => {
                    alert("Your recipe is updated successfully");
                    if(docRef?.id){
                        setImageToPost(null)
                        setStep([])
                        setSteps([])
                        setPrepAndCookTime('')
                        setIngredient('')
                        setIngredients([])
                        setDescription('')
                        setTitle('')
                    }
                })
                .catch(error => {
                    console.log(error);
                })   

            }else{
                if(auth?.lastNotifiedUid){
                    const docRef = await addDoc(collection(db, `recipe`),recipie);
                    console.log("Document written with ID: ", docRef.id);
                    alert('Recipe Added successfully')
                    if(docRef?.id){
                        setImageToPost(null)
                        setStep([])
                        setSteps([])
                        setPrepAndCookTime('')
                        setIngredient('')
                        setIngredients([])
                        setDescription('')
                        setTitle('')
                    }
                }else{
                    alert('login first then add recipe')
                }
            }
            } catch (e) {
                console.error("Error adding document: ", e);
            }
        }
    const handleClick = (value)=>{
       let arr = ingredients.filter(item => item !== value)
       setIngredients(arr)
    }
    const handleSteps = (value)=>{
       let arr = steps.filter(item => item !== value)
       setSteps(arr)
    }
    const addImageToPost =async  (e) => {
        const reader = new FileReader();
        if (e.target.files[0]) {
          reader.readAsDataURL(e.target.files[0]);
        }
        reader.onload = async(readerevent) => {
            // console.log(readerevent.target.result)
          setImageToPost(readerevent.target.result);

          const storageRef = ref(storage, `img/${Date.now()}`);
        //   console.log(storageRef)
  
          const uploadTask = await uploadString(storageRef, readerevent.target.result, 'data_url');
        //   console.log(uploadTask,'pp')
          const url = await getDownloadURL(uploadTask.ref);
          setImg(url)
          console.log(url,'oooooooo')

        };
      
      };
    
    useEffect(()=>{
        console.log('location?.state?.id',location?.state)
        if(location?.state?.id){
            console.log(location.state,'locations')
            setStep([])
            setSteps(location.state.steps)
            setPrepAndCookTime(location.state.prepAndCookTime)
            setIngredient('')
            setIngredients(location.state.ingredients)
            setDescription(location.state.description)
            setTitle(location.state.title)
            setCategory(location.state.category)
            setImageToPost(location.state.img)
            setImg(location.state.img)
        }
    },[])
    

    
  return (
    <div>
        <Navbar />
        <div className='add-form'>
        <h1 style={{marginTop:'200px'}}>Add new recipe</h1>
        <input type="text" placeholder="Title" value={title} onChange={(e) => { setTitle(e.target.value) }} />
        <input type="text" placeholder="Description" value={description} onChange={(e) => { setDescription(e.target.value) }} />
        <input type="text" placeholder="Prep and cook time " value={prepAndCookTime } onChange={(e) => { setPrepAndCookTime(e.target.value) }} />
        <select 
            style={{height:'50px',width:'100%'}}
            value={category} 
            onChange={(e)=>{
                setCategory(e.target.value)
            }} 
        >
            <option value="Beef">Beef</option>
            <option value="Dessert">Dessert</option>
            <option value="Vegan">Vegan</option>
            <option value="Breakfast">Breakfast</option>
            <option value="Breakfast">Lamb</option>
            <option value="Breakfast">Chicken</option>
        </select>

        <div>
            <img src={imageToPost} height={10} width={10}/>
            <p>Select Image</p>
            <input type="file" name="myImage" onChange={addImageToPost} />
        </div>
        <input type="text" placeholder="Ingredients" value={ingredient} onChange={(e) => { 
            if(e.target.value !== ''){
                setIngredient(e.target.value)
            }
         }} 
             onKeyDown={(e) => {
                if (e.keyCode === 13) {
                    let arr = ingredients
                    arr.push(ingredient)
                    console.log(arr)
                    setIngredients(arr)
                    setIngredient('')
                }
             } }
             />
          {ingredients.length > 0 && ingredients.map((data)=>{
            return<div>
                <span>{data}</span>
                <span 
                onClick={()=>handleClick(data)}
                    style={{
                        color:'red',
                        padding:'2px',
                        borderRadius:'50px',
                        margin:'5px',
                        cursor:'pointer'
                    }}
                    
                >x</span>
            </div>
          })}  
        <input type="text" placeholder="Steps" value={step} onChange={(e) => { 
            if(e.target.value !== ''){
                setStep(e.target.value)
            }
         }}
         onKeyDown={(e) => {
            if (e.keyCode === 13) {
                let arr = steps
                arr.push(step)
                console.log(arr)
                setSteps(arr)
                setStep('')
            }
         } }
          />
        {steps.length > 0 && steps.map((data)=>{
            return<div>
                <span>{data}</span>
                <span 
                onClick={()=>handleSteps(data)}
                    style={{
                        color:'red',
                        padding:'2px',
                        borderRadius:'50px',
                        margin:'5px',
                        cursor:'pointer'
                    }}
                    
                >x</span>
            </div>
          })}
        <button className='signup-button' onClick={(e) => {
            handleSubmit()
        }}>Submit</button>

    </div>
    </div>
  )
}
