import React from "react"
import ContentLoader from "react-content-loader"

const MyLoader = (props) => (
    <ContentLoader
        speed={2}
        width={345}
        height={450}
        viewBox="0 0 345 450"
        backgroundColor="#e5e5e5"
        foregroundColor="#ecebeb"
        {...props}
    >
        <rect x="11" y="1" rx="30" ry="30" width="322" height="438" />
        <rect x="376" y="213" rx="9" ry="9" width="110" height="93" />
    </ContentLoader>
)

export default MyLoader

