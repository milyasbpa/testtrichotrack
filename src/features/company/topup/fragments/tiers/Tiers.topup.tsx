import * as React from "react";
import clsx from "clsx";
import { ClientTopupContext } from "../../contexts/ClientTopup.context";
import { TierBoxTopUp } from "../../components/tier_box";
import { getDictionaries } from "../../i18n";
import { ClientTopupActionEnum } from "../../contexts/ClientTopup.types";
import { useTopupPostCheckout } from "../../react_query/hooks";
import { useParams } from "react-router-dom";
import SVGIcon from "src/core/ui/icons";
import { LocaleRoute } from "src/core/utils/router/constants";

export const TiersTopUp = () => {
  const { state, dispatch } = React.useContext(ClientTopupContext);
  const { locale } = useParams();
  const dictionaries = getDictionaries(locale);
  const { mutate: postCheckout, isPending: isPendingPostCheckout } =
    useTopupPostCheckout();

  const isPending = isPendingPostCheckout;

  const handleClickSubscribe = (data: { id: number | null }) => {
    if (data.id !== null) {
      postCheckout({ id: data.id });
    }
  };

  const handleClickTier = (data: { id: number }) => {
    dispatch({
      type: ClientTopupActionEnum.SetTierActive,
      payload: {
        ...state.tier.active,
        index: data.id,
      },
    });
  };

  const handleClickPrevious = () => {
    dispatch({
      type: ClientTopupActionEnum.SetTierActive,
      payload: {
        ...state.tier.active,
        index: state.tier.active.index - 1,
      },
    });
  };

  const handleClickNext = () => {
    dispatch({
      type: ClientTopupActionEnum.SetTierActive,
      payload: {
        ...state.tier.active,
        index: state.tier.active.index + 1,
      },
    });
  };

  return (
    <div
      className={clsx(
        "grid grid-cols-1 place-content-start place-items-start gap-[1.5rem]",
        "w-full"
      )}
    >
      <div
        className={clsx(
          "grid grid-cols-1 items-center content-center justify-start justify-items-start gap-[1rem]",
          "w-full",
          "relative"
        )}
      >
        <button
          className={clsx(
            "absolute top-[50%] left-0 translate-y-[-50%]",
            "flex items-center justify-center",
            "bg-[#017747]",
            "w-[2rem] h-[2rem]",
            "rounded-[50%]",
            "disabled:opacity-20",
            "cursor-pointer disabled:cursor-default"
          )}
          disabled={state.tier.active.index === 0}
          onClick={handleClickPrevious}
        >
          <SVGIcon
            name="ArrowTriangle"
            className={clsx("w-[1.5rem] h-[1.5rem]", "fill-white")}
          />
        </button>
        <div
          className={clsx(
            "grid grid-flow-col items-center content-center justify-center justify-items-center gap-[1rem]",
            "w-full",
            "px-[44px]",
            "overflow-hidden"
          )}
          // ref={ref}
        >
          {state.tier.items.map((item, index) => (
            <TierBoxTopUp
              key={index}
              type={state.tier.current.type}
              active={state.tier.active.index === index}
              name={item.name[locale ?? LocaleRoute.default]}
              duration={
                item.duration !== null
                  ? item.duration > 1
                    ? dictionaries.tiers.duration.plural.replace(
                        "{{day}}",
                        item.duration.toLocaleString(
                          locale === "en" ? "en-US" : "zh-CN",
                          {
                            maximumFractionDigits: 2,
                          }
                        )
                      )
                    : dictionaries.tiers.duration.singular.replace(
                        "{{day}}",
                        item.duration.toLocaleString(
                          locale === "en" ? "en-US" : "zh-CN",
                          {
                            maximumFractionDigits: 2,
                          }
                        )
                      )
                  : "-"
              }
              price={
                item.min_price !== null && item.max_price !== null
                  ? item.min_price === item.max_price
                    ? dictionaries.tiers.price.singular
                        .replace(
                          "{{price}}",
                          item.max_price.toLocaleString(
                            locale === "en" ? "en-US" : "zh-CN",
                            {
                              maximumFractionDigits: 2,
                            }
                          )
                        )
                        .replace("{{currency}}", item.currency)
                    : dictionaries.tiers.price.range
                        .replace(
                          "{{minPrice}}",
                          item.min_price.toLocaleString(
                            locale === "en" ? "en-US" : "zh-CN",
                            {
                              maximumFractionDigits: 2,
                            }
                          )
                        )
                        .replace(
                          "{{maxPrice}}",
                          item.max_price.toLocaleString(
                            locale === "en" ? "en-US" : "zh-CN",
                            {
                              maximumFractionDigits: 2,
                            }
                          )
                        )
                        .replace("{{currency}}", item.currency)
                  : "-"
              }
              member={{
                outlet:
                  item.member.outlet !== null
                    ? dictionaries.tiers.outlet.replace(
                        "{{number}}",
                        item.member.outlet.toLocaleString(
                          locale === "en" ? "en-US" : "zh-CN",
                          { maximumFractionDigits: 2 }
                        )
                      )
                    : "-",
                staff:
                  item.member.staff !== null
                    ? dictionaries.tiers.staff.replace(
                        "{{number}}",
                        item.member.staff.toLocaleString(
                          locale === "en" ? "en-US" : "zh-CN",
                          { maximumFractionDigits: 2 }
                        )
                      )
                    : "-",
                customer:
                  item.member.customer !== null
                    ? dictionaries.tiers.customer.replace(
                        "{{number}}",
                        item.member.customer.toLocaleString(
                          locale === "en" ? "en-US" : "zh-CN",
                          { maximumFractionDigits: 2 }
                        )
                      )
                    : "-",
              }}
              cta={{
                primary: {
                  children: dictionaries.tiers.cta.subscribe.children,
                  disabled: isPending,
                  onClick: () => handleClickSubscribe({ id: item.id }),
                },
              }}
              intro={item.intro[locale ?? LocaleRoute.default]}
              terms={item.terms[locale ?? LocaleRoute.default]}
              onClick={() => handleClickTier({ id: index })}
            />
          ))}
        </div>

        <button
          className={clsx(
            "flex items-center justify-center",
            "bg-[#017747]",
            "w-[2rem] h-[2rem]",
            "rounded-[50%]",
            "absolute top-[50%] right-0 translate-y-[-50%]",
            "rotate-180",
            "disabled:opacity-20",
            "cursor-pointer disabled:cursor-default"
          )}
          disabled={state.tier.active.index === state.tier.items.length - 1}
          onClick={handleClickNext}
        >
          <SVGIcon
            name="ArrowTriangle"
            className={clsx("w-[1.5rem] h-[1.5rem]", "fill-white")}
          />
        </button>
      </div>

      {/* indicator */}
      <div
        className={clsx(
          "grid grid-cols-1 place-content-center place-items-center",
          "w-full"
        )}
      >
        <div
          className={clsx(
            "grid grid-flow-col place-content-center place-items-center gap-[1.5rem]"
          )}
        >
          {state.tier.items.map((_, index) => (
            <button
              key={index}
              className={clsx(
                "w-[1rem] h-[1rem]",
                state.tier.active.index === index
                  ? "bg-[#017747]"
                  : "bg-[#666666]",
                "rounded-[50%]"
              )}
            />
          ))}
        </div>
      </div>
      {/* end indicator */}
    </div>
  );
};
