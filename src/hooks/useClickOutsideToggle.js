import { useEffect, useRef, useState } from "react";


const useClickOutsideToggle = () => {
    // sets state for burger menu in collapsed or expanded state
    // function checks for mouse click and closes menu
    const [expanded, setExpanded] = useState(false);
    const ref = useRef(null);
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (ref.current && !ref.current.contains(event.target)) {
                setExpanded(false);
            }
        };

        document.addEventListener("mouseup", handleClickOutside);
        return () => {
            document.removeEventListener("mouseup", handleClickOutside);
        };
    }, [ref]);

    return { expanded, setExpanded, ref };
};

export default useClickOutsideToggle;