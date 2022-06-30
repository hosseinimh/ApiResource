import React, { useEffect } from "react";
import utils from "../../utils/Utils";

const Table = ({
    items,
    renderHeader,
    renderItems,
    renderFooter = null,
    className = "",
    style = {},
}) => {
    useEffect(() => {
        renderItems();
    }, [items]);

    return (
        <>
            <table
                className={`table table-striped table-hover ${className}`}
                style={style}
            >
                <thead style={style}>{renderHeader()}</thead>
                <tbody style={style}>{renderItems()}</tbody>
                {renderFooter && <tfoot>{renderFooter()}</tfoot>}
            </table>
        </>
    );
};

export default Table;
