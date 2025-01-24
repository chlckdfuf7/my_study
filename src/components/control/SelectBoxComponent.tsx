import React from "react";

export interface SelectProps {
    list: string[];
    className: string;
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const SelectBoxComponent: React.FC<SelectProps> = (props) => {
    const {list, className, onChange} = props;
    
    const renderList = () => {
        return list.map((item) => (
            <option key={item} value={item}>{item}</option>
        ));
    }

    return (
        <select className={className} onChange={(e) => onChange(e)}>
            {renderList()}
        </select>
    );
};

export default SelectBoxComponent;