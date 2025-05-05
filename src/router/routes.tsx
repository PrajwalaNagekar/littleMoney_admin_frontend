import { lazy } from 'react';
import AdminDashboard from '../pages/Admin/Dashboard';
import Merchants from '../pages/Admin/merchant/Merchants';
import MerchantApproval from '../pages/Admin/merchant/MerchantApproval';
import Orders from '../pages/Admin/Orders';
import Reports from '../pages/Admin/Reports';
import Settings from '../pages/Admin/Settings';
import CreateMerchant from '../components/Admin/Merchant/Create';
import EditMerchant from '../components/Admin/Merchant/Edit';
import MerchantData from '../pages/Admin/merchant/MerchantData';
import AdminProtected from '../components/Protected/AdminProtected';
import Login from '../pages/Login';
import OtpVerification from '../pages/OtpVerification';
import ProtectedRoute from '../components/Protected/ProtectedRoute';
import Loans from '../pages/Admin/Loans';
import Offers from '../pages/Admin/Offers';
const KnowledgeBase = lazy(() => import('../pages/Pages/KnowledgeBase'));
const ContactUsBoxed = lazy(() => import('../pages/Pages/ContactUsBoxed'));
const ContactUsCover = lazy(() => import('../pages/Pages/ContactUsCover'));
const Faq = lazy(() => import('../pages/Pages/Faq'));
const ComingSoonBoxed = lazy(() => import('../pages/Pages/ComingSoonBoxed'));
const ComingSoonCover = lazy(() => import('../pages/Pages/ComingSoonCover'));
const ERROR404 = lazy(() => import('../pages/Pages/Error404'));
const ERROR500 = lazy(() => import('../pages/Pages/Error500'));
const ERROR503 = lazy(() => import('../pages/Pages/Error503'));
const Maintenence = lazy(() => import('../pages/Pages/Maintenence'));
const About = lazy(() => import('../pages/About'));
const Error = lazy(() => import('../components/Error'));


const routes = [
    // dashboard
    {
        path: '/',
        element: (
            <AdminProtected>
                <AdminDashboard />
            </AdminProtected>
        ),
    },
    {
        path: '/admin/merchants',
        element: (
            <AdminProtected>
                <Merchants />
            </AdminProtected>
        ),
    },
    {
        path: '/admin/merchants/:id',
        element: (
            <AdminProtected>
                <MerchantData />
            </AdminProtected>
        )
    },
    {
        path: '/admin/merchants/create',
        element: (
            <AdminProtected>
                <CreateMerchant />
            </AdminProtected>
        ),
    },
    {
        path: '/admin/merchants/edit',
        element: (
            <AdminProtected>
                <EditMerchant />
            </AdminProtected>
        ),
    },
    {
        path: '/admin/merchant-approval',
        element: (
            <AdminProtected>
                <MerchantApproval />
            </AdminProtected>
        ),
    },
    {
        path: '/admin/orders',
        element: (
            <AdminProtected>
                <Orders />
            </AdminProtected>
        ),
    },
    {
        path: '/admin/reports',
        element: (
            <AdminProtected>
                <Reports />
            </AdminProtected>
        ),
    },
    {
        path: '/admin/settings',
        element: (
            <AdminProtected>
                <Settings />
            </AdminProtected>
        ),
    },
    {
        path: '/admin/loans',
        element: (
            <AdminProtected>
                <Loans />
            </AdminProtected>
        ),
    },
    {
        path: '/admin/loans/offers',
        element: (
            <AdminProtected>
                <Offers />
            </AdminProtected>
        ),
    },
    {
        path: '/admin/loans/offers/:id',
        element: (
            <AdminProtected>
                <Loans />
            </AdminProtected>
        ),
    },

    // pages
    {
        path: '/pages/knowledge-base',
        element: <KnowledgeBase />,
    },
    {
        path: '/pages/contact-us-boxed',
        element: <ContactUsBoxed />,
        layout: 'blank',
    },
    {
        path: '/pages/contact-us-cover',
        element: <ContactUsCover />,
        layout: 'blank',
    },
    {
        path: '/pages/faq',
        element: <Faq />,
    },
    {
        path: '/pages/coming-soon-boxed',
        element: <ComingSoonBoxed />,
        layout: 'blank',
    },
    {
        path: '/pages/coming-soon-cover',
        element: <ComingSoonCover />,
        layout: 'blank',
    },
    {
        path: '/pages/error404',
        element: <ERROR404 />,
        layout: 'blank',
    },
    {
        path: '/pages/error500',
        element: <ERROR500 />,
        layout: 'blank',
    },
    {
        path: '/pages/error503',
        element: <ERROR503 />,
        layout: 'blank',
    },
    {
        path: '/pages/maintenence',
        element: <Maintenence />,
        layout: 'blank',
    },
    {
        path: '/login',
        element: <Login />,
        layout: 'blank',
    },
    {
        path: '/otp-verification',
        element: (
            <ProtectedRoute>
                <OtpVerification />
            </ProtectedRoute>
        ),
        layout: 'blank',
    },

    {
        path: '/about',
        element: <About />,
        layout: 'blank',
    },
    {
        path: '*',
        element: <Error />,
        layout: 'blank',
    },
];

export { routes };
