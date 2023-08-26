import React from "react";
import { GitHubContext } from "../GithubProvider/GithubProvider";
import styled from "styled-components";
import Button from "../Button/Button";

export default function Login() {

  const [token, setToken] = React.useState('');
  const { connect, user } = React.useContext(GitHubContext);

  return (
    <Wrapper>
      {user &&
        <LoggedInUser>
          <Avatar>
            <AvatarImage src={user.avatar_url} />
          </Avatar>
          <span>Logged in as <strong>{user.login}</strong></span>
        </LoggedInUser>
      }
      {!user && <div>
        <label htmlFor='token-id'>
          Token:
        </label>
        <input
          id='token-id'
          value={token}
          onChange={e => setToken(e.target.value)}
        />
        <Button disabled={!!user} type='button' onClick={() => connect(token)}>Connect</Button>
      </div>
      }
    </Wrapper>
  );
}

const Wrapper = styled.div`
  padding: 8px;
  background-color: hsl(0deg, 0%, 90%);
  border-radius: 8px;
`;

const LoggedInUser = styled.div`
  background-color: hsl(106deg, 67%, 43%);
  padding: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 16px;
`;

const Avatar = styled.div`
`;

const AvatarImage = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
`;