import React, { useState, useEffect, useMemo, useRef } from 'react'
import {
  Box,
  Container,
  Grid,
  Paper,
  Typography,
  TextField,
  Button,
  InputAdornment,
  Snackbar,
  Alert,
  Card,
  CardContent,
  Link,
} from '@mui/material'
import { styled, createTheme, ThemeProvider } from '@mui/material/styles'
import {
  Mail,
  Phone,
  Send,
  Message,
  Person,
  AlternateEmail,
  Description,
  Schedule,
  CheckCircle,
  Business,
  ExpandMore,
  Search,
} from '@mui/icons-material'
// import { useAuth } from '../../context/AuthContext'
// import apiService from '../../services/ApiService'

// import countries from '../../countryData.json'
const countries = []

// Custom theme to match the original colors
const theme = createTheme({
  palette: {
    primary: {
      main: '#ffda1b', // gcc-gold
      contrastText: '#23252a', // gcc-dark
    },
    secondary: {
      main: '#23252a', // gcc-dark
      contrastText: '#ffffff',
    },
    background: {
      default: '#f9fafb',
      paper: '#ffffff',
    },
    text: {
      primary: '#1e293b', // slate-900
      secondary: '#64748b', // slate-500
    },
    grey: {
      50: '#f8fafc',
      100: '#f1f5f9',
      200: '#e2e8f0',
      300: '#cbd5e1',
      400: '#94a3b8',
      500: '#64748b',
      600: '#475569',
      700: '#334155',
      800: '#1e293b',
      900: '#0f172a',
    },
  },
  typography: {
    fontFamily: 'Inter, sans-serif',
    h1: {
      fontSize: '3rem',
      fontWeight: 'bold',
      '@media (max-width:600px)': {
        fontSize: '2rem',
      },
    },
    h2: {
      fontSize: '2.25rem',
      fontWeight: 'bold',
      '@media (max-width:600px)': {
        fontSize: '1.875rem',
      },
    },
    h3: {
      fontSize: '1.5rem',
      fontWeight: 'bold',
      '@media (max-width:600px)': {
        fontSize: '1.25rem',
      },
    },
  },
  shape: {
    borderRadius: 12,
  },
})

// Styled components to match Tailwind styles
const HeroSection = styled(Box)(({ theme }) => ({
  background: `linear-gradient(135deg, #23252a 0%, #374151 100%)`,
  color: 'white',
  padding: theme.spacing(12, 0),
  [theme.breakpoints.down('md')]: {
    padding: theme.spacing(8, 0),
  },
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(6, 0),
  },
}))

const GoldDivider = styled(Box)(({ theme }) => ({
  width: '64px',
  height: '4px',
  backgroundColor: '#ffda1b',
  margin: '0 auto',
  marginBottom: theme.spacing(4),
  [theme.breakpoints.down('sm')]: {
    width: '48px',
    marginBottom: theme.spacing(3),
  },
}))

const ContactCard = styled(Card)(({ theme }) => ({
  height: '100%',
  padding: theme.spacing(3),
  textAlign: 'center',
  border: '1px solid #e2e8f0',
  backgroundColor: '#fafafa',
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: theme.shadows[8],
  },
  [theme.breakpoints.up('sm')]: {
    padding: theme.spacing(4),
  },
}))

const FormContainer = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  backgroundColor: '#fafafa',
  border: '1px solid #f1f5f9',
  borderRadius: theme.spacing(2),
  [theme.breakpoints.up('sm')]: {
    padding: theme.spacing(4),
  },
}))

const StyledTextField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    backgroundColor: 'white',
    '& fieldset': {
      borderColor: '#e2e8f0',
    },
    '&:hover fieldset': {
      borderColor: '#1e293b',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#ffda1b',
      borderWidth: '2px',
    },
  },
  '& .MuiInputLabel-root.Mui-focused': {
    color: '#ffda1b',
  },
}))

const SubmitButton = styled(Button)(({ theme }) => ({
  padding: theme.spacing(1.5, 3),
  borderRadius: theme.spacing(1.5),
  fontSize: '1rem',
  fontWeight: 600,
  textTransform: 'none',
  transition: 'all 0.3s ease',
  backgroundColor: '#1e293b',
  color: 'white',
  '&:hover': {
    backgroundColor: '#ffda1b',
    color: '#1e293b',
  },
  '&:disabled': {
    opacity: 0.5,
  },
  [theme.breakpoints.up('sm')]: {
    padding: theme.spacing(2, 4),
    fontSize: '1.125rem',
  },
}))

