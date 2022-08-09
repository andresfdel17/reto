export function savePointsF(name, points) {
    if(localStorage.getItem("List") === null | localStorage.getItem("List") === ""){
        localStorage.setItem("List", JSON.stringify([]));
    }

    let list = JSON.parse(localStorage.getItem("List"));
    let f = list.find(el => el.name === name);
    if(typeof f === "undefined"){
        list.push({
            name:name,
            points: 0
        });
    }
    f = list.findIndex(el => el.name === name);
    list[f].points += points;
    localStorage.setItem("List", JSON.stringify(list));
}