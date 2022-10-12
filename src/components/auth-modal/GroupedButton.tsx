import React, { useEffect, useState } from "react";

interface GroupedInputProps {
  type?: string;
  placeholder?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClick?: (e: React.MouseEvent) => void;
  inputDisabled?: boolean;
  actionDisabled?: boolean;
  value?: string;
  actionText?: string;
  showCountDown?: boolean;
  finishTimer?: () => void;
}

const GroupedInput = ({
  type = "text",
  placeholder = "",
  onChange = undefined,
  inputDisabled = false,
  actionDisabled = false,
  actionText = "Send Code",
  onClick,
  value,
  showCountDown = false,
  finishTimer,
  ...rest
}: GroupedInputProps) => {
  const [timer, setTimer] = useState(0);

  useEffect(() => {
    let timerId: any = undefined;
    const startTimer = (time: number) => {
      console.log("time: ", time);
      setTimer(time--);
      timerId = setInterval(() => {
        if (time <= 0) {
          clearInterval(timerId);
          finishTimer?.();
        }
        time--;
        setTimer(time);
      }, 1000);
    };

    if (showCountDown && timer <= 0) {
      console.log("showCountDown: ", showCountDown);
      clearInterval(timerId);
      startTimer(60);
    }
  }, [showCountDown, finishTimer]);

  return (
    <div className="flex items-center mb-4">
      <input
        value={value}
        disabled={inputDisabled}
        type={type}
        placeholder={placeholder}
        onChange={onChange}
        className={`h-12 rounded-l-lg border-r-0 border border-[#E2E4E8] peer  bg-white placeholder:text-body text-primary w-full text-sm focus:border-primary-purple focus:ring-0`}
        {...rest}
      />
      <button
        onClick={onClick}
        disabled={actionDisabled || timer > 0}
        className="bg-[#f3f3f3] disabled:bg-opacity-20 disabled:text-opacity-20 h-12 rounded-r-lg border-l-0 border border-[#E2E4E8] text-primary text-sm font-normal inline-block min-w-max px-3 peer-focus:border-primary-purple"
      >
        {timer > 0 ? (
          <span className="text-primary text-sm">
            Resend code in <span className="text-primary-purple">{timer}</span>s
          </span>
        ) : (
          actionText
        )}
      </button>
    </div>
  );
};

export default GroupedInput;
