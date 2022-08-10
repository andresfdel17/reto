import React from 'react'

const Image = (props) => {
    const { imagePath } = props;
    return (
        <div>
            <img src={require('../../assets/images/' + imagePath)} alt="hangman_image" width="300px" height="300px" />
        </div>
    )
}

export default Image