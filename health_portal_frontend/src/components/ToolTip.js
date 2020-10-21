import React from "react";
import Tooltip from "react-bootstrap/Tooltip";

const renderTooltip = message => (
    <Tooltip id={"tooltipId"}>
        {message}
    </Tooltip>
);

export default renderTooltip;