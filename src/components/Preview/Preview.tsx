import styled from "styled-components";
import Section from "../Section/Section";
import React from "react";
import PreviewItem from "../PreviewItem/PreviewItem";
import Button from "../Button/Button";
import { calculateRandomHours } from "../../utils/utils";
import useGithub from "../../hooks/useGithub";
import useUserData from "../../hooks/useUserData";
import { GithubActionType } from "../GithubProvider/GithubProvider";

export default function Preview() {

  const { selectedCommits, selectedCommitsDispatcher } = useGithub();
  const { data } = useUserData();
  const { hours } = data;

  const usedHours = React.useMemo(() => selectedCommits.reduce((acc, curr) => acc + curr.hours_spent, 0), [selectedCommits]);

  const assignHours = React.useCallback(() => {
    if (hours < selectedCommits.length) return;
    const hoursArr = calculateRandomHours(hours, selectedCommits.length);
    selectedCommits.forEach((c, i) => selectedCommitsDispatcher({ type: GithubActionType.UPDATE_HOURS, sha: c.commit_sha, hours: hoursArr[i].toString() }));
  }, [hours, selectedCommits]);

  const updateMessage = React.useCallback((sha: string, message: string) => {
    selectedCommitsDispatcher({ type: GithubActionType.UPDATE_MESSAGE, sha, message });
  }, []);

  const updateHours = React.useCallback((sha: string, hours: string) => {
    selectedCommitsDispatcher({ type: GithubActionType.UPDATE_HOURS, sha, hours });
  }, []);

  const updatePR = React.useCallback((sha: string, pr_num: string) => {
    selectedCommitsDispatcher({ type: GithubActionType.UPDATE_PR_NUM, sha, pr_num });
  }, []);

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
                onMessageUpdated={(e) => updateMessage(c.commit_sha, e)}
                onHoursUpdated={(e) => updateHours(c.commit_sha, e)}
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