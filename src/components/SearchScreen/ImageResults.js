import React from 'react'

const ImageResults = ({ data }) => {
    const images = (data.items).map((item, index) => {
        return <a href={item.link}><img src={item.image.thumbnailLink} alt={item.title} key={`${index}${item.image.height}`} /></a>
    })
    return (
        <div className="images">{images}</div>
    )
}

export default ImageResults