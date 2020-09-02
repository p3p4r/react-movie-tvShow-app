import React from 'react'
import './App.css';
import Form from './components/Form';
import { ThemeProvider, CSSReset, Flex, Grid, Text, Box } from "@chakra-ui/core"
import { useSelector } from 'react-redux'
import customTheme from  './theme.js'
require('dotenv').config()

export default function App({ children }) {
  const cardInfo = useSelector(state => state.cardVisibility).visibility;
  return (
    <ThemeProvider theme={customTheme}>
    <CSSReset />
    {children}
    <div className="App">
      <div className="v-container">
        <Grid columns={2} size="100%" align="center" justify="center">
          {!cardInfo ?
          <Flex flexDirection="column" justifyContent="flex-end">
            <Box>
              <Text
              textAlign="center"
              className="title"
              fontSize= "6rpw"
              textTransform= "uppercase"
              fontWeight= "700"
              textshadow= "0 0 300px #a9a9a9, 0 0 100px #a9a9a95e, 0 0 20px #040404">
                What to Watch Right Now
              </Text>
            </Box>
          </Flex>
          : ''}
          <Box>
            <Form />
          </Box>
      </Grid>
      </div>
    </div>
  </ThemeProvider>
  )
}

