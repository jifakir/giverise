import { Modal } from "antd";
import React, { useEffect, useState } from "react";
import LoginForm from "./LoginForm";
import SignUpForm from "./SignUpForm";

const AuthModal = ({
  visible = false,
  onClose,
}: {
  visible: boolean;
  onClose: () => void;
}) => {
  const [step, setStep] = useState<number>();
  const [activeForm, setActiveForm] = useState<"signup" | "login">("signup");

  const handleChangeForm = (step = 2, form = "signup") => {
    //this function will be called when user signup with social media
    //then this function will move login form to signup form immediately
    setActiveForm(form as any);
    setStep(step);
  };

  return (
    <Modal
      centered
      mask={true}
      footer={null}
      visible={visible}
      width={400}
      title={null}
      closable={false}
      className="auth-modal"
    >
      {/* <div className='fixed left-0 top-0 w-full h-full z-40 bg-primary bg-opacity-40' /> */}
      <div className="sm:p-4 h-[550px] flex flex-col">
        {activeForm === "signup" ? (
          <SignUpForm
            changeForm={handleChangeForm}
            step={step}
            closeModal={onClose}
          />
        ) : (
          <LoginForm changeForm={handleChangeForm} closeModal={onClose} />
        )}

        <div className="text-center justify-self-end">
          <p className="flex items-center justify-center text-base text-body">
            Already have an account?{" "}
            <a
              onClick={() =>
                setActiveForm(activeForm === "signup" ? "login" : "signup")
              }
              className="text-primary-purple hover:text-primary-purple ml-1 cursor-pointer"
            >
              {activeForm === "signup" ? "Login" : "Sign up"}
            </a>
          </p>
        </div>
      </div>
    </Modal>
  );
};

export default AuthModal;
