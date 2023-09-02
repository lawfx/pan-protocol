import styled from "styled-components";
import Connect from "../Connect/Connect";
import useGithub from "../../hooks/useGithub";

export default function Login() {

  const { user } = useGithub();

  return (
    <>
      {user ?
        <LoggedInUser>
          <span>Logged in as <strong>{user.login}</strong></span>
          <AvatarImage src={user.avatar_url} />
        </LoggedInUser>
        :
        <Connect />
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