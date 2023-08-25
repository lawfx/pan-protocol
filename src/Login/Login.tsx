import React from "react";
import { GitHubContext } from "../GithubProvider/GithubProvider";
import styled from "styled-components";

export default function Login() {

  const [token, setToken] = React.useState('');
  const { connect, user } = React.useContext(GitHubContext);

  return (
    <>
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
        <button disabled={!!user} type='button' onClick={() => connect(token)}>Connect</button>
      </div>
      }
    </>
  );
}

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