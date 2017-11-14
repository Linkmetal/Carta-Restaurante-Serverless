function init() {
    let colors = ["blue", "red", "pink", "yellow"];
    let colorsDiv = document.createElement("div");
    colorsDiv.id = "colorsDiv";
    
    for(let i = 0; i < colors.length; i++) {
        let color = document.createElement("div");
        color.className = "color";
        color.style.backgroundColor = colors[i];
        colorsDiv.appendChild(color);
    }

    
    let node = document.createElement("textarea");
    node.className = "textArea";
    node.placeholder = "Introduce aqui el nuevo plato...";
    node.rows = 1;
    node.cols = 100;
    document.getElementById("mainContainer").appendChild(colorsDiv);
    document.getElementById("mainContainer").appendChild(node);
}