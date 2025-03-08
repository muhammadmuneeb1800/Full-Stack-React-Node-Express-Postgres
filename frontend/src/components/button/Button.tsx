import { buttonProps } from "../../types/types";

export default function Button(props: buttonProps) {
  return (
    <button
      type={props.type}
      onClick={props.onClick}
      className={`${
        props.title === "Delete" || props.title === "Cencel"
          ? "bg-red-500 hover:bg-red-700 hover:text-white"
          : "bg-blue-500 hover:bg-blue-700 hover:text-white"
      } active:scale-[0.93] border px-5 py-2 rounded-md shadow-md text-base md:text-lg font-semibold`}
    >
      {props.title}
    </button>
  );
}
