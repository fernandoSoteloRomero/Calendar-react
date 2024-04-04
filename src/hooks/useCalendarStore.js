import { useDispatch, useSelector } from "react-redux";
import {
  onAddNewEvent,
  onDeleteEvent,
  onSetActiveEvent,
  onUpdateEvent,
} from "../store/calendar/calendarSlice";

export const useCalendarStore = () => {
  const dispatch = useDispatch();
  const { events, activeEvent } = useSelector((state) => state.calendar);

  const setActiveEvent = (calendarEvent) => {
    dispatch(onSetActiveEvent(calendarEvent));
  };

  const startSavingEvent = async (calendarEvent) => {
    // TODO: llegar al backend

    if (calendarEvent._id) {
      // Estoy actualizando
      dispatch(onUpdateEvent( calendarEvent ));
    } else {
      // Creando
      dispatch(
        onAddNewEvent({
          ...calendarEvent,
          _id: new Date().getTime(),
        })
      );
    }

    //TODO todo bien
  };

  const startdeletingEvent = () => {
    // TODO llegar al backend
    dispatch(onDeleteEvent());
  };

  return {
    // Propiedades - variables
    events,
    activeEvent,
    hasEventSelected: !!activeEvent,

    // Eventos - funciones
    setActiveEvent,
    startSavingEvent,
    startdeletingEvent,
  };
};
