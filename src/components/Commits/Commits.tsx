import React, { ReactNode } from "react";
import { GitHubContext } from "../GithubProvider/GithubProvider";
import Commit from "../Commit/Commit";
import styled, { keyframes } from "styled-components";
import * as Accordion from '@radix-ui/react-accordion';
import { ChevronDownIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";
import Section from "../Section/Section";
import { CommitState } from "../../App";

function Commits({ month, commits, onCommitsUpdated, onCommitSelected, onCommitUnselected }:
  {
    month: string,
    commits: CommitState[],
    onCommitsUpdated: React.Dispatch<React.SetStateAction<CommitState[]>>,
    onCommitSelected: (sha: string) => void,
    onCommitUnselected: (sha: string) => void
  }) {

  const { searchCommits, user } = React.useContext(GitHubContext);

  const commitsPerRepo = commits.reduce<{ [repo: string]: CommitState[] }>((acc, curr) => {
    const repoFullName: string = curr.commit.repository.full_name;
    return { ...acc, [repoFullName]: (acc[repoFullName] ? [...acc[repoFullName], curr] : [curr]) }
  }, {});

  React.useEffect(() => {
    let valid = true;

    async function fetchCommits() {
      try {
        const commits = await searchCommits(month);
        if (!commits || !valid) return;
        onCommitsUpdated(commits.map(c => ({ commit: c, selected: false })));
      } catch (e) {
        console.error(e);
      }
    }

    fetchCommits();

    return () => { valid = false; }
  }, [user, month]);

  function handleClickCommit(sha: string, selected: boolean) {
    if (selected) {
      onCommitUnselected(sha);
    }
    else {
      onCommitSelected(sha);
    }
  }

  const message = !month ? 'Please select a month...' : !commits.length ? `No commits found for ${format(new Date(month), 'MMMM yyyy')}` : '';

  return (
    <Section>
      <CommitsLabel>Commits</CommitsLabel>
      <Wrapper>
        {!!message && <span>{message}</span>}
        <AccordionsWrapper>
          {Object.entries(commitsPerRepo).map(([repo, commitsInRepo]) =>
            <AccordionRoot key={repo} type="single" defaultValue={repo} collapsible>
              <AccordionItem value={repo}>
                <AccordionTrigger>
                  <span>
                    <strong>{repo}</strong> | {commitsInRepo.length} commit{!!commitsInRepo.length && 's'} | {commitsInRepo.filter(c => c.selected).length} selected
                  </span></AccordionTrigger>
                <AccordionContent>
                  {!commitsInRepo.length && <p>No commits for {repo}</p>}
                  {!!commitsInRepo.length &&
                    commitsInRepo.map(({ commit, selected }) => (
                      <Commit onClick={() => handleClickCommit(commit.sha, selected)} key={commit.sha} commit={commit} selected={selected} />
                    ))
                  }
                </AccordionContent>
              </AccordionItem>
            </AccordionRoot>
          )}
        </AccordionsWrapper>
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
  font-size: 15px;

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