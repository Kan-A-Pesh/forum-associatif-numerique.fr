"use client";

import * as React from "react";
import { format, setMinutes, setHours } from "date-fns";
import { DateRange } from "react-day-picker";

import { cn } from "@/lib/ui/cn";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import Icon from "../common/icon";
import { Input } from "./input";
import clamp from "@/lib/math/clamp";

interface DatePickerWithRangeProps {
    date: DateRange | undefined;
    onChangeDate: (date: DateRange | undefined) => void;
    displayTime?: boolean;
}

export function DatePickerWithRange({
    className,
    date,
    onChangeDate,
    displayTime,
}: React.HTMLAttributes<HTMLDivElement> & DatePickerWithRangeProps) {
    return (
        <div className={cn("grid gap-2", className)}>
            <Popover>
                <PopoverTrigger asChild>
                    <Button
                        id="date"
                        variant={"outline"}
                        className={cn("w-[250px] justify-start text-left font-normal", !date && "text-muted-foreground")}
                    >
                        <Icon icon="calendar" className="mr-2 h-4 w-4" />
                        {date?.from ? (
                            date.to ? (
                                <>
                                    {format(date.from, "LLL dd, y")} - {format(date.to, "LLL dd, y")}
                                </>
                            ) : (
                                format(date.from, "LLL dd, y")
                            )
                        ) : (
                            <span>Pick a date</span>
                        )}
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                        initialFocus
                        mode="range"
                        defaultMonth={date?.from}
                        selected={date}
                        onSelect={onChangeDate}
                        numberOfMonths={2}
                    />
                    {displayTime && (
                        <div className="p-3 pt-0 w-full gap-4 flex flex-col sm:flex-row">
                            <div className="grow">
                                <p className="text-muted-foreground text-center mb-1">Start time</p>
                                <div className="flex justify-center items-center gap-2">
                                    <Input
                                        type="number"
                                        placeholder="10"
                                        value={date?.from && format(date.from, "HH")}
                                        disabled={!date || !date.from}
                                        onFocus={(e) => (e.target.value = "")}
                                        onChange={(e) => {
                                            if (!date || !date.from) return;
                                            date.from = setHours(date.from, clamp(parseInt(e.target.value), 0, 23));
                                            onChangeDate(date);
                                        }}
                                        className="text-center w-12"
                                    />
                                    <span className="text-muted-foreground">:</span>
                                    <Input
                                        type="number"
                                        placeholder="00"
                                        value={date?.from && format(date.from, "mm")}
                                        disabled={!date || !date.from}
                                        onFocus={(e) => (e.target.value = "")}
                                        onChange={(e) => {
                                            if (!date || !date.from) return;
                                            date.from = setMinutes(date.from, clamp(parseInt(e.target.value), 0, 59));
                                            onChangeDate(date);
                                        }}
                                        className="text-center w-12"
                                    />
                                </div>
                            </div>
                            <div className="grow">
                                <p className="text-muted-foreground text-center mb-1">End time</p>
                                <div className="flex justify-center items-center gap-2">
                                    <Input
                                        type="number"
                                        placeholder="10"
                                        value={date?.to && format(date.to, "HH")}
                                        disabled={!date || !date.to}
                                        onFocus={(e) => (e.target.value = "")}
                                        onChange={(e) => {
                                            if (!date || !date.to) return;
                                            date.to = setHours(date.to, clamp(parseInt(e.target.value), 0, 23));
                                            onChangeDate(date);
                                        }}
                                        className="text-center w-12"
                                    />
                                    <span className="text-muted-foreground">:</span>
                                    <Input
                                        type="number"
                                        placeholder="00"
                                        value={date?.to && format(date.to, "mm")}
                                        onFocus={(e) => (e.target.value = "")}
                                        disabled={!date || !date.to}
                                        onChange={(e) => {
                                            if (!date || !date.to) return;
                                            date.to = setMinutes(date.to, clamp(parseInt(e.target.value), 0, 59));
                                            onChangeDate(date);
                                        }}
                                        className="text-center w-12"
                                    />
                                </div>
                            </div>
                        </div>
                    )}
                </PopoverContent>
            </Popover>
        </div>
    );
}
