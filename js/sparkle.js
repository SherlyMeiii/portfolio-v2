document.addEventListener('DOMContentLoaded', function() {
    const hero = document.querySelector('.hero');
    const numberOfSparkles = 50;

    // 創建閃爍的星星
    for (let i = 0; i < numberOfSparkles; i++) {
        createSparkle(hero);
    }

    function createSparkle(parent) {
        const sparkle = document.createElement('div');
        sparkle.className = 'sparkle';
        
        // 隨機位置
        const x = Math.random() * 100;
        const y = Math.random() * 100;
        sparkle.style.left = x + '%';
        sparkle.style.top = y + '%';
        
        // 隨機大小
        const size = Math.random() * 4 + 2;
        sparkle.style.width = size + 'px';
        sparkle.style.height = size + 'px';
        
        // 隨機動畫延遲
        const delay = Math.random() * 3;
        sparkle.style.animation = `sparkle ${1.5 + Math.random()}s ease-in-out ${delay}s infinite`;
        
        parent.appendChild(sparkle);
    }
});
