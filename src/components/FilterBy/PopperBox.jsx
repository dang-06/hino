import React from "react";
import { ClickAwayListener, Popper } from "@mui/material";

const PopperBox = ({ open, anchorEl, handleClickAway, children, style, className, position="right-start" }) => {
    
    return (
        <Popper open={open} anchorEl={anchorEl} placement={position} >
            <ClickAwayListener onClickAway={handleClickAway}>
                <div
                    className={className}
                    style={style}
                >
                 
                    {children}
                </div>
            </ClickAwayListener>
        </Popper>
    );
};

export default PopperBox;
