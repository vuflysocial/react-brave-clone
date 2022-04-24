import React from 'react'

const ImageResults = ({ data }) => {
    console.log(data, "image");
    const images = (data.items).map((item) => {
        console.log(item);
        return <img src={item.image.thumbnailLink} alt={item.title} />
    })
    return (
        <div>{images}</div>
    )
}

export default ImageResults