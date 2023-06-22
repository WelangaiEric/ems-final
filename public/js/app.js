
const toggler=document.querySelector('.toggler');
const menu = document.querySelector('.side-nav');
toggler.addEventListener('click',()=>{
    menu.classList.toggle('show')
});
const btn = document.querySelector('nort-btn');

btn.addEventListener('click',function (){
    console.log('dsxdcsdc')
    document.querySelector('.open').classList.toggle('show')
});