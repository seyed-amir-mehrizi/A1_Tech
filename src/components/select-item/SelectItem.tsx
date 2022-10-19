import React from 'react';
import { SelectItemProps } from '../../assets/models/models';
function SelectItem({ label, id, onChange, data, placeholder , name }: SelectItemProps) {
    return (
        <div className="form-group">
            <label htmlFor={id}>{label}</label>
            <select className="form-control" id={id}
                onChange={onChange}
            >
                 <option value=''>{placeholder}</option>
                {data && data.map((item: any) => {
                    return <option key={name ? item[name] : item}>{name ? item[name] : item}</option>
                })}
            </select>
        </div>
    )
}
export default SelectItem
