function every(row, sign) {
	return row.every(item => item === sign);
}
//
//function column(arr, i, sign) {
//	return arr.every(item => item[i] === sign);
//}
//
//
//
//function gg(arr) {
//	for (let i = 0; i< arr.length; i++) {
//  	if ((every(arr[i], 0)) || (every(arr[i], 'x'))) {
//    	return true;
//    }
//  }
//  return false;
//}
//
let signs = document.querySelector(".signs");
signs.addEventListener("mousedown", function(e) {
    let target = event.target;
    drag(target, e);
});

let chosenSign;
let arrOfSigns = Array.from({length: 3}, item => new Array(3).fill(""));
function drag(elem, event) {    
    if (chosenSign === elem.className) {
        document.getElementById("error").innerHTML = "You've made your move with this sign in previous turn!";
        return false;
    } else {
        chosenSign = elem.className;
        document.getElementById("error").innerHTML = "";
    }
    
    let startX = event.clientX;
    let startY = event.clientY;
    
    let origX = elem.offsetLeft;
    let origY = elem.offsetTop;
    
    let deltaX = startX - origX;
    let deltaY = startY - origY;
    
    document.addEventListener("mousemove", elemMove);
    
    document.addEventListener("mouseup", releaseMouse);
    
    function elemMove(e) {
        elem.style.left = e.clientX - deltaX + "px";
        elem.style.top = e.clientY - deltaY + "px";
    }
    
    function releaseMouse(e) {
        document.removeEventListener("mouseup", releaseMouse);
        document.removeEventListener("mousemove", elemMove);
        
        let obj = elem.getBoundingClientRect();
        let c = document.createElement("img");
        if (!checkProperCoords(e.clientX, e.clientY)) {
            elem.style.left = origX + "px";
            elem.style.top = origY + "px";
            return false;
        }
        if (checkProperCoords(e.clientX, e.clientY)) {
            let x = tdCoords(e.clientX, e.clientY);
            let t = document.getElementsByTagName("td");
            let row = document.getElementsByTagName("tr");
            let td = document.getElementsByTagName("td")[x];
            if (!td.childNodes.length) {
                td.appendChild(c);
            }            
            if (elem.className === "x-sign") {
                c.setAttribute("src", "images/x-sign.png");
                arrOfSigns[parseInt(x / row.length)][t[x].cellIndex] = "X";
                if (every(arrOfSigns[parseInt(x / row.length)], "X")) {
                    console.log("GG");
                }
            }
            if (elem.className === "zero-sign") {
                c.setAttribute("src", "images/zero-sign.png");
                arrOfSigns[parseInt(x / row.length)][t[x].cellIndex] = "0";
            }        
            elem.style.left = origX + "px";
            elem.style.top = origY + "px";
        }
    }
}

function checkProperCoords(x, y) {
    let table = document.getElementsByTagName("table")[0];
    let t = table.getBoundingClientRect();
    if ((x < t.left || x > t.right) || (y < t.top || y > t.bottom)) {
        return false;
    }
    if ((x > t.left && x < t.right) && (y > t.top && y < t.bottom)) {
        return true;
    }
}


function tdCoords(x, y) {
    let arr = [];
    let t = document.getElementsByTagName("td");    
    for (let i = 0; i < t.length; i++) {
        let c = t[i].getBoundingClientRect();
        arr[i] = {
            left: c.left,
            top: c.top,
            right: c.right,
            bottom: c.bottom
        };
    }
    for (let i = 0; i < arr.length; i++) {
        if ((x >= arr[i].left && x <= arr[i].right) && (y >= arr[i].top && y <= arr[i].bottom)) {
            return i;
        }
    }
}

