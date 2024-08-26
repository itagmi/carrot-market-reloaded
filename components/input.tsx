import { InputHTMLAttributes } from "react";

interface InputProps {
  name: string; // require 이기 때문에 남겨둔다.
  error?: string[];
}

export default function Input({
  error = [],
  name,
  ...rest
}: // name과 error를 제외한 나머지 모든 props를 한꺼번에 받아온다.
InputProps & InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className="flex flex-col gap-2">
      <input
        name={name}
        className="bg-transparent rounded-md w-full h-10 focus:outline-none ring-2 focus:ring-4 transition ring-neutral-200 focus:ring-orange-500 border-none placeholder:text-neutral-400"
        {...rest}
      />
      {error.map((error, index) => (
        <span key={index} className="text-red-500 font-medium">
          {error}
        </span>
      ))}
    </div>
  );
}
