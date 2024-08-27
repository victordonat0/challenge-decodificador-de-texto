document.addEventListener('DOMContentLoaded', () => {
  const inputElement = document.getElementById('input');
  const outputElement = document.getElementById('output');

  // Add event listeners
  inputElement.addEventListener('input', adjustTextareaHeights);
  window.addEventListener('resize', adjustTextareaHeights);
  adjustTextareaHeights(); // Initial adjustment on page load

  function processText(mode) {
    const input = inputElement.value.trim();

    if (!validateInput(input)) {
      showToast('❌ Texto inválido. Use apenas letras minúsculas e sem acentos.');
      return;
    }

    const result = mode === 'encrypt' ? encryptText(input) : decryptText(input);
    outputElement.value = result;
  }

  function encryptText(text) {
    const replacements = { e: 'enter', i: 'imes', a: 'ai', o: 'ober', u: 'ufat' };
    return text.replace(/[eioua]/g, match => replacements[match]);
  }

  function decryptText(text) {
    const replacements = { enter: 'e', imes: 'i', ai: 'a', ober: 'o', ufat: 'u' };
    return text.replace(/enter|imes|ai|ober|ufat/g, match => replacements[match]);
  }

  function validateInput(input) {
    return /^[a-z0-9 .,!?'-]*$/.test(input);
  }

  function copyToClipboard() {
    outputElement.select();
    document.execCommand('copy');
    showToast('✨ Texto copiado com sucesso! ✨');
  }

  function clearInput() {
    inputElement.value = '';
    adjustTextareaHeights();
  }

  function clearOutput() {
    outputElement.value = '';
    adjustTextareaHeights();
  }

  function adjustTextareaHeights() {
    const { scrollHeight: inputHeight } = inputElement;
    const { scrollHeight: outputHeight } = outputElement;
    const maxHeight = Math.max(inputHeight, outputHeight);
    
    inputElement.style.height = outputElement.style.height = 'auto';
    inputElement.style.height = outputElement.style.height = `${maxHeight}px`;
  }

  function showToast(message) {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 4000);
  }

  // Expose functions to the global scope if needed
  window.processText = processText;
  window.copyToClipboard = copyToClipboard;
  window.clearInput = clearInput;
  window.clearOutput = clearOutput;
});
