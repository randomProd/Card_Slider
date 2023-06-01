let wrapper = document.querySelector(".wrapper");
let carousel = document.querySelector(".carousel");
let arrowBtns = document.querySelectorAll(".wrapper i");
let firstCardWidth = carousel.querySelector(".card").offsetWidth;
let carouselChildrens = [...carousel.children]

let isDragging = false,
    startX,
    startScrollLeft,
    timeoutId;


    let cardPerView = Math.round(carousel.offsetWidth / firstCardWidth);

    carouselChildrens.slice(-cardPerView).reverse().forEach(card => {
        carousel.insertAdjacentHTML("afterbegin", card.outerHTML)
    })

    carouselChildrens.slice(0, cardPerView).forEach(card => {
        carousel.insertAdjacentHTML("beforeend", card.outerHTML)
    })

    arrowBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            carousel.scrollLeft += btn.id === "left" ? -firstCardWidth : firstCardWidth;
        })
    })

const dragStart = (e) => {
    isDragging = true;
    carousel.classList.add("dragging");
    //records the initial  cursor and scroll position of the carousel
    startX = e.pageX;
    startScrollLeft = carousel.scrollLeft;
}



const dragging = (e) => {
    if(!isDragging) return;
    // Updates the scroll position the carousel based on the cursor movement
    carousel.scrollLeft = startScrollLeft - (e.pageX - startX)
    console.log( carousel.scrollLeft);
}



let dragStop = (e) => {
    isDragging = false
    carousel.classList.remove("dragging")
}

let autoPlay = () => {
    if(window.innerWidth < 800) return

    let timeoutId = setTimeout(() => carousel.scrollLeft += firstCardWidth, 2500)
}

autoPlay()

let InfiniteScroll = () => {
    if(carousel.scrollLeft === 0) {
        carousel.classList.add("no-transition")
        carousel.scrollLeft = carousel.scrollWidth - (2 * carousel.offsetWidth)
        carousel.classList.remove("no-transition")
    } else if(Math.ceil(carousel.scrollLeft) === carousel.scrollWidth - carousel.offsetWidth){
        carousel.classList.add("no-transition")
        carousel.scrollLeft = carousel.offsetWidth
        carousel.classList.remove("no-transition")
    }

    //clear existing timeout & start autoplay if mouse is not hovering over carousel
    clearTimeout(timeoutId);
    if(!wrapper.matches(":hover")) autoPlay()
}


carousel.addEventListener("mousedown", dragStart)
carousel.addEventListener("mousemove", dragging)
carousel.addEventListener("mouseup", dragStop)
carousel.addEventListener("scroll", InfiniteScroll);
wrapper.addEventListener("mouseenter", () => clearTimeout(timeoutId));
wrapper.addEventListener("mouseleave", autoPlay)

