import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router'

import Index from "../views/Index.vue";
import Cart from "../views/Cart.vue";
import Publish from "../views/Publish.vue";
import Product from "../views/Product.vue";
import MyStore from "../views/MyStore.vue";
import MySales from "../views/MySales.vue";
import Store from "../views/Store.vue";
import MyOrders from "../views/MyOrders.vue";
import CartBuyNow from "../views/CartBuyNow.vue";
import Info from "../views/Info.vue";
import Donation from "../views/Donation.vue";
import Users from "../views/Users.vue";
import Shippings from "../views/Shippings.vue";
import Profil from "../views/Profil.vue";
import ApplyShipping from "../views/ApplyShipping.vue";
import MyShippingApplications from "../views/MyShippingApplications.vue";
import LineOrderApplications from "../views/LineOrderApplications.vue";
import Notifications from "../views/Notifications.vue";
import ShippingManagement from "../views/ShippingManagement.vue";
import Balance from "../views/Balance.vue";
import Deposit from "../views/Deposit.vue";
import Withdrawal from "../views/Withdrawal.vue";
import Administration from "../views/Admin/Administration.vue";
import Message from "../views/Message.vue";
import SupportContacts from "../views/SupportContacts.vue";
import Settings from "../views/Settings.vue";
import Connexion from "../views/Connexion.vue";
import Maintenance from "../views/Maintenance.vue";
import Transactions from "../views/Transactions.vue";
import ProductUpdate from "../views/ProductUpdate.vue";
import AddShippingImages from "../views/AddShippingImages.vue";
import AdminProducts from "../views/Admin/AdminProducts.vue";
import AdminOrders from "../views/Admin/AdminOrders.vue";
import AdminWithdrawals from "../views/Admin/AdminWithdrawals.vue";
import WalletBalanceDetails from "../views/Admin/WalletBalanceDetails.vue";
import Mining from "../views/Mining.vue";
import EmailVerificationCode from "../views/EmailVerificationCode.vue";
import FailedPayments from "../views/FailedPayments.vue";
import MyAccount from "../views/MyAccount.vue";
import Transfer from "../views/Transfer.vue";
import ScanQRCode from "../views/ScanQRCode.vue";
import TransferForm from "../views/TransferForm.vue";
import MyAddresses from "../views/MyAddresses.vue";
import SetUserCountry from "../views/SetUserCountry.vue";
import UserSettings from "../views/UserSettings.vue";
import Faq from "../views/Faq.vue";
import AdsEarnings from "../views/AdsEarnings.vue";

import PartnerAccount from "../views/Representative/PartnerAccount.vue";
import PartnerWalletAddress from "../views/Representative/PartnerWalletAddress.vue";
import PartnerOrders from "../views/Representative/PartnerOrders.vue";
import PartnersPayment from "../views/Representative/PartnersPayment.vue";

import Partnership from "../views/Partnership.vue";
import MessageContacts from "../views/MessageContacts.vue";
import Registration from "../views/Registration.vue";
import RegistrationSuccess from "../views/RegistrationSuccess.vue";

import { useStore } from '../stores'



