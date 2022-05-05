import React from 'react'

const WebResults = ({ item: { formattedUrl, title, displayLink, htmlSnippet } }) => {
    return (
        <div className="webResults">
            <div>
                <h2><a href={formattedUrl}>{title}</a></h2>
            </div>
            <p className="webResults__link"><a href={formattedUrl}>{displayLink}</a></p>
            <p className="webResults__description" dangerouslySetInnerHTML={{ __html: htmlSnippet }} />
        </div>
    )
}

export default WebResults