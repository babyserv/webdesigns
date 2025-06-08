// handle panel clicks
const panels = document.querySelectorAll('.panel');
const pagesContainer = document.getElementById('pages');
const pages = document.querySelectorAll('#pages .page');

panels.forEach(panel => {
  panel.addEventListener('click', () => {
    const target = panel.getAttribute('data-target');
    pagesContainer.style.display = 'flex';
    pages.forEach(page => {
      page.style.display = page.id === target ? 'block' : 'none';
    });
  });
});

// back buttons
const backButtons = document.querySelectorAll('.back');
backButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    pagesContainer.style.display = 'none';
  });
});

// thought bubbles
const bubble = document.getElementById('thought-bubble');
const thoughts = [
  "They said it gets easier...they lied.",
  "Is hiding in the pantry a hobby?",
  "Laundry mountain: still growing."
];

function popThought() {
  bubble.textContent = thoughts[Math.floor(Math.random() * thoughts.length)];
  bubble.style.display = 'block';
  setTimeout(() => {
    bubble.style.display = 'none';
  }, 3000);
}

setInterval(popThought, 7000);

