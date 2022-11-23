import * as React from 'react';
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  divSuccess: {
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#00a000'
  },
  divError: {
    textAlign: 'center',
    fontWeight: 'bold',
    color: 'red'
  }
}));

export default function FeedbackNewTransference({data}) {

  const classes = useStyles();

  if (data.hasOwnProperty('error')) {
    return (
      <div className={classes.divError}>
        {data.error.map((element) => (
          <div>{element}</div>
        ))}
      </div>
    )
  } else if (data.hasOwnProperty('id')) {
    return (
      <div className={classes.divSuccess}>
        <div>Transferência realizada com sucesso.</div>
      </div>
    )
  } else if (data.hasOwnProperty('status')) {
    return (
      <div className={classes.divError}>
        {data.message}
      </div>
    )
  }

}