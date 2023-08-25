import styled from "styled-components";

export default function Repositories({ repos, selectRepo, unselectRepo }: { repos: any[], selectRepo: (id: string) => void, unselectRepo: (id: string) => void }) {

  return (
    <Wrapper>
      <ReposLabel>Repositories</ReposLabel>
      <Repos>
        {repos.map(r => (
          <Repo key={r.id}>
            <input type="checkbox" id={r.full_name} name={r.full_name} onChange={e => {
              if (e.target.checked) {
                selectRepo(r.id);
              }
              else {
                unselectRepo(r.id);
              }
            }} />
            <label htmlFor={r.full_name}>{r.full_name}</label>
          </Repo>
        ))}
      </Repos>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  padding: 8px;
  background-color: hsl(0deg, 0%, 90%);
  border-radius: 8px;
`;

const ReposLabel = styled.h4`
  margin: 0;
  padding: 8px;
  padding-inline-start: 0;
`;

const Repos = styled.section`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 8px;
`;

const Repo = styled.div`
  padding: 8px;
  border: 2px solid hsl(0deg 0% 50%);
  border-radius: 8px;
  box-shadow: 2px 2px 0 hsl(0deg 0% 50%);
`;