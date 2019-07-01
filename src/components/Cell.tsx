import React from 'react';
import PropTypes from 'prop-types';

export type CellProps = {
    value?: string,
    openCell: (x: number, y:number) => void,
    level: number,
    x: number,
    y: number,
    disabled: boolean
}

const Cell: React.FC<CellProps> = (props) => {
    const {x, y, value} = props;

    let classes = (x+y) % 2 === 0 ? 'cell light' : 'cell';
    classes+= `${props.disabled ? ' open': ''} level${props.level}`;

    const openCell = (x: number, y:number, event: any) => {
        props.openCell(x, y);
        event.currentTarget.disabled = true;
    };

    return (
        <button
            className={classes}
            disabled={props.disabled}
            onClick={(e) => openCell(x, y, e)} >{value}</button>
    );
};

Cell.propTypes = {
    value: PropTypes.string,
    openCell: PropTypes.func.isRequired,
    level: PropTypes.number.isRequired,
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
    disabled: PropTypes.bool.isRequired
};

export default Cell;