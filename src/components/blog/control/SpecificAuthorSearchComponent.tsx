import React, { useState } from "react";

export interface Props {
    onClick: (name: string) => void;
}

const SpecificAuthorSearchComponent: React.FC<Props> = (props) => {
    const { onClick } = props;
    const [name, setName] = useState("");
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
    }
    return (
        <div>
            <input type="text" onChange={handleChange}></input>
            <button onClick={() => onClick(name)}>검색</button>
        </div>
    );
}

export default SpecificAuthorSearchComponent;