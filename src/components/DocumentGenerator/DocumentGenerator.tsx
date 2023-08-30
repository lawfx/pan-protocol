import { generateDocument } from "../../utils/utils";
import Button from "../Button/Button";
import { UserData } from "../../models/user-data.model";
import { GitHubContext } from "../GithubProvider/GithubProvider";
import React from "react";

export default function DocumentGenerator({ file, userData }:
  {
    file: string | ArrayBuffer | null;
    userData: UserData
  }) {

  const { commits } = React.useContext(GitHubContext);

  const allHoursFilledIn = commits.filter(c => c.selected).reduce((acc, curr) => acc + curr.hours_spent, 0) === userData.hours;
  const canGenerateDocx = !!userData.name && !!userData.position && !!userData.date && !!userData.hours && !!file && allHoursFilledIn;

  function handleClickGenerate() {
    generateDocument(file, userData, commits);
  }

  return (
    <Button onClick={handleClickGenerate} disabled={!canGenerateDocx}>
      Generate
    </Button>
  );
}