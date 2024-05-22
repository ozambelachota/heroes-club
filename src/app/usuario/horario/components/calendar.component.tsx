"use client";
import { format, getDay, parse, startOfWeek } from "date-fns";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";

import { es } from "date-fns/locale";
const locales = {
  es: es,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

export default function CalendarComponent() {
  return (
    <div className="w-50 h-screen">
      <Calendar
        localizer={localizer}
        views={["month", "week", "day"]}
        startAccessor="start"
        endAccessor="end"
      />
    </div>
  );
}
