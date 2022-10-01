

function Conflicts(values) {

    values = values.map(
        item => {
            let new_item = {...item};
            new_item.conflict = false;
            item = new_item;
            return item;
        }
    );

    let rows_conflict = getRowsConflict(values);
    values = setConflicts(values, rows_conflict);

    let cols_conflict = getColumnsConflict(values);
    values = setConflicts(values, cols_conflict);

    let cells_conflict = getCellConflict(values);
    values = setConflicts(values, cells_conflict);

    return values;
}


function setConflicts(values, conflicts) {
    conflicts.map(
        item => {
            if (values[item].changeable) {
                let new_val = {...values[item]};
                new_val.conflict = true;
                values[item] = new_val;
            }
        }
    );
    return values;
}


function getColumnsConflict(values) {
    let repeated_values = [];
    for (let i=0; i<9; ++i) {
        let col = "";
        for (let y=0; y<9; ++y) {
            let num = y * 9 + i;
            let value = values[num].value;
            col += value;
        }
        let reps = checkValues(col);
        reps = reps.map( item => item * 9 + i );
        reps.map( item => repeated_values.push(item) );
    }
    return repeated_values;
}


function getRowsConflict(values) {
    let repeated_values = [];
    for (let i = 0; i<9; ++i) {
        let row = "";
        for (let y=0; y<9; ++y) {
            let num = i * 9 + y;
            let value = values[num].value;
            row += value;
        }
        let reps = checkValues(row);
        reps = reps.map( item => item + i * 9 );
        reps.map( item => repeated_values.push(item) );
    }
    return repeated_values;
}


function getCellConflict(values) {
    let repeated_values = [];
    for (let row3x9=0; row3x9<3; ++row3x9) {
        for (let cell3x3=0; cell3x3<3; ++cell3x3) {
            let row = "";
            for (let row1x3=0; row1x3<3; ++row1x3) {
                for (let cell=0; cell<3; ++cell) {
                    let num = cell3x3 * 3 + row1x3 * 9 + cell;
                    let value = values[num].value;
                    row += value;
                }
            }
            let reps = checkValues(row);
            reps = reps.map(
                item => {
                    let num = (item - item % 3)  * 3 + item % 3 + row3x9 * 27 + cell3x3 * 3;
                    repeated_values.push(num);
                    return num;
                }
            );
        }
        values = values.slice(27, values.length);
    }
    return repeated_values;
}


function checkValues(line) {
    let rep_vals = [];
    for (let i=0; i<line.length; ++i) {
        let char = line.charAt(i);
        let char_num = line.length - line.replaceAll(char, "").length;
        if (char_num > 1 && char !== " ") {
            for (let y=0; y<char_num; ++y) {
                let char_ind = line.indexOf(char);
                rep_vals.push(char_ind);
                line = line.replace(char, " ");
            }
        } else { line.replace(char, " "); }
    }
    return rep_vals;
}


export default Conflicts;