const InfoCard = styled(Box)(({ theme }) => ({
  backgroundColor: 'rgba(15, 23, 42, 0.05)',
  backdropFilter: 'blur(4px)',
  borderRadius: theme.spacing(1.5),
  padding: theme.spacing(2),
  border: '1px solid rgba(226, 232, 240, 0.5)',
  transition: 'all 0.3s ease',
  cursor: 'pointer',
  '&:hover': {
    backgroundColor: 'rgba(15, 23, 42, 0.1)',
    transform: 'translateY(-2px)',
    boxShadow: theme.shadows[4],
  },
}))

// Flag component using CDN API
const FlagIcon = ({ countryCode, size = 16 }) => {
  return (
    <img
      src={`https://flagcdn.com/${size}x${Math.round(
        size * 0.75
      )}/${countryCode.toLowerCase()}.png`}
      alt={`${countryCode} flag`}
      style={{
        width: size,
        height: Math.round(size * 0.75),
        display: 'inline-block',
        borderRadius: '2px',
      }}
      onError={(e) => {
        e.target.style.display = 'none'
      }}
    />
  )
}

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    subject: '',
    message: '',
  })
  const [selectedCountry, setSelectedCountry] = useState(countries[0])
  const [showCountryDropdown, setShowCountryDropdown] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [loading, setLoading] = useState(false)
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    type: 'success',
  })
// const { user, isAuthenticated } = useAuth()
  const user = null
  const isAuthenticated = false

  const dropdownRef = useRef(null)
  const buttonRef = useRef(null)

  // Memoized filtered countries for performance
  const filteredCountries = useMemo(() => {
    if (!searchTerm) return countries

    return countries.filter(
      (country) =>
        country.label.toLowerCase().includes(searchTerm.toLowerCase()) ||
        country.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
        country.phone.includes(searchTerm)
    )
  }, [searchTerm])
useEffect(() => {
  if (isAuthenticated && user) {
    setFormData((prev) => ({
      ...prev,
      name: user.name || '',
      email: user.email || '',
      phone: user.mobileNumber || '',
    }))
  }
}, [isAuthenticated, user])
  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target)
      ) {
        setShowCountryDropdown(false)
        setSearchTerm('')
      }
    }

    if (showCountryDropdown) {
      document.addEventListener('mousedown', handleClickOutside)
      document.addEventListener('touchstart', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('touchstart', handleClickOutside)
    }
  }, [showCountryDropdown])

  // Auto-detect user's country on component mount
  useEffect(() => {
    const detectUserCountry = async () => {
      try {
        const response = await fetch('https://ipapi.co/json/')
        const data = await response.json()
        if (data.country_code) {
          const foundCountry = countries.find(
            (country) => country.code === data.country_code.toUpperCase()
          )
          if (foundCountry) {
            setSelectedCountry(foundCountry)
          }
        }
      } catch (error) {
        // console.log('Could not detect country, using default')
      }
    }

    detectUserCountry()
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prevState) => ({ ...prevState, [name]: value }))
  }

  const handleCountrySelect = (country) => {
    setSelectedCountry(country)
    setShowCountryDropdown(false)
    setSearchTerm('')
    setFormData((prev) => ({ ...prev, phone: '' }))
  }

  const handleSnackbarClose = () => {
    setSnackbar({ ...snackbar, open: false })
  }

  const showSnackbar = (message, type = 'success') => {
    setSnackbar({
      open: true,
      message,
      type,
    })
    setTimeout(() => {
      setSnackbar({ ...snackbar, open: false })
    }, 5000)
  }

