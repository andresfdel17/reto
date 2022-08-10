import React from 'react'

const Result = (props) => {
    const { winning } = props;

    return (
        <div>
            <h3>
                {winning}
            </h3>
        </div>
    )
}

export default Result