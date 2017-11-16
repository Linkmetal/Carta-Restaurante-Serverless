// global variables
let selectedColor;
//
function init() {
    const colors = ["#3c56aa", "red", "pink", "yellow"];
    const buttonIcons = ["fa fa-plus-square-o", "fa fa-times", "fa fa-strikethrough", "fa  fa-check-square-o", "fa fa-square-o", "fa fa-sort"];
    const colorsDiv = document.createElement("div");
    colorsDiv.id = "colorsDiv";

    for (let i = 0; i < colors.length; i++) {
        const color = document.createElement("div");
        color.className = "color";
        color.style.backgroundColor = colors[i];
        colorsDiv.appendChild(color);
        if (i === 0) {
            selectedColor = color;
            selectedColor.className += " selectedColor";
        } 
    }

    let node = document.createElement("input");
    node.type = "text";
    node.className = "textBox";
    node.placeholder = "Introduce aqui el nuevo plato...";
    document.getElementById("mainContainer").appendChild(colorsDiv);
    document.getElementById("mainContainer").appendChild(node);

    node = document.createElement("div");
    node.id = "buttonsDiv";

    for (let i = 0; i < buttonIcons.length; i++) {
        const icon = document.createElement("i");
        icon.className = buttonIcons[i];
        icon.className += " button";
        node.appendChild(icon);
    }

    document.getElementById("mainContainer").appendChild(node);

    initListeners();
    loadMenu();
}

function initListeners() {
    let colors = [].slice.call(document.querySelectorAll(".color"));
    colors.map(e => e.addEventListener("click", function(){
        selectedColor.className = "color";
        selectedColor = this;
        selectedColor.className = "color selectedColor";
    }, false));
}

function loadMenu(){
    let menu = document.createElement("div");
    menu.id = "menu";

    document.getElementById("mainContainer").appendChild(menu);
    addDish();
    addDish();
    
}

function addDish(){
    let dish = document.createElement("div");
    dish.className = "dish";
    //dish.textContent = "Papas con mojo";
    dish.style.backgroundColor = selectedColor.style.backgroundColor;
    
    let check = document.createElement("input");
    check.type = "checkbox";
    check.name = "menuDishes";
    
    let text = document.createElement("span");
    text.className = "dishName";
    text.textContent = "Papas con mojo";
    
    dish.appendChild(check);
    dish.appendChild(text);
    
    document.getElementById("menu").appendChild(dish);
    

}