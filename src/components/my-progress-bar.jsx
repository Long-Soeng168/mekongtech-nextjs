import { Progress } from "./ui/progress";

const MyProgressBar = ({ uploadProgress }) => {
  return (
    <div className="flex gap-2 items-center justify-center">
      <p className="text-primary whitespace-nowrap space-x-1">
        {uploadProgress} %
      </p>
      <Progress value={uploadProgress} />
    </div>
  );
};

export default MyProgressBar;
