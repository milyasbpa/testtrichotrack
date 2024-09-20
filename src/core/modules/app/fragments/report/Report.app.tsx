import { useContext, useEffect, useState } from "react";
import { Modal } from "src/core/ui/components/modal";
import { AppActionEnum, AppContext } from "../../context";
import clsx from "clsx";
import { ENVIRONMENT } from "src/core/constants";
import ProfileCardApp from "../../components/profile_card/ProfileCard.app";
import { useParams } from "react-router-dom";
import { getDictionaries } from "../../i18n";
import { RadarChart } from "src/core/modules/app/components/radar_chart";
import { ScanCardApp } from "../../components/scan_card";
import * as HTMLtoImage from "html-to-image";
import { NoReportItemApp } from "../../components/no_report_item";
import { useAppPostUploadReport } from "../../react_query/hooks";
import { Button } from "src/core/ui/components/button";
import { MoonLoader } from "src/core/ui/components/moon_loader";
import { QRCodeSVG } from "qrcode.react";
import SVGIcon from "src/core/ui/icons";
import { LineChart } from "src/core/modules/app/components/line_chart";
import { LineChartLegend } from "src/core/modules/app/components/line_chart_legend";
import moment from "moment";
import { ColorSizeGradientBar } from "src/core/ui/components/color_size_gradient_bar";
import { ColorGradientBar } from "src/core/ui/components/color_gradient_bar";
import { ScreeningCardApp } from "../../components/screening_card";

