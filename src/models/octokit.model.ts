import { RestEndpointMethodTypes } from '@octokit/rest';

export type GithubCommit = RestEndpointMethodTypes["search"]["commits"]["response"]["data"]["items"][0];
export type GithubUser = RestEndpointMethodTypes["users"]["getAuthenticated"]["response"]["data"] | undefined;