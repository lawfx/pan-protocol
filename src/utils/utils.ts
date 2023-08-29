export function parseGithubCommitMessage(message: string): { message: string, prNum: string } {
  const messageData = message.match(/(?<title>.+) (\(#(?<num>\d+)\))/);

  return {
    message: messageData?.groups?.title || message,
    prNum: messageData?.groups?.num || 'N/A'
  }
}