import React, { useState, useEffect } from 'react'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import 'react-big-calendar/lib/css/react-big-calendar.css'

moment.locale('en-GB')
const localizer = momentLocalizer(moment)

interface Post {
  id: string
  title: string
  content: string
  scheduledAt: string
}

export default function PostCalendar() {
  const [events, setEvents] = useState([])

  useEffect(() => {
    fetchPosts()
  }, [])

  const fetchPosts = async () => {
    try {
      const response = await fetch('/api/posts')
      if (!response.ok) {
        throw new Error('Failed to fetch posts')
      }
      const posts: Post[] = await response.json()
      const calendarEvents = posts.map(post => ({
        id: post.id,
        title: post.title,
        start: new Date(post.scheduledAt),
        end: new Date(post.scheduledAt),
      }))
      setEvents(calendarEvents)
    } catch (error) {
      console.error('Error fetching posts:', error)
    }
  }

  return (
    <div style={{ height: '500px' }}>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: '100%' }}
      />
    </div>
  )
}

