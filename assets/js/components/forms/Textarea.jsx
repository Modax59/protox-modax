import React from "react";

const Textarea = ({
                   name,
                   label,
                   labelClass = "",
                   value,
                   onChange,
                   placeholder = "",
                   row = "6",
                   error = "",
                   disabled = "",
                   moreClass = " ",
               }) => (
    <div className="form-group">
        <label className={labelClass} htmlFor={name}>
            {label}
        </label>
        <textarea
            value={value}
            onChange={onChange}
            placeholder={placeholder || label}
            name={name}
            id={name}
            rows={row}
            className={"form-control" + (error && " is-invalid") + " " + moreClass}
            disabled={disabled}
        />
        {error && <p className="invalid-feedback">{error}</p>}
    </div>
);

export default Textarea;