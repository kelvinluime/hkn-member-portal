// Disclaimer: This is horrible naming but I shall fix it later
// Update: You're getting removed! soon tm

import React from 'react';
import { compose } from 'recompose';
import PropTypes from 'prop-types';
import { Grid, Typography } from '@material-ui/core';
import { grey } from '@material-ui/core/colors';
import { withStyles } from '@material-ui/core/styles';

import { Card } from '@SharedComponents';
import { getUserEvent } from '@Services/events';

const styles = theme => ({
  root: {
    backgroundColor: grey[400],
  },
  gridItem: {
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
});

class PointDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      eventNames: [],
      officerSigns: [],
    };
  }

  componentDidMount() {
    const { user } = this.props;
    this.setState({ officerSigns: user.officerSigns });
    getUserEvent(user.uid).then(events => {
      const eventNames = events.map(event => event.event_name);
      this.setState({ eventNames });
    });
  }

  render() {
    const { eventNames, officerSigns } = this.state;
    const { classes } = this.props;
    return (
      <Grid
        container
        className={classes.root}
        justify='center'
        alignItems='flex-start'
      >
        <Grid item className={classes.gridItem} md={4}>
          <Card title='Events'>
            {eventNames.map(eventName => (
              <Typography>{eventName}</Typography>
            ))}
          </Card>
        </Grid>
        <Grid item className={classes.gridItem} md={4}>
          <Card title='Officer Signoffs'>
            {officerSigns.map(officerName => (
              <Typography>{officerName}</Typography>
            ))}
          </Card>
        </Grid>
      </Grid>
    );
  }
}

PointDetail.propTypes = {
  user: PropTypes.shape({
    uid: PropTypes.string.isRequired,
    officerSigns: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
};

export default compose(withStyles(styles))(PointDetail);
