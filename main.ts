const BASE_URL: string = "https://nbaserver-q21u.onrender.com/api/filter"
const BASE_URL_GET: string = "https://nbaserver-q21u.onrender.com/api/GetAllTeams"
const inputThreePercent = document.querySelector("#three-percent") as HTMLInputElement;
const inputTwoPercent = document.querySelector("#two-percent") as HTMLInputElement;
const inputPoints = document.querySelector("#points") as HTMLInputElement;
const tableElement = document.querySelector(".table") as HTMLTableElement;
const formElement = document.querySelector(".form") as HTMLFormElement;
const pointsSpanElement = document.querySelector("#points-span") as HTMLSpanElement
const twoSpanElement = document.querySelector ("#two-span") as HTMLSpanElement
const threeSpanElement = document.querySelector ("#three-span") as HTMLSpanElement


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

//In the middle of building the bonus
async function getAllPlayers(): Promise<Player[]> {
    try {
        const response = await fetch(BASE_URL_GET);
        if (!response.ok) {
            throw new Error("Failed to fetch scooters");
        }
        const players: Player[] = await response.json();
        console.log(players);
        renderTable(players);
        return players;
    } catch (error) {
        console.error(error);
        return []; 
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


const createUlPlayer: (player:Player, ulPlayer:HTMLUListElement) => void = (player:Player, ulPlayer:HTMLUListElement) => {
    ulPlayer.innerText = ""
    const liPlayerName = document.createElement("li")
    liPlayerName.innerText = player.playerName
    ulPlayer.appendChild(liPlayerName)
    const liThree = document.createElement("li")
    liThree.innerText = `three percent: ${player.threePercent.toString()}%`
    ulPlayer.appendChild(liThree)
    const liTwo = document.createElement("li")
    liTwo.innerText = `two percent: ${player.twoPercent.toString()}%`
    ulPlayer.appendChild(liTwo)
    const liPoints = document.createElement("li")
    liPoints.innerText = `points: ${player.points.toString()}`
    ulPlayer.appendChild(liPoints)
}

const addPlayerUl: (player:Player) => void = (player:Player) =>{
    const ulPointGuard = document.querySelector("#ul-point-guard") as HTMLUListElement;
    const  ulShootingGuard = document.querySelector("#ul-shooting-guard") as HTMLUListElement;
    const  ulSmallForward = document.querySelector("#ul-small-forward") as HTMLUListElement;
    const  ulPowerForward = document.querySelector("#ul-power-forward") as HTMLUListElement;
    const ulCenter = document.querySelector("#ul-center") as HTMLUListElement;

    switch(player.position){
        case "PG":
            createUlPlayer(player, ulPointGuard)
            break
        case "SG":
            createUlPlayer(player, ulShootingGuard)
            break
        case  "SF":
            createUlPlayer(player, ulSmallForward)
            break
        case  "PF":  
        createUlPlayer(player, ulPowerForward)
            break    
        case  "C":  
        createUlPlayer(player, ulCenter)
            break
            default:
              
    }
}

const actionTableCreate = (player: Player): HTMLTableCellElement => {
    const tdActions = document.createElement("td");
    tdActions.setAttribute("id", "actions");

    const addBtn = document.createElement("button");
    addBtn.innerText = `Add ${player.playerName} to Current Team`;
    addBtn.addEventListener("click", () => addPlayerUl(player))
    tdActions.appendChild(addBtn);
    return tdActions;
}




const renderTable: (players: Player[]) => void = (players: Player[]) => {
    const rows = tableElement.querySelectorAll("tr");
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
const labelExchange: (span:HTMLSpanElement, numInput:HTMLInputElement) => void = (span:HTMLSpanElement, numInput:HTMLInputElement) => {
    span.innerText = numInput.value
}

inputThreePercent.addEventListener("input", ()=>{labelExchange(threeSpanElement, inputThreePercent)})
inputPoints.addEventListener("input", ()=>{labelExchange(pointsSpanElement, inputPoints)})
inputTwoPercent.addEventListener("input", ()=>{labelExchange(twoSpanElement, inputTwoPercent)})
formElement.addEventListener("submit", clickButtonSubmit);

// getAllPlayers() 