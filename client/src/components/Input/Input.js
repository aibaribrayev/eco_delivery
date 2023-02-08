import { useRef, useEffect } from "react";

import "./Input.sass";

const Input = ({ placeholder, name, label, setRef, ...props }) => {
    const inputRef = useRef();

    useEffect(() => {
        if (setRef) {
            setRef(inputRef);
        }
    }, [inputRef]);

    return (
        <div className="input" {...props}>
            {label && (
                <label htmlFor={name} className="input__label">
                    {label}
                </label>
            )}
            <input
                className="input__main"
                name={name}
                placeholder={placeholder}
                ref={inputRef}
            />
        </div>
    );
};

export default Input;
