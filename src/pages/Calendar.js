import React, { useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import EventModal from '../components/Dashboard/CalenderEventModal';

const Calendar = () => {
  const [events, setEvents] = useState([
    // Sample events - you'll later load these from your database
    {
      id: '1',
      title: 'Sample Lesson Plan',
      description: 'This is a sample lesson plan',
      start: new Date(),
      end: new Date(new Date().setHours(new Date().getHours() + 2)),
    }
  ]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);

  const handleDateSelect = (selectInfo) => {
    setSelectedDate({
      start: selectInfo.start,
      end: selectInfo.end
    });
    setIsModalOpen(true);
  };

  const handleEventClick = (clickInfo) => {
    setSelectedEvent(clickInfo.event);
    setIsModalOpen(true);
  };

  const handleEventDrop = (dropInfo) => {
    const updatedEvents = events.map(event => {
      if (event.id === dropInfo.event.id) {
        return {
          ...event,
          start: dropInfo.event.start,
          end: dropInfo.event.end
        };
      }
      return event;
    });
    setEvents(updatedEvents);
  };

  const handleEventSubmit = (eventData) => {
    if (eventData.id) {
      // Update existing event
      setEvents(events.map(event => 
        event.id === eventData.id ? { ...event, ...eventData } : event
      ));
    } else {
      // Create new event
      setEvents([
        ...events,
        {
          ...eventData,
          id: Date.now().toString() // Simple ID generation
        }
      ]);
    }
  };

  const handleDeleteEvent = (eventId) => {
    setEvents(events.filter(event => event.id !== eventId));
    setIsModalOpen(false);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Lesson Planning Calendar</h1>
      <div className="calendar-container bg-white rounded-lg shadow p-4">
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          headerToolbar={{
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay'
          }}
          events={events}
          editable={true}
          selectable={true}
          selectMirror={true}
          dayMaxEvents={true}
          weekends={true}
          select={handleDateSelect}
          eventClick={handleEventClick}
          eventDrop={handleEventDrop}
          height="80vh"
        />
      </div>

      <EventModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedEvent(null);
          setSelectedDate(null);
        }}
        onSubmit={handleEventSubmit}
        onDelete={handleDeleteEvent}
        event={selectedEvent ? {
          id: selectedEvent.id,
          title: selectedEvent.title,
          description: selectedEvent.extendedProps?.description,
          start: selectedEvent.start,
          end: selectedEvent.end
        } : selectedDate ? {
          start: selectedDate.start,
          end: selectedDate.end
        } : null}
      />
    </div>
  );
};

export default Calendar; 