import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Link from '@material-ui/core/Link';

const Home = () => {
  return (
    <Container maxWidth="sm">
      <Box my={4}>
        <ul>
          <li>
            <Link component={RouterLink} to="/">
              Home
            </Link>
          </li>
          <li>
            <Link component={RouterLink} to="/upload">
              Upload
            </Link>
          </li>
        </ul>
      </Box>
    </Container>
  );
};

export default Home;
