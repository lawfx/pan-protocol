import styled from "styled-components";
import { CommitInfo } from "../../models/commit.model";
import Input from "../Input/Input";
import Textarea from "../Textarea/Textarea";

export default function PreviewItem({ commitInfo, hours, onMessageUpdated, onHoursUpdated }:
  {
    commitInfo: CommitInfo,
    hours: number,
    onMessageUpdated: (message: string) => void,
    onHoursUpdated: (hours: string) => void
  }) {

  return (
    <Wrapper>
      <div><strong>SHA:</strong> <span>{commitInfo.commit.sha.substring(0, 7)}</span></div>
      <InnerWrapper>
        <TextAreaWrapper>
          <Textarea label="Commit message" rows={3} value={commitInfo.final_message} onChange={onMessageUpdated} placeholder="Describe the commit" />
        </TextAreaWrapper>
        <Input label="Hours spent" type="text" value={hours} onChange={onHoursUpdated} pattern='\d+' />
      </InnerWrapper>
    </Wrapper>
  );
}
const Wrapper = styled.div`
  background-color: ${p => p.theme.primary300};
  padding: 8px;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 8px;
`;

const InnerWrapper = styled.div`
  background-color: ${p => p.theme.primary300}; 
  display: flex;
  justify-content: space-between;
  gap: 8px;
`;

const TextAreaWrapper = styled.div`
  flex: 1;
`;