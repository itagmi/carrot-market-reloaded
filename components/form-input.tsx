interface FormInputProps {
  type: string;
  placeholder: string;
  required: boolean;
  error: string[];
  name: string;
}
export default function FormInput({
  type,
  placeholder,
  required,
  error,
  name,
}: FormInputProps) {
  return (
    <div className="flex flex-col gap-2">
      <input
        name={name}
        type={type}
        className="bg-transparent rounded-md w-full h-10 focus:outline-none ring-2 focus:ring-4 transition ring-neutral-200 focus:ring-orange-500 border-none placeholder:text-neutral-400"
        placeholder={placeholder}
        required={required}
      />
      {error.map((error, index) => (
        <span key={index} className="text-red-500 font-medium">
          {error}
        </span>
      ))}
    </div>
  );
}
