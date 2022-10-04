import { notification } from "antd";
import React, { useEffect, useState } from "react";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import { BiChevronLeft, BiX } from "react-icons/bi";
import useAsyncEffect from "use-async-effect";
import { AuthProviderType } from "../../contexts/AuthProvider";
import { useAuth } from "../../hooks/useAuth";
import api from "../../utils/api";
import CountrySelect from "../country-select/CountrySelect";
import ActionButton from "./ActionButton";
import GroupedInput from "./GroupedButton";
import OAuthProviderButton from "./OAuthProviderButton";
import TagButton from "./TagButton";
import TextInput from "./TextInput";

const tags = [
  "STEM",
  "Pay for exams",
  "Tech Bootcamp",
  "Scholarships",
  "Entrepreneurship",
  "Research",
  "School Rehabilitation",
  "Educational tools",
  "Study abroad",
  "Creatives",
  "Creatives",
];

let isTaken = false;
const SignUpForm = ({
  closeModal,
  changeForm,
  step,
}: {
  closeModal: () => void;
  changeForm?: (step: number, form: string) => void;
  step?: number;
}) => {
  const {
    handleOAuthLogin,
    updateisNewSocialUser,
    authStatus,
    user,
    isNewSocialUser,
  } = useAuth();
  const [currentStep, setCurrentStep] = useState(1);
  const [categories, setCategories] = useState<Record<string, any>[]>([]);
  const [selectedAuthProvider, setSelectedAuthProvider] = useState("");
  const [showCountDown, setShowCountDown] = useState(false);
  const [loading, setLoading] = useState(false);
  const [signUpData, setSignUpData] = useState<Record<string, any>>({
    email: "",
    firstName: "",
    lastName: "",
    username: "",
    code: "",
    password: "",
    countryOfOrigin: "",
    currentCityAndCountry: "",
    cause: [],
  });
  const [visibleError, setVisibleError] = useState(false);
  const [selectedPlace, setSelectedPlace] = useState(null);

  const goNextStep = async () => {
    setVisibleError(false);
    console.log(signUpData);
    if (
      currentStep === 2 &&
      (!signUpData.countryOfOrigin || !signUpData.currentCityAndCountry)
    ) {
      setVisibleError(true);
      return;
    }

    if (currentStep === 3) {
      isTaken = false;
      if (!signUpData.username) {
        setVisibleError(true);
        return;
      }

      isTaken = await validateUserName(signUpData.username);

      if (isTaken) {
        setVisibleError(true);
        return;
      }
    }
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

  useAsyncEffect(async () => {
    if (!categories.length) {
      const { data } = await api<any, any>("/categories");
      setCategories(data);
    }
  }, []);

  useEffect(() => {
    if (typeof step !== "undefined") {
      setCurrentStep(step);
    }
  }, [step]);

  useEffect(() => {
    if (isNewSocialUser && user) {
      setSignUpData((prev) => ({
        ...prev,
        firstName: user.firstName,
        lastName: user.lastName,
        username: user.lastName,
        email: user.email,
        countryOfOrigin: user.countryOfOrigin,
        currentCityAndCountry: user.currentCityAndCountry,
      }));
      setCurrentStep(2);
    }
  }, [isNewSocialUser, user]);

  const handleOnChange = (name: string, value: string) => {
    setSignUpData({
      ...signUpData,
      [name]: value,
    });
  };

  const addCause = (id: number) => {
    let causes = signUpData.cause;
    if (causes.includes(id)) {
      causes = causes.filter((item: any) => item != id);
    } else {
      causes.push(id);
    }
    setSignUpData({ ...signUpData, cause: causes });
  };

  const validateUserName = async (username: string) => {
    const { data } = await api<any, any>(`/auth/verifyUsername/${username}`);
    return data.isTaken;
  };

  const handleSignUp = async () => {
    setVisibleError(false);

    if (
      !signUpData.firstName ||
      !signUpData.lastName ||
      !signUpData.email ||
      !signUpData.password ||
      !signUpData.code
    ) {
      setVisibleError(true);
      return;
    }

    try {
      setLoading(true);
      const { data } = await api("/auth/signup", signUpData);
      notification.success({
        message: "Signup completed",
      });
      if (isNewSocialUser) {
        updateisNewSocialUser?.(null);
        closeModal?.();
        setSelectedAuthProvider("");
      } else {
        changeForm?.(0, "signin");
      }
    } catch (error) {
      notification.error({
        message: "Signup Failed.",
      });
    }
    setLoading(false);
  };

  const sendVerificationCode = async () => {
    try {
      setShowCountDown(true);
      const { data } = await api(`/auth/getToken/${signUpData.email}`);
    } catch (error) {
      setShowCountDown(false);
    }
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
        <h2 className="mx-auto text-2xl font-bold text-primary">
          Sign up {currentStep === 1 ? "for Giverise" : ""}
        </h2>
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
            {/* <OAuthProviderButton
              loading={
                authStatus === "in-progress" &&
                selectedAuthProvider === "instagram"
              }
              logo="instagram_icon.png"
              text="Continue with Instagram"
              onClick={() => handleAuthButtonClick("instagram")}
            /> */}
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
            <CountrySelect
              placeholder="Select"
              onChange={(val) => handleOnChange("countryOfOrigin", val)}
              value={signUpData.countryOfOrigin}
              error={
                visibleError && !signUpData.countryOfOrigin
                  ? "please select a country"
                  : undefined
              }
            />

            {/* <TextInput
              onChange={(val) => handleOnChange("currentCityAndCountry", val)}
              error={
                visibleError && !signUpData.currentCityAndCountry
                  ? "please input country,city"
                  : undefined
              }
              value={signUpData.currentCityAndCountry}
              placeholder="Current city, country"
              helpText="Your country won’t be shown publicly"
              name="city"
            /> */}
            <div className="mb-4">
              <GooglePlacesAutocomplete
                apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY}
                selectProps={{
                  onChange: (val: Record<string, any>) => {
                    console.log(val);
                    setSelectedPlace(val as any);
                    setSignUpData((prev) => ({
                      ...prev,
                      currentCityAndCountry: val.label,
                    }));
                  },
                  value: selectedPlace,
                  className: `place-auto-complete ${
                    visibleError && !signUpData.currentCityAndCountry
                      ? "error"
                      : ""
                  }`,
                }}
              />
            </div>
            <ActionButton
              onClick={goNextStep}
              disabled={
                !signUpData.currentCityAndCountry || !signUpData.countryOfOrigin
              }
            />
          </>
        )}

        {currentStep === 3 && (
          <>
            <TextInput
              onChange={(val) => handleOnChange("username", val)}
              error={
                visibleError && !signUpData.username
                  ? "please input valid username"
                  : isTaken
                  ? "username is taken"
                  : undefined
              }
              value={signUpData.username}
              label="Create username"
              placeholder="username"
              helpText="Create something close to whatever"
              name="username"
            />
            <ActionButton
              onClick={goNextStep}
              disabled={!signUpData.username}
            />
          </>
        )}

        {currentStep === 4 && (
          <>
            <label className="block text-primary font-medium text-sm mb-4">
              What best describes causes and awards you are interested in?
            </label>
            <div className="flex gap-2 flex-wrap items-center mb-10">
              {categories.map((tag) => (
                <TagButton
                  onClick={() => addCause(tag.id)}
                  selected={signUpData.cause.includes(tag.id)}
                  key={tag.title}
                  label={tag.title}
                />
              ))}
            </div>
            <ActionButton
              onClick={goNextStep}
              disabled={!signUpData.cause?.length}
            />
          </>
        )}

        {currentStep === 5 && (
          <>
            <TextInput
              onChange={(val) => handleOnChange("email", val)}
              value={signUpData.email}
              error={
                visibleError && !signUpData.email
                  ? "please input valid email"
                  : undefined
              }
              label="Email"
              type="email"
              placeholder="Email"
              name="email"
            />
            <div className="grid grid-cols-2 gap-3">
              <TextInput
                onChange={(val) => handleOnChange("firstName", val)}
                value={signUpData.firstName}
                error={
                  visibleError && !signUpData.firstName
                    ? "firstName is required"
                    : undefined
                }
                placeholder="First name"
                name="firstName"
              />
              <TextInput
                onChange={(val) => handleOnChange("lastName", val)}
                value={signUpData.lastName}
                error={
                  visibleError && !signUpData.firstName
                    ? "lastName is required"
                    : undefined
                }
                placeholder="Last name"
                name="lastName"
              />
            </div>
            <TextInput
              onChange={(val) => handleOnChange("password", val)}
              value={signUpData.password}
              error={
                visibleError && !signUpData.firstName
                  ? "password is required"
                  : undefined
              }
              placeholder="Password"
              type="password"
              name="password"
            />

            <GroupedInput
              finishTimer={() => setShowCountDown(false)}
              showCountDown={showCountDown}
              onClick={sendVerificationCode}
              onChange={(e) => handleOnChange("code", e.target.value)}
              placeholder="Enter 6-digit code"
              actionDisabled={!signUpData.email}
              inputDisabled={!signUpData.email}
              value={signUpData.code}
            />
            <ActionButton
              onClick={handleSignUp}
              loading={loading}
              label="Signup"
              disabled={
                !signUpData.email ||
                !signUpData.firstName ||
                !signUpData.lastName ||
                !signUpData.password ||
                !signUpData.code
              }
            />

            <p className="text-xs text-secondary mt-auto text-center mb-3">
              By continuing, you agree to Giverise’s{" "}
              <a className="text-primary hover:text-primary font-bold">
                Terms of Service
              </a>{" "}
              and confirm that you have read Giverise’s{" "}
              <a className="text-primary hover:text-primary font-bold">
                Privacy Policy
              </a>
              .
            </p>
          </>
        )}
      </div>
    </>
  );
};

export default SignUpForm;
