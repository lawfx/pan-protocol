import React, { ReactNode } from "react";
import { GitHubContext } from "../GithubProvider/GithubProvider";
import Commit from "../Commit/Commit";
import styled, { keyframes } from "styled-components";
import * as Accordion from '@radix-ui/react-accordion';
import { ChevronDownIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";
import Section from "../Section/Section";
import { GitHubCommit } from "../../models/octokit.model";

function Commits({ month }:
  {
    month: string
  }) {

  const { searchCommits, user, commits, selectedCommits, toggleCommit, loading, error } = React.useContext(GitHubContext);
  const monthReadable = format(new Date(month), 'MMMM yyyy');

  const commitsByRepo = React.useMemo(() => commits.reduce<{ [repo: string]: GitHubCommit[] }>((acc, curr) => {
    const repoFullName: string = curr.repository.full_name;
    return { ...acc, [repoFullName]: (acc[repoFullName] ? [...acc[repoFullName], curr] : [curr]) }
  }, {}), [commits]);

  React.useEffect(() => {
    async function fetchCommits() {
      await searchCommits(month);
    }

    fetchCommits();
  }, [user, month]);

  function handleClickCommit(sha: string, selected: boolean) {
    toggleCommit(sha, selected);
  }

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
                <AccordionItem key={repo} value={repo}>
                  <AccordionTrigger>
                    <span>
                      <strong>{repo}</strong> | {commitsInRepo.length} commit{!!commitsInRepo.length && 's'} | {selectedCommits.length} selected
                    </span>
                  </AccordionTrigger>
                  <AccordionContent>
                    {!commitsInRepo.length && <p>No commits for {repo}</p>}
                    {!!commitsInRepo.length &&
                      commitsInRepo.map((commit) => {
                        const selected = !!selectedCommits.find(c => c.commit_sha === commit.sha);
                        return <Commit onClick={() => handleClickCommit(commit.sha, !selected)} key={commit.sha} commit={commit} selected={selected} />
                      })
                    }
                  </AccordionContent>
                </AccordionItem>
              )}
            </AccordionRoot>

          </AccordionsWrapper>}
      </Wrapper>
    </Section>
  );
}

export default React.memo(Commits);

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

const AccordionItem = styled(Accordion.Item)`
  &:not(:last-child){
    border-bottom: 1px solid ${p => p.theme.primary200};
  }
`;

const AccordionTrigger = React.forwardRef<any, { children: ReactNode, [key: string]: any }>(({ children, ...props }, forwardedRef) => (
  <StyledHeader>
    <StyledTrigger {...props} ref={forwardedRef}>
      {children}
      <StyledChevron aria-hidden />
    </StyledTrigger>
  </StyledHeader>
));

const AccordionContent = React.forwardRef<any, { children: ReactNode, [key: string]: any }>(({ children, ...props }, forwardedRef) => (
  <StyledContent {...props} ref={forwardedRef}>
    <StyledContentText>{children}</StyledContentText>
  </StyledContent>
));

const StyledHeader = styled(Accordion.Header)`
  all: unset;
  display: flex;
`;

const StyledTrigger = styled(Accordion.Trigger)`
  all: unset;
  font-family: inherit;
  padding: 0 8px;
  height: 50px;
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;

  &[data-state="open"] {
    border-bottom: 1px solid ${p => p.theme.primary200};
  }
`;

const StyledChevron = styled(ChevronDownIcon)`
  transition: transform 300ms ease-in-out;

  ${StyledTrigger}[data-state="open"] & {
    transform: rotate(180deg); 
  }
`;

const slideDown = keyframes`
  from { height: 0; }
  to { height: var(--radix-accordion-content-height); }
`;

const slideUp = keyframes`
  from { height: var(--radix-accordion-content-height); }
  to { height: 0; }
`;

const StyledContent = styled(Accordion.Content)`
  overflow: hidden;

  &[data-state="open"] {
    animation: ${slideDown} 300ms ease-in-out;
  }

  &[data-state="closed"] {
    animation: ${slideUp} 300ms ease-in-out;
  }
`;

const StyledContentText = styled('div')`
  padding: 8px;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;