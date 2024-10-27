import { ClipLoader } from "react-spinners";

export default function Loading() {
  return <ClipLoader color="#00BFFF" loading={true} cssOverride={{ margin: 'auto', display: 'block' }} />;
}