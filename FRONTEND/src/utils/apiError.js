import { ErrorToast, SuccessToast } from "./toastUtils";

export const handleAPIError = (err) => {
    const errorMessage = err?.response?.data?.message ?? err?.message;
    console.error("------------------");
    console.error(errorMessage);
    console.error("------------------");
    ErrorToast(errorMessage);
    return errorMessage;
};

export const handleAPISuccess = (res) => {
    const successMessage = res?.data?.message ?? "Success";
    console.info("✅", successMessage);
    SuccessToast(successMessage);
    return successMessage;
};
