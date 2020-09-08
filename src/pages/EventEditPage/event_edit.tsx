import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router';
import { Card } from '@material-ui/core';

import EventEditForm from './components/EventEditForm';

import { getEventById, updateEvent } from '@Services/EventService';
import { EventResponse, EventRequest } from '@Services/api/models';

function EventEditPage(): JSX.Element {
  const { eventId: id } = useParams();
  const history = useHistory();
  const [event, setEvent] = useState<EventResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const getEvent = async () => {
      const eventResponse = await getEventById(id);
      setEvent(eventResponse);
      setLoading(false);
    };
    getEvent();
  }, [id]);

  const handleCancel = () => {
    history.push(`/events/${id}`);
  };

  const handleSubmit = async (
    values: EventRequest,
    setSubmitting: (_: boolean) => void
  ) => {
    const eventRequest: EventRequest = {
      ...values,
      hosts: values.hosts.map(host => {
        return {
          id: host.id,
        };
      }),
    };

    await updateEvent(id, eventRequest);
    setSubmitting(false);
    history.push(`/events/${id}`);
  };

  if (loading) {
    return <></>;
  }
  return (
    <Card>
      <EventEditForm
        handleSubmit={handleSubmit}
        handleCancel={handleCancel}
        initialValues={event}
      />
    </Card>
  );
}

export default EventEditPage;
