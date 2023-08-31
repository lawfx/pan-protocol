import styled from "styled-components";
import { CommitInfo } from "../../models/commit.model";
import Input from "../Input/Input";
import Textarea from "../Textarea/Textarea";
import React from "react";
import { GitHubContext } from "../GithubProvider/GithubProvider";
import Button from "../Button/Button";

export default function PreviewItem({ commitInfo, onMessageUpdated, onHoursUpdated, onPrUpdated }:
  {
    commitInfo: CommitInfo,
    onMessageUpdated: (message: string) => void,
    onHoursUpdated: (hours: string) => void,
    onPrUpdated: (num: string) => void
  }) {

  const { toggleCommit } = React.useContext(GitHubContext);

  const handleUnselect = React.useCallback((sha: string) => {
    toggleCommit(sha, false);
  }, []);

  return (
    <Wrapper>
      <Button style={{
        width: '15px',
        height: '15px',
        position: 'absolute',
        top: 0,
        right: 0
      }} onClick={() => handleUnselect(commitInfo.commit_sha)}>X</Button>
      <TextAreaWrapper>
        <span>
          <strong>SHA:</strong>{' '}
          <span>{commitInfo.commit_sha.substring(0, 7)}</span>
        </span>
        <Textarea label="Commit message" rows={3} value={commitInfo.final_message} onChange={onMessageUpdated} placeholder="Describe the commit" />
      </TextAreaWrapper>
      <EditableBasicData>
        <Input label="PR" type="text" value={commitInfo.pr_num} onChange={onPrUpdated} pattern='\d+' />
        <Input label="Hours spent" type="text" value={commitInfo.hours_spent} onChange={onHoursUpdated} pattern='\d+' />
      </EditableBasicData>
    </Wrapper>
  );
}
const Wrapper = styled.div`
  position: relative;
  background-color: ${p => p.theme.primary300};
  padding: 8px;
  border-radius: 8px;
  display: flex;
  gap: 8px;
`;

const EditableBasicData = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const TextAreaWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;