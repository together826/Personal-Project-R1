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

    // ==========================================================================
    // Trail頁面篩選功能 - 新增
    // ==========================================================================
    
    // 桌面版篩選功能
    document.querySelectorAll('.desktop-filter-section .filter-option').forEach(option => {
        option.addEventListener('click', function () {
            // 同一行的其他選項移除active
            const row = this.closest('.filter-row');
            if (row) {
                row.querySelectorAll('.filter-option.active').forEach(active => {
                    active.classList.remove('active');
                });
                // 添加active到當前選項
                this.classList.add('active');
            }
        });
    });

    // 手機版下拉選單功能
    document.querySelectorAll('.trail-filter-select').forEach(select => {
        select.addEventListener('change', function() {
            const filterType = this.dataset.filter;
            const selectedValue = this.value;
            
            // 這裡可以加入篩選邏輯
            console.log(`篩選 ${filterType}: ${selectedValue}`);
            
            // 視覺反饋 - 短暫加深邊框顏色
            this.style.borderColor = '#d4941c';
            setTimeout(() => {
                this.style.borderColor = '#E8A520';
            }, 300);
            
            // 可以在這裡加入實際的篩選功能
            // 例如：filterTrails(filterType, selectedValue);
        });
    });

    // 手機版搜尋功能
    const mobileSearchBtn = document.querySelector('.mobile-search-bar .search-btn');
    const mobileSearchInput = document.querySelector('.mobile-search-bar .search-input');
    
    if (mobileSearchBtn && mobileSearchInput) {
        mobileSearchBtn.addEventListener('click', function(e) {
            e.preventDefault();
            const searchTerm = mobileSearchInput.value.trim();
            if (searchTerm) {
                console.log('搜尋關鍵字:', searchTerm);
                // 這裡可以加入實際的搜尋功能
                // 例如：performSearch(searchTerm);
                
                // 視覺反饋
                this.style.background = '#d4941c';
                setTimeout(() => {
                    this.style.background = '#E8A520';
                }, 200);
            }
        });

        // Enter鍵搜尋
        mobileSearchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                mobileSearchBtn.click();
            }
        });
    }

    // 桌面版搜尋功能 (保持相容性)
    const desktopSearchBtn = document.querySelector('.desktop-filter-section .search-btn');
    const desktopSearchInput = document.querySelector('.desktop-filter-section .search-input');
    
    if (desktopSearchBtn && desktopSearchInput) {
        desktopSearchBtn.addEventListener('click', function(e) {
            e.preventDefault();
            const searchTerm = desktopSearchInput.value.trim();
            if (searchTerm) {
                console.log('搜尋關鍵字:', searchTerm);
                // 這裡可以加入實際的搜尋功能
                
                // 視覺反饋
                this.style.background = '#d4941c';
                setTimeout(() => {
                    this.style.background = '#E8A520';
                }, 200);
            }
        });

        // Enter鍵搜尋
        desktopSearchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                desktopSearchBtn.click();
            }
        });
    }

    // ==========================================================================
    // 實用功能函數 - 可選實作
    // ==========================================================================
    
    // 同步桌面版和手機版的篩選狀態
    function syncFilters() {
        // 取得目前桌面版的選擇狀態
        const desktopFilters = {};
        document.querySelectorAll('.desktop-filter-section .filter-row').forEach(row => {
            const label = row.querySelector('.filter-label');
            const activeOption = row.querySelector('.filter-option.active');
            if (label && activeOption) {
                const filterType = label.textContent.trim();
                const selectedValue = activeOption.textContent.trim();
                desktopFilters[filterType] = selectedValue;
            }
        });

        // 更新手機版下拉選單
        document.querySelectorAll('.trail-filter-select').forEach(select => {
            const filterType = select.dataset.filter;
            // 這裡可以根據實際需求實作同步邏輯
        });
    }

    // 篩選路線功能 (示例)
    function filterTrails(filterType, selectedValue) {
        // 這個函數可以用來實際篩選顯示的路線
        console.log(`執行篩選: ${filterType} = ${selectedValue}`);
        
        // 示例：可以根據selectedValue來隱藏/顯示特定的trail-card
        // const trailCards = document.querySelectorAll('.trail-card');
        // trailCards.forEach(card => {
        //     // 根據篩選條件決定是否顯示此卡片
        // });
        
        // 更新結果數量顯示
        updateResultsCount();
    }

    // 更新結果數量顯示
    function updateResultsCount() {
        const visibleCards = document.querySelectorAll('.trail-card:not([style*="display: none"])');
        const resultsInfo = document.querySelector('.results-info');
        if (resultsInfo) {
            const totalCount = visibleCards.length;
            const displayCount = Math.min(5, totalCount); // 假設每頁顯示5個
            resultsInfo.textContent = `顯示 1-${displayCount} 項，共 ${totalCount} 項結果`;
        }
    }

    // 搜尋功能 (示例)
    function performSearch(searchTerm) {
        console.log(`執行搜尋: ${searchTerm}`);
        
        // 示例：在路線名稱和位置中搜尋
        const trailCards = document.querySelectorAll('.trail-card');
        let matchCount = 0;
        
        trailCards.forEach(card => {
            const trailName = card.querySelector('.trail-name')?.textContent.toLowerCase() || '';
            const trailLocation = card.querySelector('.trail-location')?.textContent.toLowerCase() || '';
            const searchLower = searchTerm.toLowerCase();
            
            if (trailName.includes(searchLower) || trailLocation.includes(searchLower)) {
                card.style.display = 'flex';
                matchCount++;
            } else {
                card.style.display = 'none';
            }
        });
        
        // 更新結果數量
        const resultsInfo = document.querySelector('.results-info');
        if (resultsInfo) {
            resultsInfo.textContent = `顯示 1-${Math.min(5, matchCount)} 項，共 ${matchCount} 項結果 (搜尋: ${searchTerm})`;
        }
        
        // 如果沒有匹配結果，顯示提示
        if (matchCount === 0) {
            showNoResultsMessage(searchTerm);
        } else {
            hideNoResultsMessage();
        }
    }

    // 顯示無結果訊息
    function showNoResultsMessage(searchTerm) {
        hideNoResultsMessage(); // 先移除已存在的訊息
        
        const trailList = document.querySelector('.trail-list');
        if (trailList) {
            const noResultsDiv = document.createElement('div');
            noResultsDiv.className = 'no-results-message';
            noResultsDiv.innerHTML = `
                <div style="text-align: center; padding: 40px; color: #666;">
                    <i class="fas fa-search" style="font-size: 48px; margin-bottom: 20px; color: #E8A520;"></i>
                    <h3 style="margin-bottom: 10px;">找不到相關路線</h3>
                    <p>搜尋關鍵字「${searchTerm}」沒有找到任何結果</p>
                    <button onclick="clearSearch()" style="margin-top: 20px; background: #E8A520; color: white; border: none; padding: 10px 20px; border-radius: 20px; cursor: pointer;">
                        清除搜尋
                    </button>
                </div>
            `;
            trailList.appendChild(noResultsDiv);
        }
    }

    // 隱藏無結果訊息
    function hideNoResultsMessage() {
        const noResultsMessage = document.querySelector('.no-results-message');
        if (noResultsMessage) {
            noResultsMessage.remove();
        }
    }

    // 清除搜尋 (全域函數)
    window.clearSearch = function() {
        // 清除搜尋框
        if (mobileSearchInput) mobileSearchInput.value = '';
        if (desktopSearchInput) desktopSearchInput.value = '';
        
        // 顯示所有路線
        document.querySelectorAll('.trail-card').forEach(card => {
            card.style.display = 'flex';
        });
        
        // 隱藏無結果訊息
        hideNoResultsMessage();
        
        // 重置結果數量
        updateResultsCount();
    };

    // 初始化時更新結果數量
    updateResultsCount();
});