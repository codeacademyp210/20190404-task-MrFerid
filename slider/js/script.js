function init(){

    window.ul = document.querySelector('.slider > ul');
    window.li = document.querySelector('.slider > ul > li');
    window.slideCount = ul.children.length;

    //giving ul element width
    ul.style.width = li.offsetWidth * slideCount + 'px';

    // margin left of ul element
    window.sliderPosition = 0;
   
    // current slide index
    window.slideIndex = 0;

    // first showing slide on page load
    window.currentSlide = ul.children[0];
    currentSlide.classList.add('active-slide');

    //creating tgumbnails
    crateThumbnails();
}


// showing next slide
function nextSlide(){
    slideIndex++;
         currentSlide.classList.remove('active-slide');
        if(slideIndex == slideCount){
 
            slideIndex = 0;
            sliderPosition = 0;
            ul.style.marginLeft = sliderPosition;
            currentSlide = ul.children[0];
            currentSlide.classList.add('active-slide');
            tmbDesgin(slideIndex+1);
        }
        else{

            sliderPosition -= li.offsetWidth;
            ul.style.marginLeft = sliderPosition + 'px';
            currentSlide = currentSlide.nextElementSibling;
            currentSlide.classList.add('active-slide');
            tmbDesgin(slideIndex+1);
        }
}

// showing previous slide
function prevSlide(){
    slideIndex--;
    currentSlide.classList.remove('active-slide');
   if(slideIndex < 0){
       slideIndex = slideCount-1;
       sliderPosition = -(slideCount-1) * li.offsetWidth;
       ul.style.marginLeft = sliderPosition + 'px';
       currentSlide = ul.children[slideCount-1];
       currentSlide.classList.add('active-slide');
       tmbDesgin(slideIndex+1);
   }
   else{
        sliderPosition += li.offsetWidth;
        ul.style.marginLeft = sliderPosition + 'px';
        currentSlide = currentSlide.previousElementSibling;
        currentSlide.classList.add('active-slide');
        tmbDesgin(slideIndex+1);
    }
}


// showing slides by some number
function showThis(){
    let thisSlide = event.target.id - 1;

    sliderPosition = -(thisSlide * li.offsetWidth);
    slideIndex = thisSlide;
    ul.style.marginLeft = sliderPosition + 'px';

    currentSlide = ul.children[thisSlide];
    currentSlide.classList.add('active-slide');
    tmbDesgin(event.target.id);
}


//  creating thumbnails
function crateThumbnails(){
    let tmbContainer = document.querySelector('.thumbnails');
    
    for(let i=0; i< slideCount; i++){

        let tmb = document.createElement('div');
        tmb.classList.add('thumbnail');
        tmb.id = i+1;
        tmb.innerText = i+1;
        tmb.setAttribute('onclick','showThis(event)');

        tmbContainer.appendChild(tmb);
    }

    document.querySelector('.thumbnails .thumbnail:first-child').classList.add('active-tmb');
}

//  adding active class to current thumbnail

function tmbDesgin(currentId){
    let tmbs = document.querySelector('.thumbnails');
    let currTmb = document.getElementById(currentId);

    for(let i=0; i<=tmbs.children.length - 1; i++){
            tmbs.children[i].classList.remove('active-tmb');
    }
    currTmb.classList.add('active-tmb');
}