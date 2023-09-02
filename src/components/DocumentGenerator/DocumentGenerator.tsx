import { generateDocument } from "../../utils/utils";
import Button from "../Button/Button";
import useGithub from "../../hooks/useGithub";
import useUserData from "../../hooks/useUserData";

export default function DocumentGenerator() {

  const { data, file } = useUserData();
  const { selectedCommits } = useGithub();

  const allHoursFilledIn = selectedCommits.reduce((acc, curr) => acc + curr.hours_spent, 0) === data.hours;
  const canGenerateDocx = !!data.date && !!data.hours && !!file && allHoursFilledIn;

  function handleClickGenerate() {
    generateDocument(file, data, selectedCommits);
  }

  return (
    <Button onClick={handleClickGenerate} disabled={!canGenerateDocx}>
      Generate
    </Button>
  );
}