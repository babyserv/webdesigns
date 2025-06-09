// interactive object clicks
const objects = document.querySelectorAll('#living-room .object[data-target]');
const pagesContainer = document.getElementById('pages');
const pages = document.querySelectorAll('#pages .page');

objects.forEach(obj => {
  obj.addEventListener('click', () => {
    const target = obj.getAttribute('data-target');
    if (!target) return;
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

// theme toggle
const switchEl = document.getElementById('light-switch');
const livingRoom = document.getElementById('living-room');
if (switchEl) {
  switchEl.addEventListener('click', () => {
    livingRoom.classList.toggle('night');
  });
}

// random thought bubbles
const bubble = document.getElementById('thought-bubble');
const thoughts = [
  "You forgot your coffee again.",
  "Day 3 of the laundry protest.",
  "Where did the remote go?"
];
function popThought() {
  bubble.textContent = thoughts[Math.floor(Math.random() * thoughts.length)];
  bubble.style.display = 'block';
  setTimeout(() => { bubble.style.display = 'none'; }, 3000);
}
setInterval(popThought, 7000);
