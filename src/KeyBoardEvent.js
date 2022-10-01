
function KeyBoardEvent(event, activeCell, setActiveCell, setValue) {
    switch (event.key) {
        case "ArrowUp":
            if (activeCell > 8) setActiveCell(activeCell - 9);
            break;
        case "ArrowDown":
            if (activeCell < 72) setActiveCell(activeCell + 9);
            break;
        case "ArrowLeft":
            if ((activeCell + 1) % 9 !== 1) setActiveCell(activeCell - 1);
            break;
        case "ArrowRight":
            if ((activeCell + 1) % 9 !== 0) setActiveCell(activeCell + 1);
            break;
        case "Delete": case "Backspace": case "0":
            setValue(" ");
            break;
        case "1": case "2": case "3": case "4": case "5": case "6": case "7": case "8": case "9":
            setValue( + event.key);
            break;
    }
}

export default KeyBoardEvent;
