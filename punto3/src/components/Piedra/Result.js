import React from 'react'

const Result = (props) => {
    const { savePoints, player, machine } = props;
    let res = "";
    if (player.defeat === machine.elect && player !== {}) {
        res = "Gana el jugador";
        savePoints(10);
    } else if (machine.defeat === player.elect && player !== {}) {
        res = "Gana la máquina";
    } else if (machine.elect === player.elect && player !== {}) {
        res = "Empate";
        savePoints(5);
    }
    return (
        <div>
            <h3>
                {res}
            </h3>
        </div>
    )
}

export default Result