import React from "react";

const CustomLink = ({ onClick, children, className = "" }) => {
    return (
        <a
            href="#"
            onClick={(e) => {
                e.preventDefault();
                {
                    onClick && onClick();
                }
            }}
            className={className}
        >
            {children}
        </a>
    );
};

export default CustomLink;
