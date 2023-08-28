import React, { ReactNode } from "react";
import { GitHubContext } from "../GithubProvider/GithubProvider";
import Commit from "../Commit/Commit";
import styled, { keyframes } from "styled-components";
import { CommitsState } from "../App";
import * as Accordion from '@radix-ui/react-accordion';
import { ChevronDownIcon } from "@radix-ui/react-icons";
import Section from "../Section/Section";

function Commits({ repos, from, to, commits, onCommitsUpdated, onCommitSelected, onCommitUnselected }:
  {
    repos: string[],
    from: string,
    to: string;
    commits: CommitsState[],
    onCommitsUpdated: React.Dispatch<React.SetStateAction<CommitsState[]>>,
    onCommitSelected: (repo: string, sha: string) => void,
    onCommitUnselected: (repo: string, sha: string) => void
  }) {

  const { getCommits } = React.useContext(GitHubContext);

  React.useEffect(() => {
    let valid = true;

    async function fetchCommits() {
      try {
        const commits = await getCommits(repos, from, to);
        if (!commits || !valid) return;
        onCommitsUpdated(commits);
      } catch (e) {
        console.error(e);
      }
    }

    fetchCommits();

    return () => { valid = false; }
  }, [repos, from, to]);

  function handleClickCommit(repo: string, sha: string, selected: boolean) {
    if (selected) {
      onCommitUnselected(repo, sha);
    }
    else {
      onCommitSelected(repo, sha);
    }
  }

  return (
    <Section>
      <CommitsLabel>Commits</CommitsLabel>
      <Wrapper>
        {!repos.length && <p>Select a repo to find commits...</p>}
        <AccordionsWrapper>
          {
            commits.map(({ repoFullName, commits }) => (
              <AccordionRoot key={repoFullName} type="single" defaultValue={repoFullName} collapsible>
                <AccordionItem value={repoFullName}>
                  <AccordionTrigger>{repoFullName} | {commits.length} commit(s)</AccordionTrigger>
                  <AccordionContent>
                    {!commits.length && <p>No commits for {repoFullName}</p>}
                    {!!commits.length &&
                      commits.map(({ commit, selected }) => (
                        <Commit onClick={() => handleClickCommit(repoFullName, commit.sha, selected)} key={commit.sha} commit={commit} selected={selected} />
                      ))
                    }
                  </AccordionContent>
                </AccordionItem>
              </AccordionRoot>
            )
            )
          }
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
  border-bottom: 1px solid ${p => p.theme.primaryLighter};
`;

const AccordionsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const AccordionRoot = styled(Accordion.Root)`
  border-radius: 8px;
  background-color: ${p => p.theme.primaryLighter};
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
    border-bottom: 1px solid ${p => p.theme.primaryLight};
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