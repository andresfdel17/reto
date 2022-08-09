import React from 'react'

const Opcion = (props) => {
    const { electO } = props;
    return (
        <div className="opcion" onClick={electO}>
            {props.elect}
        </div>
    )
}

export default Opcion