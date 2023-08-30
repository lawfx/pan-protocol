import React from "react";
import { GitHubContext } from "../GithubProvider/GithubProvider";
import styled from "styled-components";
import Button from "../Button/Button";
import Input from "../Input/Input";

export default function Login() {

  const [token, setToken] = React.useState('');
  const { connect, user } = React.useContext(GitHubContext);

  return (
    <>
      {user ?
        <LoggedInUser>
          <span>Logged in as <strong>{user.login}</strong></span>
          <AvatarImage src={user.avatar_url} />
        </LoggedInUser>
        :
        <LoginForm>
          <Input label='Token' value={token} onChange={setToken} />
          <Button disabled={!token} type='button' onClick={() => connect(token)}>Connect</Button>
        </LoginForm>
      }
    </>
  );
}

const LoggedInUser = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
`;

const AvatarImage = styled.img`
  display: block;
  width: 50px;
  height: 50px;
  border-radius: 50%;
`;

const LoginForm = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;