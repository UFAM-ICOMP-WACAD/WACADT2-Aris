async function generateLoremIpsum() {
  const paragraphCount = document.getElementById('paragraphCount').value;
  const response = await fetch(`/lorem/${paragraphCount}`);
  const text = await response.text();
  document.getElementById('output').innerHTML = text;
}