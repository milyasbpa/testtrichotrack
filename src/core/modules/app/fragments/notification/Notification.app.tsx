import { Alert } from "src/core/ui/components/alert";
import { getDictionaries } from "../../i18n";
import { useParams } from "react-router-dom";
import { useContext } from "react";
import { AppActionEnum, AppContext } from "../../context";
import clsx from "clsx";

export const NotificationApp = () => {
  const { state, dispatch } = useContext(AppContext);
  const { locale } = useParams();
  const dictionaries = getDictionaries(locale);

  const handleCloseAlert = (data: { id: string }) => {
    dispatch({
      type: AppActionEnum.SetNotificationItems,
      payload: state.notification.items.filter((item) => item.id !== data.id),
    });
  };
  return (
    <div
      className={clsx(
        "grid grid-cols-1",
        "fixed right-0 top-0 left-0 z-[9999]",
        "items-center content-center justify-between justify-items-start"
      )}
    >
      {state.notification.items.map((item, index) => {
        const notificationItem = dictionaries.notification.items.find(
          (notificationItems) => notificationItems.id === item.id
        );
        const message = notificationItem?.message ?? "";
        const description = notificationItem?.description ?? "";
        const variant = item.variant;
        return (
          <Alert
            key={index}
            open={true}
            message={message}
            description={description}
            variant={variant}
            onClose={() => handleCloseAlert({ id: item.id })}
          />
        );
      })}
    </div>
  );
};
