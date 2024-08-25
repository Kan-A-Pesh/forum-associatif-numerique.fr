"use client";

import { Boarding } from "boarding.js";
import "boarding.js/styles/main.css";
import "../_styles/driver.css";

import { useEffect, useState } from "react";

export default function Driver() {
    useEffect(() => {
        // @ts-ignore
        if (typeof window.driverObjStarted !== "undefined") return;

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
                    title: "Hey! Welcome!",
                    description:
                        "Welcome to the new version of the forum-associatif-numerique.fr website,\n" +
                        "i'll guide you through the process of creating a page for your club!",
                    nextBtnText: "Let's get started!",
                },
            },
            {
                element: "#lang-selector",
                popover: {
                    title: "What's new?",
                    description:
                        "We've made some changes to the way you create a page and added multi-language support.\n" +
                        "Let's see how it works!",
                    nextBtnText: "Next",
                },
            },
            {
                element: "#lang-selector",
                popover: {
                    title: "Language selector",
                    description:
                        "Here you can select the language you want to create the page in.\n" +
                        "For now we'll start with the default language, and translate the page later.",
                    nextBtnText: "Next",
                },
            },
            {
                element: "#club-name",
                popover: {
                    title: "Edit the club name",
                    description: "Let's start by editing the club name.",
                    nextBtnText: "I've edited the name",
                },
            },
            {
                element: "#save-cancel",
                popover: {
                    title: "DON'T FORGET!",
                    description: "Nice! Now don't forget to save your changes!",
                    nextBtnText: "I've save my changes 🗿",
                },
            },
            {
                element: "#null-element",
                popover: {
                    title: "Let's continue!",
                    description: "Now we'll do some more advanced stuff: the page content.",
                    nextBtnText: "I'm ready!",
                },
            },
            {
                element: "#always-visible-add-part",
                strictClickHandling: false,
                padding: 128,
                popover: {
                    alignment: "center",
                    className: "translate-y-[128px]",
                    title: "Add a new section",
                    description:
                        "Here you can add a new section to the page, like a text block, an image gallery, or an embed.\n" +
                        'Click on the "+" button and select a text block to add it to the page.',
                    nextBtnText: "Next",
                },
            },
            {
                element: "textarea",
                popover: {
                    title: "Edit the text block",
                    description: "Great! Now you can edit the text block you just added.",
                    nextBtnText: "Done!",
                },
            },
            {
                element: "#save-cancel",
                popover: {
                    title: "Perfect!",
                    description: "You've added a new section to the page!\n" + "Don't forget to save your changes!",
                    nextBtnText: "I've save my changes (again) 🗿",
                },
            },
            {
                element: "#lang-selector",
                popover: {
                    title: "Back to the language selector",
                    description:
                        "After you've added your content and SAVED it, you can now create a translation for another language.\n" +
                        "Let's select a different language and translate the page.",
                    nextBtnText: "Next",
                },
            },
            {
                element: "#club-name",
                popover: {
                    title: "Translate the club name",
                    description:
                        "As you can see, the fallback language is already filled in.\n" +
                        "You can leave it as is if it's the same, or translate it to another language.",
                    nextBtnText: "Next",
                },
            },
            {
                element: "#always-visible-add-part",
                strictClickHandling: false,
                padding: 128,
                popover: {
                    className: "translate-y-[128px]",
                    alignment: "center",
                    title: "Recreate the page",
                    description:
                        "Now you can recreate the page in another language.\n" + "Aaaannd... \n" + "Don't forget to save your changes!",
                    nextBtnText: "Yes.",
                },
            },
            {
                element: "#always-visible-add-part",
                popover: {
                    title: "That's it!",
                    description:
                        "You've successfully created a page for your club!\n" +
                        "If you have any questions, feel free to ask the webmaster.",
                    nextBtnText: "Got it!",
                },
            },
            {
                element: "#menu-feedback",
                popover: {
                    title: "One more thing!",
                    description: "Oh, and you can always give feedback on the new website by clicking here.",
                    nextBtnText: "I'll do that!",
                },
            },
            {
                element: "#always-visible-add-part",
                popover: {
                    title: "Enjoy!",
                    description: "Enjoy the new website!",
                    nextBtnText: "Close",
                },
            },
            {
                element: "#save-cancel",
                popover: {
                    title: "Wait a minute!",
                    description: "Did you forget to save your changes??",
                    doneBtnText: "No. I never forget. 🗿",
                },
            },
        ]);

        driverObj.start();

        // @ts-ignore
        window.driverObjStarted = true;
    }, []);

    return null;
}
