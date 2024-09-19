"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const BASE_URL = "https://nbaserver-q21u.onrender.com/api/filter";
const BASE_URL_GET = "https://nbaserver-q21u.onrender.com/api/GetAllTeams";
const inputThreePercent = document.querySelector("#three-percent");
const inputTwoPercent = document.querySelector("#two-percent");
const inputPoints = document.querySelector("#points");
const tableElement = document.querySelector(".table");
const formElement = document.querySelector(".form");
const pointsSpanElement = document.querySelector("#points-span");
const twoSpanElement = document.querySelector("#two-span");
const threeSpanElement = document.querySelector("#three-span");
var Position;
(function (Position) {
    Position["PG"] = "PG";
    Position["SG"] = "SG";
    Position["SF"] = "SF";
    Position["PF"] = "PF";
    Position["C"] = "C";
})(Position || (Position = {}));
function addPlayer(player) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield fetch(BASE_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(player)
            });
            if (!response.ok) {
                throw new Error("network error");
            }
            const newPlayer = yield response.json();
            console.log(newPlayer);
            renderTable(newPlayer);
        }
        catch (error) {
            console.error(error);
        }
    });
}
//In the middle of building the bonus
function getAllPlayers() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield fetch(BASE_URL_GET);
            if (!response.ok) {
                throw new Error("Failed to fetch scooters");
            }
            const players = yield response.json();
            console.log(players);
            renderTable(players);
            return players;
        }
        catch (error) {
            console.error(error);
            return [];
        }
    });
}
const playerTableCreate = (player) => {
    const tdPlayerName = document.createElement("td");
    tdPlayerName.innerText = player.playerName;
    return tdPlayerName;
};
const positionTableCreate = (player) => {
    const tdPosition = document.createElement("td");
    tdPosition.innerText = player.position;
    return tdPosition;
};
const pointsTableCreate = (player) => {
    const tdPoints = document.createElement("td");
    tdPoints.innerText = player.points.toString();
    return tdPoints;
};
const twoPercentTableCreate = (player) => {
    const tdTwoPercent = document.createElement("td");
    tdTwoPercent.innerText = player.twoPercent.toString();
    return tdTwoPercent;
};
const threePercentTableCreate = (player) => {
    const tdThreePercent = document.createElement("td");
    tdThreePercent.innerText = player.threePercent.toString();
    return tdThreePercent;
};
const createUlPlayer = (player, ulPlayer) => {
    ulPlayer.innerText = "";
    const liPlayerName = document.createElement("li");
    liPlayerName.innerText = player.playerName;
    ulPlayer.appendChild(liPlayerName);
    const liThree = document.createElement("li");
    liThree.innerText = `three percent: ${player.threePercent.toString()}%`;
    ulPlayer.appendChild(liThree);
    const liTwo = document.createElement("li");
    liTwo.innerText = `two percent: ${player.twoPercent.toString()}%`;
    ulPlayer.appendChild(liTwo);
    const liPoints = document.createElement("li");
    liPoints.innerText = `points: ${player.points.toString()}`;
    ulPlayer.appendChild(liPoints);
};
const addPlayerUl = (player) => {
    const ulPointGuard = document.querySelector("#ul-point-guard");
    const ulShootingGuard = document.querySelector("#ul-shooting-guard");
    const ulSmallForward = document.querySelector("#ul-small-forward");
    const ulPowerForward = document.querySelector("#ul-power-forward");
    const ulCenter = document.querySelector("#ul-center");
    switch (player.position) {
        case "PG":
            createUlPlayer(player, ulPointGuard);
            break;
        case "SG":
            createUlPlayer(player, ulShootingGuard);
            break;
        case "SF":
            createUlPlayer(player, ulSmallForward);
            break;
        case "PF":
            createUlPlayer(player, ulPowerForward);
            break;
        case "C":
            createUlPlayer(player, ulCenter);
            break;
        default:
    }
};
const actionTableCreate = (player) => {
    const tdActions = document.createElement("td");
    tdActions.setAttribute("id", "actions");
    const addBtn = document.createElement("button");
    addBtn.innerText = `Add ${player.playerName} to Current Team`;
    addBtn.addEventListener("click", () => addPlayerUl(player));
    tdActions.appendChild(addBtn);
    return tdActions;
};
const renderTable = (players) => {
    const rows = tableElement.querySelectorAll("tr");
    rows.forEach((row, index) => {
        if (index > 0) {
            row.remove();
        }
    });
    if (!players.length) {
        console.error("No scooters found");
        return;
    }
    players.forEach(player => {
        console.log(JSON.stringify(player));
        const tr = document.createElement("tr");
        tr.appendChild(playerTableCreate(player));
        tr.appendChild(positionTableCreate(player));
        tr.appendChild(pointsTableCreate(player));
        tr.appendChild(twoPercentTableCreate(player));
        tr.appendChild(threePercentTableCreate(player));
        tr.appendChild(actionTableCreate(player));
        tableElement.appendChild(tr);
    });
};
const clickButtonSubmit = (e) => {
    e.preventDefault();
    const newPlayer = {
        position: document.querySelector("#select-position").value,
        twoPercent: +document.querySelector("#two-percent").value,
        threePercent: +document.querySelector("#three-percent").value,
        points: +document.querySelector("#points").value
    };
    addPlayer(newPlayer);
};
const labelExchange = (span, numInput) => {
    span.innerText = numInput.value;
};
inputThreePercent.addEventListener("input", () => { labelExchange(threeSpanElement, inputThreePercent); });
inputPoints.addEventListener("input", () => { labelExchange(pointsSpanElement, inputPoints); });
inputTwoPercent.addEventListener("input", () => { labelExchange(twoSpanElement, inputTwoPercent); });
formElement.addEventListener("submit", clickButtonSubmit);
// getAllPlayers() 
