import "./Button.sass";

const Button = ({ text, type, action }) => {
    return (
        <button
            className={`button ${type === "outline" ? "button_outline" : ""}`}
            onClick={action}
        >
            {text}
        </button>
    );
};

export default Button;
