// global variables
let selectedColor;
let dishesStorage = [];
const colors = ["#3c56aa", "red", "pink", "yellow"];
//
function init() {
    const buttonIcons = ["fa fa-plus-square-o", "fa fa-times", "fa fa-font", "fa fa-strikethrough", "fa fa-check-square-o", "fa fa-square-o", "fa fa-sort"];
    const colorsDiv = document.createElement("div");
    colorsDiv.id = "colorsDiv";

    //colors
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

    //textbox
    let node = document.createElement("input");
    node.type = "text";
    node.className = "textBox";
    node.maxLength = 72;
    node.placeholder = "Introduce aqui el nuevo plato...";
    document.getElementById("mainContainer").appendChild(colorsDiv);
    document.getElementById("mainContainer").appendChild(node);

    //buttons
    node = document.createElement("div");
    node.id = "buttonsDiv";

    for (let i = 0; i < buttonIcons.length; i++) {
        const icon = document.createElement("i");
        icon.className = buttonIcons[i];
        icon.className += " button";
        node.appendChild(icon);
    }

    document.getElementById("mainContainer").appendChild(node);
    
    loadMenu();
    initListeners();
}

function initListeners() {
    //color picker listener
    let colors = [].slice.call(document.querySelectorAll(".color"));
    colors.map(e => e.addEventListener("click", function(){
        selectedColor.className = "color";
        selectedColor = this;
        selectedColor.className = "color selectedColor";
    }, false));

    //textbox listener 
    let tb = document.querySelector(".textBox").addEventListener("keypress", function(e){
        if(e.key === 'Enter'){
            addDish(this.value);
            var menu = document.getElementById("menu");
            this.value = "";
        }
    }, false);
    
    //buttons listeners//
    let buttons = document.querySelectorAll(".button");
    //addDish
    buttons[0].addEventListener("click", function(){
        addDish(document.querySelector(".textBox").value);
        document.querySelector(".textBox").value = "";
    }, false);   
    //removeDishes
    buttons[1].addEventListener("click", removeDishes, false);
    //unLineThrough
    buttons[2].addEventListener("click", unLineThrough, false);    
    //lineThrough
    buttons[3].addEventListener("click", lineThrough, false);
    //checkAll
    buttons[4].addEventListener("click", checkAll, false);
    //uncheckAll
    buttons[5].addEventListener("click", unCheckAll, false);
    //sortDishes
    buttons[6].addEventListener("click", sortDishes, false);
}

function loadMenu(){
    let menu = document.createElement("div");
    menu.id = "menu";
    document.getElementById("mainContainer").appendChild(menu);
    loadLS();
    for(let i = 0; i < dishesStorage.length; i++){
        loadDish(dishesStorage[i]);
    }
    sortDishes();
}

function loadDish(_dish){
    //HTML
    let dish = document.createElement("div");
    dish.className = "dish";
    dish.style.backgroundColor = _dish._color;
    
    let check = document.createElement("input");
    check.type = "checkbox";
    check.name = "menuDishes";
    
    let text = document.createElement("span");
    text.className = "dishName";
    text.textContent = _dish._name;
    
    dish.appendChild(check);
    dish.appendChild(text);
    
    document.getElementById("menu").appendChild(dish);
}

function addDish(name){
    if(name != ""){
        //localStorage
        let dishObj = {
            _name: name,
            _color: selectedColor.style.backgroundColor,
        }
        dishesStorage.push(dishObj);
        saveLS();
        loadLS();

        //HTML
        let dish = document.createElement("div");
        dish.className = "dish";
        dish.style.backgroundColor = selectedColor.style.backgroundColor;
        dish.style.order = 50;
        
        let check = document.createElement("input");
        check.type = "checkbox";
        check.name = "menuDishes";
        
        let text = document.createElement("span");
        text.className = "dishName";
        text.textContent = name;
        
        dish.appendChild(check);
        dish.appendChild(text);
        
        document.getElementById("menu").appendChild(dish);
    }
}

function checkAll(){
    let checkboxes = document.querySelectorAll(".dish > input");
    for(let i = 0; i < checkboxes.length; i++){
        checkboxes[i].checked = true;
    }
}

function unCheckAll(){
    let checkboxes = document.querySelectorAll(".dish > input");
    for(let i = 0; i < checkboxes.length; i++){
        checkboxes[i].checked = false;
    }
}

function getChecked(){
    let checkboxes = document.querySelectorAll(".dish > input");
    let checked = [];

    for(let i = 0; i < checkboxes.length; i++){
        if(checkboxes[i].checked == true){
            checked.push(checkboxes[i]);
        }
    }

    return checked;
}

function lineThrough(){
    let checkboxes = getChecked();

    for(let i = 0; i < checkboxes.length; i++){
        checkboxes[i].nextSibling.style.textDecoration = "line-through";
    }
}

function unLineThrough(){
    let checkboxes = getChecked();

    for(let i = 0; i < checkboxes.length; i++){
        checkboxes[i].nextSibling.style.textDecoration = "none";
    }
}

function sortDishes(){
    let dishes = document.querySelectorAll(".dish");

    for(let i = 0; i < dishes.length; i++){
        let color = dishes[i].style.backgroundColor;
        if(color.indexOf("rgb(") != -1){
            color = rgbToHex(color);
        }
        let order = colors.indexOf(color);
        dishes[i].style.order = order;
    }
}

function componentFromStr(numStr, percent) {
    var num = Math.max(0, parseInt(numStr, 10));
    return percent ?
        Math.floor(255 * Math.min(100, num) / 100) : Math.min(255, num);
}

function rgbToHex(rgb) {
    var rgbRegex = /^rgb\(\s*(-?\d+)(%?)\s*,\s*(-?\d+)(%?)\s*,\s*(-?\d+)(%?)\s*\)$/;
    var result, r, g, b, hex = "";
    if ( (result = rgbRegex.exec(rgb)) ) {
        r = componentFromStr(result[1], result[2]);
        g = componentFromStr(result[3], result[4]);
        b = componentFromStr(result[5], result[6]);

        hex = "#" + (0x1000000 + (r << 16) + (g << 8) + b).toString(16).slice(1);
    }
    return hex;
}

function removeDishes(){
    let menu = document.getElementById("menu");
    let dishes = [];
    let checkboxes = getChecked();

    for(let i = 0; i < checkboxes.length; i++){
        dishes.push(checkboxes[i].parentElement);
        menu.removeChild(dishes[i]);
    }   
}

function saveLS(){
    aux = JSON.stringify(dishesStorage);
    localStorage.setItem("dishes", aux);
}

function loadLS(){
    dishesStorage = JSON.parse(localStorage.getItem("dishes"));
}