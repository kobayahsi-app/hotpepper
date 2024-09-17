import React from "react";

export default function SelectField(
    selectList: {code: string, name: string}[] | [],
    value: string,
    setValue: React.Dispatch<React.SetStateAction<string>>
) {
    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setValue(event.target.value as string);
    };
    return(
        <select
            value={value}
            onChange={handleChange}
        >
            <option value="" hidden>未入力</option>
            {selectList.length > 0 && (
                selectList.map((item) => (
                    <option key={item.code} value={item.code}>{item.name}</option>
                ))
            )}
        </select>
    )
}