const handleSubmit = async (e) => {
  e.preventDefault()
  setLoading(true)

  if (!formData.name?.trim()) {
    showSnackbar('Please enter your full name', 'error')
    setLoading(false)
    return
  }

  if (!formData.email?.trim()) {
    showSnackbar('Please enter your email address', 'error')
    setLoading(false)
    return
  }

  if (!formData.message?.trim()) {
    showSnackbar('Please enter your message', 'error')
    setLoading(false)
    return
  }

  if (formData.name.trim().length < 2) {
    showSnackbar('Name must be at least 2 characters long', 'error')
    setLoading(false)
    return
  }

  if (formData.subject?.trim() && formData.subject.trim().length < 5) {
    showSnackbar(
      'If you provide a subject, it must be at least 5 characters long',
      'error'
    )
    setLoading(false)
    return
  }

  if (formData.message.trim().length < 10) {
    showSnackbar('Message must be at least 10 characters long', 'error')
    setLoading(false)
    return
  }

  const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/
  if (!emailRegex.test(formData.email.trim())) {
    showSnackbar('Please enter a valid email address', 'error')
    setLoading(false)
    return
  }

  try {
    let phoneWithCountryCode = null
    if (formData.phone?.trim()) {
      phoneWithCountryCode = `${selectedCountry.phone}${formData.phone.trim()}`
    }

    const contactUsFormPayload = {
      name: formData.name.trim(),
      email: formData.email.trim(),
      phone: phoneWithCountryCode,
      subject: formData.subject?.trim() || null,
      message: formData.message.trim(),
      // userId: user ? user.id : null, // Add user ID if available for backend tracking
    }

    if (!contactUsFormPayload) {
      throw new Error('Invalid contact form payload')
    }

    setFormData({
      name: '',
      phone: '',
      email: '',
      subject: '',
      message: '',
    })

    showSnackbar(
      'Thank you for your message! Our team will get in touch with you soon.',
      'success'
    )
    setLoading(false)
  } catch (error) {
    console.error('Error submitting contact us form:', error)

    // Enhanced error handling using ApiService error structure
    let errorMessage = 'Failed to submit contact form. Please try again.'

    if (error.userMessage) {
      errorMessage = error.userMessage
    } else if (error.response) {
      const status = error.response.status
      if (status === 400) {
        errorMessage = 'Please check that all fields are filled correctly.'
      } else if (status === 500) {
        errorMessage = 'Server error. Please try again later.'
      }
    } else if (
      error.code === 'NETWORK_ERROR' ||
      error.message.includes('Network Error')
    ) {
      errorMessage =
        'Network error. Please check your connection and try again.'
    }

    showSnackbar(errorMessage, 'error')
    setLoading(false)
  }
}
  const contactInfo = [
    {
      icon: <Mail sx={{ fontSize: 24 }} />,
      title: 'Email Us',
      info: 'support@gcctaxlaws.com',
      description: 'Send us an email anytime',
      link: 'mailto:support@gcctaxlaws.com',
    },
    {
      icon: <Schedule sx={{ fontSize: 24 }} />,
      title: 'Response Time',
      info: '24-48 hours',
      description: "We'll get back to you quickly",
      link: null,
    },
    {
      icon: <Business sx={{ fontSize: 24 }} />,
      title: 'Business Inquiries',
      info: 'Partnerships & Collaborations',
      description: "Let's work together",
      link: null,
    },
  ]

  const formFields = [
    {
      name: 'name',
      type: 'text',
      label: 'Full Name',
      icon: <Person />,
      required: true,
      placeholder: 'Enter your full name',
      minLength: 2,
    },
    {
      name: 'email',
      type: 'email',
      label: 'Email Address',
      icon: <AlternateEmail />,
      required: true,
      placeholder: 'Enter your email address',
    },
    {
      name: 'subject',
      type: 'text',
      label: 'Subject',
      icon: <Description />,
      required: false,
      placeholder: "What's this about? (optional)",
    },
  ]

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          minHeight: '100vh',
          backgroundColor: 'background.default',
        }}
      >
        {/* Hero Section */}
        <HeroSection>
          <Container maxWidth='lg'>
            <Box sx={{ textAlign: 'center' }}>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  mb: 3,
                  '@media (max-width:600px)': { mb: 2 },
                }}
              >
                <Box
                  sx={{
                    borderRadius: '100%',
                    backgroundColor: 'rgba(255, 218, 27, 0.2)',
                    p: { xs: 2, sm: 3 },
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <Message
                    sx={{
                      fontSize: { xs: 32, sm: 48 },
                      color: '#ffda1b',
                    }}
                  />
                </Box>
              </Box>
              <Typography variant='h1' sx={{ mb: 3, color: 'white' }}>
                Contact Us
              </Typography>
              <GoldDivider />
              <Typography
                variant='h6'
                sx={{
                  color: '#e2e8f0',
                  maxWidth: '900px',
                  mx: 'auto',
                  lineHeight: 1.6,
                  px: 2,
                }}
              >
                Have questions, suggestions, or business inquiries? We'd love to
                hear from you. Our team is here to help you navigate GCC tax
                laws and regulations.
              </Typography>
            </Box>
          </Container>
        </HeroSection>

        {/* Contact Info Cards */}
        <Box sx={{ backgroundColor: '#f1f5f9', py: { xs: 6, sm: 8, md: 12 } }}>
          <Container maxWidth='lg'>
            <Grid container spacing={{ xs: 3, sm: 4 }}>
              {contactInfo.map((info, index) => (
                <Grid item xs={12} md={4} key={index}>
                  <ContactCard>
                    <CardContent>
                      <Box
                        sx={{
                          width: { xs: 40, sm: 56 }, // Reduced from 80
                          height: { xs: 40, sm: 56 },
                          borderRadius: '50%',
                          backgroundColor: 'rgba(255, 218, 27, 0.1)',
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                          mx: 'auto',
                          mb: { xs: 2, sm: 3 },
                        }}
                      >
                        <Box
                          sx={{
                            color: '#ffda1b',
                            fontSize: { xs: 24, sm: 36 },
                          }}
                        >
                          {info.icon}
                        </Box>
                      </Box>
                      <Typography
                        variant='h6'
                        sx={{
                          fontWeight: 'bold',
                          color: 'text.primary',
                          mb: 1,
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}
                      >
                        {info.title}
                      </Typography>
                      {info.link ? (
                        <Link
                          href={info.link}
                          sx={{
                            color: '#ffda1b',
                            textDecoration: 'none',
                            fontWeight: 600,
                            fontSize: '1rem',
                            '&:hover': {
                              color: 'text.primary',
                            },
                          }}
                        >
                          {info.info}
                        </Link>
                      ) : (
                        <Typography
                          sx={{
                            color: '#ffda1b',
                            fontWeight: 600,
                            fontSize: '1rem',
                            mb: 1,
                          }}
                        >
                          {info.info}
                        </Typography>
                      )}
                      <Typography
                        variant='body2'
                        sx={{ color: 'text.secondary' }}
                      >
                        {info.description}
                      </Typography>
                    </CardContent>
                  </ContactCard>
                </Grid>
              ))}
            </Grid>
          </Container>
        </Box>

        {/* Main Contact Form Section */}
        <Box sx={{ backgroundColor: 'white', py: { xs: 6, sm: 8, md: 12 } }}>
          <Container maxWidth='lg'>
            <Grid container spacing={{ xs: 4, lg: 8 }} alignItems='flex-start'>
              {/* Left Column - Info */}
              <Grid item xs={12} lg={6} sx={{ order: { xs: 2, lg: 1 } }}>
                <Typography variant='h2' sx={{ mb: { xs: 2, sm: 3 } }}>
                  Let's Start a Conversation
                </Typography>
                <GoldDivider sx={{ mx: 0, mb: { xs: 3, sm: 4 } }} />

                <Box sx={{ mb: { xs: 3, sm: 4 } }}>
                  <Typography
                    variant='body1'
                    sx={{
                      color: 'text.secondary',
                      lineHeight: 1.6,
                      mb: 3,
                    }}
                  >
                    Whether you're a tax professional, business owner, student,
                    or researcher, we're here to support your journey with GCC
                    tax regulations.
                  </Typography>

                  <Box sx={{ mb: 4 }}>
                    {[
                      'Questions about tax laws and regulations',
                      'Technical support and platform feedback',
                      'Partnership and collaboration opportunities',
                      'Feature requests and suggestions',
                    ].map((item, index) => (
                      <Box
                        key={index}
                        sx={{ display: 'flex', alignItems: 'center', mb: 2 }}
                      >
                        <CheckCircle
                          sx={{ color: 'green', mr: 2, fontSize: 25 }}
                        />
                        <Typography
                          variant='body2'
                          sx={{ color: 'text.secondary' }}
                        >
                          {item}
                        </Typography>
                      </Box>
                    ))}
                  </Box>
                </Box>

                {/* Contact Information Cards */}
                <Box sx={{ space: 2, mb: { xs: 3, sm: 4 } }}>
                  {/* Location Card */}
                  {/* <InfoCard sx={{ mb: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Box
                        sx={{
                          width: 40, // Equal width and height
                          height: 40,
                          borderRadius: '50%', // Ensures circular shape
                          backgroundColor: 'rgba(255, 218, 27, 0.1)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          mr: 2,
                        }}
                      >
                        <LocationOn sx={{ color: '#ffda1b', fontSize: 20 }} />
                      </Box>
                      <Box>
                        <Typography
                          variant='subtitle2'
                          sx={{ fontWeight: 600 }}
                        >
                          Our Location
                        </Typography>
                        <Typography
                          variant='caption'
                          sx={{ color: 'text.secondary' }}
                        >
                          Dubai, United Arab Emirates
                        </Typography>
                      </Box>
                    </Box>
                  </InfoCard> */}

                  {/* Email Card */}
                  <InfoCard sx={{ mb: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Box
                        sx={{
                          width: 40, // Equal width and height
                          height: 40,
                          borderRadius: '50%', // Ensures circular shape
                          backgroundColor: 'rgba(255, 218, 27, 0.1)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          mr: 2,
                        }}
                      >
                        <Mail sx={{ color: '#ffda1b', fontSize: 20 }} />
                      </Box>
                      <Box>
                        <Typography
                          variant='subtitle2'
                          sx={{ fontWeight: 600 }}
                        >
                          Email Us
                        </Typography>
                        <Link
                          href='mailto:support@gcctaxlaws.com'
                          sx={{
                            color: '#000',
                            textDecoration: 'none',
                            fontSize: '0.875rem',
                          }}
                        >
                          support@gcctaxlaws.com
                        </Link>
                      </Box>
                    </Box>
                  </InfoCard>

                  {/* Phone Card */}
                  {/* <InfoCard sx={{ mb: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Box
                        sx={{
                          width: 40, // Equal width and height
                          height: 40,
                          borderRadius: '50%', // Ensures circular shape
                          backgroundColor: 'rgba(255, 218, 27, 0.1)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          mr: 2,
                        }}
                      >
                        <Phone sx={{ color: '#ffda1b', fontSize: 20 }} />
                      </Box>
                      <Box>
                        <Typography
                          variant='subtitle2'
                          sx={{ fontWeight: 600 }}
                        >
                          Call Us
                        </Typography>
                        <Typography
                          variant='caption'
                          sx={{ color: 'text.secondary' }}
                        >
                          +971 4 XXX XXXX
                        </Typography>
                      </Box>
                    </Box>
                  </InfoCard> */}

                  {/* Connect Card */}
                  <Box
                    sx={{
                      backgroundColor: 'rgba(255, 218, 27, 0.05)',
                      border: '1px dashed rgba(255, 218, 27, 0.2)',
                      borderRadius: 2,
                      p: 2,
                    }}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
                      <Box
                        sx={{
                          p: 1,

                          width: 40, // Equal width and height
                          height: 40,
                          borderRadius: '50%', // Ensures circular shape
                          backgroundColor: 'rgba(255, 218, 27, 0.1)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          mr: 2,
                        }}
                      >
                        <Business sx={{ color: '#ffda1b', fontSize: 20 }} />
                      </Box>
                      <Box>
                        <Typography
                          variant='subtitle2'
                          sx={{
                            fontWeight: 600,

                            mb: 0.5,
                          }}
                        >
                          Connect with Us
                        </Typography>
                        <Typography
                          variant='caption'
                          sx={{
                            color: 'text.primary',
                            lineHeight: 1.4,
                          }}
                        >
                          Join our community of tax professionals and
                          enthusiasts to stay updated with the latest tax
                          regulations and insights.
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                </Box>
              </Grid>

              {/* Right Column - Form */}
              <Grid item xs={12} lg={6} sx={{ order: { xs: 1, lg: 2 } }}>
                <FormContainer>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      mb: { xs: 3, sm: 4 },
                    }}
                  >
                    <Box
                      sx={{
                        backgroundColor: 'rgba(255, 218, 27, 0.1)',
                        p: { xs: 1, sm: 1.5 },
                        borderRadius: 1.5,
                        mr: { xs: 2, sm: 3 },
                      }}
                    >
                      <Send
                        sx={{
                          fontSize: { xs: 20, sm: 24 },
                          color: '#ffda1b',
                        }}
                      />
                    </Box>
                    <Typography variant='h5' sx={{ fontWeight: 'bold' }}>
                      Send us a Message
                    </Typography>
                  </Box>

                  <form onSubmit={handleSubmit}>
                    <Box sx={{ space: { xs: 2, sm: 3 } }}>
                      {/* Form Fields */}
                      {formFields.map((field, index) => (
                        <StyledTextField
                          key={index}
                          fullWidth
                          name={field.name}
                          label={`${field.label}${
                            field.required ? ' ' : ' (Optional)'
                          }`}
                          type={field.type}
                          value={formData[field.name]}
                          onChange={handleChange}
                          required={field.required}
                          placeholder={field.placeholder}
                          inputProps={{ minLength: field.minLength }}
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position='start'>
                                <Box sx={{ color: 'text.secondary' }}>
                                  {field.icon}
                                </Box>
                              </InputAdornment>
                            ),
                          }}
                          sx={{ mb: { xs: 2, sm: 3 } }}
                        />
                      ))}

                      {/* Phone Number Field with Country Selector */}
                      <Box sx={{ position: 'relative', mb: { xs: 2, sm: 3 } }}>
                        <StyledTextField
                          fullWidth
                          name='phone'
                          label='Phone Number (Optional)'
                          type='tel'
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder='Enter your phone number'
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position='start'>
                                <Box
                                  sx={{ display: 'flex', alignItems: 'center' }}
                                >
                                  <Phone
                                    sx={{ color: 'text.secondary', mr: 1 }}
                                  />
                                  <Button
                                    ref={buttonRef}
                                    size='small'
                                    onClick={() =>
                                      setShowCountryDropdown(
                                        !showCountryDropdown,
                                      )
                                    }
                                    sx={{
                                      minWidth: 'auto',
                                      p: 0.5,
                                      backgroundColor: 'white',
                                      border: '1px solid #e2e8f0',
                                      borderRadius: 1,
                                      '&:hover': {
                                        backgroundColor: '#f8fafc',
                                      },
                                    }}
                                  >
                                    <Box
                                      sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: 0.5,
                                      }}
                                    >
                                      <FlagIcon
                                        countryCode={selectedCountry.code}
                                        size={16}
                                      />
                                      <Typography
                                        variant='caption'
                                        sx={{ fontWeight: 600, mx: 0.5 }}
                                      >
                                        {selectedCountry.phone}
                                      </Typography>
                                      <ExpandMore sx={{ fontSize: 12 }} />
                                    </Box>
                                  </Button>
                                </Box>
                              </InputAdornment>
                            ),
                          }}
                        />

                        {/* Country Dropdown */}
                        {showCountryDropdown && (
                          <Paper
                            ref={dropdownRef}
                            sx={{
                              position: 'absolute',
                              top: '100%',
                              left: 0,
                              mt: 0.5,
                              width: 240,
                              maxHeight: 240,
                              overflow: 'hidden',
                              zIndex: 1000,
                              border: '1px solid #e2e8f0',
                            }}
                          >
                            {/* Search Input */}
                            <Box
                              sx={{ p: 1, borderBottom: '1px solid #e2e8f0' }}
                            >
                              <TextField
                                size='small'
                                fullWidth
                                placeholder='Search countries...'
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                autoFocus
                                InputProps={{
                                  startAdornment: (
                                    <InputAdornment position='start'>
                                      <Search sx={{ fontSize: 16 }} />
                                    </InputAdornment>
                                  ),
                                }}
                              />
                            </Box>

                            {/* Countries List */}
                            <Box sx={{ maxHeight: 192, overflowY: 'auto' }}>
                              {filteredCountries.length > 0 ? (
                                filteredCountries.map((country) => (
                                  <Box
                                    key={country.code}
                                    onClick={() => handleCountrySelect(country)}
                                    sx={{
                                      display: 'flex',
                                      alignItems: 'center',
                                      p: 1.5,
                                      cursor: 'pointer',
                                      backgroundColor:
                                        selectedCountry.code === country.code
                                          ? 'rgba(255, 218, 27, 0.1)'
                                          : 'transparent',
                                      color:
                                        selectedCountry.code === country.code
                                          ? '#d97706'
                                          : 'text.primary',
                                      '&:hover': {
                                        backgroundColor: '#f8fafc',
                                      },
                                    }}
                                  >
                                    <FlagIcon
                                      countryCode={country.code}
                                      size={16}
                                    />
                                    <Typography
                                      variant='body2'
                                      sx={{ fontWeight: 600, mx: 1 }}
                                    >
                                      {country.phone}
                                    </Typography>
                                    <Typography
                                      variant='body2'
                                      sx={{
                                        color: 'text.secondary',
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis',
                                        whiteSpace: 'nowrap',
                                        flex: 1,
                                      }}
                                    >
                                      {country.label}
                                    </Typography>
                                  </Box>
                                ))
                              ) : (
                                <Box sx={{ p: 2, textAlign: 'center' }}>
                                  <Typography
                                    variant='body2'
                                    sx={{ color: 'text.secondary' }}
                                  >
                                    No countries found
                                  </Typography>
                                </Box>
                              )}
                            </Box>
                          </Paper>
                        )}
                      </Box>

                      {/* Message Field */}
                      <StyledTextField
                        fullWidth
                        name='message'
                        label='Your Message'
                        multiline
                        rows={4}
                        value={formData.message}
                        onChange={handleChange}
                        required
                        placeholder='Enter your message (min 10 characters)'
                        inputProps={{ minLength: 10 }}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment
                              position='start'
                              sx={{ alignSelf: 'flex-start', mt: 2 }}
                            >
                              <Message sx={{ color: 'text.secondary' }} />
                            </InputAdornment>
                          ),
                        }}
                        sx={{ mb: 3 }}
                      />

                      {/* Submit Button */}
                      <SubmitButton
                        type='submit'
                        fullWidth
                        disabled={loading}
                        startIcon={
                          loading ? (
                            <Box
                              sx={{
                                width: 16,
                                height: 16,
                                border: '2px solid',
                                borderColor: 'currentColor',
                                borderTopColor: 'transparent',
                                borderRadius: '100%',
                                animation: 'spin 1s linear infinite',
                                '@keyframes spin': {
                                  '0%': { transform: 'rotate(0deg)' },
                                  '100%': { transform: 'rotate(360deg)' },
                                },
                              }}
                            />
                          ) : (
                            <Send />
                          )
                        }
                      >
                        {loading ? 'Sending Message...' : 'Send Message'}
                      </SubmitButton>

                      {/* Privacy Note */}
                      <Box
                        sx={{
                          backgroundColor: '#eff6ff',
                          border: '1px solid #bfdbfe',
                          borderRadius: 2,
                          p: { xs: 2, sm: 3 },
                          mt: 3,
                        }}
                      >
                        <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
                          <Box
                            sx={{
                              // backgroundColor: '#dbeafe',
                              p: 0.5,
                              borderRadius: '100%',
                              mr: 2,
                              mt: 0.5,
                              width: 40, // Equal width and height
                              height: 40,
                              // Ensures circular shape

                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                            }}
                          >
                            <CheckCircle
                              sx={{ fontSize: 16, color: '#2563eb' }}
                            />
                          </Box>
                          <Box>
                            <Typography
                              variant='subtitle2'
                              sx={{
                                color: '#1e40af',
                                fontWeight: 600,
                                mb: 0.5,
                              }}
                            >
                              Your Privacy Matters
                            </Typography>
                            <Typography
                              variant='caption'
                              sx={{
                                color: '#1d4ed8',
                                lineHeight: 1.4,
                              }}
                            >
                              We respect your privacy and will never share your
                              information with third parties. All communications
                              are confidential and secure.
                            </Typography>
                          </Box>
                        </Box>
                      </Box>

                      {/* Required Fields Note */}
                      <Box sx={{ textAlign: 'center', mt: 2 }}>
                        <Typography
                          variant='caption'
                          sx={{ color: 'text.secondary' }}
                        >
                          <Box component='span' sx={{ color: 'error.main' }}>
                            *
                          </Box>{' '}
                          Required fields
                        </Typography>
                      </Box>
                    </Box>
                  </form>
                </FormContainer>
              </Grid>
            </Grid>
          </Container>
        </Box>

        {/* Snackbar Notification */}
        <Snackbar
          open={snackbar.open}
          autoHideDuration={5000}
          onClose={handleSnackbarClose}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        >
          <Alert
            onClose={handleSnackbarClose}
            severity={snackbar.type}
            variant='filled'
            sx={{
              width: '100%',
              borderRadius: 2,
              '& .MuiAlert-icon': {
                fontSize: 20,
              },
            }}
          >
            {snackbar.message}
          </Alert>
        </Snackbar>
      </Box>
    </ThemeProvider>
  )
}

export default ContactUs
