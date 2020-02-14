import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import Link from '@material-ui/core/Link';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';

const NotFound = () => {
  return (
    <Container maxWidth="sm">
      <Box my={4}>
        <Typography variant="h4" component="h4">
          404 - Not Found
        </Typography>
        <br />
        <Link component={RouterLink} to="/">
          Home
        </Link>
      </Box>
    </Container>
  );
};

export default NotFound;
