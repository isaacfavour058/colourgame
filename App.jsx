function resetGame() {
  setTargetColor(randomColor());
  setStatus('');
  setFade(false);
  clearTimeout(timeout);
}