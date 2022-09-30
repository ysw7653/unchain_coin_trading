import { Typography } from "@mui/material";

const Text = ({
  variant,
  gutterBottom,
  noWrap,
  paragraph,
  align,
  textStyle,
  children,
  color,
  weight,
  component = "div",
  ...props
}) => {
  if (typeof children === "boolean") {
    return null;
  }
  return (
    <Typography
      variant={variant}
      gutterBottom={gutterBottom}
      noWrap={noWrap}
      paragraph={paragraph}
      align={align}
      style={{ ...textStyle, fontWeight: weight }}
      color={color}
      component={component}
      {...props}
    >
      {children}
    </Typography>
  );
};

export default Text;
