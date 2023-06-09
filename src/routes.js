import { lazy } from 'react';
import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import { DashboardLayout } from './components/layout/dashboard-layout';
import LogoOnlyLayout from './components/layout/LogoOnlyLayout';
//
import RequireAuth from './components/auxilary/RequireAuth';

// import Loadable from './components/auxilary/Loadable';
// import AuthGuard from 'utils/route-guard/AuthGuard';
// const DashboardDefault = Loadable(lazy(() => import('pages/dashboard/default')));

import {
  Login,
  UserProfile,
  AccountSettings,
  DashboardApp,
  Operators,
  LicenceCatagory,
  Games,
  DownloadManager,
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
  ManageTaxRules,
  ManageRegionalLocations,
  ManageCountryLocations,
  ManageSystemModules,
} from './pages/app-settings';

import { RoleManagnment, UserManagnment } from './pages/management';

import {
  UpdateCountry,
  UpdateCurrency,
  UpdateGame,
  UpdateLicenceCatagory,
  UpdateOperatorApp,
  UpdateOperator,
  UpdatePaymentMethod,
  UpdateRegion,
  UpdateRole,
  UpdateTaxRule,
  UpdateUser,
} from './pages/index-update-forms';
// ----------------------------------------------------------------------

const ROLE = {
  operator: 'operator',
  Admin: 'admin',
};

// ------------------------------------------------------------------------

export default function Router() {
  return useRoutes([
    {
      path: '/',
      element: <DashboardLayout />,
      children: [
        {
          path: 'dashboard',
          element: <RequireAuth userRole={[ROLE.Admin, ROLE.operator]} />,
          children: [{ path: '', element: <DashboardApp /> }],
        },
        {
          path: 'operators',
          element: <RequireAuth userRole={[ROLE.Admin]} />,
          children: [
            { path: '', element: <Operators /> },
            { path: 'update/:id', element: <UpdateOperator /> },
          ],
        },
        {
          path: 'licence-catagories',
          element: <RequireAuth userRole={[ROLE.Admin]} />,
          children: [
            { path: '', element: <LicenceCatagory /> },
            { path: 'update/:id', element: <UpdateLicenceCatagory /> },
          ],
        },
        {
          path: 'games',
          element: <RequireAuth userRole={[ROLE.Admin, ROLE.operator]} />,
          children: [
            { path: '', element: <Games /> },
            { path: 'update/:id', element: <UpdateGame /> },
          ],
        },
        {
          path: 'downloads',
          element: <RequireAuth userRole={[ROLE.Admin, ROLE.operator]} />,
          children: [{ path: '', element: <DownloadManager /> }],
        },
        {
          path: 'report/',
          element: <RequireAuth userRole={[ROLE.Admin, ROLE.operator]} />,
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
          element: <RequireAuth userRole={[ROLE.Admin, ROLE.operator]} />,
          children: [
            { path: 'payment-distribution', element: <PaymentDistributionReport /> },
            { path: 'payment-transactions', element: <PaymentTransactionsReport /> },
            { path: 'bonus-transactions', element: <BonusTransactionsReport /> },
          ],
        },
        {
          path: 'management/',
          element: <RequireAuth userRole={[ROLE.Admin]} />,
          children: [
            {
              path: 'role-management',
              children: [
                { path: '', element: <RoleManagnment /> },
                { path: 'update/:id', element: <UpdateRole /> },
              ],
            },
            {
              path: 'user-management',
              children: [
                { path: '', element: <UserManagnment /> },
                { path: 'update/:id', element: <UpdateUser /> },
              ],
            },
          ],
        },
        {
          path: 'app-settings/',
          element: <RequireAuth userRole={[ROLE.Admin]} />,
          children: [
            {
              path: 'general',
              element: <AppSettings />,
            },
            {
              path: 'system-modules',
              element: <ManageSystemModules />,
            },
            {
              path: 'payment-method',
              children: [
                { path: '', element: <ManagePaymentMethod /> },
                { path: 'update/:id', element: <UpdatePaymentMethod /> },
              ],
            },
            {
              path: 'currency',
              children: [
                { path: '', element: <ManageCurrency /> },
                { path: 'update/:id', element: <UpdateCurrency /> },
              ],
            },
            {
              path: 'operator-apps',
              children: [
                { path: '', element: <ManageOperatorApps /> },
                { path: 'update/:id', element: <UpdateOperatorApp /> },
              ],
            },
            {
              path: 'tax-rules',
              children: [
                { path: '', element: <ManageTaxRules /> },
                { path: 'update/:id', element: <UpdateTaxRule /> },
              ],
            },
            {
              path: 'country-locations',
              children: [
                { path: '', element: <ManageCountryLocations /> },
                { path: 'update/:id', element: <UpdateCountry /> },
              ],
            },
            {
              path: 'regional-locations',
              children: [
                { path: '', element: <ManageRegionalLocations /> },
                { path: 'update/:id', element: <UpdateRegion /> },
              ],
            },
          ],
        },
        {
          path: 'activity-logs/',
          element: <RequireAuth userRole={[ROLE.Admin]} />,
          children: [{ path: '', element: <ActivityLogs /> }],
        },
        {
          path: 'user-profile',
          element: <RequireAuth userRole={[ROLE.Admin, ROLE.operator]} />,
          children: [{ path: '', element: <UserProfile /> }],
        },
        {
          path: 'account-settings',
          element: <RequireAuth userRole={[ROLE.Admin, ROLE.operator]} />,
          children: [{ path: '', element: <AccountSettings /> }],
        },
      ],
    },
    {
      path: '/login',
      element: <Login />,
    },
    {
      path: '/',
      element: <LogoOnlyLayout />,
      children: [
        { index: true, element: <Navigate to="/login" /> },
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
