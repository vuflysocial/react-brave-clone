import React from 'react'

const WebResults = ({ item: { formattedUrl, title, displayLink, htmlSnippet } }) => {
    return (
        <div className="webResults">
            <div>
                {/* <img src={pagemap.cse_image[0].src} alt="" /> */}
                <h2><a href={formattedUrl}>{title}</a></h2>
            </div>
            <p className="webResults__link"><a href={formattedUrl}>{displayLink}</a></p>
            {/* <p dangerouslySetInnerHTML={`{ _html: htmlSnippet }`} /> */}
            <p className="webResults__description">{htmlSnippet}</p>
        </div>
    )
}

export default WebResults