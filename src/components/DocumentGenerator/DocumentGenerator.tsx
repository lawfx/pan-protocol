import { generateDocument } from "../../utils/utils";
import Button from "../Button/Button";
import { UserData } from "../../models/user-data.model";
import useGithub from "../../hooks/useGithub";

export default function DocumentGenerator({ userData }:
  {
    userData: UserData
  }) {

  const { selectedCommits } = useGithub();

  const allHoursFilledIn = selectedCommits.reduce((acc, curr) => acc + curr.hours_spent, 0) === userData.hours;
  const canGenerateDocx = !!userData.date && !!userData.hours && !!userData.file && allHoursFilledIn;

  function handleClickGenerate() {
    generateDocument(userData, selectedCommits);
  }

  return (
    <Button onClick={handleClickGenerate} disabled={!canGenerateDocx}>
      Generate
    </Button>
  );
}