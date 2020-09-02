import React from 'react'

export default function ButtonGenerate({ id, _onClick, name, _class }) {

    return (
        <React.Fragment>
            <button
            type="button"
            id={id}
            className={_class !== undefined ? 'button ' + _class : 'button '}
            onClick={_onClick}>
                <div className="circle"></div>
                <div className="square"
                    size="lg"
                    color="#e63946">{name}</div>
            </button>
        </React.Fragment>
    )
}
