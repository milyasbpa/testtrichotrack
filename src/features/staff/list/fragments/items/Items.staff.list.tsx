import { useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import clsx from "clsx";
import { useIntersectionObserver } from "usehooks-ts";
import { ItemCardList } from "../../components/item_card/ItemCard.list";
import { StaffListContext } from "../../contexts/StaffList.context";
import { useDisplayGetStaffs } from "../../react_query/hooks/useGetStaffs.list";
import { SkeletonStaffList } from "../../components/staff_skeleton/StaffSkeleton.list";
import { SearchNotFoundList } from "../../components/search_not_found/SearchNotFound.list";
import { StaffListActionEnum } from "../../contexts/StaffList.types";
import { useDisplayGetOutlets } from "../../react_query/hooks/useGetOutlets.list";
import { AppContext } from "src/core/modules/app/context";
import { getDictionaries } from "../../i18n";
import { PrivateRouteURL } from "src/core/utils/router/constants";

export const ItemsStaffList = () => {
  const navigate = useNavigate();
  const { ref, isIntersecting } = useIntersectionObserver();

  const { locale } = useParams();
  const dictionaries = getDictionaries(locale);

  const { state: appState } = useContext(AppContext);
  const { state, dispatch } = useContext(StaffListContext);

  const {
    isFetching: isFetchingGetStaffs,
    isLoading: isLoadingGetStaffs,
    fetchNextPage,
  } = useDisplayGetStaffs();
  const { isFetching: isFetchingGetOutlets, isLoading: isLoadingGetOutlets } =
    useDisplayGetOutlets();

  const isEmptyGetStaffs = !isFetchingGetStaffs && !state.data.list.length;

  useEffect(() => {
    if (isIntersecting && !isFetchingGetStaffs && !isEmptyGetStaffs) {
      fetchNextPage();
    }
  }, [isIntersecting]);

  if (isLoadingGetOutlets) {
    const loaderList = Array.from({ length: 12 }, (_, i) => i + 1);
    return (
      <div
        className={clsx(
          "grid grid-cols-1 gap-y-[1.5rem]",
          "w-full h-full",
          "overflow-y-auto",
          "scrollbar-none"
        )}
      >
        <div
          className={clsx(
            "grid place-content-start place-items-start grid-cols-3 w-full gap-x-[1.5rem] gap-y-[1.5rem]"
          )}
        >
          {loaderList.map((item) => (
            <SkeletonStaffList key={item} />
          ))}
        </div>
      </div>
    );
  }

  if (isLoadingGetStaffs || isFetchingGetOutlets) {
    const loaderList = Array.from({ length: 12 }, (_, i) => i + 1);
    return (
      <div
        className={clsx(
          "grid grid-cols-1 gap-y-[1.5rem]",
          "w-full h-full",
          "overflow-y-auto",
          "scrollbar-none"
        )}
      >
        <div
          className={clsx(
            "grid place-content-start place-items-start grid-cols-3 w-full gap-x-[1.5rem] gap-y-[1.5rem]"
          )}
        >
          {loaderList.map((item) => (
            <SkeletonStaffList key={item} />
          ))}
        </div>
      </div>
    );
  }

  if (
    !isFetchingGetOutlets &&
    !isFetchingGetStaffs &&
    !state.data.list.length
  ) {
    return (
      <div
        className={clsx(
          "grid grid-cols-1 gap-y-[1.5rem]",
          "w-full h-full",
          "max-h-[calc(100vh-124px-64px-64px-46px-72px-116px-124px)]",
          "overflow-y-auto",
          "scrollbar-none"
        )}
      >
        <SearchNotFoundList
          image_url={dictionaries.search_not_found_section.image_url}
          message={dictionaries.search_not_found_section.message}
        />
      </div>
    );
  }

  const handleClickEdit = (data: number) => {
    navigate(
      PrivateRouteURL.routeToStaffEditURL({
        locale: locale,
        staff_id: String(data),
      })
    );
  };
  const handleClickDelete = (data: number) => {
    dispatch({
      type: StaffListActionEnum.SelectStaffToDelete,
      payload: data,
    });
  };

  return (
    <div
      className={clsx(
        "grid grid-cols-1 gap-y-[1.5rem]",
        "w-full h-full",
        "overflow-y-auto",
        "scrollbar-none"
      )}
    >
      <div
        className={clsx(
          "grid place-content-start place-items-start grid-cols-3 w-full gap-x-[1.5rem] gap-y-[1.5rem]"
        )}
      >
        {state.data.list.map((item, index) => (
          <ItemCardList
            key={index}
            name={item.name}
            initial={item.initial}
            photo={item.photo}
            registration_time={dictionaries.item_card.registration_time.replace(
              "{{registration_time}}",
              item.registration_time
            )}
            cta={
              appState.auth.role === "ADMIN"
                ? {
                    primary: {
                      children: dictionaries.item_card.edit,
                      href: PrivateRouteURL.routeToStaffEditURL({
                        locale: locale,
                        staff_id: String(item.id),
                      }),
                      onClick: () => handleClickEdit(item.id),
                    },
                    secondary: {
                      children: dictionaries.item_card.delete,
                      onClick: () => handleClickDelete(item.id),
                    },
                  }
                : null
            }
          />
        ))}
      </div>

      <div ref={ref} className={clsx("opacity-0")}>
        {"Check Bottom"}
      </div>
    </div>
  );
};
