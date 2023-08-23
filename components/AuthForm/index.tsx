import Button from "@/components/Button";
import { EAuthForm } from "@/core/enums/app";
import { useUser } from "@/hooks/useUser";
import { ChangeEvent, FormEvent, useState } from "react";

type AuthFormProps = {
  onSubmitComplete: (...args: any[]) => void;
  type?: EAuthForm;
};

const AuthForm: React.FC<AuthFormProps> = (props) => {
  const { onSubmitComplete, type = EAuthForm.SIGNIN } =
    props;
  const { onUserSignUp, isLoading, onUserSignIn } =
    useUser();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] =
    useState<string>("");

  const onChangeValue = (
    e: ChangeEvent<HTMLInputElement>
  ) => {
    const targetName = e.target.name;
    const value = e.target.value;

    switch (targetName) {
      case "email":
        setEmail(value);
        break;
      case "password":
        setPassword(value);
        break;
      case "confirmPassword":
        setConfirmPassword(value);
        break;

      default:
        break;
    }
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (type === EAuthForm.SIGNIN) {
      onUserSignIn(email, password, onSubmitComplete);
    } else {
      if (confirmPassword === password) {
        onUserSignUp(email, password, onSubmitComplete);
      }
    }
  };

  return (
    <form
      className="flex flex-col gap-y-3"
      onSubmit={onSubmit}
    >
      <input
        name="email"
        onChange={onChangeValue}
        className="border rounded border-black w-full py-1 px-2"
        placeholder="Enter your email id"
        type="email"
        required
      />
      <input
        name="password"
        onChange={onChangeValue}
        className="border rounded border-black w-full py-1 px-2"
        placeholder="Enter your password"
        type="password"
        minLength={6}
        maxLength={24}
        required
      />
      {type === EAuthForm.SIGNUP && (
        <input
          name="confirmPassword"
          onChange={onChangeValue}
          className="border rounded border-black w-full py-1 px-2"
          placeholder="Re-enter your password"
          type="password"
          minLength={6}
          maxLength={24}
          required
        />
      )}

      <Button
        label={
          type === EAuthForm.SIGNIN ? "Sign in" : "Sign up"
        }
        type="submit"
        disabled={isLoading}
      />
    </form>
  );
};

export default AuthForm;
