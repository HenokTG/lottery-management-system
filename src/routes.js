import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import { DashboardLayout } from './components/dashboard-layout';
import LogoOnlyLayout from './components/LogoOnlyLayout';
//

import {
  Login,
  UserProfile,
  AccountSettings,
  DashboardApp,
  Operators,
  LicenceCatagory,
  Games,
  ActivityLogs,
  Page404,
} from './pages';

import {
  RevenueReport,
  OnlineBettingTransactionsReport,
  OfflineBettingTransactionsReport,
  WinningTicketReport,
  OperatorWalletReport,
} from './pages/report';
import { PaymentDistributionReport, PaymentTransactionsReport, BonusTransactionsReport } from './pages/payment-report';
import {
  AppSettings,
  ManagePaymentMethod,
  ManageCurrency,
  ManageOperatorApps,
  ManageRegionalLocations,
  ManageCountryLocations,
  ManageSystemModules,
} from './pages/app-settings';
import { RoleManagnment, UserManagnment } from './pages/management';

// ----------------------------------------------------------------------

export default function Router() {
  return useRoutes([
    {
      path: '/app',
      element: <DashboardLayout />,
      children: [
        { path: 'dashboard', element: <DashboardApp /> },
        { path: 'licence-catagories', element: <LicenceCatagory /> },
        { path: 'games', element: <Games /> },
        { path: 'operators', element: <Operators /> },
        {
          path: 'report/',
          children: [
            { path: 'revenue', element: <RevenueReport /> },
            { path: 'online-betting-transactions', element: <OnlineBettingTransactionsReport /> },
            { path: 'offline-betting-transactions', element: <OfflineBettingTransactionsReport /> },
            { path: 'winning-ticket', element: <WinningTicketReport /> },
            { path: 'operator-wallet', element: <OperatorWalletReport /> },
          ],
        },
        {
          path: 'payment-report/',
          children: [
            { path: 'payment-distribution', element: <PaymentDistributionReport /> },
            { path: 'payment-transactions', element: <PaymentTransactionsReport /> },
            { path: 'bonus-transactions', element: <BonusTransactionsReport /> },
          ],
        },
        {
          path: 'management/',
          children: [
            { path: 'role-management', element: <RoleManagnment /> },
            { path: 'user-management', element: <UserManagnment /> },
          ],
        },
        {
          path: 'app-settings/',
          children: [
            {
              path: 'general',
              element: <AppSettings />,
            },
            {
              path: 'payment-method',
              element: <ManagePaymentMethod />,
            },
            {
              path: 'currency',
              element: <ManageCurrency />,
            },
            {
              path: 'system-modules',
              element: <ManageSystemModules />,
            },
            {
              path: 'operator-apps',
              element: <ManageOperatorApps />,
            },
            {
              path: 'country-locations',
              element: <ManageCountryLocations />,
            },
            {
              path: 'regional-locations',
              element: <ManageRegionalLocations />,
            },
          ],
        },
        { path: 'activity-logs/', element: <ActivityLogs /> },
        { path: 'user-profile', element: <UserProfile /> },
        { path: 'account-settings', element: <AccountSettings /> },
      ],
    },
    {
      path: 'login',
      element: <Login />,
    },
    {
      path: '/',
      element: <LogoOnlyLayout />,
      children: [
        { path: '/', element: <Navigate to="/login" /> },
        { path: '404', element: <Page404 /> },
        { path: '*', element: <Navigate to="/404" /> },
      ],
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);
}
