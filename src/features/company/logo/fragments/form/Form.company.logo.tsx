import { useContext, useEffect } from "react";
import clsx from "clsx";
import { CompanyLogoContext, CompanyLogoActionEnum } from "../../contexts";
import { UploadCompanyLogo } from "../../components/upload/Upload.company.logo";
import { AppActionEnum, AppContext } from "src/core/modules/app/context";

export const FormCompanyLogo = () => {
  const { state: appState, dispatch: dispatchApp } = useContext(AppContext);
  const { state, dispatch } = useContext(CompanyLogoContext);

  useEffect(() => {
    dispatch({
      type: CompanyLogoActionEnum.SetImageUploader,
      payload: appState.company.image_url ?? "",
    });
  }, [appState.company.image_url]);

  const handleErrorDimension = () => {
    dispatchApp({
      type: AppActionEnum.SetNotificationData,
      payload: {
        ...appState.notification,
        items: [
          ...appState.notification.items,
          {
            variant: "danger",
            id: "ERROR_COMPANY_LOGO_DIMENSION",
          },
        ],
      },
    });
    dispatch({
      type: CompanyLogoActionEnum.ValidateImage,
      payload: false,
    });
  };

  const handleErrorFileType = () => {
    dispatchApp({
      type: AppActionEnum.SetNotificationData,
      payload: {
        ...appState.notification,
        items: [
          ...appState.notification.items,
          {
            variant: "danger",
            id: "ERROR_COMPANY_LOGO_FORMAT",
          },
        ],
      },
    });
    dispatch({
      type: CompanyLogoActionEnum.ValidateImage,
      payload: false,
    });
  };

  const handleErrorFileSize = () => {
    dispatchApp({
      type: AppActionEnum.SetNotificationData,
      payload: {
        ...appState.notification,
        items: [
          ...appState.notification.items,
          {
            variant: "danger",
            id: "ERROR_COMPANY_LOGO_SIZE",
          },
        ],
      },
    });
    dispatch({
      type: CompanyLogoActionEnum.ValidateImage,
      payload: false,
    });
  };

  const handleUpload = (data: string) => {
    dispatch({
      type: CompanyLogoActionEnum.SetImageUploader,
      payload: data,
    });
    dispatch({
      type: CompanyLogoActionEnum.ValidateImage,
      payload: true,
    });
  };

  return (
    <div
      className={clsx(
        "grid grid-cols-1 items-start content-start justify-center justify-items-center",
        "w-full"
      )}
    >
      <UploadCompanyLogo
        imageURL={state.uploader.image}
        onUpload={handleUpload}
        onErrorDimension={handleErrorDimension}
        onErrorFileType={handleErrorFileType}
        onErrorMaxFileSize={handleErrorFileSize}
      />
    </div>
  );
};
