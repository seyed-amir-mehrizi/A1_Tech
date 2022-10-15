import React from 'react';


type SelectItemProps = {
    label: string,
    id: string,
    placeholder: string,
    onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void,
    data: any[],
    name ?: string
}

function SelectItem({ label, id, onChange, data, placeholder , name }: SelectItemProps) {
    return (
        <div className="form-group">
            <label htmlFor={id}>{label}</label>
            <select className="form-control" id={id}
                onChange={onChange}
            >
                 <option value=''>{placeholder}</option>
                {data.map((item: any) => {
                    return <option key={name ? item[name] : item}>{name ? item[name] : item}</option>
                })}
            </select>
        </div>
    )
}

export default SelectItem
