// 監聽滾動事件，控制導航欄背景
document.addEventListener('DOMContentLoaded', function() {
    const navbar = document.querySelector('.navbar');
    
    function updateNavbar() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }

    // 初始檢查
    updateNavbar();
    
    // 監聽滾動事件
    window.addEventListener('scroll', updateNavbar);
});
