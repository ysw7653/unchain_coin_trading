import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, TextField } from "@mui/material";
import styled from "@emotion/styled";
import Text from "@/components/Text";
import useUserActions from "@/recoil/userActions";

const Container = styled.form`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  width: 25rem;
  margin: auto;
`;

function LoginPage() {
  const navigate = useNavigate();
  const { loginUser, authUser } = useUserActions();

  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");

  const onEmailHandler = (event) => {
    setEmail(event.currentTarget.value);
  };

  const onPasswordHandler = (event) => {
    setPassword(event.currentTarget.value);
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    const data = {
      email: Email,
      password: Password,
    };
    const res = await loginUser(data);
    if (res) {
      authUser();
      navigate("/");
    } else navigate("/");
  };

  return (
    <Container
      style={{ display: "flex", flexDirection: "column" }}
      onSubmit={onSubmitHandler}
    >
      <Text variant="h5">Unchain login</Text>
      <div>
        <Text variant="h6">Email</Text>
        <TextField
          type="email"
          value={Email}
          onChange={onEmailHandler}
          fullWidth
        />
      </div>
      <div>
        <Text variant="h6">Password</Text>
        <TextField
          type="password"
          value={Password}
          onChange={onPasswordHandler}
          fullWidth
        />
      </div>
      <Button variant="contained" type="submit">
        Login
      </Button>
    </Container>
  );
}

export default LoginPage;
