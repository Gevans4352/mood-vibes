const moodButtons = document.querySelectorAll('.mood-btn');
const responseText = document.getElementById('response-text');
const surpriseBtn = document.getElementById('surprise-btn');

const responses = {
  happy: [
    "You’re crushing it today! ✨",
    "Keep shining, superstar! 🌟",
    "Your energy is contagious!"
  ],
  neutral: [
    "Keep moving forward, even if it’s small steps.",
    "You’re doing just fine.",
    "Every day is a fresh start."
  ],
  sad: [
    "It’s okay to have tough days. You’re stronger than you think.",
    "Why don’t scientists trust atoms? Because they make up everything! 😄",
    "Take a deep breath. You’ve got this."
  ],
  sleepy: [
    "Rest is important recharge those batteries! 🔋",
    "Maybe a quick power nap? You deserve it.",
    "Coffee? Tea? Whatever fuels your vibe!"
  ],
  excited: [
    "Your hype level is off the charts! 🎉",
    "Spread that excitement, world needs it!",
    "You’re a human sparkler, keep dazzling!"
  ],
  anxious: [
    "One step at a time. You’re doing your best.",
    "Try this: breathe in for 4 seconds, out for 6.",
    "Anxiety is just a visitor, not your home."
  ],
  chill: [
    "Stay cool, you’re doing great 😎",
    "Peace and good vibes only.",
    "Relax, recharge, repeat."
  ],
  angry: [
    "Feelings are valid. Take a moment to breathe.",
    "A quick walk can work wonders!",
    "You’ve got the power to calm the storm inside."
  ]
};

let selectedMood = null;

function pickMood(mood) {
  selectedMood = mood;
  updateSelectedButton();
  updateResponse();
}

function updateSelectedButton() {
  moodButtons.forEach(btn => {
    btn.classList.toggle('selected', btn.dataset.mood === selectedMood);
  });
}

function getRandomFromArray(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function updateResponse() {
  if (!selectedMood) {
    responseText.textContent = "Mood check!";
    return;
  }
  const msg = getRandomFromArray(responses[selectedMood]);
  responseText.textContent = msg;
}
function surpriseMe() {
  const allResponses = Object.values(responses).flat();
  responseText.textContent = getRandomFromArray(allResponses);
  selectedMood = null;
  updateSelectedButton();
}
moodButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    pickMood(btn.dataset.mood);
  });
});

function typeWriter(text, element, speed = 40) {
  element.textContent = '';
  let i = 0;

  function type() {
    if (i < text.length) {
      element.textContent += text.charAt(i);
      i++;
      setTimeout(type, speed);
    }
  }

  type();
}

const moodColors = {
  happy: '#fbc02d',
  neutral: '#90a4ae',
  sad: '#64b5f6',
  sleepy: '#9575cd',
  excited: '#f57c00',
  anxious: '#e57373',
  chill: '#4db6ac',
  angry: '#e53935'
};



function getRandomFromArray(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function updateResponse() {
  if (!selectedMood) {
    responseText.textContent = "Pick a mood to get a compliment, quote, or joke!";
    responseText.style.color = '#1a237e'; 
    responseText.style.textShadow = 'none';
    return;
  }
  
  const msg = getRandomFromArray(responses[selectedMood]);
  const color = moodColors[selectedMood] || '#1a237e';

  responseText.style.color = color;
  responseText.style.textShadow = `0 0 8px ${color}`;

  typeWriter(msg, responseText);
}

responseText.addEventListener('click', () => {
  if (!responseText.textContent) return;
  navigator.clipboard.writeText(responseText.textContent).then(() => {
    responseText.classList.add('copied');
    setTimeout(() => {
      responseText.classList.remove('copied');
    }, 2000);
  });
});
const colors = ['#ff6ec4', '#7873f5', '#4ade80', '#facc15', '#ff9a9e', '#66a6ff'];

document.body.addEventListener('click', e => {
  for (let i = 0; i < 3; i++) {
    createRipple(e.clientX + randomOffset(), e.clientY + randomOffset());
  }
});

function randomOffset() {
  return Math.floor(Math.random() * 40) - 20;
}

function createRipple(x, y) {
  const ripple = document.createElement('div');
  ripple.classList.add('ripple');
  ripple.style.background = colors[Math.floor(Math.random() * colors.length)];

  ripple.style.left = `${x}px`;
  ripple.style.top = `${y}px`;
  document.body.appendChild(ripple);
  ripple.addEventListener('animationend', () => ripple.remove());
}



surpriseBtn.addEventListener('click', surpriseMe);
updateResponse();
