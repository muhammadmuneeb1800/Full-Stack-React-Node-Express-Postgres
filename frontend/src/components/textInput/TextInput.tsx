import { inputProps } from "../../types/types";

export default function TextInput(props: inputProps) {
  return (
    <>
      <label className="block text-gray-700 font-semibold mb-1">
        {props.title}
      </label>
      <input
        type="text"
        placeholder={props.placeholder}
        value={props.value}
        onChange={props.onChange}
        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
    </>
  );
}
