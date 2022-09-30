import { Container } from "@mui/material";

function TabPanel({ children, value, index, ...props }) {
  return (
    <Container
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...props}
    >
      {value === index && children}
    </Container>
  );
}

export default TabPanel;
