import type { InputHTMLAttributes } from "react";

type InputProps = InputHTMLAttributes<HTMLInputElement>;

export default function Input(props: InputProps) {
    return <input className="border border-gray-600 placeholder:text-gray-700 text-white py-2 px-4 rounded" {...props} />;
}
