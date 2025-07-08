const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');
let index = 0;

function showSlide(i) {
  slides.forEach((slide, idx) => {
    slide.classList.remove('active');
    dots[idx].classList.remove('active');
  });
  slides[i].classList.add('active');
  dots[i].classList.add('active');
}

function nextSlide() {
  index = (index + 1) % slides.length;
  showSlide(index);
}

function prevSlide() {
  index = (index - 1 + slides.length) % slides.length;
  showSlide(index);
}

const nextBtn = document.querySelector('.next');
const prevBtn = document.querySelector('.prev');
if (nextBtn) nextBtn.onclick = nextSlide;
if (prevBtn) prevBtn.onclick = prevSlide;

dots.forEach((dot, i) => dot.onclick = () => { index = i; showSlide(i); });

setInterval(nextSlide, 5000);
function initCarousel() {
  showSlide(index);
}
