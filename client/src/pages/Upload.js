import fetch from 'isomorphic-unfetch';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles(theme => ({
  root: {
    '& > *': {
      margin: theme.spacing(1, 0),
    },
  },
}));

export default function Upload() {
  const classes = useStyles();
  const [loading, setLoading] = React.useState(false);
  const [response, setResponse] = React.useState();

  const handleSubmit = ev => {
    setLoading(true);
    ev.preventDefault();

    fetch('/', {
      method: 'POST',
      body: new FormData(ev.target),
    })
      .then(res => {
        if (!res.ok) throw new Error(res.statusText);
        return res.json();
      })
      .then(data => {
        setLoading(false);
        setResponse(data);
        console.log(data);
      })
      .catch(error => {
        setLoading(false);
        setResponse({ error: error.message });
        console.error(error);
      });
  };

  return (
    <Container maxWidth="sm">
      <Box my={4}>
        <Typography variant="h4" component="h1" gutterBottom>
          Handling Multiple file upload
        </Typography>
      </Box>
      <Box>
        <form className={classes.root} noValidate autoComplete="off" onSubmit={handleSubmit}>
          <TextField id="name" name="name" label="Name" variant="outlined" fullWidth size="small" />
          <TextField id="type" name="type" label="Type" variant="outlined" fullWidth size="small" />
          <TextField
            id="image"
            name="image"
            variant="outlined"
            fullWidth
            type="file"
            size="small"
          />
          <TextField
            id="avatar"
            name="avatar"
            variant="outlined"
            fullWidth
            type="file"
            size="small"
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={loading}
            endIcon={loading ? <CircularProgress size={15} /> : null}
          >
            Submit
          </Button>
        </form>
      </Box>
      {response ? (
        <>
          <pre>{JSON.stringify(response, null, 2)}</pre>
          <Button variant="contained" onClick={() => setResponse(undefined)}>
            Clear
          </Button>
        </>
      ) : null}
    </Container>
  );
}
