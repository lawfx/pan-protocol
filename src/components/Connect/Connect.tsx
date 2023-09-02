import * as Dialog from '@radix-ui/react-dialog';
import { Cross2Icon, GitHubLogoIcon } from '@radix-ui/react-icons';
import styled, { keyframes } from 'styled-components';
import Button from '../Button/Button';
import Input from '../Input/Input';
import React from 'react';
import useGithub from '../../hooks/useGithub';
import ButtonIcon from '../ButtonIcon/ButtonIcon';

export default function Connect() {

  const [token, setToken] = React.useState('');
  const { connect } = useGithub();

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <Button>Connect</Button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <DialogOverlay />
        <DialogContent>
          <DialogTitle>
            <span>Connect to</span>
            <StyledGitHubLogo />
          </DialogTitle>
          <Input inline={true} label='Token' value={token} onChange={(token) => setToken(token)} />
          <Dialog.Close asChild>
            <Button onClick={() => connect(token)}>Connect</Button>
          </Dialog.Close>
          <Dialog.Close asChild>
            <ButtonIcon
              style={{
                position: 'absolute',
                top: 0,
                right: 0,
                padding: '4px',
                borderTopLeftRadius: 0,
                borderBottomRightRadius: 0
              }}
              aria-label="Close">
              <Cross2Icon />
            </ButtonIcon>
          </Dialog.Close>
        </DialogContent>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

const overlayShow = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const contentShow = keyframes`
  from { 
    opacity: 0;
    transform: translate(-50%, -48%) scale(.96);
  }
  to { 
    opacity: 1;
    transform: translate(-50%, -50%) scale(1);
  }
`;

const DialogOverlay = styled(Dialog.Overlay)`
  background-color: hsla(0, 0%, 0%, 0.6);
  position: fixed;
  inset: 0;
  animation: ${overlayShow} 150ms cubic-bezier(0.16, 1, 0.3, 1);
`;

const DialogContent = styled(Dialog.Content)`
  background-color: ${p => p.theme.primary[200]};
  color: ${p => p.theme.secondary[500]};
  border-radius: 8px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 400px;
  padding: 16px;
  animation: ${contentShow} 150ms cubic-bezier(0.16, 1, 0.3, 1);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
`;

const DialogTitle = styled(Dialog.Title)`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const StyledGitHubLogo = styled(GitHubLogoIcon)`
  width: 30px;
  height: 30px;
`; 