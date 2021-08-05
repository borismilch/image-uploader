console.log('upload');
import {createGallery} from "./gallery.js"
function noop(){};
export function upload(selector, options ={}){
    console.log(options);
 const onUpload = options.onUpload ?? noop;
 let download =  document.createElement('button');
 download.classList.add('uploader-head__upload');
 download.classList.add('down')
 download.dataset.btn = 'ownload';
 download.textContent = 'watch gallery';
let gallery = document.createElement('div');
gallery.classList.add('gallery');
gallery.dataset.gallery = 'gallery'; 
 const viever = document.createElement('div');
 let $uploader = document.createElement('button');

 let $uploaderD = $uploader.style.display;
 $uploader.classList.add('uploader-head__upload');
 $uploader.dataset.btn = "upload"
 $uploader.textContent = 'Загрузить';
$uploader.style.display = 'none';
 viever.classList.add('spavn')
 viever.insertAdjacentHTML("afterbegin", `  <div class="spavn__title">Create your ovn gallery</div>
 <button class="spavn__btn" data-spavn>Click here</button>`);
 console.log(viever);
 const input = document.querySelector(selector);
 console.log(input)
 const open = document.createElement('button');
 const $window = document.getElementById('up');
 const $app = document.getElementById('app');
 open.classList.add('uploader-head__open')
 open.textContent = options.b1Text || 'Open';
if(options.multi) input.setAttribute('multiple', true)
input.insertAdjacentElement("afterend", $uploader);
input.parentNode.appendChild(download)
 input.insertAdjacentElement("afterend", open);
 $app.insertAdjacentElement('afterend', gallery)
 console.log(gallery);
 gallery.insertAdjacentElement('afterbegin', viever)
 $app.insertAdjacentElement('beforebegin', viever);
 console.log(viever)
 let l = $app.firstElementChild
 document.addEventListener('click', (e)=>{
    console.log(e.target)
     if(e.target.classList.contains('spavn__btn')){
        l.style.opacity = 1;
        l.style.visibility = 'visible'
     }
     if(e.target.dataset.body){
        l.style.opacity = 0;
        l.style.visibility = 'hidden';
        input.parentNode.parentNode.nextElementSibling.innerHTML = ''
     }
     if(e.target.classList.contains('gallery__overlay')){
        e.target.style.opacity = 0;
        e.target.style.visibility = 'hidden';
    }
 
 })




 if(options.accept && Array.isArray(options.accept)){
     input.setAttribute('accept', options.accept.join(','))
 }
 const changeHandler = event =>{
    
 if(event.target.files.lenght == 0) {return};

    const files = Array.from(event.target.files);
    const $output =  input.parentNode.parentNode.nextElementSibling
    for (let i = 0; i < files.length; i++) {
      let item =  document.createElement('div');
      item.classList.add('uploader-item');
     
      const reader = new FileReader();
      reader.onload = ev =>{
          console.log(ev);
        $output.insertAdjacentHTML("afterbegin", `<div class="uploader-item">
        <img src="${ev.target.result}" class="uploader-item__img" alt="">
        <div class="uploader-item__inform">
        <div class="uploader-item__delete"><span data-btn="delete">&times;<\span></div>
            <div class="uploader-item__footer">
                <span class="uploader-item__name">${files[i].name}</span>
                <span class="uploader-item__size">${kb(ev.loaded)} KB</span>
            </div>
        <div class="uploader-item__loading">
        <div class="uploader-item__loadbar" data-load></div>
        <span class="uploader-item__percent" data-percent>0%</span> 
     </div>

  </div>
    </div>`)
      }
      reader.readAsDataURL(files[i]);
     
    }
   
    let items;
    setTimeout (function(){
     items =  document.getElementById('space').querySelectorAll('.uploader-item');
    $uploader.addEventListener('click', arrload(items))
    }, 500)
   $window.addEventListener('click', (e)=>{
       
       if(e.target.dataset.btn == "upload"){
        loadItems(items,files);
        watchGallery(e.target, download);


       }
       if(e.target.dataset.btn == "delete"){
           let y = e.target.closest('.uploader-item');
           y.style.width = '0px';
           y.style.height = '0px';
        setTimeout(()=>{ y.remove();
          $window.querySelector('.uploader-item') == null ? $uploaderD = 'none' : $uploaderD = 'inline';
          console.log($window.querySelector('.uploader-item')) 
        }, 300)
       }
       if(e.target.dataset.btn == "ownload"){
        l.style.opacity = 0;
        l.style.visibility = 'hidden';
        $output.innerHTML = '';
        e.target.style.display = 'none';
        if(options.gallery){
            createGallery(items, gallery);
        }
    }
      
   })

   $output.innerHTML= '';
   $uploader.style.display = 'inline'
   console.log($output)
}
function arrload(arr){
    let delay = 0;
for (let i = 0; i < arr.length; i++) {
    const element = arr[i];
    delay += 3;
    element.querySelector('.uploader-item__img').classList.add('uploaded')
    element.querySelector('.uploader-item__img').style.animationDelay = delay/10 + 's';
}}
function loadItems(items, files){
    for (let i = 0; i < items.length; i++) {
        const element = items[i];
        element.classList.add('loading');
        const loadbar = element.querySelector('[data-load]');
        loadbar.style.animationDuration = files[i].size / 18000 + 's';
        onUpload(files, items)
     if  (loadbar.style.width == '100%') element.querySelector('[data-btn="delete"]').style.display = 'none';
        loadbar.addEventListener('transitionend', ()=>{
        setTimeout(()=> element.classList.add('fullyloaded'), 400)
        })
         
        }
    }
   

 


function kb(num){
    return Math.floor(num / 1000)
}
 open.addEventListener('click', ()=>{
     input.click();
 })
 input.addEventListener('change', changeHandler)
}
function watchGallery(elem, appended){
     appended.style.display = 'inline';
     elem.style.display = 'none'; 
    appended.setAttribute('disabled', 'disabled')
    }