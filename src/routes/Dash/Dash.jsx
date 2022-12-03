import React, {  } from 'react'
import { useEffect } from 'react'
import {addDoc,collection, serverTimestamp} from 'firebase/firestore'
import { useState } from 'react'
import "./dash.scss"
import {  db } from '../../Utils/config';
import { useNavigate } from 'react-router-dom'
// import { AuthContext } from '../../Context/Authcontext'
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage'
const storage = getStorage();
const Dash = () => {
     const [file, setfile] = useState(null)
  const [Project, setProject] = useState({
    title:"",
    link:"",

    category:""
  })
  const [progress, setProgress] = useState(false)
  // const [loading, setLoading] = useState(false)
  // const {currentUser} = useContext(AuthContext);
  //  const user = currentUser;
   useEffect(() => {
     const check = () => {
       if (Project.title === "" || Project.link === ""  || Project.category === "" || Project.file==null) {
     
         setProgress(true)
        
       }
      
       else{
         setProgress(false)
      }
     }
   
   return check();
    
   }, [Project.title,Project.link ,Project.category,Project.file,])
  const [load, setload] = useState(false)
  useEffect(() => {
    
    const uploadFile = () => {

        
 
      const storageRef = ref(storage, `Projectimages/${file.name}`);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on('state_changed', 
      (snapshot) => {
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        window.alert('Upload is ' + progress + '% done');
        if (progress <99 ||  0) {
          console.log("<than");
          setProgress(true)
      }
      else {
       
           setProgress(false)
          
      }
        switch (snapshot.state) {
          case 'paused':
            console.log('Upload is paused');
            break;
          case 'running':
            console.log('Upload is running');
            break;
            default :
            break
        }
      }, 
      (error) => {
        // Handle unsuccessful uploads
        window.alert("error with image uplad")
        setProgress(true)
      }, 
      () => {
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        getDownloadURL(uploadTask.snapshot.ref).then( async(downloadURL) => {
          console.log('File available at', downloadURL);
          setProject((p) => ({...p, imgUrl:downloadURL}))
  
        });
      }
    );
      }
 
      file && uploadFile()
  }, [file])

  const navigate = useNavigate();
  const handleForm = (e) => {
    setProject({...Project, [e.target.name]:e.target.value})
  
  }
  const handleFile  =(e) => {
   
    setfile(e.target.files[0])

  
  }
const handleSubmit = async (e) => {
  e.preventDefault()
  setload(true)
   try{
    
      // setLoading(true)
    
     await addDoc(collection(db, "projects"), {
       ...Project,
     
       timeStamp:serverTimestamp(),
      })
        window.alert("Project Created")
      
    navigate("/")
    
    
   }
   catch (e) {
    setload(false)
     window.alert(e)
   }
}
  return (
    <div className='dash__contain'>

    <form onSubmit={handleSubmit} className="form1">
    {
            load && 
            <div className="contts">
            <div className="progress-bar">
            <div className="circle1 border">
            </div>
            </div>
            
          </div>
            }
      <input onChange={handleForm} placeholder="Enter Link to Project" type="text" name='link'/>

      <input onChange={handleForm} type="text" placeholder="Enter Title of Text" name='title' />
      <input onChange={handleForm} type="text" placeholder="Enter Category of Text{Web-Design,Graphic-App,Mobile-App,}" name='category' />
      <label  htmlFor="img"> Add Image</label>
      <input onChange={handleFile} style={{display:"none"}} className='img' type="file" name='img' id='img'/>
      <button  style={ progress ? {cursor:'not-allowed' ,backgroundColor:"grey", color: 'white', fontSize:"10px", padding:"0.7rem 0"} : {} }    type='submit'>Submit Project</button>
      </form>
    
    </div>
  
  )
}

export default Dash