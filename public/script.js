const textArea = document.getElementById("text_to_summarize");
const submitButton = document.getElementById("submit-button");
const submitText = document.getElementById("submit-button-text")
const summarizedTextArea = document.getElementById("summary");
const body = document.body;
const darkModeToggle = document.getElementById("dark-mode-toggle");

submitButton.disabled = true;

// Toggle dark mode
const toggleDarkMode = () => {
  body.classList.toggle("dark-mode");
};

// Button event listeners
textArea.addEventListener("input", verifyTextLength);
submitButton.addEventListener("click", submitData);
darkModeToggle.addEventListener("click", toggleDarkMode); // Add dark mode toggle listener

// Function to verify text length
function verifyTextLength(e) {
  const text = e.target.value;
  if (text.length > 200 && text.length < 100000) {
    submitButton.disabled = false;
  } else {
    submitButton.disabled = true;
  }
}

// Function to submit data
async function submitData(e) {
  submitButton.classList.add("submit-button--loading");
  // submitText.textContent = ""; // Change button text to Loading

  const text_to_summarize = textArea.value;

  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const raw = JSON.stringify({
    text_to_summarize: text_to_summarize,
  });

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  fetch("http://localhost:3000/summarize", requestOptions)
    .then((res) => res.text())
    .then((summary) => {
      summarizedTextArea.value = summary;
      submitButton.classList.remove("submit-button--loading");
      submitButton.innerHTML = "Summarize"; // Reset button text
    })
    .catch((error) => {
      console.log("error", error);
      submitButton.classList.remove("submit-button--loading");
      submitButton.innerHTML = "Error!"; // Indicate an error
    });

    submitText.textContent = "Summarize";
}
