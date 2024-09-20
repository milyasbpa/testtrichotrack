import { Route, Routes } from "react-router-dom";
import { routes } from "./core/utils/router/config";
import PrivateRoute from "./core/utils/router/components/private/Private.route";
import PublicRoute from "./core/utils/router/components/public/Public.route";
import { useLocaleRouter } from "./core/utils/router/hooks";
import { useContext } from "react";
import { AppContext } from "./core/modules/app/context";
import {
  useAppGetCompanyLogo,
  useAppGetDevice,
  useAppGetVersion,
  useAppGetStaff,
  useAppGetCustomer,
  useAppGetCases,
  useAppGetGlobalCase,
  useAppGetRoutineCase,
  useAppGetSpotlightCase,
  useAppGetDiagnosisOverview,
  useAppGetDiagnosisScreenings,
  useAppGetDiagnosisTrends,
} from "./core/modules/app/react_query/hooks";

function App() {
  const { state } = useContext(AppContext);
  useAppGetDevice();
  useLocaleRouter();

  // NOTES: Optimize API in order to not fetch many times when route is changed
  useAppGetVersion();
  useAppGetCompanyLogo();
  useAppGetStaff();
  useAppGetCustomer();
  useAppGetCases();
  useAppGetGlobalCase();
  useAppGetRoutineCase();
  useAppGetSpotlightCase();
  useAppGetDiagnosisOverview();
  useAppGetDiagnosisScreenings();
  useAppGetDiagnosisTrends();

  return (
    <Routes>
      {routes.map(
        ({
          path,
          component: Component,
          isPrivate,
          restricted,
          allowedRoles,
        }) => (
          <Route
            key={path}
            path={path}
            element={
              state.auth.is_authenticated === undefined ? null : isPrivate ? (
                <PrivateRoute
                  isAuthenticated={state.auth.is_authenticated}
                  role={state.auth.role}
                  allowedRoles={allowedRoles}
                >
                  <Component />
                </PrivateRoute>
              ) : (
                <PublicRoute
                  isAuthenticated={state.auth.is_authenticated}
                  restricted={restricted}
                >
                  <Component />
                </PublicRoute>
              )
            }
          />
        )
      )}
    </Routes>
  );
}

export default App;
