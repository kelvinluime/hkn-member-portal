import React from 'react';
import { Typography, Container, Card, Button, Grid } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import PropTypes from 'prop-types';

import DeleteEditButtons from '../DeleteEditButtons';

import Links from './Links';
import styles from './styles';

import { OfficerRenderPermission } from '@HOCs/RenderPermissions';
import { Tags } from '@SharedComponents';
import * as ROUTES from '@Constants/routes';

function EventDetailsComponent(props) {
  const { classes, eventInfo, eventId } = props;
  const {
    endDate,
    hosts,
    location,
    name,
    startDate,
    tags,
    urls,
    description,
  } = eventInfo;

  const updatedUrls = urls;
  updatedUrls.signin = `/events/${eventId}/signin`;
  updatedUrls.rsvp = `/events/${eventId}/rsvp`;

  return (
    <div className={classes.root}>
      <Card>
        <Container className={classes.container} maxWidth='sm'>
          <Grid container direction='row' justify='space-between'>
            <Grid className={classes.titleTag} item xs={7}>
              <Typography className={classes.title} variant='h4'>
                {name}
                <Tags tags={tags} />
              </Typography>
            </Grid>

            <Grid item xs={4}>
              {OfficerRenderPermission(DeleteEditButtons)({ eventId })}
            </Grid>
          </Grid>

          <Grid
            className={classes.hostLocTime}
            container
            direction='row'
            spacing={4}
          >
            <Grid item xs={6}>
              <Typography className={classes.hosts} variant='h6'>
                Hosts:{' '}
                {hosts.map(host => (
                  <Typography key={host} className={classes.hostName}>
                    {host}
                  </Typography>
                ))}
              </Typography>
            </Grid>

            <Grid item xs={6}>
              <Typography variant='h6'>
                Location: <Typography>{location}</Typography>
              </Typography>

              <Typography variant='h6'>
                Start Time:{' '}
                <Typography>{format(startDate, 'PPP p')}</Typography>
              </Typography>
              <Typography variant='h6'>
                End Time: <Typography>{format(endDate, 'PPP p')}</Typography>
              </Typography>
            </Grid>
          </Grid>

          <Grid
            className={classes.descURL}
            container
            direction='row'
            spacing={4}
          >
            <Grid item xs={3}>
              {OfficerRenderPermission(Links)({ urls: updatedUrls })}
            </Grid>

            <Grid item xs={9}>
              <Typography variant='h6'>
                Description: <Typography>{description}</Typography>
              </Typography>
            </Grid>
          </Grid>
        </Container>
      </Card>

      <Button
        className={classes.calendarButton}
        variant='outlined'
        color='secondary'
        to={ROUTES.CALENDAR}
        component={Link}
      >
        Back To Calendar
      </Button>
    </div>
  );
}

EventDetailsComponent.propTypes = {
  eventInfo: PropTypes.shape({
    startDate: PropTypes.instanceOf(Date).isRequired,
    endDate: PropTypes.instanceOf(Date).isRequired,
    hosts: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
    location: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    tags: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
    description: PropTypes.string.isRequired,
    urls: PropTypes.shape({
      fb: PropTypes.string.isRequired,
      canva: PropTypes.string.isRequired,
      rsvp: PropTypes.string.isRequired,
      signin: PropTypes.string.isRequired,
    }),
  }).isRequired,
  eventId: PropTypes.string.isRequired,
};

export default withStyles(styles)(EventDetailsComponent);