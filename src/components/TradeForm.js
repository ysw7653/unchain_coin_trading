import styled from "@emotion/styled";
import { Box, Button, Input, Tab, Tabs, TextField } from "@mui/material";
import { useState } from "react";
import { useForm } from "react-hook-form";
import TabPanel from "./TabPanel";
import Text from "./Text";

const a11yProps = (index) => ({
  id: `simple-tab-${index}`,
  "aria-controls": `simple-tabpanel-${index}`,
});
const Form = styled.form`
  box-sizing: border-box;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;
function TradeForm() {
  const [value, setValue] = useState(0);
  const handleTabChange = (_, newValue) => {
    setValue(newValue);
  };
  const { register, handleSubmit, watch } = useForm();
  const watchPrice = watch("price");
  const watchAmount = watch("amount");
  const watchTotal = watch("totalPrice");
  const onSubmit = (data) => console.log(data);
  return (
    <Box>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs value={value} onChange={handleTabChange}>
          <Tab label={<Text weight={600}>매수</Text>} {...a11yProps(0)} />
          <Tab label={<Text weight={600}>매도</Text>} {...a11yProps(1)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            fullWidth
            variant="outlined"
            label="매수가격(KRW)"
            {...register("price", {
              valueAsNumber: true,
              pattern: /^[0-9]+&/,
              required: true,
            })}
          />
          <TextField
            fullWidth
            variant="outlined"
            label="주문수량"
            {...register("amount", {
              valueAsNumber: true,
              pattern: /^[0-9]+&/,
              required: true,
            })}
          />
          <TextField
            fullWidth
            variant="outlined"
            label="주문총액(KRW)"
            {...register("totalPrice", {
              valueAsNumber: true,
              pattern: /^[0-9]+&/,
              required: true,
            })}
          />
          <Button variant="contained" type="submit">
            매수
          </Button>
        </Form>
      </TabPanel>
      <TabPanel value={value} index={1}>
        Item Two
      </TabPanel>
    </Box>
  );
}

export default TradeForm;
