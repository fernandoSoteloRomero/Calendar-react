import { Calendar } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Navbar } from "../components/Navbar";
import { localizer } from "../../helpers/calendarLocalizer";
import { getMessagesEs } from "../../helpers/getMessages";
import { CalendarEventBox } from "../components/CalendarEventBox";
import { useState } from "react";
import { CalendarModal } from "../components/CalendarModal";
import { useUiStore } from "../../hooks/useUiStore";
import { useCalendarStore } from "../../hooks/useCalendarStore";
import { FabAddNew } from "../components/FabAddNew";
import { FabDelete } from "../components/FabDelete";

export const CalendarPage = () => {
  const {openDateModal} = useUiStore();
  const {events, setActiveEvent} = useCalendarStore();
  const [lastView, setLastView] = useState(
    localStorage.getItem("lastView" || "week")
  );
  const eventStyleGetter = (e, start, end, isSelected) => {
    const style = {
      backgroundColor: "#347CF7",
      borderRadius: "0px",
      opacity: 0.8,
      color: "white",
    };
    return {
      style,
    };
  };

  const onDoubleCLick = () => {
    openDateModal();
  };

  const onSelect = (e) => {
    setActiveEvent(e);
  };

  const onViewChanged = (e) => {
    localStorage.setItem("lastView", e);
  };
  return (
    <>
      <Navbar />
      <div>
        <Calendar
          culture="es"
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          style={{ height: "calc(100vh - 80px)" }}
          messages={getMessagesEs()}
          eventPropGetter={eventStyleGetter}
          components={{
            event: CalendarEventBox,
          }}
          onDoubleClickEvent={onDoubleCLick}
          onSelectEvent={onSelect}
          onView={onViewChanged}
          defaultView={lastView}
        />
      </div>
      <CalendarModal/>
      <FabAddNew/>
      <FabDelete/>
    </>
  );
};
