import styled from "styled-components";
import Section from "../Section/Section";
import { GitHubContext } from "../GithubProvider/GithubProvider";
import React from "react";
import PreviewItem from "../PreviewItem/PreviewItem";

export default function Preview({ hours }: { hours: number }) {

  const { commits, updateFinalMessage, updateHoursSpent } = React.useContext(GitHubContext);

  const selectedCommits = commits.filter(c => c.selected);
  const usedHours = selectedCommits.reduce((acc, curr) => acc + curr.hours_spent, 0);

  return (
    <Section>
      <Wrapper>
        {!selectedCommits.length
          ? <span>No commits selected...</span>
          : <>
            <Hours>Hours filled in: <UsedHours overfilled={usedHours > hours}>{usedHours}</UsedHours> / {hours}</Hours>
            {selectedCommits.map(c => (
              <PreviewItem commitInfo={c}
                hours={c.hours_spent}
                onMessageUpdated={(e) => updateFinalMessage(c.commit.sha, e)}
                onHoursUpdated={(e) => updateHoursSpent(c.commit.sha, e)} />
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

const UsedHours = styled.span<{ overfilled: boolean }>`
  color: ${p => p.overfilled ? 'red' : 'inherit'};
`;