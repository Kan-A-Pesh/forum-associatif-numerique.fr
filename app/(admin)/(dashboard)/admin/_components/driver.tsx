"use client";

import { Boarding } from "boarding.js";
import "boarding.js/styles/main.css";
import "../_styles/driver.css";

import { useEffect } from "react";
import tfunc from "@/components/i18n/tfunc";
import { useLanguageStore } from "@/lib/stores/language";

export default function Driver() {
    const ls = useLanguageStore();

    useEffect(() => {
        // @ts-ignore
        if (typeof window.driverObjStarted !== "undefined") return;
        if (!ls.languageMap[ls.selectedLanguage]) return;

        const driverObj = new Boarding({
            animate: true,
            allowClose: false,
            className: "max-w-sm",
            opacity: 0.5,
        });

        driverObj.defineSteps([
            {
                element: "#null-element",
                popover: {
                    title: tfunc(ls, "admin.driver.step1.title"),
                    description: tfunc(ls, "admin.driver.step1.description"),
                    nextBtnText: tfunc(ls, "admin.driver.step1.nextBtnText"),
                },
            },
            {
                element: "#lang-selector",
                popover: {
                    title: tfunc(ls, "admin.driver.step2.title"),
                    description: tfunc(ls, "admin.driver.step2.description"),
                    nextBtnText: tfunc(ls, "admin.driver.step2.nextBtnText"),
                },
            },
            {
                element: "#lang-selector",
                popover: {
                    title: tfunc(ls, "admin.driver.step3.title"),
                    description: tfunc(ls, "admin.driver.step3.description"),
                    nextBtnText: tfunc(ls, "admin.driver.step3.nextBtnText"),
                },
            },
            {
                element: "#club-name",
                popover: {
                    title: tfunc(ls, "admin.driver.step4.title"),
                    description: tfunc(ls, "admin.driver.step4.description"),
                    nextBtnText: tfunc(ls, "admin.driver.step4.nextBtnText"),
                },
            },
            {
                element: "#save-cancel",
                popover: {
                    title: tfunc(ls, "admin.driver.step5.title"),
                    description: tfunc(ls, "admin.driver.step5.description"),
                    nextBtnText: tfunc(ls, "admin.driver.step5.nextBtnText"),
                },
            },
            {
                element: "#null-element",
                popover: {
                    title: tfunc(ls, "admin.driver.step6.title"),
                    description: tfunc(ls, "admin.driver.step6.description"),
                    nextBtnText: tfunc(ls, "admin.driver.step6.nextBtnText"),
                },
            },
            {
                element: "#always-visible-add-part",
                strictClickHandling: false,
                padding: 128,
                popover: {
                    alignment: "center",
                    className: "translate-y-[128px]",
                    title: tfunc(ls, "admin.driver.step7.title"),
                    description: tfunc(ls, "admin.driver.step7.description"),
                    nextBtnText: tfunc(ls, "admin.driver.step7.nextBtnText"),
                },
            },
            {
                element: "textarea",
                popover: {
                    title: tfunc(ls, "admin.driver.step8.title"),
                    description: tfunc(ls, "admin.driver.step8.description"),
                    nextBtnText: tfunc(ls, "admin.driver.step8.nextBtnText"),
                },
            },
            {
                element: "#save-cancel",
                popover: {
                    title: tfunc(ls, "admin.driver.step9.title"),
                    description: tfunc(ls, "admin.driver.step9.description"),
                    nextBtnText: tfunc(ls, "admin.driver.step9.nextBtnText"),
                },
            },
            {
                element: "#lang-selector",
                popover: {
                    title: tfunc(ls, "admin.driver.step10.title"),
                    description: tfunc(ls, "admin.driver.step10.description"),
                    nextBtnText: tfunc(ls, "admin.driver.step10.nextBtnText"),
                },
            },
            {
                element: "#club-name",
                popover: {
                    title: tfunc(ls, "admin.driver.step11.title"),
                    description: tfunc(ls, "admin.driver.step11.description"),
                    nextBtnText: tfunc(ls, "admin.driver.step11.nextBtnText"),
                },
            },
            {
                element: "#always-visible-add-part",
                strictClickHandling: false,
                padding: 128,
                popover: {
                    className: "translate-y-[128px]",
                    alignment: "center",
                    title: tfunc(ls, "admin.driver.step12.title"),
                    description: tfunc(ls, "admin.driver.step12.description"),
                    nextBtnText: tfunc(ls, "admin.driver.step12.nextBtnText"),
                },
            },
            {
                element: "#always-visible-add-part",
                popover: {
                    title: tfunc(ls, "admin.driver.step13.title"),
                    description: tfunc(ls, "admin.driver.step13.description"),
                    nextBtnText: tfunc(ls, "admin.driver.step13.nextBtnText"),
                },
            },
            {
                element: "#menu-feedback",
                popover: {
                    title: tfunc(ls, "admin.driver.step14.title"),
                    description: tfunc(ls, "admin.driver.step14.description"),
                    nextBtnText: tfunc(ls, "admin.driver.step14.nextBtnText"),
                },
            },
            {
                element: "#always-visible-add-part",
                popover: {
                    title: tfunc(ls, "admin.driver.step15.title"),
                    description: tfunc(ls, "admin.driver.step15.description"),
                    nextBtnText: tfunc(ls, "admin.driver.step15.nextBtnText"),
                },
            },
            {
                element: "#save-cancel",
                popover: {
                    title: tfunc(ls, "admin.driver.step16.title"),
                    description: tfunc(ls, "admin.driver.step16.description"),
                    doneBtnText: tfunc(ls, "admin.driver.step16.doneBtnText"),
                },
            },
        ]);

        driverObj.start();

        // @ts-ignore
        window.driverObjStarted = true;
    }, [ls]);

    return null;
}
