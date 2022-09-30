import { Alert, Button, IconButton, Snackbar } from "@mui/material";
import LaunchIcon from "@mui/icons-material/Launch";
import CloseIcon from "@mui/icons-material/Close";
import { forwardRef, useImperativeHandle, useRef } from "react";
import Text from "./Text";

const Toast = forwardRef(({ content, link, onLinkClick }, ref) => {
  const toastRef = useRef(null);
  const [open, setOpen] = React.useState(false);

  useImperativeHandle(ref, () => ({
    open: () => setOpen(true),
  }));

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const action = (
    <>
      {link && (
        <Button
          size="small"
          onClick={onLinkClick}
          color="error"
          startIcon={<LaunchIcon fontSize="small" />}
        >
          {link}
        </Button>
      )}
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </>
  );

  return (
    <Snackbar
      ref={toastRef}
      open={open}
      autoHideDuration={6000}
      onClose={handleClose}
    >
      <Alert severity="error" action={action} onClose={handleClose}>
        <Text variant="subtitle1" />
        {content}
      </Alert>
    </Snackbar>
  );
});

export default Toast;
