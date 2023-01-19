import "./Input.sass";

const Input = ({ placeholder, name }) => {
    return <input className="input" name={name} placeholder={placeholder} />;
};

export default Input;
