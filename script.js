// 页面切换功能
function showPage(pageId) {
    // 隐藏所有页面
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });
    
    // 显示目标页面
    const targetPage = document.getElementById(pageId + '-page');
    if (targetPage) {
        targetPage.classList.add('active');
    }
    
    // 更新导航链接状态
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
    });
    
    const activeLink = document.querySelector(`[data-page="${pageId}"]`);
    if (activeLink) {
        activeLink.classList.add('active');
    }
    
    // 关闭移动端菜单
    navMenu.classList.remove('active');
    hamburger.classList.remove('active');
}

// 移动端导航菜单切换
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// 导航链接点击事件
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const pageId = link.getAttribute('data-page');
        showPage(pageId);
    });
});

// 页面加载时显示首页
document.addEventListener('DOMContentLoaded', () => {
    showPage('home');
});

// 滚动时导航栏样式变化
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    }
});

// 滚动动画 - 只对当前显示的页面生效
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && entry.target.closest('.page.active')) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// 为所有卡片添加滚动动画
function initializeAnimations() {
    document.querySelectorAll('.about-card, .advantage-card, .category-card, .mv-card, .contact-item').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'all 0.6s ease';
        observer.observe(card);
    });
}

// 页面切换时重新初始化动画
function showPage(pageId) {
    // 隐藏所有页面
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });
    
    // 显示目标页面
    const targetPage = document.getElementById(pageId + '-page');
    if (targetPage) {
        targetPage.classList.add('active');
        
        // 重新触发动画
        setTimeout(() => {
            targetPage.querySelectorAll('.about-card, .advantage-card, .category-card, .mv-card, .contact-item').forEach(card => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            });
        }, 100);
    }
    
    // 更新导航链接状态
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
    });
    
    const activeLink = document.querySelector(`[data-page="${pageId}"]`);
    if (activeLink) {
        activeLink.classList.add('active');
    }
    
    // 关闭移动端菜单
    navMenu.classList.remove('active');
    hamburger.classList.remove('active');
    
    // 滚动到顶部
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// 平滑滚动到顶部按钮
const scrollToTopBtn = document.createElement('button');
scrollToTopBtn.innerHTML = '↑';
scrollToTopBtn.className = 'scroll-to-top';
scrollToTopBtn.style.cssText = `
    position: fixed;
    bottom: 30px;
    right: 30px;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background: var(--primary-yellow);
    color: white;
    border: none;
    font-size: 24px;
    cursor: pointer;
    opacity: 0;
    transition: all 0.3s ease;
    z-index: 999;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
`;

document.body.appendChild(scrollToTopBtn);

window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        scrollToTopBtn.style.opacity = '1';
        scrollToTopBtn.style.transform = 'translateY(0)';
    } else {
        scrollToTopBtn.style.opacity = '0';
        scrollToTopBtn.style.transform = 'translateY(20px)';
    }
});

scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

scrollToTopBtn.addEventListener('mouseenter', () => {
    scrollToTopBtn.style.transform = 'translateY(-5px) scale(1.1)';
});

scrollToTopBtn.addEventListener('mouseleave', () => {
    scrollToTopBtn.style.transform = 'translateY(0) scale(1)';
});

// 初始化动画
document.addEventListener('DOMContentLoaded', () => {
    initializeAnimations();
});


// 轮播图功能
const carouselImages = {
    stroller: [
        'https://i.ibb.co/3tf47Q9/239f80e0569c.png',
        'https://i.ibb.co/KjcGsLwd/918b0028334d.png',
        'https://i.ibb.co/YT3Fsnb4/e219343101f8.png',
        'https://i.ibb.co/Kcf4xjjV/c2872ba4bb91.png',
        'https://i.ibb.co/XZ5BtFjR/441deccf8387.png'
    ],
    other: [
        'https://i.ibb.co/2HMhFrD/069365c55242.png',
        'https://i.ibb.co/BVW49rSd/e26335a68e35.png',
        'https://i.ibb.co/HTpc8nMM/afda94c76b52.png',
        'https://i.ibb.co/JjsyKyHH/dc7d57ddf896.png',
        'https://i.ibb.co/Zp1Q57b8/2cf20ec6e168.png',
        'https://i.ibb.co/m78vC97/87b523c86cf2.png'
    ]
};

let currentCategory = '';
let currentSlideIndex = 0;

function openCarousel(category) {
    currentCategory = category;
    currentSlideIndex = 0;
    const modal = document.getElementById('carouselModal');
    const images = carouselImages[category];
    
    if (!images || images.length === 0) return;
    
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    updateCarousel();
    createThumbnails();
}

function closeCarousel() {
    const modal = document.getElementById('carouselModal');
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

function changeSlide(direction) {
    const images = carouselImages[currentCategory];
    currentSlideIndex += direction;
    
    if (currentSlideIndex < 0) {
        currentSlideIndex = images.length - 1;
    } else if (currentSlideIndex >= images.length) {
        currentSlideIndex = 0;
    }
    
    updateCarousel();
}

function goToSlide(index) {
    currentSlideIndex = index;
    updateCarousel();
}

function updateCarousel() {
    const images = carouselImages[currentCategory];
    const carouselImage = document.getElementById('carouselImage');
    const currentSlideSpan = document.getElementById('currentSlide');
    const totalSlidesSpan = document.getElementById('totalSlides');
    
    carouselImage.src = images[currentSlideIndex];
    currentSlideSpan.textContent = currentSlideIndex + 1;
    totalSlidesSpan.textContent = images.length;
    
    // 更新缩略图激活状态
    document.querySelectorAll('.carousel-thumbnail').forEach((thumb, index) => {
        if (index === currentSlideIndex) {
            thumb.classList.add('active');
        } else {
            thumb.classList.remove('active');
        }
    });
}

function createThumbnails() {
    const images = carouselImages[currentCategory];
    const thumbnailsContainer = document.getElementById('carouselThumbnails');
    thumbnailsContainer.innerHTML = '';
    
    images.forEach((src, index) => {
        const img = document.createElement('img');
        img.src = src;
        img.className = 'carousel-thumbnail';
        if (index === currentSlideIndex) {
            img.classList.add('active');
        }
        img.onclick = () => goToSlide(index);
        thumbnailsContainer.appendChild(img);
    });
}

// 键盘导航
document.addEventListener('keydown', (e) => {
    const modal = document.getElementById('carouselModal');
    if (modal.classList.contains('active')) {
        if (e.key === 'ArrowLeft') {
            changeSlide(-1);
        } else if (e.key === 'ArrowRight') {
            changeSlide(1);
        } else if (e.key === 'Escape') {
            closeCarousel();
        }
    }
});

// 点击模态框背景关闭
document.getElementById('carouselModal').addEventListener('click', (e) => {
    if (e.target.id === 'carouselModal') {
        closeCarousel();
    }
});
