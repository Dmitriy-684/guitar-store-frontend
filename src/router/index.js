import { createRouter, createWebHistory } from 'vue-router'

import WelcomeScreen from "@/components/WelcomeScreen.vue";
import SignupForm from "@/components/SignupForm.vue";
import SigninForm from "@/components/SigninForm.vue";
import GuitarsMainPage from "@/components/GuitarsMainPage.vue";
import GuitarUploadPage from "@/components/GuitarUploadPage.vue";
import ManagerPanel from "@/components/ManagerPanel.vue";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'WelcomeScreen',
            component: WelcomeScreen,
        },
        {
            path: "/register",
            name: "SignupForm",
            component: SignupForm,
        },
        {
            path: "/login",
            name: "SigninForm",
            component: SigninForm
        },
        {
            path: "/guitars",
            name: "GuitarsMainPage",
            component: GuitarsMainPage
        },
        {
            path: "/manager/guitar/upload",
            name: "GuitarUploadPage",
            component: GuitarUploadPage
        },
        {
            path: "/manager",
            name: "ManagerPanel",
            component: ManagerPanel
        }
    ]
})

export default router
