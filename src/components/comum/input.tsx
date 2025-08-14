interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  id: string;
  type?: string;
  placeholder?: string;
  autoComplete?: string;
  inputRef?: React.Ref<HTMLInputElement>;
  min?: string | number;
  max?: string | number;
}

export function Input({
  id,
  type = "text",
  inputRef,
  placeholder = "",
  autoComplete = "off",
  min,
  max,
  required = false,
  value,
  defaultValue,
  ...rest
}: InputProps) {
  return (
    <input
      id={id}
      type={type}
      ref={inputRef}
      placeholder={placeholder}
      autoComplete={autoComplete}
      className={`bg-[var(--base-color)] w-full px-4 py-2 border border-[var(--base-variant)] rounded-md focus:outline-2 focus:-outline-offset-2 focus:outline-[var(--corPrincipal)]`}
      min={min}
      max={max}
      required={required}
      {...(value !== undefined
        ? { value }
        : { defaultValue: defaultValue ?? "" })}
      {...rest}
      style={{
        color: "var(--cortexto)",
        borderColor: "var(--base-variant)",
      }}
    />
  );
}
