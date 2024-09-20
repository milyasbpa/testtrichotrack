import clsx from "clsx";
import { useParams } from "react-router-dom";
import { getDictionaries } from "../../i18n";
import { Textfield } from "src/core/ui/components/textfield";
import { Divider } from "src/core/ui/components/divider";
import { SecretCompanyContext } from "../../context/Secret.company.context";
import { useContext } from "react";
import { SecretCompanyActionEnum } from "../../context/Secret.company.types";
import { MoonLoader } from "src/core/ui/components/moon_loader";
import { useClientSecretPostCheckAPIKey } from "../../react_query/hooks";
import SVGIcon from "src/core/ui/icons";
import { Button } from "src/core/ui/components/button";

export const FormSecretCompany = () => {
  const { locale } = useParams();
  const dictionaries = getDictionaries(locale);

  const { state, dispatch } = useContext(SecretCompanyContext);
  const { isPending, onSubmit } = useClientSecretPostCheckAPIKey();

  const handleChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: SecretCompanyActionEnum.SetSecretValue,
      payload: e.currentTarget.value,
    });
  };

  const handleChangePasswordType = (_: React.MouseEvent<HTMLButtonElement>) => {
    dispatch({
      type: SecretCompanyActionEnum.SetSecretView,
    });
  };
  const handleClickLogin = async (_: React.MouseEvent<HTMLButtonElement>) => {
    await onSubmit();
  };

  const isSubmitDisabled = isPending || !state.form.secret.value.length;

  return (
    <div
      className={clsx(
        "grid grid-cols-1 place-content-start place-items-start gap-y-[2rem]",
        "w-full"
      )}
    >
      <section
        id={"header"}
        className={clsx(
          "grid grid-cols-2 justify-between justify-items-start items-center content-center",
          "w-full"
        )}
      >
        <div
          className={clsx(
            "grid grid-cols-1 gap-y-[0.5rem] justify-start justify-items-start items-center content-center"
          )}
        >
          <div
            className={clsx(
              "grid gap-y-[0.5rem] grid-cols-1 content-center items-center justify-start justify-items-start"
            )}
          >
            <h1 className={clsx("text-[2rem] text-white font-bold")}>
              {dictionaries.client_secret_form.name.toUpperCase()}
            </h1>
            <p className={clsx("text-[1.125rem] text-white font-regular")}>
              {dictionaries.client_secret_form.description}
            </p>
          </div>
        </div>
      </section>

      <Divider />

      <div
        className={clsx(
          "grid grid-cols-1 place-content-center place-items-center gap-y-[1.5rem]",
          "w-full"
        )}
      >
        <Textfield
          id={"password"}
          placeholder={
            dictionaries.client_secret_form.input_client_secret.placeholder
          }
          label={dictionaries.client_secret_form.input_client_secret.label.toUpperCase()}
          maxLength={512}
          type={state.form.secret.show ? "text" : "password"}
          value={state.form.secret.value}
          endAddornment={
            <Button
              id={"password_staff_login_form"}
              variant="icon"
              onClick={handleChangePasswordType}
            >
              <SVGIcon
                name="RemoveRedEye"
                className={clsx(
                  "w-[1.25rem] h-[1.25rem]",
                  state.form.secret.show ? "fill-[#017948]" : "fill-[white]"
                )}
              />
            </Button>
          }
          onChange={handleChangePassword}
        />

        <Button
          variant={"contained"}
          disabled={isSubmitDisabled}
          onClick={handleClickLogin}
        >
          {isPending && <MoonLoader />}
          {dictionaries.client_secret_form.cta.label.toUpperCase()}
        </Button>
      </div>
    </div>
  );
};
