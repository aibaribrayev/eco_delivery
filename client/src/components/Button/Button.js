import "./Button.sass";

const Button = ({ text, type, action, styleType, ...props }) => {
    return (
        <button
            className={`button ${
                styleType === "outline" ? "button_outline" : ""
            }`}
            onClick={action}
            type={type}
            {...props}
        >
            {text}
        </button>
    );
};

export default Button;
