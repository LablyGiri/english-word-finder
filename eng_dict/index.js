const input = document.getElementById("input");
const infoText = document.getElementById("info-text");
const meaningContainer = document.getElementById("meaning-container");
const title = document.getElementById("title");
const meaning = document.getElementById("meaning");
const audio = document.getElementById("audio");

async function fetchWordData(word) {
  try {
    // Show loading text
    infoText.style.color = "#555";
    infoText.innerText = `Searching meaning for "${word}"...`;

    // API call
    const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
    const data = await response.json();

    // If word not found
    if (data.title) {
      infoText.style.color = "red";
      infoText.innerText = "Word not found! Try another.";
      meaningContainer.style.display = "none";
      return;
    }

    // Display word & meaning
    title.innerText = data[0].word;
    meaning.innerText = data[0].meanings[0].definitions[0].definition;

    // Display audio if available
    audio.src = data[0].phonetics[0]?.audio || "";
    audio.style.display = audio.src ? "block" : "none";

    infoText.innerText = "";
    meaningContainer.style.display = "block";

  } catch (error) {
    infoText.style.color = "red";
    infoText.innerText = "An error occurred. Please try again.";
    meaningContainer.style.display = "none";
  }
}

// Event: Search when pressing Enter
input.addEventListener("keyup", (e) => {
  if (e.key === "Enter" && input.value.trim() !== "") {
    fetchWordData(input.value.trim());
  }
});
