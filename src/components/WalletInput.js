import styled from "@emotion/styled";
import { Button, TextField } from "@mui/material";
import { forwardRef, useImperativeHandle, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import Text from "./Text";

const Container = styled.form`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const WalletInput = forwardRef(({ onSubmit, onConnect }, ref) => {
  const formRef = useRef(null);
  const [receiver, setReceiver] = useState("");
  const { register, setValue, getValues, handleSubmit } = useForm();
  const handleConnect = () => {
    if (onConnect) onConnect();
  };
  useImperativeHandle(ref, () => ({
    setValue,
    getValues,
    setName: (receiverName) => setReceiver(receiverName),
  }));
  return (
    <Container ref={formRef} onSubmit={handleSubmit(onSubmit)}>
      <Text variant="h6" weight={600}>
        TDC 전송하기
      </Text>
      <Wrapper>
        <Text variant="subtitle1" weight={600}>
          To.
        </Text>
        <Text variant="subtitle1" weight={600}>
          {receiver}
        </Text>
      </Wrapper>
      <TextField fullWidth {...register("receiver", { required: true })} />
      <Wrapper>
        <Text variant="subtitle1" weight={600}>
          From.
        </Text>
        <Button variant="contained" onClick={handleConnect} color="secondary">
          <Text weight={600} variant="caption">
            Connect
          </Text>
        </Button>
      </Wrapper>
      <TextField
        fullWidth
        inputProps={{ readOnly: true }}
        {...register("sender", { required: true })}
      />
      <TextField
        fullWidth
        multiline
        rows={5}
        {...register("message")}
        placeholder="추가 메세지"
      />
      <Button type="submit">전송</Button>
    </Container>
  );
});

export default WalletInput;
