import { useContext, useEffect } from "react";
import clsx from "clsx";
import { useIntersectionObserver } from "usehooks-ts";
import { ItemCardList } from "../../components/item_card";
import { OutletListContext } from "../../contexts/OutletList.context";
import { useDisplayGetOutlets } from "../../react_query/hooks/useGetOutlets.list";
import { SearchNotFoundList } from "../../components/search_not_found";
import { OutletListActionEnum } from "../../contexts/OutletList.types";
import { OutletSkeletonList } from "../../components/outlet_skeleton";
import { useParams } from "react-router-dom";
import { getDictionaries } from "../../i18n";
import { PrivateRouteURL } from "src/core/utils/router/constants";

export const ItemsOutletList = () => {
  const { ref, isIntersecting } = useIntersectionObserver();

  const {
    isFetching: isFetchingGetOutlets,
    isLoading: isLoadingGetOutlets,
    fetchNextPage,
  } = useDisplayGetOutlets();
  const { locale } = useParams();
  const { state, dispatch } = useContext(OutletListContext);
  const dictionaries = getDictionaries(locale);

  const isEmptyGetOutlets = !isFetchingGetOutlets && !state.data.list.length;

  useEffect(() => {
    if (isIntersecting && !isFetchingGetOutlets && !isEmptyGetOutlets) {
      fetchNextPage();
    }
  }, [isIntersecting]);

  if (isLoadingGetOutlets) {
    const loaderList = Array.from({ length: 9 }, (_, i) => i + 1);
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
            <OutletSkeletonList key={item} />
          ))}
        </div>
      </div>
    );
  }

  if (isEmptyGetOutlets) {
    return (
      <div
        className={clsx(
          "grid grid-cols-1 gap-y-[1.5rem]",
          "w-full h-full",
          "overflow-y-auto",
          "scrollbar-none"
        )}
      >
        <SearchNotFoundList
          message={dictionaries.search_not_found_section.message}
        />
      </div>
    );
  }

  const handleClickDelete = (data: number) => {
    dispatch({
      type: OutletListActionEnum.SelectOutletToDelete,
      payload: data,
    });
  };

  return (
    <div
      className={clsx(
        "grid grid-cols-1 gap-y-[1.5rem]",
        "w-full h-[calc(100vh-2rem-1.5rem-2rem-82px-112px-1.5rem-1.5rem-12.5rem)]",
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
            {...item}
            key={index}
            registration_time={dictionaries.item_card.registration_time.replace(
              "{{registration_time}}",
              item.registration_time
            )}
            cta={{
              primary: {
                children: dictionaries.item_card.edit,
                href: PrivateRouteURL.routeToOutletEditURL({
                  locale: locale,
                  outlet_id: String(item.id),
                }),
              },
              secondary: {
                children: dictionaries.item_card.delete,
                onClick: () => handleClickDelete(item.id),
              },
            }}
          />
        ))}
      </div>

      <div ref={ref} className={clsx("opacity-0")}>
        {"Check Bottom"}
      </div>
    </div>
  );
};
