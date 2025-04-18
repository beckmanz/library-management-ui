import { useState } from "react";
import { BsEye, BsEyeSlash } from "react-icons/bs";

interface Props {
  type?: string;
  value: string;
  required?: boolean;
  placeholder?: string;
  pattern?: string;
  errorMessage?: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
}

export function InputDefault({
  type = "text",
  value,
  required = false,
  placeholder,
  pattern,
  errorMessage,
  onChange,
  onBlur,
}: Props) {
  const [showPassword, setShowPassword] = useState(false);
  const [focused, setFocused] = useState(false);
  const [touched, setTouched] = useState(false);

  const isPasswordField = type === "password";

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  const isValid = () => {
    if (!required && !value) return true;
    if (pattern) return new RegExp(pattern).test(value);
    return required ? !!value : true;
  };

  const showError = touched && !isValid();

  const handleBlur = () => {
    setTouched(true);
    setFocused(false);
    onBlur?.();
  };

  return (
    <div className="w-full">
      <div
        className={`flex h-13 w-full gap-2 rounded-3xl border-2 px-3 text-center text-xl ${
          showError ? "border-red-500" : "border-gray-500"
        } ${focused ? "border-purple-500" : ""}`}
      >
        <input
          className="h-full w-full rounded-3xl border-none bg-transparent text-center outline-none"
          type={isPasswordField && showPassword ? "text" : type}
          value={value}
          onChange={handleChange}
          onFocus={() => setFocused(true)}
          onBlur={handleBlur}
          required={required}
          placeholder={placeholder}
        />
        {isPasswordField && (
          <button
            className="border-none bg-transparent outline-none"
            onClick={togglePasswordVisibility}
            type="button"
          >
            {showPassword ? (
              <BsEyeSlash color="#6a7282" size={27} />
            ) : (
              <BsEye color="#6a7282" size={27} />
            )}
          </button>
        )}
      </div>
      {showError && (
        <div className="mt-1 text-center text-red-500">
          {errorMessage || `Este campo é obrigatório`}
        </div>
      )}
    </div>
  );
}
