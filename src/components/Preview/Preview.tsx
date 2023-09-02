import styled from "styled-components";
import Section from "../Section/Section";
import { GitHubContext } from "../GithubProvider/GithubProvider";
import React from "react";
import PreviewItem from "../PreviewItem/PreviewItem";
import Button from "../Button/Button";
import { calculateRandomHours } from "../../utils/utils";
import { UserDataContext } from "../UserDataProvider/UserDataProvider";

export default function Preview() {

  const { selectedCommits, updateFinalMessage, updateHoursSpent, updatePR } = React.useContext(GitHubContext);
  const { data } = React.useContext(UserDataContext);
  const { hours } = data;

  const usedHours = React.useMemo(() => selectedCommits.reduce((acc, curr) => acc + curr.hours_spent, 0), [selectedCommits]);

  const assignHours = React.useCallback(() => {
    if (hours < selectedCommits.length) return;
    const hoursArr = calculateRandomHours(hours, selectedCommits.length);
    selectedCommits.forEach((c, i) => updateHoursSpent(c.commit_sha, hoursArr[i].toString()));
  }, [hours, selectedCommits]);

  return (
    <Section>
      <Wrapper>
        {!selectedCommits.length
          ? <span>No commits selected 🧐</span>
          : <>
            <Info>
              <CommitsSelected>Selected commits: {selectedCommits.length}</CommitsSelected>
              <Hours>
                <Button style={{ width: 'fit-content', height: '15px' }} onClick={assignHours}>Random hours</Button>
                <span>
                  Hours filled in: <UsedHours $overfilled={usedHours !== hours}>{usedHours}</UsedHours> / {hours}
                </span>
              </Hours>
            </Info>
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

const Info = styled.div`
  display: flex;
  justify-content: space-between;
`;

const CommitsSelected = styled.span`
`;

const Hours = styled.div`
  display: flex;
  gap: 8px;
`;

const UsedHours = styled.span<{ $overfilled: boolean }>`
  color: ${p => p.$overfilled ? 'red' : 'inherit'};
`;