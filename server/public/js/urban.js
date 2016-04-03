var sentences = ["Where are your NYC neighbors reporting problems with water quality?", "test 2", "test 3"],
    iter = 0,
    changeEl = document.getElementById("change");

function changeText() {
    changeEl.innerHTML = sentences[iter % sentences.length];
    iter++;
    setTimeout(changeText, 500);
}
changeText();
