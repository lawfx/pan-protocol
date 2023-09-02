import React from "react";
import styled from "styled-components";
import * as Accordion from '@radix-ui/react-accordion';
import { format } from "date-fns";
import Section from "../Section/Section";
import { GithubCommit } from "../../models/octokit.model";
import CommitsAccordionItem from "../CommitsAccordionItem/CommitsAccordionItem";
import useGithub from "../../hooks/useGithub";
import useUserData from "../../hooks/useUserData";

export default function Commits() {

  const { searchCommits, user, commits, loading, error } = useGithub();
  const { data } = useUserData();

  const month = !!data.date ? format(data.date, 'yyyy-MM') : '';
  const monthReadable = format(new Date(month), 'MMMM yyyy');

  const commitsByRepo = React.useMemo(() => commits.reduce<{ [repo: string]: GithubCommit[] }>((acc, curr) => {
    const repoFullName: string = curr.repository.full_name;
    return { ...acc, [repoFullName]: (acc[repoFullName] ? [...acc[repoFullName], curr] : [curr]) }
  }, {}), [commits]);

  React.useEffect(() => {
    async function fetchCommits() {
      await searchCommits(month);
    }

    fetchCommits();
  }, [user, month]);

  const message = !user ? 'Please login to search for commits' :
    loading ? `Searching commits for ${monthReadable}...` :
      !!error ? 'An error has occured 😢' :
        !month ? 'Please select a month' :
          !commits.length ? `No commits found for ${monthReadable} 😳` :
            '';

  return (
    <Section>
      <CommitsLabel>Commits</CommitsLabel>
      <Wrapper>
        {!!message ? <span>{message}</span> :
          <AccordionsWrapper>
            <AccordionRoot type="single" collapsible>
              {Object.entries(commitsByRepo).map(([repo, commitsInRepo]) =>
                <CommitsAccordionItem key={repo} repo={repo} commits={commitsInRepo} />
              )}
            </AccordionRoot>

          </AccordionsWrapper>}
      </Wrapper>
    </Section>
  );
}

const Wrapper = styled.div`
  padding: 8px;
`;

const CommitsLabel = styled.h4`
  margin: 0;
  padding: 8px;
  border-bottom: 1px solid ${p => p.theme.primary300};
`;

const AccordionsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const AccordionRoot = styled(Accordion.Root)`
  border-radius: 8px;
  background-color: ${p => p.theme.primary300};
`;