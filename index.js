import firebase from 'firebase/app';
import 'firebase/storage';
import {upload} from './sourse/uploader.js';
import {gallery} from './sourse/gallery.js';
import './sourse/style.scss';

const firebaseConfig = {
    apiKey: "AIzaSyAp1VlrXALfUN8hCcevlzLuFgks9wzrAzA",
    authDomain: "image-uploader-aad7e.firebaseapp.com",
    projectId: "image-uploader-aad7e",
    storageBucket: "image-uploader-aad7e.appspot.com",
    messagingSenderId: "596602540208",
    appId: "1:596602540208:web:e3a3dd2631b3959126ab75"
  }
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();
console.log(storage)

upload('#input', {
    multi : true,
    b1Text : 'opening',
    b2Text : 'uploading',
    accept : ['.png', '.jpeg', '.jpg', '.psd'],
    onUpload(files, blocks){
        files.forEach((file, index) =>{
            const ref = storage.ref(`images/${file.name}`)
           const task =  ref.put(file);

           task.on('STATE_CHANGED', snapshot =>{
            const percentage = Math.floor(snapshot.bytesTransferred / snapshot.totalBytes * 100) + '%';
          const block =  blocks[index].querySelector('[data-percent]');
           block.textContent = percentage;
          blocks[index].querySelector('[data-load]').style.width = percentage;
           }, error=>{
            console.log('error')
           }, () =>{
               if(task.snapshot.bytesTransferred == task.snapshot.totalBytes)
              task.snapshot.ref.getDownloadURL().then(url =>{
                console.log(document.querySelector('[data-btn="ownload"]').disabled);
                document.querySelector('[data-btn="ownload"]').disabled = false 
              
                
              })
           })
        })
    }

})

