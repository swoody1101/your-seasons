import React, { useState } from 'react'
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  FormController,
  FormControlLabel,
  Checkbox,
  FormHelperText,
  Grid,
  Box,
  Typography,
  Container
} from '@mui/material'
import { createTheme, ThemeProvider } from '@mui/material/styles'

const signup = () => {
  const theme = createTheme();
  const [checked, setChcked] = useState(false);

  const handleAgree = (e) => {
    setChcked(e.target.checked)
  }

  const handleSubmit = (e) => {
    e.preventDefault();
  }


  return (
    <div>

    </div>
  )
}

export default signup