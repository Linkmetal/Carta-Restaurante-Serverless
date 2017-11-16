function init() {
    let colors = ["blue", "red", "pink", "yellow"];
    let buttonIcons = ["fa fa-plus-square-o", "fa fa-times", "fa fa-strikethrough", "fa  fa-check-square-o", "fa fa-square-o", "fa fa-sort"];
    let colorsDiv = document.createElement("div");
    colorsDiv.id = "colorsDiv";
    
    for(let i = 0; i < colors.length; i++) {
        let color = document.createElement("div");
        color.className = "color";
        color.style.backgroundColor = colors[i];
        colorsDiv.appendChild(color);
    }

    
    let node = document.createElement("input");
    node.type = "text";
    node.className = "textBox";
    node.placeholder = "Introduce aqui el nuevo plato...";
    document.getElementById("mainContainer").appendChild(colorsDiv);
    document.getElementById("mainContainer").appendChild(node);

    node = document.createElement("div");
    node.id = "buttonsDiv";

    for(let i = 0; i < buttonIcons.length; i++){
        let icon = document.createElement("i");
        icon.className = buttonIcons[i];
        icon.className += " button";
        node.appendChild(icon);
    }

    document.getElementById("mainContainer").appendChild(node);
    
}

