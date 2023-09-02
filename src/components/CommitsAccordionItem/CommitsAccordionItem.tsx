import styled, { keyframes } from "styled-components";
import { GitHubCommit } from "../../models/octokit.model";
import { ChevronDownIcon } from "@radix-ui/react-icons";
import React, { ReactNode } from "react";
import * as Accordion from '@radix-ui/react-accordion';
import Commit from "../Commit/Commit";
import useGithub from "../../hooks/useGithub";

export default function CommitsAccordionItem({ commits, repo }:
  {
    commits: GitHubCommit[],
    repo: string;
  }) {

  const { selectedCommits, toggleCommit } = useGithub();

  const selectedCount = React.useMemo(() => {
    return commits.reduce((acc, curr) =>
      !!selectedCommits.find(sc => sc.commit_sha === curr.sha) ? acc + 1 : acc
      , 0);
  }, [commits, selectedCommits]);

  const handleClickCommit = React.useCallback((sha: string, selected: boolean) => {
    toggleCommit(sha, selected);
  }, []);

  return (
    <AccordionItem key={repo} value={repo}>
      <AccordionTrigger>
        <span>
          <strong>{repo}</strong> | {commits.length} commit{!!commits.length && 's'} | {selectedCount} selected
        </span>
      </AccordionTrigger>
      <AccordionContent>
        {!commits.length && <p>No commits for {repo}</p>}
        {!!commits.length &&
          commits.map((commit) => {
            const selected = !!selectedCommits.find(c => c.commit_sha === commit.sha);
            return <Commit onClick={() => handleClickCommit(commit.sha, !selected)} key={commit.sha} commit={commit} selected={selected} />
          })
        }
      </AccordionContent>
    </AccordionItem>
  );
}

const AccordionItem = styled(Accordion.Item)`
  &:not(:last-child){
    border-bottom: 1px solid ${p => p.theme.primary200};
  }

  &:first-child {
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
  }

  &:last-child {
    border-bottom-left-radius: 8px;
    border-bottom-right-radius: 8px;
  },

  &:focus-within {
    outline: 2px solid ${p => p.theme.secondary200};
    outline-offset: -2px;
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