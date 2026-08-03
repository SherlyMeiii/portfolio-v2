// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Navbar scroll effect
const navbar = document.querySelector('.navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        return;
    }
    
    if (currentScroll > lastScroll) {
        // Scrolling down
        navbar.style.transform = 'translateY(-100%)';
    } else {
        // Scrolling up
        navbar.style.transform = 'translateY(0)';
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    }
    
    lastScroll = currentScroll;
});

// Image loading animation
document.addEventListener('DOMContentLoaded', () => {
    const images = document.querySelectorAll('.gallery-item img, .project-card img');
    images.forEach(img => {
        // 圖片如果已經載完（有快取時就會這樣），load 事件早就發生過了，
        // 這時再掛監聽器永遠不會觸發，opacity 會卡在 0 讓圖片消失。
        if (img.complete && img.naturalWidth > 0) {
            img.style.opacity = '1';
            return;
        }

        img.style.opacity = '0';
        img.style.transition = 'opacity 0.5s ease';

        img.addEventListener('load',  () => { img.style.opacity = '1'; });
        img.addEventListener('error', () => { img.style.opacity = '1'; });
    });
});

// Contact form handling
const contactForm = document.getElementById('contact-form');

// index.html 裡沒有 #contact-form，contactForm 會是 null，
// 直接呼叫 .addEventListener 會丟出 uncaught TypeError，每次載入都會在
// console 留一行紅字。加個判斷，之後真的加表單時這段仍然會運作。
if (contactForm) contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(this);
    const formProps = Object.fromEntries(formData);
    
    // Here you would typically send the form data to a server
    console.log('Form submitted:', formProps);
    
    // Show success message
    alert('Thank you for your message! I will get back to you soon.');
    this.reset();
});
