import React from 'react'

const Opcion = (props) => {
    const { electO, elect } = props;
    return (
        <div className="opcion" onClick={electO}>
            {elect}
        </div>
    )
}

export default Opcion