const router = createRouter({
  linkActiveClass: 'active-nav',
  linkExactActiveClass: 'tw-border-indigo-700',
  //history: createWebHistory(import.meta.env.BASE_URL),
  history: createWebHashHistory(),
  scrollBehavior(to, from, savedPosition) {
    //console.log(savedPosition)
    //console.log('scrollBehavior', to)
    const store = useStore()
    //console.log('store.scrollPositions', store.scrollPositions)
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: store.scrollPositions[to.name] }
    }
  },
  routes: [
    {
        name: "index",
        path: "/",
        component: Index,
        //component: {},
        //component: () => import('../views/Index.vue'),
    },
    {
        name: "info",
        path: "/info",
        component: Info,
        //component: () => import('../views/Info.vue'),
    },
    {
        name: "donation",
        path: "/donation",
        component: Donation,
        //component: () => import('../views/Donation.vue'),
    },
    {
        name: "shippings",
        path: "/shippings",
        component: Shippings,
        //component: () => import('../views/Shippings.vue'),
    },
    {
        name: "profil",
        path: "/profil",
        component: Profil,
        //component: () => import('../views/Profil.vue'),
    },
    {
        name: "cart",
        path: "/cart",
        component: Cart,
        //component: () => import('../views/Cart.vue'),
    },
    {
        name: "publish",
        path: "/publish",
        component: Publish,
        //component: () => import('../views/Publish.vue'),
    },
    {
        name: "product",
        path: "/product/:id",
        component: Product,
        //component: () => import('../views/Product.vue'),
    },
    {
        name: "cart_buy",
        path: "/cart_buy/:id/:in_free_shipping_zone",
        component: CartBuyNow,
        //component: () => import('../views/CartBuyNow.vue'),
    },
    {
        name: "my_store",
        path: "/my-store",
        component: MyStore,
        //component: () => import('../views/MyStore.vue'),
    },
    {
        name: "my_sales",
        path: "/my-sales",
        component: MySales,
        //component: () => import('../views/MySales.vue'),
    },
    {
        name: "store",
        path: "/store/:shop_user_id",
        component: Store,
        //component: () => import('../views/Store.vue'),
    },
    {
        name: "my_orders",
        path: "/my-orders",
        component: MyOrders,
        //component: () => import('../views/MyOrders.vue'),
    },
    {
        name: "users",
        path: "/users",
        component: Users,
        //component: () => import('../views/Users.vue'),
    },
    {
        name: "shipping_apply",
        path: "/shipping/:id/apply",
        component: ApplyShipping,
        //component: () => import('../views/ApplyShipping.vue'),
    },
    {
        name: "my_shipping_apply",
        path: "/my/shipping/apply",
        component: MyShippingApplications,
        //component: () => import('../views/MyShippingApplications.vue'),
    },
    {
        name: "line_order_application",
        path: "/line-order/:id/application",
        component: LineOrderApplications,
        //component: () => import('../views/LineOrderApplications.vue'),
    },
    {
        name: "notifications",
        path: "/notifications",
        component: Notifications,
        //component: () => import('../views/Notifications.vue'),
    },
    {
        name: "shipping_management",
        path: "/shipping-management/line-order/:id",
        component: ShippingManagement,
        //component: () => import('../views/ShippingManagement.vue'),
    },
    {
        name: "balance",
        path: "/balance",
        component: Balance,
        //component: () => import('../views/Balance.vue'),
    },
    {
        name: "deposit",
        path: "/deposit",
        component: Deposit,
        //component: () => import('../views/Deposit.vue'),
    },
    {
        name: "withdrawal",
        path: "/withdrawal",
        component: Withdrawal,
        //component: () => import('../views/Withdrawal.vue'),
    },
    {
        name: "administration",
        path: "/administration",
        component: Administration,
        //component: () => import('../views/Administration.vue'),
    },
    {
        name: "message",
        path: "/message/:corresponding_id/:line_order_id",
        component: Message,
        //component: () => import('../views/Message.vue'),
    },
    {
        name: "support_contacts",
        path: "/support-contacts",
        component: SupportContacts,
        //component: () => import('../views/SupportContacts.vue'),
    },
    {
        name: "settings",
        path: "/settings",
        component: Settings,
        //component: () => import('../views/Settings.vue'),
    },
    {
        name: "connexion",
        path: "/connexion",
        component: Connexion,
        //component: () => import('../views/Connexion.vue'),
    },
    {
        name: "maintenance",
        path: "/maintenance",
        component: Maintenance,
        //component: () => import('../views/Maintenance.vue'),
    },
    {
        name: "transactions",
        path: "/transactions",
        component: Transactions,
        //component: () => import('../views/Transactions.vue'),
    },
    {
        name: "product-update",
        path: "/product-update/:id",
        component: ProductUpdate,
        //component: () => import('../views/ProductUpdate.vue'),
    },
    {
        name: "add-update-shipping-images",
        path: "/add-update-shipping-images/:type",
        component: AddShippingImages,
        //component: () => import('../views/AddShippingImages.vue'),
    },
    {
        name: "admin-withdrawals",
        path: "/admin-withdrawals",
        component: AdminWithdrawals,
        //component: () => import('../views/AdminWithdrawals.vue'),
    },
    {
        name: "admin-products",
        path: "/admin-products",
        component: AdminProducts,
        //component: () => import('../views/AdminProducts.vue'),
    },
    {
        name: "admin-orders",
        path: "/admin-orders",
        component: AdminOrders,
        //component: () => import('../views/AdminOrders.vue'),
    },
    {
        name: "wallet-balance-details",
        path: "/wallet-balance-details/:username",
        component: WalletBalanceDetails,
        //component: () => import('../views/WalletBalanceDetails.vue'),
    },
    {
        name: "mining",
        path: "/mining",
        component: Mining,
        //component: () => import('../views/Mining.vue'),
    },
    {
        name: "email-verification-code",
        path: "/email-verification-code/:email",
        component: EmailVerificationCode,
        //component: () => import('../views/EmailVerificationCode.vue'),
    },
    {
        name: "failed-payments",
        path: "/failed-payments",
        component: FailedPayments,
        //component: () => import('../views/FailedPayments.vue'),
    },
    {
        name: "my-account",
        path: "/my-account",
        component: MyAccount,
        //component: () => import('../views/MyAccount.vue'),
    },
    {
        name: "transfer",
        path: "/transfer",
        component: Transfer,
        //component: () => import('../views/Transfer.vue'),
    },
    {
        name: "scan-qr-code",
        path: "/scan-qr-code",
        component: ScanQRCode,
        //component: () => import('../views/ScanQRCode.vue'),
    },
    {
        name: "transfer-form",
        path: "/transfer-form/:username",
        component: TransferForm,
        //component: () => import('../views/TransferForm.vue'),
    },
    {
        name: "my-addresses",
        path: "/my-addresses",
        component: MyAddresses,
        //component: () => import('../views/MyAddresses.vue'),
    },
    {
        name: "user-country",
        path: "/user-country",
        component: SetUserCountry,
        //component: () => import('../views/SetUserCountry.vue'),
    },
    {
        name: "user-settings",
        path: "/user-settings",
        component: UserSettings,
        //component: () => import('../views/UserSettings.vue'),
    },
    {
        name: "partner-account",
        path: "/partner-account",
        component: PartnerAccount,
        //component: () => import('../views/Representative/PartnerAccount.vue'),
    },
    {
        name: "set-partner-wallet-address",
        path: "/set-partner-wallet-address",
        component: PartnerWalletAddress,
        //component: () => import('../views/Representative/PartnerWalletAddress.vue'),
    },
    {
        name: "partner-orders",
        path: "/partner-orders",
        component: PartnerOrders,
        //component: () => import('../views/Representative/PartnerOrders.vue'),
    },
    {
        name: "partners-payment",
        path: "/partners-payment",
        component: PartnersPayment,
        //component: () => import('../views/Representative/PartnersPayment.vue'),
    },
    {
        name: "faq",
        path: "/faq",
        component: Faq,
        //component: () => import('../views/Faq.vue'),
    },
    {
        name: "ads-earnings",
        path: "/ads-earnings",
        component: AdsEarnings,
        //component: () => import('../views/AdsEarnings.vue'),
    },
    {
        name: "partnership",
        path: "/partnership",
        component: Partnership,
        //component: () => import('../views/Partnership.vue'),
    },
    {
        name: "message-contacts",
        path: "/message-contacts",
        component: MessageContacts,
        //component: () => import('../views/MessageContacts.vue'),
    },
    {
        name: "registration",
        path: "/registration",
        component: Registration,
        //component: () => import('../views/Registration.vue'),
    },
    {
        name: "registration-success",
        path: "/registration-success",
        component: RegistrationSuccess,
        //component: () => import('../views/RegistrationSuccess.vue'),
    },
  ]
})

export default router
