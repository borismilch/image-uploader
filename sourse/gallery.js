
export function createGallery(items, gallery){
  const gcotnainer = document.createElement('div');
  gcotnainer.classList.add('gallery__overlay');
  gallery.insertAdjacentElement('afterend', gcotnainer)  
  gallery.dataset.overlay = 'black'
  const controlls = document.createElement('div');
  controlls.classList.add('controlls');
  let index = 0;
 
 
  console.log(index)
  controlls.insertAdjacentHTML("afterbegin", `
  <div class="controlls__prev"><img  id="prev" src="https://cdn0.iconfinder.com/data/icons/navigation-set-arrows-part-one/32/ChevronLeft-512.png" alt=""></div>
  <div class="controlls__next"><img  id="next" src="https://cdn0.iconfinder.com/data/icons/navigation-set-arrows-part-one/32/ChevronRight-512.png" alt=""></div>`);
  gcotnainer.insertAdjacentElement("afterbegin", controlls) 
    for (let i = 0; i < items.length; i++) {
        const element = items[i];
        gallery.insertAdjacentHTML("afterbegin", createTemplate(element, i));
        let img = document.createElement('img');
        img.setAttribute('src', element.querySelector('img').getAttribute('src'));
        img.dataset.id = i;
        img.style.position = 'absolute';
        img.classList.add('gallery__picture');
        gcotnainer.appendChild(img)
      
    }
    gcotnainer.addEventListener('click', (e)=>{
      let current =  gcotnainer.querySelectorAll('[data-id]')
      if(e.target.getAttribute('id') == "prev" ){
      index--;
      if(index < 0) index = items.length - 1;
     
      console.log(index)
      current.forEach(item => item.classList.remove('active'));
      current[index].classList.add('active')
    }
    if(e.target.getAttribute('id') == "next"){
      index++;
      if(index < 0) index = items.length -1;
      if(index > items.length -1 ) index = 0;
     
      current.forEach(item => item.classList.remove('active'));
      current[index].classList.add('active')
     
    } 
    } )

    gallery.addEventListener('click', (e)=>{
        console.log(e.target)
      if(e.target.dataset.btn == 'delete'){
          
         let ite =  e.target.closest('.gallery-item');
         console.log(ite);
         ite.style.transition = 'all 0.4s ease'
         ite.style.width = '0px';
         ite.style.height = '0px';
         setTimeout(()=>{
             ite.remove()
         }, 300)
         
      }
      if(e.target.dataset.gitem == "inform"){
          let gitem = e.target.closest('.gallery-item');
          document.body.style.overflow = 'hidden'
          gcotnainer.style.opacity = 1;
          gcotnainer.style.visibility = 'visible'
          gcotnainer.querySelectorAll('[data-id]').forEach(item =>{
            item.classList.remove('active');
            if(item.dataset.id == gitem.dataset.id){
              item.classList.add('active')
            }
            
          })

      }
      
    })
}

function createTemplate(el, i){
  let src  = el.querySelector('img').getAttribute('src');
  let name = el.querySelector('.uploader-item__name').textContent;
  let size = el.querySelector('.uploader-item__size').textContent;

  let template = `
  <div class="gallery-item" data-id="${i}" id="${i}">
 <div class="aa"> <img class="gallery-item__img" src="${src}"></div>
  <div class="gallery-item__inform" data-gitem = "inform" >
      <div class=" gallery-item__delete"><span data-btn="delete">&times;</span></div>
          <div class="gallery-item__footer">
              <span class="uploader-item__name">${name}</span>
              <span class="uploader-item__size"> ${size}</span>
          </div>
</div>
</div>
  `;
  return template
}
