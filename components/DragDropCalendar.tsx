import { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';

export default function DragDropCalendar({ posts = [] }) {
  const [events, setEvents] = useState([]);

  // When posts are passed or updated, set the events
  useEffect(() => {
    if (posts.length > 0) {
      setEvents(
        posts.map(post => ({
          id: post.id,
          title: post.title,
          start: post.scheduledDate,
        }))
      );
    }
  }, [posts]); // Runs when posts change

  const handleEventDrop = async (info) => {
    const { event } = info;
    const updatedEvent = {
      id: event.id,
      title: event.title,
      start: event.start,
    };

    // Update the event in the state
    setEvents(prevEvents => 
      prevEvents.map(ev => ev.id === updatedEvent.id ? updatedEvent : ev)
    );

    // Send update to the server
    await fetch(`/api/posts/${event.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ scheduledDate: event.start }),
    });
  };

  // Display loading message if posts are still undefined or empty
  if (!posts || posts.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <FullCalendar
      plugins={[dayGridPlugin, interactionPlugin]}
      initialView="dayGridMonth"
      events={events}
      editable={true}
      eventDrop={handleEventDrop}
    />
  );
}
