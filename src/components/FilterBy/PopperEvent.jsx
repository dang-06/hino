import React from "react";
import PopperBox from "./PopperBox";
import { ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { MdArrowRight } from "react-icons/md";
import ListFilterValue from "./ListFilterValue";
import { useDispatch } from "react-redux";

const PopperEvent = ({ item, label, handleUpdate }) => {
    const dispatch = useDispatch()
    const [expanded, setExpanded] = React.useState(null);

    const handleEventClick = (event) => {
        setExpanded(expanded ? null : event.currentTarget);
    };

    const closeExpanded = () => {
        setExpanded(null);
    };


    return (
        <>
            <ListItemButton onClick={handleEventClick} sx={{
                paddingTop: '1px',
                paddingBottom: '1px',
            }}>
                <ListItemText primary={item.label} />
                {item.isNested &&
                    <>

                        <ListItemIcon sx={{
                            minWidth: 'auto',
                            'MuiListItemIcon-root': {
                            }
                        }}>
                            <MdArrowRight size={20} />
                        </ListItemIcon>
                    </>
                }

            </ListItemButton>
            <PopperBox
                className="bg-white min-w-[200px] p-3 border-gray-300 border shadow-lg rounded-[8px] ml-1 max-h-[50vh] overflow-hidden"
                handleClickAway={closeExpanded}
                open={!!expanded}
                anchorEl={expanded}
            >
                <ListFilterValue name={item.key} setListData={handleUpdate} listData={item.children} />
            </PopperBox>
        </>

    );
};

export default PopperEvent;

{/* <div>
<button onClick={handleEventClick}>{label}</button>
<PopperBox
    className="bg-white min-w-[200px] p-3 border-gray-300 border shadow-lg rounded-[8px]"

    handleClickAway={closeExpanded}
    open={!!expanded}
    anchorEl={expanded}
/>
</div> */}