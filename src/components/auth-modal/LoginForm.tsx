import { notification } from "antd";
import React, { useEffect, useState } from "react";
import { BiChevronLeft, BiX } from "react-icons/bi";
import { AuthProviderType } from "../../contexts/AuthProvider";
import { useAuth } from "../../hooks/useAuth";
import api from "../../utils/api";
import ActionButton from "./ActionButton";
import GroupedInput from "./GroupedButton";
import OAuthProviderButton from "./OAuthProviderButton";
import ResetPassword from "./ResetPassword";
import TextInput from "./TextInput";

const LoginForm = ({
  closeModal,
  changeForm,
}: {
  closeModal: () => void;
  changeForm: (stp: number, form: string) => void;
}) => {
  const {
    handleOAuthLogin,
    handleBasicLogin,
    authStatus,
    isNewSocialUser,
    user,
  } = useAuth();
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedAuthProvider, setSelectedAuthProvider] = useState("");
  const [visibleError, setVisibleError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [signInForm, setSignInForm] = useState({
    id: "",
    password: "",
  });

  const goNextStep = () => {
    setCurrentStep(currentStep + 1);
  };

  const goPrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };
  const handleAuthButtonClick = (provider: AuthProviderType) => {
    setSelectedAuthProvider(provider);
    handleOAuthLogin?.(provider);
  };

  useEffect(() => {
    if (
      (authStatus === "failed" || authStatus === "success") &&
      !isNewSocialUser &&
      selectedAuthProvider
    ) {
      closeModal?.();
      setSelectedAuthProvider("");
    }
  }, [authStatus, closeModal, selectedAuthProvider, isNewSocialUser]);

  useEffect(() => {
    if (user && isNewSocialUser) {
      changeForm?.(2, "signup");
    }
  }, [user, isNewSocialUser, changeForm]);

  const handleSignIn = async () => {
    try {
      setVisibleError(false);
      if (!signInForm.id || !signInForm.password) {
        setVisibleError(true);
        return;
      }
      setLoading(true);
      await handleBasicLogin?.(signInForm);
      notification.success({
        message: "login success",
      });
      closeModal?.();
    } catch (error: any) {
      // console.log("error ", error?.message);
      notification.error({
        message: error?.message ?? "something went wrong unable to login",
      });
    }
    setLoading(false);
  };

  return (
    <>
      <div className="flex items-center w-full mb-4 auth-header">
        {currentStep > 1 && (
          <button
            onClick={goPrevStep}
            className="w-6 h-6 rounded-full bg-primary-purple bg-opacity-10 grid place-items-center text-base text-primary"
          >
            <BiChevronLeft />
          </button>
        )}
        {currentStep < 3 && (
          <h2 className="mx-auto text-2xl font-bold text-primary">
            Sign in {currentStep === 1 ? "for Giverise" : ""}
          </h2>
        )}

        {currentStep === 3 && (
          <h2 className="mx-auto text-2xl font-bold text-primary">
            Forgot Password
          </h2>
        )}

        {currentStep === 4 && (
          <h2 className="mx-auto text-2xl font-bold text-primary">
            New password
          </h2>
        )}
        <button
          className="w-6 h-6 rounded-full bg-primary-purple bg-opacity-10 grid place-items-center text-base text-primary"
          onClick={closeModal}
        >
          <BiX />
        </button>
      </div>

      <div className="smMax:p-4">
        {currentStep === 1 && (
          <>
            <OAuthProviderButton
              loading={
                authStatus === "in-progress" &&
                selectedAuthProvider === "facebook"
              }
              logo="facebook.png"
              text="Sign up with Facebook"
              onClick={() => handleAuthButtonClick("facebook")}
            />
            <OAuthProviderButton
              loading={
                authStatus === "in-progress" &&
                selectedAuthProvider === "google"
              }
              logo="google.png"
              text="Continue with Google"
              onClick={() => handleAuthButtonClick("google")}
            />
            <OAuthProviderButton
              loading={
                authStatus === "in-progress" &&
                selectedAuthProvider === "instagram"
              }
              logo="instagram_icon.png"
              text="Continue with Instagram"
              onClick={() => handleAuthButtonClick("instagram")}
            />
            <OAuthProviderButton
              loading={
                authStatus === "in-progress" &&
                selectedAuthProvider === "linkedin"
              }
              logo="linkedin.png"
              text="Continue with LinkedIn"
              onClick={() => handleAuthButtonClick("linkedin")}
            />
            <OAuthProviderButton
              logo="mail-logo.png"
              text="Continue with Email"
              onClick={goNextStep}
            />
          </>
        )}

        {currentStep === 2 && (
          <>
            <TextInput
              onChange={(v) => setSignInForm({ ...signInForm, id: v })}
              value={signInForm.id}
              placeholder="Email"
              label="Email"
              type="email"
            />
            <TextInput
              onChange={(v) => setSignInForm({ ...signInForm, password: v })}
              value={signInForm.password}
              placeholder="Password"
              type="password"
              containerClass="mb-2"
            />
            <button
              className="text-xs text-primary-purple font-normal text-start mb-5"
              onClick={() => setCurrentStep(3)}
            >
              Forgot password?
            </button>
            <ActionButton
              loading={loading}
              label="Sign in"
              onClick={handleSignIn}
            />
          </>
        )}

        <ResetPassword
          currentStep={currentStep}
          setCurrentStep={setCurrentStep}
        />
      </div>
    </>
  );
};

export default LoginForm;
