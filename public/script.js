document.addEventListener('DOMContentLoaded', () => {
  const audioPlayer = document.getElementById('audio-player');
  const songButtons = document.querySelectorAll('.song-button');

  let currentUrl = '';
  let currentButtonIndex = 0;

  songButtons.forEach((button, index) => {
    button.addEventListener('click', () => {
      const songUrl = button.getAttribute('data-url');

      if (songUrl !== currentUrl) {
        currentUrl = songUrl;
        audioPlayer.src = songUrl;
        audioPlayer.play();
        currentButtonIndex = index;
      }

      // Remove 'active' class from all buttons
      songButtons.forEach(btn => btn.classList.remove('active'));
      // Add 'active' class to current button
      button.classList.add('active');
    });
  });

  // Automatically play the next song when the current one ends
  audioPlayer.addEventListener('ended', () => {
    currentButtonIndex = (currentButtonIndex + 1) % songButtons.length;
    const nextButton = songButtons[currentButtonIndex];
    const nextSongUrl = nextButton.getAttribute('data-url');
    audioPlayer.src = nextSongUrl;
    audioPlayer.play();

    // Remove 'active' class from all buttons
    songButtons.forEach(btn => btn.classList.remove('active'));
    // Add 'active' class to the next button
    nextButton.classList.add('active');
  });
});
