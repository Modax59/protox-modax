import React from "react";
import ContentLoader from "react-content-loader";

const DropdownLoader = (props) => {
    return (
        <ContentLoader
            speed={2}
            width={476}
            height={40}
            viewBox="0 0 476 40"
            backgroundColor="#f3f3f3"
            foregroundColor="#ecebeb"
            {...props}
        >
            <rect x="310" y="13" rx="3" ry="3" width="88" height="10" />
            <rect x="410" y="13" rx="3" ry="3" width="13" height="10" />
        </ContentLoader>
    );
};

export default DropdownLoader;
