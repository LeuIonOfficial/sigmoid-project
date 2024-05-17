import { FormEvent } from "react";

import { Api } from "../../requests";
import { useNavigate } from "react-router-dom";
import routes from "../../routes";
export const useHandleData = () => {
  const navigate = useNavigate();
  const handleSubmitForm = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    const updatedData = Array.from(formData.entries()).reduce(
      (acc: Record<string, string>, [key, value]) => {
        if (typeof value === "string") {
          acc[key] = value;
        }
        return acc;
      },
      {},
    );

    const response = await Api.auth.login(updatedData);
    if (response.success) {
      alert("You have successfully login");
      navigate(routes.authenticated.dashboard);
    } else {
      alert("Something goes wrong");
    }
  };

  return { handleSubmitForm };
};
