import * as React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  divSuccess: {
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#00a000',
  },
  divError: {
    textAlign: 'center',
    fontWeight: 'bold',
    color: 'red',
  },
}));

export default function FeedbackCreateUser({ data, message }) {
  const classes = useStyles();

  if (Object.prototype.hasOwnProperty.call(data, 'error')) {
    return (
      <div className={classes.divError}>
        {data.error.map((element) => (
          <div key={element}>{element}</div>
        ))}
      </div>
    );
  } if (Object.prototype.hasOwnProperty.call(data, 'id')) {
    return (
      <div className={classes.divSuccess}>
        <div>{message || ''}</div>
      </div>
    );
  } if (Object.prototype.hasOwnProperty.call(data, 'status')) {
    return (
      <div className={classes.divError}>
        {data.message}
      </div>
    );
  }
}
