export function savePointsF(name, points, game = "") {
    if (localStorage.getItem("List") === null | localStorage.getItem("List") === "") {
        localStorage.setItem("List", JSON.stringify([]));
    }

    let list = JSON.parse(localStorage.getItem("List"));
    list.push({
        name: name,
        game,
        points,
    });

    localStorage.setItem("List", JSON.stringify(list));
}

export function getPlayerName() {
    let name = "";
    if (localStorage.getItem("actualPlayer") !== null | localStorage.getItem("actualPlayer") !== "") {
        name = localStorage.getItem("actualPlayer");
    } else {
        name = prompt("Ingrese su nombre");
        localStorage.setItem("name", name);
        localStorage.setItem("actualPlayer", name);
    }
    return name;
}