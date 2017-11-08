const player      = document.querySelector('.player');
const video       = player.querySelector('video.viewer')
const playButton  = player.querySelector('button.toggle');
const progress    = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges      = player.querySelectorAll('.player__slider');

let mousedown = false;

function handlePlayButton() {
  if (video.paused){
    video.play();
    playButton.innerHTML = '❚ ❚'
  } else {
    video.pause();
    playButton.innerHTML = '►'
  }
}

function handleProgressBar() {
  const progress = video.currentTime / video.duration * 100
  progressBar.style.flexBasis = `${progress}%`;
}

function handleSkipButton () {
  video.currentTime += parseFloat(this.dataset.skip);
}

function handleRange () {
  video[this.name] = this.value;
}

function scrub (e) {
  video.currentTime = (e.offsetX / progress.offsetWidth) * video.duration;
}

// Events
playButton.addEventListener('click', handlePlayButton);
video.addEventListener('timeupdate', handleProgressBar);
video.addEventListener('click', handlePlayButton);
skipButtons.forEach((button) => button.addEventListener('click', handleSkipButton));
ranges.forEach((range) => range.addEventListener('change', handleRange));
ranges.forEach((range) => range.addEventListener('mousemove', handleRange));

progress.addEventListener('click', e => scrub(e));
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup',   () => mousedown = false);
progress.addEventListener('mousemove', (e) => mousedown && scrub(e));
