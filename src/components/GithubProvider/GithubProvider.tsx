import React, { ReactNode } from "react"
import useOctokit from "../../hooks/useOctokit";
import { CommitInfo } from "../../models/commit.model";
import { GitHubCommit, GitHubUser } from "../../models/octokit.model";

export default function GithubProvider({ children }: { children: ReactNode }) {

  const { commits, ...rest } = useOctokit();
  const [selectedCommits, selectedCommitsDispatcher] = React.useReducer(reducer, []);

  React.useEffect(() => {
    selectedCommitsDispatcher({ type: GithubActionType.UNSELECT_ALL_COMMITS });
  }, [commits]);

  return (
    <GithubContext.Provider value={{ commits, ...rest, selectedCommits, selectedCommitsDispatcher }}>
      {children}
    </GithubContext.Provider >
  );
}

export enum GithubActionType {
  SELECT_COMMIT,
  UNSELECT_COMMIT,
  UNSELECT_ALL_COMMITS,
  UPDATE_MESSAGE,
  UPDATE_HOURS,
  UPDATE_PR_NUM
}

interface GithubActionBase {
  type: GithubActionType;
}

interface GithubSelectCommitAction extends GithubActionBase {
  type: GithubActionType.SELECT_COMMIT;
  commitInfo: CommitInfo;
}

interface GithubUnSelectCommitAction extends GithubActionBase {
  type: GithubActionType.UNSELECT_COMMIT;
  sha: string;
}

interface GithubUnSelectAllCommitsAction extends GithubActionBase {
  type: GithubActionType.UNSELECT_ALL_COMMITS;
}

interface GithubUpdateMessageAction extends GithubActionBase {
  type: GithubActionType.UPDATE_MESSAGE;
  sha: string;
  message: string;
}

interface GithubUpdateHoursAction extends GithubActionBase {
  type: GithubActionType.UPDATE_HOURS;
  sha: string;
  hours: string;
}

interface GithubUpdatePrNumAction extends GithubActionBase {
  type: GithubActionType.UPDATE_PR_NUM;
  sha: string;
  pr_num: string;
}

export type GithubAction =
  GithubSelectCommitAction |
  GithubUnSelectCommitAction |
  GithubUnSelectAllCommitsAction |
  GithubUpdateMessageAction |
  GithubUpdateHoursAction |
  GithubUpdatePrNumAction;

export const GithubContext = React.createContext<{
  connect: (token: string) => Promise<void>;
  searchCommits: (month: string) => Promise<void>;
  user: GitHubUser;
  commits: GitHubCommit[];
  selectedCommits: CommitInfo[];
  selectedCommitsDispatcher: React.Dispatch<GithubAction>;
  loading: boolean;
  error: unknown;
}>(null as any);

function reducer(state: CommitInfo[], action: GithubAction): CommitInfo[] {
  switch (action.type) {
    case GithubActionType.SELECT_COMMIT:
      return [...state, action.commitInfo];

    case GithubActionType.UNSELECT_COMMIT:
      return state.filter(c => c.commit_sha !== action.sha);

    case GithubActionType.UNSELECT_ALL_COMMITS:
      return [];

    case GithubActionType.UPDATE_HOURS:
      return state.map(c => {
        if (c.commit_sha !== action.sha) return c;
        const newHours = isNaN(+action.hours) ? c.hours_spent : +action.hours;
        return { ...c, hours_spent: newHours };
      });

    case GithubActionType.UPDATE_MESSAGE:
      return state.map(c => {
        if (c.commit_sha !== action.sha) return c;
        return { ...c, final_message: action.message };
      });

    case GithubActionType.UPDATE_PR_NUM:
      return state.map(c => {
        if (c.commit_sha !== action.sha) return c;
        const newPrNum = isNaN(+action.pr_num) ? c.pr_num : +action.pr_num;
        return { ...c, pr_num: newPrNum };
      });
  }
}