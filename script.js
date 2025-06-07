// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navigation bar scroll effect
let lastScroll = 0;
const header = document.querySelector('header');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
        header.classList.remove('scroll-up');
        return;
    }
    
    if (currentScroll > lastScroll && !header.classList.contains('scroll-down')) {
        // Scroll Down
        header.classList.remove('scroll-up');
        header.classList.add('scroll-down');
    } else if (currentScroll < lastScroll && header.classList.contains('scroll-down')) {
        // Scroll Up
        header.classList.remove('scroll-down');
        header.classList.add('scroll-up');
    }
    lastScroll = currentScroll;
});

// Add active class to current navigation item
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// Research tabs functionality
document.addEventListener('DOMContentLoaded', function() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');
    const tabContainer = document.querySelector('.tab-selectors');

    function scrollTabIntoView(selectedTab) {
        const containerRect = tabContainer.getBoundingClientRect();
        const tabRect = selectedTab.getBoundingClientRect();
        const nextTab = selectedTab.nextElementSibling;
        const prevTab = selectedTab.previousElementSibling;
        
        // Calculate the center position of the container
        const containerCenter = containerRect.left + (containerRect.width / 2);
        
        // If there's a next tab, check if it's visible
        if (nextTab) {
            const nextTabRect = nextTab.getBoundingClientRect();
            if (nextTabRect.right > containerRect.right) {
                // Calculate how much to scroll to show the next tab
                const scrollAmount = nextTabRect.left - containerRect.left;
                tabContainer.scrollBy({
                    left: scrollAmount,
                    behavior: 'smooth'
                });
                return; // Exit after scrolling to show next tab
            }
        }
        
        // If there's a previous tab, check if it's visible
        if (prevTab) {
            const prevTabRect = prevTab.getBoundingClientRect();
            if (prevTabRect.left < containerRect.left) {
                // Calculate how much to scroll to show the previous tab
                const scrollAmount = prevTabRect.left - containerRect.left;
                tabContainer.scrollBy({
                    left: scrollAmount,
                    behavior: 'smooth'
                });
                return; // Exit after scrolling to show previous tab
            }
        }
        
        // If the selected tab itself is not fully visible, center it
        if (tabRect.left < containerRect.left || tabRect.right > containerRect.right) {
            const tabCenter = tabRect.left + (tabRect.width / 2);
            const scrollAmount = tabCenter - containerCenter;
            tabContainer.scrollBy({
                left: scrollAmount,
                behavior: 'smooth'
            });
        }
    }

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons and panes
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabPanes.forEach(pane => pane.classList.remove('active'));

            // Add active class to clicked button and corresponding pane
            button.classList.add('active');
            const tabId = button.getAttribute('data-tab');
            document.getElementById(tabId).classList.add('active');

            // Scroll the selected tab into view if needed
            scrollTabIntoView(button);
        });
    });

    // Add scroll buttons for better navigation (optional)
    const scrollLeft = document.createElement('button');
    const scrollRight = document.createElement('button');
    scrollLeft.className = 'tab-scroll-btn scroll-left';
    scrollRight.className = 'tab-scroll-btn scroll-right';
    scrollLeft.innerHTML = '&#10094;';
    scrollRight.innerHTML = '&#10095;';
    
    tabContainer.parentElement.style.position = 'relative';
    tabContainer.parentElement.appendChild(scrollLeft);
    tabContainer.parentElement.appendChild(scrollRight);

    scrollLeft.addEventListener('click', () => {
        tabContainer.scrollBy({
            left: -200,
            behavior: 'smooth'
        });
    });

    scrollRight.addEventListener('click', () => {
        tabContainer.scrollBy({
            left: 200,
            behavior: 'smooth'
        });
    });

    // Show/hide scroll buttons based on scroll position
    function updateScrollButtons() {
        scrollLeft.style.display = tabContainer.scrollLeft > 0 ? 'block' : 'none';
        scrollRight.style.display = 
            tabContainer.scrollLeft < (tabContainer.scrollWidth - tabContainer.clientWidth) 
            ? 'block' : 'none';
    }

    tabContainer.addEventListener('scroll', updateScrollButtons);
    window.addEventListener('resize', updateScrollButtons);
    updateScrollButtons(); // Initial check
}); 