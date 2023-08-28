import React from "react";
import { GitHubContext } from "../GithubProvider/GithubProvider";
import styled from "styled-components";
import Button from "../Button/Button";
import Section from "../Section/Section";

export default function Login() {

  const [token, setToken] = React.useState('');
  const { connect, user } = React.useContext(GitHubContext);

  return (
    <Section>
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
    </Section>
  );
}

const Wrapper = styled.div`
  padding: 8px;
`;

const LoggedInUser = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 16px;
`;

const Avatar = styled.div`
`;

const AvatarImage = styled.img`
  display: block;
  width: 50px;
  height: 50px;
  border-radius: 50%;
`;