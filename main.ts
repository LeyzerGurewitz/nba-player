const BASE_URL: string = "https://nbaserver-q21u.onrender.com/api/filter"

const tableElement = document.querySelector(".table") as HTMLTableElement;
const formElement = document.querySelector(".form") as HTMLFormElement;
const pointsLabelElement = document.querySelector
const twoLabelElement = document.querySelector
const trheeLableElement = document.querySelector
enum Position {
    PG = "PG",
     SG = "SG",
    SF  = "SF",
    PF = "PF",
    C ="C"
}
interface Player {

    position: Position; 
    twoPercent: Number; 
    threePercent: Number; 
    points: Number;
    playerName: string
}

interface Stats {
    position: Position; 
    twoPercent: Number; 
    threePercent: Number; 
    points: Number;
}

// const player: Player = {
//     position: "C",
//     twoPercent: 50,
//     threePercent: 50,
//     points: 1000


// }

async function addPlayer(player: Stats): Promise<void> {
    try {
        const response = await fetch(BASE_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(player)
        });

        if (!response.ok) {
            throw new Error("network error");
        }

        const newPlayer: Player[] = await response.json();
        console.log(newPlayer);
        renderTable(newPlayer)

    } catch (error) {
        console.error(error);

    }
}
const playerTableCreate = (player: Player): HTMLTableCellElement => {
    const tdPlayerName = document.createElement("td");
    tdPlayerName.innerText = player.playerName;
    return tdPlayerName;
}

const positionTableCreate = (player: Player): HTMLTableCellElement => {
    const tdPosition = document.createElement("td");
    tdPosition.innerText = player.position;
    return tdPosition;
}

const pointsTableCreate = (player: Player): HTMLTableCellElement => {
    const tdPoints = document.createElement("td");
    tdPoints.innerText = player.points.toString();
    return tdPoints;
}

const twoPercentTableCreate = (player: Player): HTMLTableCellElement => {
    const tdTwoPercent = document.createElement("td");
    tdTwoPercent.innerText = player.twoPercent.toString();
    return tdTwoPercent;
}

const threePercentTableCreate = (player: Player): HTMLTableCellElement => {
    const tdThreePercent = document.createElement("td");
    tdThreePercent.innerText = player.threePercent.toString();
    return tdThreePercent;
}

const actionTableCreate = (player: Player): HTMLTableCellElement => {
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
}


// addPlayer(player)

const renderTable: (players: Player[]) => void = (players: Player[]) => {
    const rows = tableElement.querySelectorAll("tr");
    // localStorage.setItem("soldiers", JSON.stringify(scooters));
    rows.forEach((row, index) => {
        if (index > 0) {
            row.remove();
        }
    });

    if (!players.length){
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
}


const clickButtonSubmit = (e: Event) => {
    e.preventDefault();

    const newPlayer: Stats = {
        position: (document.querySelector("#select-position") as HTMLSelectElement).value as Position,
        twoPercent: +(document.querySelector("#two-percent") as HTMLInputElement).value,
        threePercent: +(document.querySelector("#three-percent") as HTMLInputElement).value,
        points: +(document.querySelector("#points") as HTMLInputElement).value 
    };

    addPlayer(newPlayer)
}


formElement.addEventListener("submit", clickButtonSubmit);

