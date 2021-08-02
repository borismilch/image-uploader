console.log('upload');
function noop(){};
export function upload(selector, options ={}){
    console.log(options);
 const onUpload = options.onUpload ?? noop   
 const input = document.querySelector(selector);
 const open = document.createElement('button');
 const $window = document.getElementById('up');
 open.classList.add('uploader-head__open')
 open.textContent = options.b1Text || 'Open';
if(options.multi) input.setAttribute('multiple', true)
 input.insertAdjacentElement("afterend", open);

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
    let $uploader = $output.parentNode.querySelector('[data-btn="upload"]')
    let items;
    setTimeout (function(){
     items =  document.getElementById('space').querySelectorAll('.uploader-item');
    
    console.log(items,$output, $uploader);
    items.lenght !== 0 ? $uploader.style.display = 'block' : $uploader.style.display = 'none'; 
    $uploader.addEventListener('click', arrload(items))
    }, 500)
   $window.addEventListener('click', (e)=>{
       e.preventDefault();
       if(e.target.dataset.btn == "upload"){
        loadItems(items,files);
       }
       if(e.target.dataset.btn == "delete"){
           let y = e.target.closest('.uploader-item');
           y.style.width = '0px';
           y.style.height = '0px';
         setTimeout( ()=> y.remove(), 300)
          
       }
       if(e.target.dataset.alert){
         let ale =  e.target.closest('.upload-alerts__item')
         ale.classList.remove('appear');
         setTimeout( ()=> ale.remove(), 0)
       }
   })

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
        loadbar.addEventListener('animationend', ()=>{
            
            
            
            const al = document.getElementById('alerts');
          al.insertAdjacentHTML("beforeend", alertLoading(files[i]));
          al.children ? al.classList.add('appear') : al.classList.remove('appear');
        })
         
        }
    }
   

 
function alertLoading(element){
    let template =`
    <div class="upload-alerts__item appeared">
          <span> Вашого кандидата під іменем <a href="">${element.name}</a>
            було успішно занесено до бази даних </span> 
            <a href="" class="croos"  data-alert="delete">&times;</a>
        </div>
    `
    return template
}

function kb(num){
    return Math.floor(num / 1000)
}
 open.addEventListener('click', ()=>{
     input.click()
 })
 input.addEventListener('change', changeHandler)
}