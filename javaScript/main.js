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
const tableElement = document.querySelector(".table");
const formElement = document.querySelector(".form");
const pointsLabelElement = document.querySelector;
const twoLabelElement = document.querySelector;
const trheeLableElement = document.querySelector;
var Position;
(function (Position) {
    Position["PG"] = "PG";
    Position["SG"] = "SG";
    Position["SF"] = "SF";
    Position["PF"] = "PF";
    Position["C"] = "C";
})(Position || (Position = {}));
// const player: Player = {
//     position: "C",
//     twoPercent: 50,
//     threePercent: 50,
//     points: 1000
// }
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
const actionTableCreate = (player) => {
    const tdActions = document.createElement("td");
    tdActions.setAttribute("id", "actions");
    const addBtn = document.createElement("button");
    addBtn.innerText = `Add ${player.playerName} to Current Team`;
    // deleteBtn.addEventListener("click", () => {
    //     if (scooter.id) {
    //         deleteScooterById(scooter.id).then(() => getAllScooter());
    //     } else {
    //         console.error("Scooter ID is undefined");
    //     }
    // });
    tdActions.appendChild(addBtn);
    return tdActions;
};
// addPlayer(player)
const renderTable = (players) => {
    const rows = tableElement.querySelectorAll("tr");
    // localStorage.setItem("soldiers", JSON.stringify(scooters));
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
formElement.addEventListener("submit", clickButtonSubmit);
