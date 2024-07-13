export function timeRangeToString(
    start: Date | number | string | null,
    end: Date | number | string | null,
    locale: string = "en-GB",
): string {
    const nowDate = new Date();

    let startDate = start ? new Date(start) : null;
    let endDate = end ? new Date(end) : null;

    // If start date is in the past, remove it
    if (startDate && startDate.getTime() <= nowDate.getTime()) {
        startDate = null;
    }

    // If end date is in the past say "Ended"
    if (endDate && endDate.getTime() <= nowDate.getTime()) {
        return "Ended";
    }

    if (startDate && endDate) {
        const startDD = startDate.toLocaleDateString(locale, { day: "numeric" });
        const startMMM = startDate.toLocaleDateString(locale, { month: "short" });
        const startMMMM = startDate.toLocaleDateString(locale, { month: "long" });
        const startYYYY = startDate.toLocaleDateString(locale, { year: "numeric" });
        const startHHMM = startDate.toLocaleTimeString(locale, { hour: "numeric", minute: "numeric" });

        const endDD = endDate.toLocaleDateString(locale, { day: "numeric" });
        const endMMM = endDate.toLocaleDateString(locale, { month: "short" });
        const endYYYY = endDate.toLocaleDateString(locale, { year: "numeric" });
        const endHHMM = endDate.toLocaleTimeString(locale, { hour: "numeric", minute: "numeric" });

        // If same day: DD MMM. HH:MM - HH:MM
        if (startDD === endDD && startMMM === endMMM && startYYYY === endYYYY) return `${startDD} ${startMMM}. ${startHHMM} - ${endHHMM}`;
        // If same month / year: DD MMM. HH:MM - DD MMM. HH:MM
        else if (startYYYY === endYYYY) return `${startDD} ${startMMM}. ${startHHMM} - ${endDD} ${endMMM}. ${endHHMM}`;
        // Else: DD MMM YYYY HH:MM - DD MMM YYYY HH:MM
        else return `${startDD} ${startMMM} ${startYYYY} ${startHHMM} - ${endDD} ${endMMM} ${endYYYY} ${endHHMM}`;
    } else if (startDate) {
        // If start date is in the future, say "Starts"
        return `Starts ${startDate.toLocaleDateString(locale, {
            day: "numeric",
            month: "long",
            year: "numeric",
        })}`;
    } else if (endDate) {
        // If end date is in the future, say "Ends"
        return `Ends ${endDate.toLocaleDateString(locale, {
            day: "numeric",
            month: "long",
            year: "numeric",
        })}`;
    } else {
        // If no start or end date, say "Ongoing"
        return "Ongoing";
    }
}
