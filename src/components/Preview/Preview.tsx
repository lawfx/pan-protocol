import styled from "styled-components";
import Section from "../Section/Section";
import { GitHubContext } from "../GithubProvider/GithubProvider";
import React from "react";
import PreviewItem from "../PreviewItem/PreviewItem";

export default function Preview({ hours }: { hours: number }) {

  const { selectedCommits, updateFinalMessage, updateHoursSpent, updatePR } = React.useContext(GitHubContext);

  const usedHours = selectedCommits.reduce((acc, curr) => acc + curr.hours_spent, 0);

  return (
    <Section>
      <Wrapper>
        {!selectedCommits.length
          ? <span>No commits selected 🧐</span>
          : <>
            <Hours>Hours filled in: <UsedHours $overfilled={usedHours > hours}>{usedHours}</UsedHours> / {hours}</Hours>
            {selectedCommits.map(c => (
              <PreviewItem
                key={c.commit_sha}
                commitInfo={c}
                onMessageUpdated={(e) => updateFinalMessage(c.commit_sha, e)}
                onHoursUpdated={(e) => updateHoursSpent(c.commit_sha, e)}
                onPrUpdated={(e) => updatePR(c.commit_sha, e)}
              />
            ))}
          </>
        }
      </Wrapper>
    </Section>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 8px;
  gap: 8px;
`;

const Hours = styled.span`
  align-self: end;
  margin-right: 8px;
`;

const UsedHours = styled.span<{ $overfilled: boolean }>`
  color: ${p => p.$overfilled ? 'red' : 'inherit'};
`;