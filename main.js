document.querySelector(".hall").addEventListener("click", selectSeats);
document.querySelector(".valuta").addEventListener("change", changeVal);
document.querySelector(".buyBut").addEventListener("click", buyTicket);

let price;

createHall(7);

function createRow(num) {
    let row = document.createElement("li");
    row.classList.add("row");
    document.querySelector(".hall").append(row);

    let flex = document.createElement("div");
    flex.classList.add("flex");
    row.append(flex);

    for (let i = 0; i < num; i++) {
        let seat = document.createElement("div");
        seat.classList.add("seat");
        flex.append(seat);
    }
}

function randomInteger(max) {
    let rand = +Math.random() * (max + 1) - 0.5;
    return Math.round(rand);
}

function fillingHall() {
    let rows = document.querySelectorAll(".row");
    for (let i = 0; i < rows.length; i++) {
        let seats = rows[i].firstChild.children;
        let numOfReservedSeats = randomInteger(seats.length - 1);
        for (let j = 0; j < numOfReservedSeats; j++) {
            let reserved = randomInteger(seats.length - 1);
            seats[reserved].classList.add("reserved");
        }
    }
}

function createHall(n) {
    let num = 12;
    for (let i = 0; i < n; i++) {
        createRow(++num);
    }
    fillingHall();
    price = createPrice();
}

function selectSeats(event) {
    if (
        !event.target.classList.contains("reserved") &&
        event.target.classList.contains("seat")
    ) {
        event.target.classList.toggle("selected");
    }
    calcCost();
}

function createPrice() {
    let numOfRows = Array.from(document.querySelectorAll(".row"));
    let BYN = {};
    let USD = {};
    let EUR = {};
    for (let i = numOfRows.length - 1; i >= 0; i--) {
        BYN[i] = (numOfRows.length - i) * 5;
        USD[i] = Math.ceil(((numOfRows.length - i) * 500) / 2.5) / 100;
        EUR[i] = Math.ceil(((numOfRows.length - i) * 500) / 3) / 100;

        let tableRow = document.createElement("tr");
        document.querySelector(".price").append(tableRow);

        let tableCol = document.createElement("td");
        tableRow.append(tableCol);
        tableCol.innerHTML = numOfRows.length - i;

        let tableCol2 = document.createElement("td");
        tableRow.append(tableCol2);
        tableCol2.innerHTML = BYN[i];
    }
    return { BYN, USD, EUR };
}

function calcCost() {
    let val = document.querySelector(".valuta").value;
    let selectedElem = Array.from(document.querySelectorAll(".selected"));
    let numOfRows = Array.from(document.querySelectorAll(".row"));
    let cost = 0;
    for (let i = 0; i < selectedElem.length; i++) {
        let el = selectedElem[i].parentElement.parentElement;
        let ind = numOfRows.indexOf(el);
        cost += price[val][ind];
    }
    console.log(cost)
    document.querySelector(
        ".cost"
    ).innerHTML = `Выбрано ${selectedElem.length} за ${+cost.toFixed(2)} ${val}`;
}

function changeVal() {
    let val = document.querySelector(".valuta").value;
    let td = Array.from(document.querySelectorAll("td")).filter(
        (e, i) => i % 2 === 1
    );
    let th = Array.from(document.querySelectorAll("th"));
    th[1].innerHTML = val;
    for (let i = 0; i < td.length; i++) {
        td[i].innerHTML = price[val][i];
    }
    calcCost();
}

function buyTicket() {
    let selectedElem = Array.from(document.querySelectorAll(".selected"));
    for (let i = 0; i < selectedElem.length; i++) {
        selectedElem[i].classList.remove("selected");
        selectedElem[i].classList.add("reserved");
    }
    calcCost();
}