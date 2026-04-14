const starsContainer = document.getElementById('stars');

function createStars() {
  const starCount = window.innerWidth < 700 ? 70 : 120;
  starsContainer.innerHTML = '';

  for (let i = 0; i < starCount; i += 1) {
    const star = document.createElement('span');
    star.className = 'star';

    const size = Math.random() * 2.8 + 0.6;
    star.style.width = `${size}px`;
    star.style.height = `${size}px`;
    star.style.left = `${Math.random() * 100}%`;
    star.style.top = `${Math.random() * 100}%`;
    star.style.animationDelay = `${Math.random() * 3}s`;
    star.style.animationDuration = `${Math.random() * 2 + 1.4}s`;

    starsContainer.appendChild(star);
  }
}

createStars();
window.addEventListener('resize', createStars);
