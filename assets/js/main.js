document.addEventListener('DOMContentLoaded', () => {
    const navItems = document.querySelectorAll('nav ul li');
  
    navItems.forEach(item => {
      const submenu = item.querySelector('.mega-menu');
      if (submenu) {
        item.addEventListener('click', (e) => {
          e.preventDefault();
          submenu.classList.toggle('hidden');
        });
      }
    });
  
    // Optional: Close the menu when clicking outside
    document.addEventListener('click', (e) => {
      navItems.forEach(item => {
        const submenu = item.querySelector('.mega-menu');
        if (submenu && !item.contains(e.target)) {
          submenu.classList.add('hidden');
        }
      });
    });
  });