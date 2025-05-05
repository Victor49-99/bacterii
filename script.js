let images = [];
let currentIndex = 0;

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function parseCSV(text) {
  const lines = text.trim().split('\n').slice(1);
  return lines.map(line => {
    const [file, name] = line.split(',');
    return { file: file.trim(), name: name.trim() };
  });
}

function loadCSV() {
  return fetch('data.csv')
    .then(res => res.text())
    .then(text => parseCSV(text));
}

function startSession() {
    const main = document.getElementById('main');
    main.classList.remove('only-start');
    console.log("Hiding Start button");
    document.getElementById('startBtn').classList.add('hidden');
    document.getElementById('retryBtn').classList.add('hidden');
    document.getElementById('imgName').classList.add('hidden');
    document.getElementById('nextBtn').classList.add('hidden');
    document.getElementById('card').classList.remove('hidden');
  
    loadCSV().then(data => {
      images = [...data];
      shuffle(images);
      currentIndex = 0;
      showImage();
    });
  }

function showImage() {
  const current = images[currentIndex];
  document.getElementById('imgDisplay').src = "images/" + current.file;
  document.getElementById('imgName').textContent = current.name;
  document.getElementById('imgName').classList.add('hidden');
  document.getElementById('nextBtn').classList.add('hidden');
}

function revealName() {
  document.getElementById('imgName').classList.remove('hidden');
  document.getElementById('nextBtn').classList.remove('hidden');
}

function nextImage() {
  currentIndex++;
  if (currentIndex < images.length) {
    showImage();
  } else {
    document.getElementById('card').classList.add('hidden');
    document.getElementById('nextBtn').classList.add('hidden');
    document.getElementById('retryBtn').classList.remove('hidden');
  }
}
window.onload = () => {
    document.getElementById('main').classList.add('only-start');
  };