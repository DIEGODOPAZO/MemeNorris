import { RotatingLines} from "react-loader-spinner";

export default function Loader() {
  return (
    <div className="m-auto p-4 my-6 max-w-30">
        <RotatingLines
      strokeColor="white"
      strokeWidth="5"
      animationDuration="0.75"
      width="96"
      visible={true}
    />
    </div>
  )
}