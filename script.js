const video = document.querySelector('video');
const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d');
const magnifier = document.getElementById('magnifier');
const scale = 2;

let isVisible = true;

// listen for the visibilitychange event
document.addEventListener('visibilitychange', () => {
  isVisible = !document.hidden;
});

navigator.mediaDevices.getUserMedia({ video: true })
  .then(stream => {
    video.srcObject = stream;
    video.play();
  })
  .catch(error => console.error(error));

function render() {
  if (!magnifier) console.error('Magnifier element not found');
  // page is hidden, pause the function
  if (!isVisible) return;

  context.drawImage(video, 0, 0, canvas.width, canvas.height);
  const image = new Image();
  image.src = canvas.toDataURL();
  image.onload = () => {
    const x = Math.floor(magnifier.offsetLeft / scale);
    const y = Math.floor(magnifier.offsetTop / scale);
    const width = Math.floor(magnifier.offsetWidth / scale);
    const height = Math.floor(magnifier.offsetHeight / scale);
    context.drawImage(image, x, y, width, height, 0, 0, canvas.width, canvas.height);
  };
  requestAnimationFrame(render); // 재귀 호출
}

render();
