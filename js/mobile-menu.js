// Mobile Menu Functionality
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mobileMenuOverlay = document.querySelector('.mobile-menu-overlay');
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileMenuClose = document.querySelector('.mobile-menu-close');
    const body = document.body;

    // 開啟選單
    function openMenu() {
        if (mobileMenuOverlay && mobileMenu) {
            mobileMenuOverlay.classList.add('active');
            mobileMenuOverlay.style.display = 'block';
            mobileMenu.classList.add('active');
            body.classList.add('menu-open');
        }
    }

    // 關閉選單
    function closeMenu() {
        if (mobileMenuOverlay && mobileMenu) {
            mobileMenuOverlay.classList.remove('active');
            mobileMenu.classList.remove('active');
            body.classList.remove('menu-open');
            
            // 添加延遲以配合動畫
            setTimeout(() => {
                mobileMenuOverlay.style.display = 'none';
            }, 300);
        }
    }

    // 點擊漢堡按鈕開啟選單
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            openMenu();
        });
    }

    // 點擊關閉按鈕關閉選單
    if (mobileMenuClose) {
        mobileMenuClose.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            closeMenu();
        });
    }

    // 點擊遮罩關閉選單
    if (mobileMenuOverlay) {
        mobileMenuOverlay.addEventListener('click', function(e) {
            if (e.target === mobileMenuOverlay) {
                closeMenu();
            }
        });
    }

    // 點擊選單項目後關閉選單
    const mobileNavItems = document.querySelectorAll('.mobile-nav-item');
    mobileNavItems.forEach(item => {
        item.addEventListener('click', function() {
            closeMenu();
        });
    });

    // ESC鍵關閉選單
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && mobileMenuOverlay && mobileMenuOverlay.classList.contains('active')) {
            closeMenu();
        }
    });

    // 視窗大小改變時處理選單狀態
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768 && mobileMenuOverlay && mobileMenuOverlay.classList.contains('active')) {
            closeMenu();
        }
    });
});