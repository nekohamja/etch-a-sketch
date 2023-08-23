const container = document.querySelector(".container.main");
const slider = document.querySelector(".slider");
const description = document.querySelector(".description");

// create gridboxes
const div = document.createElement("div");
div.classList.add("grid");
const clone = div.cloneNode(true);
generateGridBox();
slider.addEventListener("change", generateGridBox);

function generateGridBox() {
  description.textContent = `Size: ${slider.value} x ${slider.value}`;
  // delete previous created gridboxes
  const gridBox = document.querySelectorAll(".grid");
  for (let i = 0; i < gridBox.length; i++) gridBox[i].remove();
  // then create new one
  for (let i = 1; i <= slider.value * 2; i++) {
    const newClone = clone.cloneNode(true);
    container.appendChild(newClone);
  }
}
