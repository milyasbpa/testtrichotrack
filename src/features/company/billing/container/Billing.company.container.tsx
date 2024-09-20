import clsx from "clsx";
import { getDictionaries } from "../i18n";
import { useContext } from "react";
import { CompanyBillingContext } from "../context/Billing.company.context";
import { MemberListCompanyBilling } from "../components/member_list";
import { MenuCompanyBilling } from "../components/menu/Menu.company.billing";
import { useNavigate, useParams } from "react-router-dom";
import { useCompanyBillingGetCurrentTier } from "../react_query/hooks";
import { AppContainer } from "src/core/modules/app/container";
import { LocaleRoute, PrivateRouteURL } from "src/core/utils/router/constants";
import { Button } from "src/core/ui/components/button";
import { Center } from "src/core/ui/layout/center";
import { Card } from "src/core/ui/components/card/Card";
import { CreditInformationCompanyBilling } from "../components/credit_information";
import { TierInformationCompanyBilling } from "../components/tier_information";
import { Divider } from "src/core/ui/components/divider";
import { Badge } from "src/core/ui/components/badge";
import { SubscriptionInformationCompanyBilling } from "../components/subscription_information";

export const CompanyBillingContainer = () => {
  const { locale } = useParams();
  const { state } = useContext(CompanyBillingContext);
  const { isFetching: isFetchingGetCurrentTier } =
    useCompanyBillingGetCurrentTier();
  const isFetching = isFetchingGetCurrentTier;
  const dictionaries = getDictionaries(locale);
  const navigate = useNavigate();
  const handleClickTopUp = () => {
    navigate(
      PrivateRouteURL.routeToCompanyTopUpURL({
        locale: locale,
      })
    );
  };

  const isShowAlert = state.profile.alert !== null;

  const alertMessage =
    state.profile.alert !== null && state.profile.type === "credit"
      ? state.profile.alert[locale ?? LocaleRoute.default]
      : state.profile.alert !== null && state.profile.type === "subscription"
      ? state.profile.alert[locale ?? LocaleRoute.default]
      : "";

  return (
    <AppContainer>
      <Center>
        <div
          className={clsx(
            "grid grid-cols-1 place-content-center place-items-center gap-[1rem]",
            "w-full max-w-[920px]",
            "relative"
          )}
        >
          {/* alert */}
          {isShowAlert && (
            <Badge
              open
              variant="error"
              message={alertMessage}
              closeable={false}
            />
          )}
          {/* end alert  */}

          {/* content */}
          <div
            className={clsx(
              "grid grid-cols-1 place-content-center place-items-center",
              "w-full max-w-[920px]",
              "relative"
            )}
          >
            <Card
              elevation="1"
              className={clsx(
                "flex flex-col items-start justify-between",
                "w-full lg:max-w-[920px]",
                "rounded-[1.5rem]"
              )}
            >
              <div
                className={clsx(
                  "grid grid-flow-col items-start content-start justify-between justify-items-start",
                  "w-full",
                  "py-[1rem] px-[2rem]"
                )}
              >
                <TierInformationCompanyBilling
                  title={dictionaries.current_tier.label}
                  description={
                    state.profile.tier_name[locale ?? LocaleRoute.default]
                  }
                  loading={isFetching}
                />

                <div
                  className={clsx(
                    "grid grid-flow-col items-center content-center justify-end justify-items-end gap-[1rem]"
                  )}
                >
                  {state.profile.type === "subscription" && (
                    <SubscriptionInformationCompanyBilling
                      title={dictionaries.expired_date.label}
                      description={
                        state.profile.day_remaining !== null
                          ? state.profile.day_remaining > 1
                            ? dictionaries.day_remaining.label.plural.replace(
                                "{{day}}",
                                state.profile.day_remaining.toLocaleString(
                                  locale === "en" ? "en-US" : "zh-CN",
                                  {
                                    maximumFractionDigits: 2,
                                  }
                                )
                              )
                            : dictionaries.day_remaining.label.singular.replace(
                                "{{day}}",
                                state.profile.day_remaining.toLocaleString(
                                  locale === "en" ? "en-US" : "zh-CN",
                                  {
                                    maximumFractionDigits: 2,
                                  }
                                )
                              )
                          : "-"
                      }
                      sub_description={state.profile.expired_date}
                      loading={isFetching}
                    />
                  )}

                  {state.profile.type === "credit" && (
                    <CreditInformationCompanyBilling
                      title={dictionaries.remaining_credit.label}
                      description={
                        state.profile.credit !== null
                          ? state.profile.credit.toLocaleString(
                              locale === "en" ? "en-US" : "zh-CN",
                              {
                                maximumFractionDigits: 2,
                              }
                            )
                          : "-"
                      }
                      loading={isFetching}
                    />
                  )}

                  <Divider variant="vertical" />
                  {/* cta */}
                  <Button variant="outlined" onClick={handleClickTopUp}>
                    {dictionaries.topup.cta.primary.children.toUpperCase()}
                  </Button>
                </div>
              </div>
              {/* end header */}

              <Card
                elevation="2"
                className={clsx(
                  "flex flex-col items-start justify-between",
                  "w-full lg:max-w-[920px]",
                  "gap-y-[1.5rem]",
                  "p-[1.5rem]",
                  "rounded-[1.5rem]"
                )}
              >
                <div
                  className={clsx(
                    "grid grid-cols-[1fr_1px_1fr_1px_1fr] place-content-start place-items-start gap-[1rem]",
                    "w-full"
                  )}
                >
                  <MemberListCompanyBilling
                    label={
                      state.profile.outlet.number !== null &&
                      state.profile.outlet.number > 1
                        ? dictionaries.member.outlet.label.plural
                        : dictionaries.member.outlet.label.singular
                    }
                    icon={dictionaries.member.outlet.icon}
                    number={
                      state.profile.outlet.number !== null
                        ? state.profile.outlet.number.toLocaleString(
                            locale === "en" ? "en-US" : "zh-CN",
                            {
                              maximumFractionDigits: 2,
                            }
                          )
                        : "-"
                    }
                    limit={
                      state.profile.outlet.limit !== null
                        ? state.profile.outlet.limit.toLocaleString(
                            locale === "en" ? "en-US" : "zh-CN",
                            {
                              maximumFractionDigits: 2,
                            }
                          )
                        : "-"
                    }
                    loading={isFetching}
                  />
                  <div
                    className={clsx(
                      "w-[1px] h-full",
                      "bg-[rgba(255,255,255,0.12)]"
                    )}
                  />
                  <MemberListCompanyBilling
                    label={
                      state.profile.staff.number !== null &&
                      state.profile.staff.number > 1
                        ? dictionaries.member.staff.label.plural
                        : dictionaries.member.staff.label.singular
                    }
                    icon={dictionaries.member.staff.icon}
                    number={
                      state.profile.staff.number !== null
                        ? state.profile.staff.number.toLocaleString(
                            locale === "en" ? "en-US" : "zh-CN",
                            {
                              maximumFractionDigits: 2,
                            }
                          )
                        : "-"
                    }
                    limit={
                      state.profile.staff.limit !== null
                        ? state.profile.staff.limit.toLocaleString(
                            locale === "en" ? "en-US" : "zh-CN",
                            {
                              maximumFractionDigits: 2,
                            }
                          )
                        : "-"
                    }
                    loading={isFetching}
                  />
                  <div
                    className={clsx(
                      "w-[1px] h-full",
                      "bg-[rgba(255,255,255,0.12)]"
                    )}
                  />
                  <MemberListCompanyBilling
                    label={
                      state.profile.customers.number !== null &&
                      state.profile.customers.number > 1
                        ? dictionaries.member.customers.label.plural
                        : dictionaries.member.customers.label.singular
                    }
                    icon={dictionaries.member.customers.icon}
                    number={
                      state.profile.customers.number !== null
                        ? state.profile.customers.number.toLocaleString(
                            locale === "en" ? "en-US" : "zh-CN",
                            {
                              maximumFractionDigits: 2,
                            }
                          )
                        : "-"
                    }
                    limit={
                      state.profile.customers.limit !== null
                        ? state.profile.customers.limit.toLocaleString(
                            locale === "en" ? "en-US" : "zh-CN",
                            {
                              maximumFractionDigits: 2,
                            }
                          )
                        : "-"
                    }
                    loading={isFetching}
                  />
                </div>
                <div
                  className={clsx(
                    "w-full h-[1px]",
                    "bg-[rgba(255,255,255,0.12)]"
                  )}
                />
                <div
                  className={clsx(
                    "grid grid-cols-3 place-content-start place-items-start gap-[1rem]",
                    "w-full"
                  )}
                >
                  {dictionaries.menu.items.map((item, index) => (
                    <MenuCompanyBilling
                      key={index}
                      icon={item.icon}
                      name={item.name}
                      link={item.link.replace(
                        "{{locale}}",
                        locale ?? LocaleRoute.default
                      )}
                    />
                  ))}
                </div>

                <Button
                  variant="outlined"
                  href={PrivateRouteURL.routeToStaffDashboardURL({
                    locale: locale ?? LocaleRoute.default,
                  })}
                >
                  {dictionaries.cta.primary.children.toUpperCase()}
                </Button>
              </Card>
            </Card>
          </div>
        </div>
      </Center>
    </AppContainer>
  );
};
