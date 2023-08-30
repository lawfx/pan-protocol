import { RestEndpointMethodTypes } from '@octokit/rest';

export type GitHubCommit = RestEndpointMethodTypes["search"]["commits"]["response"]["data"]["items"][0];
export type GitHubUser = RestEndpointMethodTypes["users"]["getAuthenticated"]["response"]["data"] | undefined;