const CustomButton = ({ variant, title, disabled, onClick }) => {
    
  // variant : submit, cancel, delete
  let color = "";

  switch (variant) {
    case "submit":
      color = "#2898dd";
      break;
    case "cancel":
      color = "yellow";
      break;
    case "delete":
      color = "red";
      break;
    case "info":
      color = "orange";
      break;
    case "success":
      color = "green";
      break;
    default:
      break;
  }

  return (
    <button
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: 32,
        minWidth: 200,
        color: `${variant === "submit" ? "white" : color}`,
        background: `${variant === "submit" ? color : "transparent"} `,
        border: `1px solid ${color}`,
        borderRadius: 8,
        fontWeight: 700,
        fontSize: 18,
        opacity: `${disabled ? 0.5 : 1}`,
        color: `${disabled ? "gray": color}`,
        marginLeft: 4,
        marginRight: 4

      }}
      onClick={onClick}
      disabled={disabled ? disabled : false}
    >
      {title}
    </button>
  );
};

export default CustomButton;
