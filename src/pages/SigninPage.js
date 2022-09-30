import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TextField } from "@mui/material";
import useUserActions from "@/recoil/userActions";
import Text from "@/components/Text";

function SigninPage() {
  const { registerUser } = useUserActions();
  const navigate = useNavigate();
  const [Email, setEmail] = useState("");
  const [Name, setName] = useState("");
  const [Password, setPassword] = useState("");
  const [ConfirmPassword, setConfirmPassword] = useState("");

  const onEmailHandler = (event) => {
    setEmail(event.currentTarget.value);
  };

  const onNameHandler = (event) => {
    setName(event.currentTarget.value);
  };

  const onPasswordHandler = (event) => {
    setPassword(event.currentTarget.value);
  };

  const onConfirmPasswordHandler = (event) => {
    setConfirmPassword(event.currentTarget.value);
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();

    if (Password !== ConfirmPassword) {
      alert("비밀번호와 비밀번호 확인은 같아야 합니다.");
      return; // 작동됨
    }

    const body = {
      email: Email,
      password: Password,
      name: Name,
    };
    registerUser(body).then((response) => {
      if (response) {
        navigate("/login");
      } else {
        alert("Failed to sign up");
      }
    });
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100vh",
      }}
    >
      <form
        style={{ display: "flex", flexDirection: "column" }}
        onSubmit={onSubmitHandler}
      >
        <Text variant="h5">Unchain Register</Text>
        <Text variant="h6">Email</Text>
        <TextField type="email" value={Email} onChange={onEmailHandler} />

        <Text variant="h6">Name</Text>
        <TextField type="text" value={Name} onChange={onNameHandler} />

        <Text variant="h6">Password</Text>
        <TextField
          type="password"
          value={Password}
          onChange={onPasswordHandler}
        />

        <Text variant="h6">Confirm Password</Text>
        <TextField
          type="password"
          value={ConfirmPassword}
          onChange={onConfirmPasswordHandler}
        />

        <br />
        <button type="submit">Sign up</button>
      </form>
    </div>
  );
}
export default SigninPage;