export const ReportApp = () => {
  const { locale } = useParams();
  const dictionaries = getDictionaries(locale);
  const { state, dispatch } = useContext(AppContext);
  const { mutate: setUploadReport, isPending: isPendingUploadReport } =
    useAppPostUploadReport();
  const handleClose = () => {
    dispatch({
      type: AppActionEnum.SetReportData,
      payload: {
        ...state.report,
        feature: {
          ...state.report.feature,
          is_open: false,
          step: "preview",
          data: {
            ...state.report.feature.data,
            image_url: null,
          },
        },
      },
    });
  };

  //   header
  const [logo, setLogo] = useState("");
  const companyLogo = state.company.image_url;
  useEffect(() => {
    if (!!state.company.image_url) {
      const toDataURL = (url: any, callback: any) => {
        let xhr = new XMLHttpRequest();
        xhr.onload = function () {
          let reader = new FileReader();
          reader.onloadend = () => {
            callback(reader.result);
          };
          reader.readAsDataURL(xhr.response);
        };
        xhr.open("GET", url);
        xhr.responseType = "blob";
        xhr.send();
      };

      const imageURL =
        ENVIRONMENT.ENVIRONMENT === "localhost"
          ? `${companyLogo?.replace(
              ENVIRONMENT.CUSTOMER_RECORD_IMAGE_SERVER_URL,
              "/scan-image"
            )}`
          : companyLogo;
      toDataURL(imageURL, (dataUrl: any) => {
        setLogo(dataUrl);
      });
    }
  }, [companyLogo]);

  // profile
  const customerData = state.user.customer;
  const [photo, setPhoto] = useState("");
  useEffect(() => {
    if (!!customerData && !!customerData.photo && !!customerData.photo.length) {
      const toDataURL = (url: any, callback: any) => {
        let xhr = new XMLHttpRequest();
        xhr.onload = function () {
          let reader = new FileReader();
          reader.onloadend = () => {
            callback(reader.result);
          };
          reader.readAsDataURL(xhr.response);
        };
        xhr.open("GET", url);
        xhr.responseType = "blob";
        xhr.send();
      };

      const imageURL =
        ENVIRONMENT.ENVIRONMENT === "localhost"
          ? `${customerData.photo?.replace(
              ENVIRONMENT.CUSTOMER_RECORD_IMAGE_SERVER_URL,
              "/scan-image"
            )}`
          : customerData.photo;
      toDataURL(imageURL, (dataUrl: any) => {
        setPhoto(dataUrl);
      });
    }
  }, [customerData]);

  const overviewDiagnosisData = state.cases.diagnosis.overview.data;
  const screeningDiagnosisData = state.cases.diagnosis.screening.data;
  const trendsDiagnosisData = state.cases.diagnosis.trends.data;
  if (
    !customerData ||
    !overviewDiagnosisData ||
    !screeningDiagnosisData ||
    !trendsDiagnosisData ||
    !state.company.image_url
  ) {
    return null;
  }
  // DIAGNOSIS
  // overview
  const chartData = !Object.keys(overviewDiagnosisData).length
    ? []
    : Object.keys(overviewDiagnosisData).map((item, index) => {
        return {
          id: item,
          label: {
            name:
              dictionaries.report.diagnosis_overview.radar.label.position.items.find(
                (item) => item.id === index
              )?.text.position === "left"
                ? overviewDiagnosisData[item]?.name?.replace(" ", "<br />")
                : dictionaries.report.diagnosis_overview.radar.label.position.items.find(
                    (item) => item.id === index
                  )?.text.position === "right"
                ? overviewDiagnosisData[item]?.name?.replace(" ", "<br />")
                : overviewDiagnosisData[item]?.name,
            icon: {
              name:
                overviewDiagnosisData[item].rating > 4
                  ? "CheckCircle"
                  : "ExclamationCircle",
              color:
                overviewDiagnosisData[item].rating === 5
                  ? dictionaries.cases.diagnosis.rating.items.find(
                      (ratingItem) =>
                        ratingItem.max === overviewDiagnosisData[item].rating
                    )?.color ?? "white"
                  : dictionaries.cases.diagnosis.rating.items.find(
                      (ratingItem) =>
                        overviewDiagnosisData[item].rating < ratingItem.max &&
                        overviewDiagnosisData[item].rating >= ratingItem.min
                    )?.color ?? "white",
            },
            position: {
              top:
                dictionaries.report.diagnosis_overview.radar.label.position.items.find(
                  (item) => item.id === index
                )?.top ?? "0%",
              left:
                dictionaries.report.diagnosis_overview.radar.label.position.items.find(
                  (item) => item.id === index
                )?.left ?? "0%",
            },
            text: {
              position:
                dictionaries.report.diagnosis_overview.radar.label.position.items.find(
                  (item) => item.id === index
                )?.text.position ?? "left",
            },
          },
          value: overviewDiagnosisData[item].rating,
        };
      });

  // trends
  const serviceTimes = trendsDiagnosisData.map((item) => {
    const stillUtc = moment.utc(item.svc_time).toDate();
    const result = moment(stillUtc).local().format("YY/MM/DD");
    return result;
  });
  const metrics = !!trendsDiagnosisData.length
    ? Object.keys(trendsDiagnosisData[0].overview)
    : [];
  const lineChartCategories = metrics.map((metric) => {
    return {
      label: metric,
      data: trendsDiagnosisData.map((item) => item.overview[metric]),
      color:
        dictionaries.cases.diagnosis.metric.items.find(
          (item) => item.name === metric
        )?.color ?? "white",
    };
  });
  const lineChartLegend = metrics.map((metric) => {
    return {
      id:
        dictionaries.cases.diagnosis.metric.items.find(
          (item) => item.name === metric
        )?.id ?? "",
      name: metric,
      color:
        dictionaries.cases.diagnosis.metric.items.find(
          (item) => item.name === metric
        )?.color ?? "",
    };
  });

  if (state.report.feature.step === "qris") {
    return (
      <Modal open={state.report.feature.is_open} onClose={handleClose}>
        <div
          className={clsx(
            "flex items-center justify-between",
            "w-full",
            "bg-eerie-black",
            "p-[1.5rem]",
            "rounded-tl-[0.5rem] rounded-tr-[0.5rem]"
          )}
        >
          <h3
            className={clsx("text-[2rem] text-white-87 font-bold text-center")}
          >
            {dictionaries.report.qris_modal.message}
          </h3>

          <button onClick={handleClose}>
            <SVGIcon
              name="Close"
              className={clsx("w-[1.5rem] h-[1.5rem]", "fill-white")}
            />
          </button>
        </div>
        <div
          className={clsx(
            "grid grid-cols-1 place-content-center place-items-center gap-y-[2rem]",
            "w-full",
            "bg-charleston-green",
            "p-[1.5rem]",
            "rounded-bl-[0.5rem] rounded-br-[0.5rem]"
          )}
        >
          <div
            className={clsx(
              "grid grid-cols-1 place-content-center place-items-center gap-y-[1rem]",
              "bg-eerie-black",
              "p-[1rem]",
              "rounded-[0.5rem]"
            )}
          >
            <div className={clsx("bg-white", "p-[2rem]", "rounded-[0.75rem]")}>
              <QRCodeSVG
                value={state.report.feature.data.image_url ?? ""}
                width={324}
                height={324}
              />
            </div>

            <p
              className={clsx(
                "text-[4rem] text-white font-bold text-center uppercase"
              )}
            >
              {dictionaries.report.qris_modal.actions.scan_me}
            </p>
          </div>

          <div className={clsx("w-[420px]")}>
            <p
              className={clsx(
                "text-[1.25rem] text-white-60 font-regular text-center"
              )}
            >
              {dictionaries.report.qris_modal.description}
            </p>
          </div>
        </div>
      </Modal>
    );
  }

  const handleClickDownload = () => {
    let node = document.getElementById("scalp-report") as HTMLElement;

    // JPEG
    HTMLtoImage.toJpeg(node)
      .then((dataUrl) => {
        let img = new Image();
        img.crossOrigin = "anonymous";
        img.src = dataUrl;

        const base64 = dataUrl;
        const base64Formatted = base64.replace("data:image/jpeg;base64,", "");
        setUploadReport(base64Formatted);
      })
      .catch(function (error) {
        console.error("oops, something went wrong!", error);
      });
  };

  return (
    <Modal open={state.report.feature.is_open} onClose={handleClose}>
      <div id="scalp-report">
        <div
          className={clsx(
            "bg-eerie-black",
            "flex items-center justify-start",
            "w-full",
            "p-[1.5rem]"
          )}
        >
          <h3 className={clsx("text-[2rem] text-white-87 font-bold")}>
            {dictionaries.report.title}
          </h3>
        </div>

        {/* children */}
        <div
          className={clsx(
            "px-[120px] py-[1.5rem]",
            "h-[788px]",
            "overflow-auto"
          )}
        >
          {/* logo */}
          <div
            className={clsx(
              "flex items-center justify-center",
              "bg-eerie-black",
              "h-[62px] w-full"
            )}
          >
            <img
              src={logo}
              className={clsx("w-[108px]")}
              alt={"drscalp-logo"}
            />
          </div>
          {/* end logo */}
          {/* body */}
          <div
            className={clsx(
              "grid grid-cols-1 place-content-start place-items-start gap-[1rem]",
              "bg-[#121212]",
              "w-full",
              "px-[1rem] py-[1rem]"
            )}
          >
            {/* profile */}
            <ProfileCardApp
              initial={customerData.name?.charAt(0) ?? ""}
              name={customerData.name}
              photo={photo}
              date={state.cases.data.selected?.svc_time ?? ""}
            />
            {/* end profile */}

            {/* diagnosis */}
            {/* overview */}
            <div
              className={clsx(
                "grid grid-cols-1 place-content-start place-items-start gap-y-[0.875rem]",
                "w-full",
                "bg-eerie-black",
                "rounded-[0.5rem]",
                "p-[1rem]"
              )}
            >
              <h3 className={clsx("text-white text-[1rem] font-bold")}>
                {dictionaries.report.diagnosis_overview.title}
              </h3>

              <div
                className={clsx("flex items-center justify-center", "w-full")}
              >
                <RadarChart data={chartData} />
              </div>
            </div>
            {/* end overview */}
            {/* screening */}
            <div
              className={clsx(
                "grid place-content-start place-items-start gap-y-[0.875rem]",
                "bg-eerie-black",
                "w-full",
                "rounded-[0.5rem]",
                "p-[1rem]"
              )}
            >
              <h3 className={clsx("text-white text-[1rem] font-bold")}>
                {dictionaries.report.diagnosis_overview.title}
              </h3>

              <div
                className={clsx(
                  "grid grid-cols-1 place-content-start place-items-start gap-[0.5rem]",
                  "w-full"
                )}
              >
                {Object.keys(screeningDiagnosisData).map(
                  (screening, screeningIndex) => {
                    if (
                      screening === "hair_pigmentation" ||
                      screening === "follicle_capacity"
                    ) {
                      return (
                        <ScreeningCardApp
                          key={screeningIndex}
                          name={screeningDiagnosisData[screening]?.name}
                        >
                          <ColorSizeGradientBar
                            data={(
                              dictionaries.cases.screening.items.find(
                                (screeningItem) =>
                                  screeningItem.id === screening
                              )?.members ?? []
                            )
                              // NOTES: remove 0 value from gradient display
                              .filter(
                                (screeningItem) =>
                                  ((
                                    screeningDiagnosisData[screening]
                                      ?.value as {
                                      [key: string]: number;
                                    }
                                  )[screeningItem.id] ?? 0) *
                                    100 !==
                                  0
                              )
                              .map((screeningItem) => {
                                return {
                                  id: screeningItem.id,
                                  name: screeningItem.name,
                                  color: screeningItem.color,
                                  value:
                                    ((
                                      screeningDiagnosisData[screening]
                                        ?.value as {
                                        [key: string]: number;
                                      }
                                    )[screeningItem.id] ?? 0) * 100,
                                };
                              })}
                          />
                        </ScreeningCardApp>
                      );
                    }

                    if (
                      screening === "stratum_corneum" ||
                      screening === "dead_skin" ||
                      screening === "scalp_wrinkle" ||
                      screening === "scalp_irritation" ||
                      screening === "scalp_secretion"
                    ) {
                      return (
                        <ScreeningCardApp
                          key={screeningIndex}
                          name={screeningDiagnosisData[screening]?.name}
                        >
                          <ColorGradientBar
                            data={
                              dictionaries.cases.screening.items.find(
                                (screeningItem) =>
                                  screeningItem.id === screening
                              )?.levels ?? []
                            }
                            value={
                              ((screeningDiagnosisData[screening]
                                ?.value as number) ?? 0) * 100
                            }
                          />
                        </ScreeningCardApp>
                      );
                    }
                    return (
                      <ScreeningCardApp
                        key={screeningIndex}
                        name={screeningDiagnosisData[screening]?.name}
                        value={`${
                          typeof screeningDiagnosisData[screening]?.value ===
                          "number"
                            ? (
                                screeningDiagnosisData[screening]?.value ?? 0
                              ).toFixed(1)
                            : ""
                        } ${screeningDiagnosisData[screening]?.unit}`}
                      />
                    );
                  }
                )}
              </div>
            </div>
            {/* end screening */}
            {/* trend */}
            <div
              className={clsx(
                "grid place-content-start place-items-start gap-y-[0.875rem]",
                "bg-eerie-black",
                "w-full",
                "rounded-[0.5rem]",
                "p-[1rem]"
              )}
            >
              <h3 className={clsx("text-white text-[1rem] font-bold")}>
                {dictionaries.report.trend.title}
              </h3>
              <LineChart
                labels={serviceTimes}
                categories={lineChartCategories}
              />
              <LineChartLegend data={lineChartLegend} />
            </div>
            {/* end trend */}
            {/* end diagnosis */}

            {/* scan */}
            <div
              className={clsx(
                "grid grid-cols-1 place-content-start place-items-start gap-y-[0.875rem]",
                "bg-eerie-black",
                "w-full",
                "rounded-[0.5rem]",
                "p-[1rem]"
              )}
            >
              <div
                className={clsx(
                  "grid grid-cols-1 place-content-start place-items-start gap-y-[1rem]",
                  "w-full"
                )}
              >
                <p className={clsx("text-[1rem] text-white-87 font-semibold")}>
                  {dictionaries.report.global_scan.title}
                </p>

                {!state.cases.record.global.length && (
                  <NoReportItemApp
                    message={dictionaries.report.global_scan.not_found.message}
                    description={
                      dictionaries.report.global_scan.not_found.description
                    }
                    image_url={
                      dictionaries.report.global_scan.not_found.image_url
                    }
                  />
                )}

                {!!state.cases.record.global.length && (
                  <div
                    className={clsx(
                      "grid grid-cols-2 place-content-center place-items-center gap-x-[1rem] gap-y-[1rem]",
                      "w-full"
                    )}
                  >
                    {state.cases.record.global.map((item, index) => (
                      <ScanCardApp
                        key={index}
                        id={item.id}
                        header={{
                          region:
                            dictionaries.cases.region.items.find(
                              (regionItem) => regionItem.id === item.region
                            )?.name ?? "",
                          image_url:
                            dictionaries.cases.region.items.find(
                              (regionItem) => regionItem.id === item.region
                            )?.image_url ?? "",
                        }}
                        rotation={0}
                        image_url={item.image}
                      />
                    ))}
                  </div>
                )}
              </div>

              <div
                className={clsx(
                  "grid grid-cols-1 place-content-start place-items-start gap-y-[1rem]",
                  "w-full"
                )}
              >
                <p className={clsx("text-[1rem] text-white-87 font-semibold")}>
                  {dictionaries.report.routine_scan.title}
                </p>
                <div
                  className={clsx(
                    "grid grid-cols-2 place-content-center place-items-center gap-x-[1rem] gap-y-[1rem]",
                    "w-full"
                  )}
                >
                  {state.cases.record.routine.map((item, index) => (
                    <ScanCardApp
                      key={index}
                      id={item.id}
                      header={{
                        region:
                          dictionaries.cases.region.items.find(
                            (regionItem) => regionItem.id === item.region
                          )?.name ?? "",
                        image_url:
                          dictionaries.cases.region.items.find(
                            (regionItem) => regionItem.id === item.region
                          )?.image_url ?? "",
                      }}
                      rotation={90}
                      image_url={item.image}
                    />
                  ))}
                </div>

                <div
                  className={clsx(
                    "grid grid-cols-1 place-content-start place-items-start gap-y-[1rem]",
                    "w-full"
                  )}
                >
                  <p
                    className={clsx("text-[1rem] text-white-87 font-semibold")}
                  >
                    {dictionaries.report.spotlight_scan.title}
                  </p>

                  {!state.cases.record.global.length && (
                    <NoReportItemApp
                      message={
                        dictionaries.report.spotlight_scan.not_found.message
                      }
                      description={
                        dictionaries.report.spotlight_scan.not_found.description
                      }
                      image_url={
                        dictionaries.report.spotlight_scan.not_found.image_url
                      }
                    />
                  )}

                  {state.cases.record.spotlight.length > 0 && (
                    <div
                      className={clsx(
                        "grid grid-cols-2 place-content-center place-items-center gap-x-[1rem] gap-y-[1rem]",
                        "w-full"
                      )}
                    >
                      {state.cases.record.spotlight.map((item, index) => (
                        <ScanCardApp
                          key={index}
                          id={item.id}
                          header={{
                            region:
                              dictionaries.cases.region.items.find(
                                (regionItem) => regionItem.id === item.region
                              )?.name ?? "",
                            image_url:
                              dictionaries.cases.region.items.find(
                                (regionItem) => regionItem.id === item.region
                              )?.image_url ?? "",
                          }}
                          rotation={90}
                          image_url={item.image}
                        />
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* end scan */}
            {/* end body */}
          </div>
        </div>
        {/* end children */}

        {/* footer */}
        <div
          className={clsx(
            "bg-eerie-black",
            "p-[2rem]",
            "flex items-start justify-center",
            "w-full"
          )}
        >
          <Button
            disabled={isPendingUploadReport}
            variant="contained"
            onClick={handleClickDownload}
          >
            {isPendingUploadReport && <MoonLoader />}

            {dictionaries.report.download.toUpperCase()}
          </Button>
        </div>
      </div>
      {/* footer */}
    </Modal>
  );
};
