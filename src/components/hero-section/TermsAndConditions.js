import React from 'react'
import {
  Box,
  Container,
  Grid,
  Typography,
  Button,
  Paper,
  Alert,
  Link,
} from '@mui/material'
import { styled, createTheme, ThemeProvider } from '@mui/material/styles'
import {
  Balance,
  Description,
  Security,
  People,
  Warning,
  Email,
  Event,
  Launch,
  Lock,
  Visibility,
  Cookie,
  VerifiedUser,
  Settings,
  Message,
  Public,
  FlashOn,
  Notifications,
  CreditCard,
  Block,
} from '@mui/icons-material'

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
      default: '#f3f4f6',
      paper: '#ffffff',
    },
    text: {
      primary: '#23252a', // gcc-dark
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
      '@media (max-width:768px)': {
        fontSize: '2rem',
      },
      '@media (max-width:600px)': {
        fontSize: '1.875rem',
      },
    },
    h2: {
      fontSize: '1.5rem',
      fontWeight: 'bold',
      '@media (max-width:600px)': {
        fontSize: '1.25rem',
      },
    },
    h3: {
      fontSize: '1.125rem',
      fontWeight: 600,
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
  padding: theme.spacing(6, 0),
  [theme.breakpoints.up('sm')]: {
    padding: theme.spacing(8, 0),
  },
  [theme.breakpoints.up('lg')]: {
    padding: theme.spacing(10, 0),
  },
}))

const ContactSection = styled(Box)(({ theme }) => ({
  background: `linear-gradient(90deg, #23252a 0%, #374151 100%)`,
  borderRadius: theme.spacing(1.5),
  padding: theme.spacing(3),
  color: 'white',
  marginTop: theme.spacing(6),
  [theme.breakpoints.up('sm')]: {
    borderRadius: theme.spacing(2),
    padding: theme.spacing(4),
    marginTop: theme.spacing(8),
  },
}))

const GoldDivider = styled(Box)(({ theme }) => ({
  width: '64px',
  height: '4px',
  backgroundColor: '#ffda1b',
  margin: '0 auto',
  marginBottom: theme.spacing(3),
  [theme.breakpoints.up('sm')]: {
    width: '96px',
    marginBottom: theme.spacing(4),
  },
}))

const NavigationButton = styled(Button)(({ theme }) => ({
  padding: theme.spacing(1.5),
  borderRadius: theme.spacing(1.5),
  textTransform: 'none',
  justifyContent: 'flex-start',
  backgroundColor: 'white',
  color: '#23252a',
  border: '1px solid #e5e7eb',
  boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
    backgroundColor: 'white',
    borderColor: 'rgba(255, 218, 27, 0.3)',
    '& .nav-icon-container': {
      backgroundColor: 'rgba(255, 218, 27, 0.2)',
    },
    '& .nav-text': {
      color: '#ffda1b',
    },
  },
}))

const IconContainer = styled(Box)(({ theme }) => ({
  backgroundColor: 'rgba(255, 218, 27, 0.1)',
  padding: theme.spacing(1),
  borderRadius: theme.spacing(1),
  marginRight: theme.spacing(1.5),
  display: 'flex',
  alignItems: 'center',
  width: 40, // fixed width in px
  height: 40,
  justifyContent: 'center',
  transition: 'background-color 0.3s ease',
  [theme.breakpoints.up('sm')]: {
    padding: theme.spacing(1.5),
    marginRight: theme.spacing(2),
    width: 40, // fixed width in px
    height: 40,
  },
}))

const SectionContainer = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(4),
  [theme.breakpoints.up('sm')]: {
    marginBottom: theme.spacing(6),
  },
}))

const SectionHeader = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  marginBottom: theme.spacing(2),
  [theme.breakpoints.up('sm')]: {
    marginBottom: theme.spacing(3),
  },
}))

const ContentBox = styled(Paper)(({ theme }) => ({
  backgroundColor: '#f3f4f6',
  boxShadow: 'none',
  borderRadius: theme.spacing(1.5),
  padding: theme.spacing(2),
  borderLeft: '4px solid #ffda1b',
  marginBottom: theme.spacing(1.5),
}))

const TermsAndConditions = () => {
  const sections = [
    {
      id: 'nature-content',
      title: 'Nature of Content',
      icon: <Description sx={{ fontSize: 16 }} />,
    },
    {
      id: 'disclaimer',
      title: 'Disclaimer of Warranty',
      icon: <Warning sx={{ fontSize: 16 }} />,
    },
    {
      id: 'use-website',
      title: 'Use of the Website',
      icon: <People sx={{ fontSize: 16 }} />,
    },
    {
      id: 'no-legal-advice',
      title: 'No Legal Advice',
      icon: <Balance sx={{ fontSize: 16 }} />,
    },
    {
      id: 'limitation-liability',
      title: 'Limitation of Liability',
      icon: <Security sx={{ fontSize: 16 }} />,
    },
    {
      id: 'indemnification',
      title: 'Indemnification',
      icon: <VerifiedUser sx={{ fontSize: 16 }} />,
    },
    {
      id: 'compliance',
      title: 'Compliance with GCC Laws',
      icon: <Public sx={{ fontSize: 16 }} />,
    },
    {
      id: 'changes-terms',
      title: 'Changes to Terms',
      icon: <Settings sx={{ fontSize: 16 }} />,
    },
    {
      id: 'governing-law',
      title: 'Governing Law',
      icon: <Balance sx={{ fontSize: 16 }} />,
    },
    {
      id: 'severability',
      title: 'Severability',
      icon: <Description sx={{ fontSize: 16 }} />,
    },
    {
      id: 'entire-agreement',
      title: 'Entire Agreement',
      icon: <Description sx={{ fontSize: 16 }} />,
    },
    {
      id: 'privacy-policy',
      title: 'Privacy Policy',
      icon: <Visibility sx={{ fontSize: 16 }} />,
    },
    {
      id: 'termination',
      title: 'Termination of Use',
      icon: <Block sx={{ fontSize: 16 }} />,
    },
    {
      id: 'user-content',
      title: 'User-Generated Content',
      icon: <Message sx={{ fontSize: 16 }} />,
    },
    {
      id: 'third-party',
      title: 'Third-Party Links',
      icon: <Launch sx={{ fontSize: 16 }} />,
    },
    {
      id: 'cookies',
      title: 'Cookies and Tracking',
      icon: <Cookie sx={{ fontSize: 16 }} />,
    },
    {
      id: 'modification',
      title: 'Modification of Content',
      icon: <Settings sx={{ fontSize: 16 }} />,
    },
    {
      id: 'feedback',
      title: 'Feedback and Suggestions',
      icon: <Message sx={{ fontSize: 16 }} />,
    },
    {
      id: 'user-account',
      title: 'User Account and Security',
      icon: <Lock sx={{ fontSize: 16 }} />,
    },
    {
      id: 'beta-services',
      title: 'Beta Services',
      icon: <FlashOn sx={{ fontSize: 16 }} />,
    },
    {
      id: 'notices',
      title: 'Notices',
      icon: <Notifications sx={{ fontSize: 16 }} />,
    },
    {
      id: 'advertising',
      title: 'Advertising and Promotions',
      icon: <CreditCard sx={{ fontSize: 16 }} />,
    },
    {
      id: 'prohibited-activities',
      title: 'Prohibited Activities',
      icon: <Block sx={{ fontSize: 16 }} />,
    },
    {
      id: 'contact',
      title: 'Contact Information',
      icon: <Email sx={{ fontSize: 16 }} />,
    },
  ]

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ minHeight: '100vh', backgroundColor: 'background.default' }}>
        {/* Hero Section */}
        <HeroSection>
          <Container maxWidth='lg'>
            <Box sx={{ textAlign: 'center' }}>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  mb: 3,
                }}
              >
                <Box
                  sx={{
                    backgroundColor: 'rgba(255, 218, 27, 0.2)',
                    p: { xs: 1.5, sm: 2 },
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Balance
                    sx={{
                      fontSize: { xs: 32, sm: 48 },
                      color: '#ffda1b',
                    }}
                  />
                </Box>
              </Box>
              <Typography
                variant='h1'
                sx={{
                  mb: 3,
                  fontSize: {
                    xs: '1.875rem',
                    sm: '2.5rem',
                    md: '3rem',
                    lg: '3.75rem',
                  },
                }}
              >
                Terms and Conditions
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
                  fontSize: { xs: '1.125rem', sm: '1.25rem' },
                }}
              >
                Welcome to GCCTaxLaws.com. These Terms and Conditions govern
                your access to and use of the Website, which provides access to
                tax laws and related information in the GCC region.
              </Typography>
            </Box>
          </Container>
        </HeroSection>

        {/* Important Notice */}
        <Box
          sx={{
            backgroundColor: '#fef2f2',
            py: { xs: 3, sm: 4 },
            borderLeft: '4px solid #ef4444',
          }}
        >
          <Container maxWidth='lg'>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: { xs: 1.5, sm: 2 },
              }}
            >
              <Box
                sx={{
                  backgroundColor: '#fecaca',
                  p: { xs: 1, sm: 1.5 },
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Warning
                  sx={{
                    fontSize: { xs: 20, sm: 24 },
                    color: '#dc2626',
                  }}
                />
              </Box>
              <Box>
                <Typography
                  variant='h6'
                  sx={{
                    color: '#991b1b',
                    fontWeight: 'bold',
                    mb: 1,
                    fontSize: { xs: '1.125rem', sm: '1.25rem' },
                  }}
                >
                  Binding Agreement
                </Typography>
                <Typography
                  variant='body2'
                  sx={{
                    color: '#b91c1c',
                    lineHeight: 1.6,
                    fontSize: { xs: '0.875rem', sm: '1rem' },
                  }}
                >
                  By accessing or using the Website, you agree to be bound by
                  these Terms.
                  <Box component='span' sx={{ fontWeight: 'bold' }}>
                    {' '}
                    If you do not agree to these Terms, you must discontinue
                    using the Website immediately.
                  </Box>
                </Typography>
              </Box>
            </Box>
          </Container>
        </Box>

        {/* Table of Contents */}
        <Box sx={{ py: { xs: 4, sm: 6 }, backgroundColor: 'white' }}>
          <Container maxWidth='lg'>
            <Typography
              variant='h4'
              sx={{
                fontWeight: 'bold',
                color: '#23252a',
                mb: { xs: 3, sm: 4 },
                textAlign: 'center',
                fontSize: { xs: '1.25rem', sm: '1.5rem' },
              }}
            >
              Quick Navigation
            </Typography>
            <Grid
              container
              spacing={1.5}
              sx={{
                display: 'grid',
                gridTemplateColumns: {
                  xs: '1fr',
                  sm: 'repeat(2, 1fr)',
                  lg: 'repeat(3, 1fr)',
                  xl: 'repeat(4, 1fr)',
                },
              }}
            >
              {sections.map((section, index) => (
                <Grid item key={index}>
                  <NavigationButton
                    fullWidth
                    onClick={() => scrollToSection(section.id)}
                  >
                    <IconContainer
                      className='nav-icon-container'
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <Box sx={{ fontSize: 24, color: '#ffda1b' }}>
                        {section.icon}
                      </Box>
                    </IconContainer>
                    <Typography
                      className='nav-text'
                      sx={{
                        fontWeight: 'bold',
                        fontSize: '0.875rem',
                        lineHeight: 1.3,
                        textAlign: 'left',
                        transition: 'color 0.3s ease',
                      }}
                    >
                      {section.title}
                    </Typography>
                  </NavigationButton>
                </Grid>
              ))}
            </Grid>
          </Container>
        </Box>

        {/* Main Content */}
        <Box sx={{ backgroundColor: 'white', py: { xs: 6, sm: 8 } }}>
          <Container maxWidth='lg' sx={{ maxWidth: '1000px' }}>
            {/* 1. Nature of Content */}
            <SectionContainer id='nature-content'>
              <SectionHeader>
                <IconContainer
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Description
                    sx={{ fontSize: { xs: 20, sm: 24 }, color: '#ffda1b' }}
                  />
                </IconContainer>
                <Typography
                  variant='h2'
                  sx={{
                    fontSize: { xs: '1.5rem', sm: '1.875rem' },
                    fontWeight: 'bold',
                    mr: 2,
                  }}
                >
                  1.
                </Typography>
                <Typography
                  variant='h2'
                  sx={{
                    fontSize: { xs: '1.5rem', sm: '1.875rem' },
                  }}
                >
                  Nature of Content
                </Typography>
              </SectionHeader>

              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                <ContentBox>
                  <Box
                    sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.5 }}
                  >
                    <Typography
                      sx={{
                        color: '#ffda1b',
                        fontWeight: 'bold',
                        fontSize: '0.875rem',
                        mt: 0.5,
                        minWidth: '1.5rem',
                      }}
                    >
                      a.
                    </Typography>
                    <Typography
                      variant='body2'
                      sx={{ color: 'text.secondary', lineHeight: 1.6 }}
                    >
                      The Website offers access to English translations of GCC
                      tax laws originally enacted in Arabic. These translations
                      are for informational purposes only and do not constitute
                      official or legally binding versions of the laws.
                    </Typography>
                  </Box>
                </ContentBox>
                <ContentBox>
                  <Box
                    sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.5 }}
                  >
                    <Typography
                      sx={{
                        color: '#ffda1b',
                        fontWeight: 'bold',
                        fontSize: '0.875rem',
                        mt: 0.5,
                        minWidth: '1.5rem',
                      }}
                    >
                      b.
                    </Typography>
                    <Typography
                      variant='body2'
                      sx={{ color: 'text.secondary', lineHeight: 1.6 }}
                    >
                      Some translations are those released by the government (to
                      the extent available in the public domain), while others
                      may be privately sourced.
                    </Typography>
                  </Box>
                </ContentBox>
                <ContentBox>
                  <Box
                    sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.5 }}
                  >
                    <Typography
                      sx={{
                        color: '#ffda1b',
                        fontWeight: 'bold',
                        fontSize: '0.875rem',
                        mt: 0.5,
                        minWidth: '1.5rem',
                      }}
                    >
                      c.
                    </Typography>
                    <Typography
                      variant='body2'
                      sx={{ color: 'text.secondary', lineHeight: 1.6 }}
                    >
                      The original Arabic texts of the laws shall always prevail
                      in the event of any discrepancy, inconsistency, or
                      conflict between the Arabic original and the English
                      translation. Users are advised to consult the original
                      Arabic texts for authoritative guidance.
                    </Typography>
                  </Box>
                </ContentBox>
              </Box>
            </SectionContainer>

            {/* 2. Disclaimer of Warranty */}
            <SectionContainer id='disclaimer'>
              <SectionHeader>
                <IconContainer
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Warning
                    sx={{ fontSize: { xs: 20, sm: 24 }, color: '#ffda1b' }}
                  />
                </IconContainer>
                <Typography
                  variant='h2'
                  sx={{
                    fontSize: { xs: '1.5rem', sm: '1.875rem' },
                    fontWeight: 'bold',
                    mr: 2,
                  }}
                >
                  2.
                </Typography>
                <Typography
                  variant='h2'
                  sx={{
                    fontSize: { xs: '1.5rem', sm: '1.875rem' },
                  }}
                >
                  Disclaimer of Warranty
                </Typography>
              </SectionHeader>

              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                <ContentBox>
                  <Box
                    sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.5 }}
                  >
                    <Typography
                      sx={{
                        color: '#ffda1b',
                        fontWeight: 'bold',
                        fontSize: '0.875rem',
                        mt: 0.5,
                        minWidth: '1.5rem',
                      }}
                    >
                      a.
                    </Typography>
                    <Typography
                      variant='body2'
                      sx={{ color: 'text.secondary', lineHeight: 1.6 }}
                    >
                      The Website and its content, including but not limited to
                      the translations provided, are endeavoured to be offered
                      on an "as is", "as available" and "best effort" basis,
                      without any warranties of any kind, either express or
                      implied.
                    </Typography>
                  </Box>
                </ContentBox>
                <ContentBox>
                  <Box
                    sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.5 }}
                  >
                    <Typography
                      sx={{
                        color: '#ffda1b',
                        fontWeight: 'bold',
                        fontSize: '0.875rem',
                        mt: 0.5,
                        minWidth: '1.5rem',
                      }}
                    >
                      b.
                    </Typography>
                    <Typography
                      variant='body2'
                      sx={{ color: 'text.secondary', lineHeight: 1.6 }}
                    >
                      Legal and regulatory changes may occur frequently, and
                      updates to the content on the Website may not always
                      reflect the latest changes in law or practice.
                      GCCTaxLaws.com does not guarantee that the content on the
                      Website, including translations, is complete, accurate,
                      current, or error-free.
                    </Typography>
                  </Box>
                </ContentBox>
                <ContentBox>
                  <Box
                    sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.5 }}
                  >
                    <Typography
                      sx={{
                        color: '#ffda1b',
                        fontWeight: 'bold',
                        fontSize: '0.875rem',
                        mt: 0.5,
                        minWidth: '1.5rem',
                      }}
                    >
                      c.
                    </Typography>
                    <Typography
                      variant='body2'
                      sx={{ color: 'text.secondary', lineHeight: 1.6 }}
                    >
                      Users are solely responsible for cross-verifying the
                      information obtained from the Website with official
                      sources, including consulting original legal texts,
                      government publications, or professional advisors to
                      ensure that no discrepancies exist and that the
                      information is up to date and applicable to their
                      particular situation. GCCTaxLaws.com assumes no liability
                      for any actions taken or decisions made based on the
                      information provided.
                    </Typography>
                  </Box>
                </ContentBox>
              </Box>
            </SectionContainer>

            <ThemeProvider theme={theme}>
              {/* 3. Use of the Website */}
              <SectionContainer id='use-website'>
                <SectionHeader>
                  <IconContainer>
                    <People
                      sx={{ fontSize: { xs: 20, sm: 24 }, color: '#ffda1b' }}
                    />
                  </IconContainer>
                  <Typography
                    variant='h2'
                    sx={{
                      fontSize: { xs: '1.5rem', sm: '1.875rem' },
                      fontWeight: 'bold',
                      mr: 2,
                    }}
                  >
                    3.
                  </Typography>
                  <Typography
                    variant='h2'
                    sx={{
                      fontSize: { xs: '1.5rem', sm: '1.875rem' },
                    }}
                  >
                    Use of the Website
                  </Typography>
                </SectionHeader>

                <Box
                  sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}
                >
                  <ContentBox>
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: 1.5,
                      }}
                    >
                      <Typography
                        sx={{
                          color: '#ffda1b',
                          fontWeight: 'bold',
                          fontSize: '0.875rem',
                          mt: 0.5,
                          minWidth: '1.5rem',
                        }}
                      >
                        a.
                      </Typography>
                      <Typography
                        variant='body2'
                        sx={{ color: 'text.secondary', lineHeight: 1.6 }}
                      >
                        You may use the Website solely for personal,
                        informational, and non-commercial purposes.
                      </Typography>
                    </Box>
                  </ContentBox>
                  <ContentBox>
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: 1.5,
                      }}
                    >
                      <Typography
                        sx={{
                          color: '#ffda1b',
                          fontWeight: 'bold',
                          fontSize: '0.875rem',
                          mt: 0.5,
                          minWidth: '1.5rem',
                        }}
                      >
                        b.
                      </Typography>
                      <Typography
                        variant='body2'
                        sx={{ color: 'text.secondary', lineHeight: 1.6 }}
                      >
                        You agree not to engage in any activity that could
                        disrupt, disable, overburden, or impair the proper
                        functioning of the Website.
                      </Typography>
                    </Box>
                  </ContentBox>
                </Box>
              </SectionContainer>

              {/* 4. No Legal Advice */}
              <SectionContainer id='no-legal-advice'>
                <SectionHeader>
                  <IconContainer>
                    <Balance
                      sx={{ fontSize: { xs: 20, sm: 24 }, color: '#ffda1b' }}
                    />
                  </IconContainer>
                  <Typography
                    variant='h2'
                    sx={{
                      fontSize: { xs: '1.5rem', sm: '1.875rem' },
                      fontWeight: 'bold',
                      mr: 2,
                    }}
                  >
                    4.
                  </Typography>
                  <Typography
                    variant='h2'
                    sx={{
                      fontSize: { xs: '1.5rem', sm: '1.875rem' },
                    }}
                  >
                    No Legal Advice
                  </Typography>
                </SectionHeader>

                <Box
                  sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}
                >
                  <ContentBox>
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: 1.5,
                      }}
                    >
                      <Typography
                        sx={{
                          color: '#ffda1b',
                          fontWeight: 'bold',
                          fontSize: '0.875rem',
                          mt: 0.5,
                          minWidth: '1.5rem',
                        }}
                      >
                        a.
                      </Typography>
                      <Typography
                        variant='body2'
                        sx={{ color: 'text.secondary', lineHeight: 1.6 }}
                      >
                        The information and content provided on the Website,
                        including translations of GCC tax laws, do not
                        constitute legal advice. The Website is a resource for
                        general information, and not a substitute for
                        professional legal counsel.
                      </Typography>
                    </Box>
                  </ContentBox>
                  <ContentBox>
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: 1.5,
                      }}
                    >
                      <Typography
                        sx={{
                          color: '#ffda1b',
                          fontWeight: 'bold',
                          fontSize: '0.875rem',
                          mt: 0.5,
                          minWidth: '1.5rem',
                        }}
                      >
                        b.
                      </Typography>
                      <Typography
                        variant='body2'
                        sx={{ color: 'text.secondary', lineHeight: 1.6 }}
                      >
                        Users are responsible for obtaining appropriate legal
                        advice before making any legal, financial, or
                        tax-related decisions based on the information provided
                        by the Website.
                      </Typography>
                    </Box>
                  </ContentBox>
                </Box>
              </SectionContainer>

              {/* 5. Limitation of Liability */}
              <SectionContainer id='limitation-liability'>
                <SectionHeader>
                  <IconContainer>
                    <Security
                      sx={{ fontSize: { xs: 20, sm: 24 }, color: '#ffda1b' }}
                    />
                  </IconContainer>
                  <Typography
                    variant='h2'
                    sx={{
                      fontSize: { xs: '1.5rem', sm: '1.875rem' },
                      fontWeight: 'bold',
                      mr: 2,
                    }}
                  >
                    5.
                  </Typography>
                  <Typography
                    variant='h2'
                    sx={{
                      fontSize: { xs: '1.5rem', sm: '1.875rem' },
                    }}
                  >
                    Limitation of Liability
                  </Typography>
                </SectionHeader>

                <Box
                  sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}
                >
                  <ContentBox>
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: 1.5,
                      }}
                    >
                      <Typography
                        sx={{
                          color: '#ffda1b',
                          fontWeight: 'bold',
                          fontSize: '0.875rem',
                          mt: 0.5,
                          minWidth: '1.5rem',
                        }}
                      >
                        a.
                      </Typography>
                      <Typography
                        variant='body2'
                        sx={{ color: 'text.secondary', lineHeight: 1.6 }}
                      >
                        To the fullest extent permitted by law, GCCTaxLaws.com,
                        its owners, group entities, affiliates, managers,
                        officers, directors, employees, and agents, shall not be
                        liable for any direct, indirect, incidental,
                        consequential, special, punitive, or exemplary damages
                        resulting from or in connection with your access to or
                        use of the Website.
                      </Typography>
                    </Box>
                  </ContentBox>
                  <ContentBox>
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: 1.5,
                      }}
                    >
                      <Typography
                        sx={{
                          color: '#ffda1b',
                          fontWeight: 'bold',
                          fontSize: '0.875rem',
                          mt: 0.5,
                          minWidth: '1.5rem',
                        }}
                      >
                        b.
                      </Typography>
                      <Typography
                        variant='body2'
                        sx={{ color: 'text.secondary', lineHeight: 1.6 }}
                      >
                        This includes, but is not limited to, any loss of
                        profits, data, business, or other intangible losses,
                        even if GCCTaxLaws.com has been advised of the
                        possibility of such damages.
                      </Typography>
                    </Box>
                  </ContentBox>
                  <ContentBox>
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: 1.5,
                      }}
                    >
                      <Typography
                        sx={{
                          color: '#ffda1b',
                          fontWeight: 'bold',
                          fontSize: '0.875rem',
                          mt: 0.5,
                          minWidth: '1.5rem',
                        }}
                      >
                        c.
                      </Typography>
                      <Typography
                        variant='body2'
                        sx={{ color: 'text.secondary', lineHeight: 1.6 }}
                      >
                        You agree that you will access and use the Website and
                        its content at your own risk. GCCTaxLaws.com, its
                        owners, group entities, affiliates, managers, officers,
                        directors, employees, and agents make no guarantees
                        regarding the accuracy or reliability of the Website's
                        content.
                      </Typography>
                    </Box>
                  </ContentBox>
                </Box>
              </SectionContainer>

              {/* 6. Indemnification */}
              <SectionContainer id='indemnification'>
                <SectionHeader>
                  <IconContainer>
                    <VerifiedUser
                      sx={{ fontSize: { xs: 20, sm: 24 }, color: '#ffda1b' }}
                    />
                  </IconContainer>
                  <Typography
                    variant='h2'
                    sx={{
                      fontSize: { xs: '1.5rem', sm: '1.875rem' },
                      fontWeight: 'bold',
                      mr: 2,
                    }}
                  >
                    6.
                  </Typography>
                  <Typography
                    variant='h2'
                    sx={{
                      fontSize: { xs: '1.5rem', sm: '1.875rem' },
                    }}
                  >
                    Indemnification
                  </Typography>
                </SectionHeader>

                <Box
                  sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}
                >
                  <ContentBox>
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: 1.5,
                      }}
                    >
                      <Typography
                        sx={{
                          color: '#ffda1b',
                          fontWeight: 'bold',
                          fontSize: '0.875rem',
                          mt: 0.5,
                          minWidth: '1.5rem',
                        }}
                      >
                        a.
                      </Typography>
                      <Typography
                        variant='body2'
                        sx={{ color: 'text.secondary', lineHeight: 1.6 }}
                      >
                        You agree to indemnify, defend, and hold harmless
                        GCCTaxLaws.com, its owners, group entities, affiliates,
                        managers, officers, directors, employees, and agents
                        from any claims, liabilities, damages, losses, costs, or
                        expenses (including attorneys' fees) arising out of or
                        related to your use of the Website, your violation of
                        these Terms, or your breach of any third-party rights.
                      </Typography>
                    </Box>
                  </ContentBox>
                </Box>
              </SectionContainer>

              {/* 7. Compliance with GCC Laws */}
              <SectionContainer id='compliance'>
                <SectionHeader>
                  <IconContainer>
                    <Public
                      sx={{ fontSize: { xs: 20, sm: 24 }, color: '#ffda1b' }}
                    />
                  </IconContainer>
                  <Typography
                    variant='h2'
                    sx={{
                      fontSize: { xs: '1.5rem', sm: '1.875rem' },
                      fontWeight: 'bold',
                      mr: 2,
                    }}
                  >
                    7.
                  </Typography>
                  <Typography
                    variant='h2'
                    sx={{
                      fontSize: { xs: '1.5rem', sm: '1.875rem' },
                    }}
                  >
                    Compliance with GCC Laws
                  </Typography>
                </SectionHeader>

                <Box
                  sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}
                >
                  <ContentBox>
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: 1.5,
                      }}
                    >
                      <Typography
                        sx={{
                          color: '#ffda1b',
                          fontWeight: 'bold',
                          fontSize: '0.875rem',
                          mt: 0.5,
                          minWidth: '1.5rem',
                        }}
                      >
                        a.
                      </Typography>
                      <Typography
                        variant='body2'
                        sx={{ color: 'text.secondary', lineHeight: 1.6 }}
                      >
                        GCCTaxLaws.com is committed to complying with all
                        applicable laws and regulations within the GCC.
                      </Typography>
                    </Box>
                  </ContentBox>
                  <ContentBox>
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: 1.5,
                      }}
                    >
                      <Typography
                        sx={{
                          color: '#ffda1b',
                          fontWeight: 'bold',
                          fontSize: '0.875rem',
                          mt: 0.5,
                          minWidth: '1.5rem',
                        }}
                      >
                        b.
                      </Typography>
                      <Typography
                        variant='body2'
                        sx={{ color: 'text.secondary', lineHeight: 1.6 }}
                      >
                        Users agree to access and use the Website in compliance
                        with all relevant laws and regulations of the GCC
                        region. Any misuse of the information on the Website in
                        violation of local, national, or international laws is
                        strictly prohibited.
                      </Typography>
                    </Box>
                  </ContentBox>
                </Box>
              </SectionContainer>

              {/* 8. Changes to Terms and Conditions */}
              <SectionContainer id='changes-terms'>
                <SectionHeader>
                  <IconContainer>
                    <Settings
                      sx={{ fontSize: { xs: 20, sm: 24 }, color: '#ffda1b' }}
                    />
                  </IconContainer>
                  <Typography
                    variant='h2'
                    sx={{
                      fontSize: { xs: '1.5rem', sm: '1.875rem' },
                      fontWeight: 'bold',
                      mr: 2,
                    }}
                  >
                    8.
                  </Typography>
                  <Typography
                    variant='h2'
                    sx={{
                      fontSize: { xs: '1.5rem', sm: '1.875rem' },
                    }}
                  >
                    Changes to Terms and Conditions
                  </Typography>
                </SectionHeader>

                <Box
                  sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}
                >
                  <ContentBox>
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: 1.5,
                      }}
                    >
                      <Typography
                        sx={{
                          color: '#ffda1b',
                          fontWeight: 'bold',
                          fontSize: '0.875rem',
                          mt: 0.5,
                          minWidth: '1.5rem',
                        }}
                      >
                        a.
                      </Typography>
                      <Typography
                        variant='body2'
                        sx={{ color: 'text.secondary', lineHeight: 1.6 }}
                      >
                        GCCTaxLaws.com reserves the right to modify these Terms
                        at any time, without prior notice. Any changes will
                        become effective upon posting the revised Terms on the
                        Website.
                      </Typography>
                    </Box>
                  </ContentBox>
                  <ContentBox>
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: 1.5,
                      }}
                    >
                      <Typography
                        sx={{
                          color: '#ffda1b',
                          fontWeight: 'bold',
                          fontSize: '0.875rem',
                          mt: 0.5,
                          minWidth: '1.5rem',
                        }}
                      >
                        b.
                      </Typography>
                      <Typography
                        variant='body2'
                        sx={{ color: 'text.secondary', lineHeight: 1.6 }}
                      >
                        Users are responsible for reviewing these Terms
                        regularly. Continued use of the Website following any
                        changes constitutes your acceptance of the revised
                        Terms.
                      </Typography>
                    </Box>
                  </ContentBox>
                </Box>
              </SectionContainer>

              {/* 9. Governing Law and Jurisdiction */}
              <SectionContainer id='governing-law'>
                <SectionHeader>
                  <IconContainer>
                    <Balance
                      sx={{ fontSize: { xs: 20, sm: 24 }, color: '#ffda1b' }}
                    />
                  </IconContainer>
                  <Typography
                    variant='h2'
                    sx={{
                      fontSize: { xs: '1.5rem', sm: '1.875rem' },
                      fontWeight: 'bold',
                      mr: 2,
                    }}
                  >
                    9.
                  </Typography>
                  <Typography
                    variant='h2'
                    sx={{
                      fontSize: { xs: '1.5rem', sm: '1.875rem' },
                    }}
                  >
                    Governing Law and Jurisdiction
                  </Typography>
                </SectionHeader>

                <Box
                  sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}
                >
                  <ContentBox>
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: 1.5,
                      }}
                    >
                      <Typography
                        sx={{
                          color: '#ffda1b',
                          fontWeight: 'bold',
                          fontSize: '0.875rem',
                          mt: 0.5,
                          minWidth: '1.5rem',
                        }}
                      >
                        a.
                      </Typography>
                      <Typography
                        variant='body2'
                        sx={{ color: 'text.secondary', lineHeight: 1.6 }}
                      >
                        These Terms are governed by and construed in accordance
                        with the laws of UAE, without regard to its conflict of
                        law provisions.
                      </Typography>
                    </Box>
                  </ContentBox>
                  <ContentBox>
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: 1.5,
                      }}
                    >
                      <Typography
                        sx={{
                          color: '#ffda1b',
                          fontWeight: 'bold',
                          fontSize: '0.875rem',
                          mt: 0.5,
                          minWidth: '1.5rem',
                        }}
                      >
                        b.
                      </Typography>
                      <Typography
                        variant='body2'
                        sx={{ color: 'text.secondary', lineHeight: 1.6 }}
                      >
                        Any disputes arising out of or related to these Terms or
                        your use of the Website shall be subject to the
                        exclusive jurisdiction of the courts in Dubai.
                      </Typography>
                    </Box>
                  </ContentBox>
                </Box>
              </SectionContainer>

              {/* 10. Severability */}
              <SectionContainer id='severability'>
                <SectionHeader>
                  <IconContainer>
                    <Description
                      sx={{ fontSize: { xs: 20, sm: 24 }, color: '#ffda1b' }}
                    />
                  </IconContainer>
                  <Typography
                    variant='h2'
                    sx={{
                      fontSize: { xs: '1.5rem', sm: '1.875rem' },
                      fontWeight: 'bold',
                      mr: 2,
                    }}
                  >
                    10.
                  </Typography>
                  <Typography
                    variant='h2'
                    sx={{
                      fontSize: { xs: '1.5rem', sm: '1.875rem' },
                    }}
                  >
                    Severability
                  </Typography>
                </SectionHeader>

                <Box
                  sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}
                >
                  <ContentBox>
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: 1.5,
                      }}
                    >
                      <Typography
                        sx={{
                          color: '#ffda1b',
                          fontWeight: 'bold',
                          fontSize: '0.875rem',
                          mt: 0.5,
                          minWidth: '1.5rem',
                        }}
                      >
                        a.
                      </Typography>
                      <Typography
                        variant='body2'
                        sx={{ color: 'text.secondary', lineHeight: 1.6 }}
                      >
                        If any provision of these Terms is held to be invalid or
                        unenforceable, the remaining provisions shall remain in
                        full force and effect.
                      </Typography>
                    </Box>
                  </ContentBox>
                </Box>
              </SectionContainer>

              {/* 11. Entire Agreement */}
              <SectionContainer id='entire-agreement'>
                <SectionHeader>
                  <IconContainer>
                    <Description
                      sx={{ fontSize: { xs: 20, sm: 24 }, color: '#ffda1b' }}
                    />
                  </IconContainer>
                  <Typography
                    variant='h2'
                    sx={{
                      fontSize: { xs: '1.5rem', sm: '1.875rem' },
                      fontWeight: 'bold',
                      mr: 2,
                    }}
                  >
                    11.
                  </Typography>
                  <Typography
                    variant='h2'
                    sx={{
                      fontSize: { xs: '1.5rem', sm: '1.875rem' },
                    }}
                  >
                    Entire Agreement
                  </Typography>
                </SectionHeader>

                <Box
                  sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}
                >
                  <ContentBox>
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: 1.5,
                      }}
                    >
                      <Typography
                        sx={{
                          color: '#ffda1b',
                          fontWeight: 'bold',
                          fontSize: '0.875rem',
                          mt: 0.5,
                          minWidth: '1.5rem',
                        }}
                      >
                        a.
                      </Typography>
                      <Typography
                        variant='body2'
                        sx={{ color: 'text.secondary', lineHeight: 1.6 }}
                      >
                        These Terms, together with any other legal notices or
                        policies posted on the Website, constitute the entire
                        agreement between you and GCCTaxLaws.com regarding your
                        use of the Website.
                      </Typography>
                    </Box>
                  </ContentBox>
                </Box>
              </SectionContainer>

              {/* 12. Privacy Policy */}
              <SectionContainer id='privacy-policy'>
                <SectionHeader>
                  <IconContainer>
                    <Visibility
                      sx={{ fontSize: { xs: 20, sm: 24 }, color: '#ffda1b' }}
                    />
                  </IconContainer>
                  <Typography
                    variant='h2'
                    sx={{
                      fontSize: { xs: '1.5rem', sm: '1.875rem' },
                      fontWeight: 'bold',
                      mr: 2,
                    }}
                  >
                    12.
                  </Typography>
                  <Typography
                    variant='h2'
                    sx={{
                      fontSize: { xs: '1.5rem', sm: '1.875rem' },
                    }}
                  >
                    Privacy Policy
                  </Typography>
                </SectionHeader>

                <Box
                  sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}
                >
                  <ContentBox>
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: 1.5,
                      }}
                    >
                      <Typography
                        sx={{
                          color: '#ffda1b',
                          fontWeight: 'bold',
                          fontSize: '0.875rem',
                          mt: 0.5,
                          minWidth: '1.5rem',
                        }}
                      >
                        a.
                      </Typography>
                      <Typography
                        variant='body2'
                        sx={{ color: 'text.secondary', lineHeight: 1.6 }}
                      >
                        By using the Website, you agree to GCCTaxLaws.com's
                        collection, use, and storage of your information in
                        accordance with its Privacy Policy.
                      </Typography>
                    </Box>
                  </ContentBox>
                  <ContentBox>
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: 1.5,
                      }}
                    >
                      <Typography
                        sx={{
                          color: '#ffda1b',
                          fontWeight: 'bold',
                          fontSize: '0.875rem',
                          mt: 0.5,
                          minWidth: '1.5rem',
                        }}
                      >
                        b.
                      </Typography>
                      <Typography
                        variant='body2'
                        sx={{ color: 'text.secondary', lineHeight: 1.6 }}
                      >
                        The Privacy Policy explains how we collect, use, and
                        protect your personal data and can be accessed{' '}
                        <Link
                          href='/privacy-policy'
                          sx={{
                            color: '#23252a',
                            fontWeight: 'bold',
                            textDecoration: 'none',
                            px: 1,
                            py: 0.5,
                            borderRadius: 1,
                            transition: 'background-color 0.3s ease',
                            display: 'inline-flex',
                            alignItems: 'center',
                            '&:hover': {
                              backgroundColor: 'rgba(255, 218, 27, 0.3)',
                            },
                          }}
                        >
                          here <Launch sx={{ fontSize: 16, ml: 0.5 }} />
                        </Link>
                      </Typography>
                    </Box>
                  </ContentBox>
                </Box>
              </SectionContainer>

              {/* 13. Termination of Use */}
              <SectionContainer id='termination'>
                <SectionHeader>
                  <IconContainer>
                    <Block
                      sx={{ fontSize: { xs: 20, sm: 24 }, color: '#ffda1b' }}
                    />
                  </IconContainer>
                  <Typography
                    variant='h2'
                    sx={{
                      fontSize: { xs: '1.5rem', sm: '1.875rem' },
                      fontWeight: 'bold',
                      mr: 2,
                    }}
                  >
                    13.
                  </Typography>
                  <Typography
                    variant='h2'
                    sx={{
                      fontSize: { xs: '1.5rem', sm: '1.875rem' },
                    }}
                  >
                    Termination of Use
                  </Typography>
                </SectionHeader>

                <Box
                  sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}
                >
                  <ContentBox>
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: 1.5,
                      }}
                    >
                      <Typography
                        sx={{
                          color: '#ffda1b',
                          fontWeight: 'bold',
                          fontSize: '0.875rem',
                          mt: 0.5,
                          minWidth: '1.5rem',
                        }}
                      >
                        a.
                      </Typography>
                      <Typography
                        variant='body2'
                        sx={{ color: 'text.secondary', lineHeight: 1.6 }}
                      >
                        GCCTaxLaws.com reserves the right to terminate or
                        suspend your access to the Website at its sole
                        discretion, without notice, for conduct that it believes
                        violates these Terms or is harmful to other users or the
                        Website itself.
                      </Typography>
                    </Box>
                  </ContentBox>
                </Box>
              </SectionContainer>

              {/* 14. User-Generated Content */}
              <SectionContainer id='user-content'>
                <SectionHeader>
                  <IconContainer>
                    <Message
                      sx={{ fontSize: { xs: 20, sm: 24 }, color: '#ffda1b' }}
                    />
                  </IconContainer>
                  <Typography
                    variant='h2'
                    sx={{
                      fontSize: { xs: '1.5rem', sm: '1.875rem' },
                      fontWeight: 'bold',
                      mr: 2,
                    }}
                  >
                    14.
                  </Typography>
                  <Typography
                    variant='h2'
                    sx={{
                      fontSize: { xs: '1.5rem', sm: '1.875rem' },
                    }}
                  >
                    User-Generated Content
                  </Typography>
                </SectionHeader>

                <Box
                  sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}
                >
                  <ContentBox>
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: 1.5,
                      }}
                    >
                      <Typography
                        sx={{
                          color: '#ffda1b',
                          fontWeight: 'bold',
                          fontSize: '0.875rem',
                          mt: 0.5,
                          minWidth: '1.5rem',
                        }}
                      >
                        a.
                      </Typography>
                      <Typography
                        variant='body2'
                        sx={{ color: 'text.secondary', lineHeight: 1.6 }}
                      >
                        By submitting any content (such as comments, feedback,
                        or posts) to the Website, you grant GCCTaxLaws.com a
                        worldwide, non-exclusive, royalty-free, perpetual, and
                        irrevocable right to use, modify, distribute, and
                        display such content in connection with the Website's
                        operation.
                      </Typography>
                    </Box>
                  </ContentBox>
                  <ContentBox>
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: 1.5,
                      }}
                    >
                      <Typography
                        sx={{
                          color: '#ffda1b',
                          fontWeight: 'bold',
                          fontSize: '0.875rem',
                          mt: 0.5,
                          minWidth: '1.5rem',
                        }}
                      >
                        b.
                      </Typography>
                      <Typography
                        variant='body2'
                        sx={{ color: 'text.secondary', lineHeight: 1.6 }}
                      >
                        Users are solely responsible for the content they post
                        and agree not to submit any content that is unlawful,
                        offensive, defamatory, or infringing on the rights of
                        others. GCCTaxLaws.com reserves the right to remove any
                        content at its discretion.
                      </Typography>
                    </Box>
                  </ContentBox>
                </Box>
              </SectionContainer>

              {/* 15. Third-Party Links */}
              <SectionContainer id='third-party'>
                <SectionHeader>
                  <IconContainer>
                    <Launch
                      sx={{ fontSize: { xs: 20, sm: 24 }, color: '#ffda1b' }}
                    />
                  </IconContainer>
                  <Typography
                    variant='h2'
                    sx={{
                      fontSize: { xs: '1.5rem', sm: '1.875rem' },
                      fontWeight: 'bold',
                      mr: 2,
                    }}
                  >
                    15.
                  </Typography>
                  <Typography
                    variant='h2'
                    sx={{
                      fontSize: { xs: '1.5rem', sm: '1.875rem' },
                    }}
                  >
                    Third-Party Links
                  </Typography>
                </SectionHeader>

                <Box
                  sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}
                >
                  <ContentBox>
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: 1.5,
                      }}
                    >
                      <Typography
                        sx={{
                          color: '#ffda1b',
                          fontWeight: 'bold',
                          fontSize: '0.875rem',
                          mt: 0.5,
                          minWidth: '1.5rem',
                        }}
                      >
                        a.
                      </Typography>
                      <Typography
                        variant='body2'
                        sx={{ color: 'text.secondary', lineHeight: 1.6 }}
                      >
                        The Website may contain links to third-party websites or
                        services that are not owned or controlled by
                        GCCTaxLaws.com.
                      </Typography>
                    </Box>
                  </ContentBox>
                  <ContentBox>
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: 1.5,
                      }}
                    >
                      <Typography
                        sx={{
                          color: '#ffda1b',
                          fontWeight: 'bold',
                          fontSize: '0.875rem',
                          mt: 0.5,
                          minWidth: '1.5rem',
                        }}
                      >
                        b.
                      </Typography>
                      <Typography
                        variant='body2'
                        sx={{ color: 'text.secondary', lineHeight: 1.6 }}
                      >
                        GCCTaxLaws.com has no control over and assumes no
                        responsibility for the content, privacy policies, or
                        practices of any third-party websites or services. Users
                        access such third-party content at their own risk.
                      </Typography>
                    </Box>
                  </ContentBox>
                </Box>
              </SectionContainer>

              {/* 16. Cookies and Tracking Technologies */}
              <SectionContainer id='cookies'>
                <SectionHeader>
                  <IconContainer>
                    <Cookie
                      sx={{ fontSize: { xs: 20, sm: 24 }, color: '#ffda1b' }}
                    />
                  </IconContainer>
                  <Typography
                    variant='h2'
                    sx={{
                      fontSize: { xs: '1.5rem', sm: '1.875rem' },
                      fontWeight: 'bold',
                      mr: 2,
                    }}
                  >
                    16.
                  </Typography>
                  <Typography
                    variant='h2'
                    sx={{
                      fontSize: { xs: '1.5rem', sm: '1.875rem' },
                    }}
                  >
                    Cookies and Tracking Technologies
                  </Typography>
                </SectionHeader>

                <Box
                  sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}
                >
                  <ContentBox>
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: 1.5,
                      }}
                    >
                      <Typography
                        sx={{
                          color: '#ffda1b',
                          fontWeight: 'bold',
                          fontSize: '0.875rem',
                          mt: 0.5,
                          minWidth: '1.5rem',
                        }}
                      >
                        a.
                      </Typography>
                      <Typography
                        variant='body2'
                        sx={{ color: 'text.secondary', lineHeight: 1.6 }}
                      >
                        The Website may use cookies or similar technologies to
                        improve user experience, analyze site traffic, and
                        personalize content. By continuing to use the Website,
                        you consent to the use of such technologies in
                        accordance with our{' '}
                        <Link
                          href='/cookie-policy'
                          sx={{
                            color: '#23252a',
                            fontWeight: 'bold',
                            textDecoration: 'none',
                            px: 1,
                            py: 0.5,
                            borderRadius: 1,
                            transition: 'background-color 0.3s ease',
                            display: 'inline-flex',
                            alignItems: 'center',
                            '&:hover': {
                              backgroundColor: 'rgba(255, 218, 27, 0.3)',
                            },
                          }}
                        >
                          Cookie Policy{' '}
                          <Launch sx={{ fontSize: 16, ml: 0.5 }} />
                        </Link>
                        .
                      </Typography>
                    </Box>
                  </ContentBox>
                </Box>
              </SectionContainer>

              {/* 17. Modification of Content */}
              <SectionContainer id='modification'>
                <SectionHeader>
                  <IconContainer>
                    <Settings
                      sx={{ fontSize: { xs: 20, sm: 24 }, color: '#ffda1b' }}
                    />
                  </IconContainer>
                  <Typography
                    variant='h2'
                    sx={{
                      fontSize: { xs: '1.5rem', sm: '1.875rem' },
                      fontWeight: 'bold',
                      mr: 2,
                    }}
                  >
                    17.
                  </Typography>
                  <Typography
                    variant='h2'
                    sx={{
                      fontSize: { xs: '1.5rem', sm: '1.875rem' },
                    }}
                  >
                    Modification of Content
                  </Typography>
                </SectionHeader>

                <Box
                  sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}
                >
                  <ContentBox>
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: 1.5,
                      }}
                    >
                      <Typography
                        sx={{
                          color: '#ffda1b',
                          fontWeight: 'bold',
                          fontSize: '0.875rem',
                          mt: 0.5,
                          minWidth: '1.5rem',
                        }}
                      >
                        a.
                      </Typography>
                      <Typography
                        variant='body2'
                        sx={{ color: 'text.secondary', lineHeight: 1.6 }}
                      >
                        GCCTaxLaws.com reserves the right to modify, update, or
                        remove any content on the Website at its sole discretion
                        without prior notice.
                      </Typography>
                    </Box>
                  </ContentBox>
                </Box>
              </SectionContainer>

              {/* 18. Feedback and Suggestions */}
              <SectionContainer id='feedback'>
                <SectionHeader>
                  <IconContainer>
                    <Message
                      sx={{ fontSize: { xs: 20, sm: 24 }, color: '#ffda1b' }}
                    />
                  </IconContainer>
                  <Typography
                    variant='h2'
                    sx={{
                      fontSize: { xs: '1.5rem', sm: '1.875rem' },
                      fontWeight: 'bold',
                      mr: 2,
                    }}
                  >
                    18.
                  </Typography>
                  <Typography
                    variant='h2'
                    sx={{
                      fontSize: { xs: '1.5rem', sm: '1.875rem' },
                    }}
                  >
                    Feedback and Suggestions
                  </Typography>
                </SectionHeader>

                <Box
                  sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}
                >
                  <ContentBox>
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: 1.5,
                      }}
                    >
                      <Typography
                        sx={{
                          color: '#ffda1b',
                          fontWeight: 'bold',
                          fontSize: '0.875rem',
                          mt: 0.5,
                          minWidth: '1.5rem',
                        }}
                      >
                        a.
                      </Typography>
                      <Typography
                        variant='body2'
                        sx={{ color: 'text.secondary', lineHeight: 1.6 }}
                      >
                        Any feedback, suggestions, or ideas you provide to
                        GCCTaxLaws.com in connection with your use of the
                        Website shall be deemed non-confidential and may be used
                        by GCCTaxLaws.com without any obligation to compensate
                        you.
                      </Typography>
                    </Box>
                  </ContentBox>
                  <ContentBox>
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: 1.5,
                      }}
                    >
                      <Typography
                        sx={{
                          color: '#ffda1b',
                          fontWeight: 'bold',
                          fontSize: '0.875rem',
                          mt: 0.5,
                          minWidth: '1.5rem',
                        }}
                      >
                        b.
                      </Typography>
                      <Typography
                        variant='body2'
                        sx={{ color: 'text.secondary', lineHeight: 1.6 }}
                      >
                        GCCTaxLaws.com is free to use any feedback for any
                        purpose, including improving the Website and its
                        services.
                      </Typography>
                    </Box>
                  </ContentBox>
                </Box>
              </SectionContainer>

              {/* 19. User Account and Security */}
              <SectionContainer id='user-account'>
                <SectionHeader>
                  <IconContainer>
                    <Lock
                      sx={{ fontSize: { xs: 20, sm: 24 }, color: '#ffda1b' }}
                    />
                  </IconContainer>
                  <Typography
                    variant='h2'
                    sx={{
                      fontSize: { xs: '1.5rem', sm: '1.875rem' },
                      fontWeight: 'bold',
                      mr: 2,
                    }}
                  >
                    19.
                  </Typography>
                  <Typography
                    variant='h2'
                    sx={{
                      fontSize: { xs: '1.5rem', sm: '1.875rem' },
                    }}
                  >
                    User Account and Security
                  </Typography>
                </SectionHeader>

                <Box
                  sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}
                >
                  <ContentBox>
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: 1.5,
                      }}
                    >
                      <Typography
                        sx={{
                          color: '#ffda1b',
                          fontWeight: 'bold',
                          fontSize: '0.875rem',
                          mt: 0.5,
                          minWidth: '1.5rem',
                        }}
                      >
                        a.
                      </Typography>
                      <Typography
                        variant='body2'
                        sx={{ color: 'text.secondary', lineHeight: 1.6 }}
                      >
                        Certain features of the Website may require users to
                        create an account. You are responsible for maintaining
                        the confidentiality of your account credentials and for
                        all activities that occur under your account.
                      </Typography>
                    </Box>
                  </ContentBox>
                  <ContentBox>
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: 1.5,
                      }}
                    >
                      <Typography
                        sx={{
                          color: '#ffda1b',
                          fontWeight: 'bold',
                          fontSize: '0.875rem',
                          mt: 0.5,
                          minWidth: '1.5rem',
                        }}
                      >
                        b.
                      </Typography>
                      <Typography
                        variant='body2'
                        sx={{ color: 'text.secondary', lineHeight: 1.6 }}
                      >
                        GCCTaxLaws.com reserves the right to terminate or
                        suspend accounts that violate these Terms or engage in
                        fraudulent activities.
                      </Typography>
                    </Box>
                  </ContentBox>
                </Box>
              </SectionContainer>

              {/* 20. Beta Services */}
              <SectionContainer id='beta-services'>
                <SectionHeader>
                  <IconContainer>
                    <FlashOn
                      sx={{ fontSize: { xs: 20, sm: 24 }, color: '#ffda1b' }}
                    />
                  </IconContainer>
                  <Typography
                    variant='h2'
                    sx={{
                      fontSize: { xs: '1.5rem', sm: '1.875rem' },
                      fontWeight: 'bold',
                      mr: 2,
                    }}
                  >
                    20.
                  </Typography>
                  <Typography
                    variant='h2'
                    sx={{
                      fontSize: { xs: '1.5rem', sm: '1.875rem' },
                    }}
                  >
                    Beta Services
                  </Typography>
                </SectionHeader>

                <Box
                  sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}
                >
                  <ContentBox>
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: 1.5,
                      }}
                    >
                      <Typography
                        sx={{
                          color: '#ffda1b',
                          fontWeight: 'bold',
                          fontSize: '0.875rem',
                          mt: 0.5,
                          minWidth: '1.5rem',
                        }}
                      >
                        a.
                      </Typography>
                      <Typography
                        variant='body2'
                        sx={{ color: 'text.secondary', lineHeight: 1.6 }}
                      >
                        From time to time, GCCTaxLaws.com may offer beta
                        services or features on the Website. These beta services
                        are provided "as-is" and without any warranties.
                      </Typography>
                    </Box>
                  </ContentBox>
                  <ContentBox>
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: 1.5,
                      }}
                    >
                      <Typography
                        sx={{
                          color: '#ffda1b',
                          fontWeight: 'bold',
                          fontSize: '0.875rem',
                          mt: 0.5,
                          minWidth: '1.5rem',
                        }}
                      >
                        b.
                      </Typography>
                      <Typography
                        variant='body2'
                        sx={{ color: 'text.secondary', lineHeight: 1.6 }}
                      >
                        GCCTaxLaws.com reserves the right to discontinue or
                        modify beta services at any time without prior notice.
                      </Typography>
                    </Box>
                  </ContentBox>
                </Box>
              </SectionContainer>

              {/* 21. Notices */}
              <SectionContainer id='notices'>
                <SectionHeader>
                  <IconContainer>
                    <Notifications
                      sx={{ fontSize: { xs: 20, sm: 24 }, color: '#ffda1b' }}
                    />
                  </IconContainer>
                  <Typography
                    variant='h2'
                    sx={{
                      fontSize: { xs: '1.5rem', sm: '1.875rem' },
                      fontWeight: 'bold',
                      mr: 2,
                    }}
                  >
                    21.
                  </Typography>
                  <Typography
                    variant='h2'
                    sx={{
                      fontSize: { xs: '1.5rem', sm: '1.875rem' },
                    }}
                  >
                    Notices
                  </Typography>
                </SectionHeader>

                <Box
                  sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}
                >
                  <ContentBox>
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: 1.5,
                      }}
                    >
                      <Typography
                        sx={{
                          color: '#ffda1b',
                          fontWeight: 'bold',
                          fontSize: '0.875rem',
                          mt: 0.5,
                          minWidth: '1.5rem',
                        }}
                      >
                        a.
                      </Typography>
                      <Typography
                        variant='body2'
                        sx={{ color: 'text.secondary', lineHeight: 1.6 }}
                      >
                        Any notices or other communications required or
                        permitted under these Terms shall be in writing and
                        delivered by email to support@gcctaxlaws.com. You agree
                        that any notice from GCCTaxLaws.com will be considered
                        received by you once it is sent to the email address
                        associated with your account.
                      </Typography>
                    </Box>
                  </ContentBox>
                </Box>
              </SectionContainer>

              {/* 22. Advertising and Promotions */}
              <SectionContainer id='advertising'>
                <SectionHeader>
                  <IconContainer>
                    <CreditCard
                      sx={{ fontSize: { xs: 20, sm: 24 }, color: '#ffda1b' }}
                    />
                  </IconContainer>
                  <Typography
                    variant='h2'
                    sx={{
                      fontSize: { xs: '1.5rem', sm: '1.875rem' },
                      fontWeight: 'bold',
                      mr: 2,
                    }}
                  >
                    22.
                  </Typography>
                  <Typography
                    variant='h2'
                    sx={{
                      fontSize: { xs: '1.5rem', sm: '1.875rem' },
                    }}
                  >
                    Advertising and Promotions
                  </Typography>
                </SectionHeader>

                <Box
                  sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}
                >
                  <ContentBox>
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: 1.5,
                      }}
                    >
                      <Typography
                        sx={{
                          color: '#ffda1b',
                          fontWeight: 'bold',
                          fontSize: '0.875rem',
                          mt: 0.5,
                          minWidth: '1.5rem',
                        }}
                      >
                        a.
                      </Typography>
                      <Typography
                        variant='body2'
                        sx={{ color: 'text.secondary', lineHeight: 1.6 }}
                      >
                        The Website may contain advertisements or promotions for
                        third-party products and services. GCCTaxLaws.com does
                        not endorse or guarantee the accuracy or reliability of
                        any such advertisements or promotions.
                      </Typography>
                    </Box>
                  </ContentBox>
                  <ContentBox>
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: 1.5,
                      }}
                    >
                      <Typography
                        sx={{
                          color: '#ffda1b',
                          fontWeight: 'bold',
                          fontSize: '0.875rem',
                          mt: 0.5,
                          minWidth: '1.5rem',
                        }}
                      >
                        b.
                      </Typography>
                      <Typography
                        variant='body2'
                        sx={{ color: 'text.secondary', lineHeight: 1.6 }}
                      >
                        Any transactions or interactions with advertisers or
                        promoters are solely between you and the advertiser, and
                        GCCTaxLaws.com is not responsible for any issues arising
                        from such interactions.
                      </Typography>
                    </Box>
                  </ContentBox>
                </Box>
              </SectionContainer>

              {/* 23. Prohibited Activities */}
              <SectionContainer id='prohibited-activities'>
                <SectionHeader>
                  <IconContainer>
                    <Block
                      sx={{ fontSize: { xs: 20, sm: 24 }, color: '#ffda1b' }}
                    />
                  </IconContainer>
                  <Typography
                    variant='h2'
                    sx={{
                      fontSize: { xs: '1.5rem', sm: '1.875rem' },
                      fontWeight: 'bold',
                      mr: 2,
                    }}
                  >
                    23.
                  </Typography>
                  <Typography
                    variant='h2'
                    sx={{
                      fontSize: { xs: '1.5rem', sm: '1.875rem' },
                    }}
                  >
                    Prohibited Activities
                  </Typography>
                </SectionHeader>

                <Box
                  sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}
                >
                  <ContentBox>
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: 1.5,
                      }}
                    >
                      <Typography
                        sx={{
                          color: '#ffda1b',
                          fontWeight: 'bold',
                          fontSize: '0.875rem',
                          mt: 0.5,
                          minWidth: '1.5rem',
                        }}
                      >
                        a.
                      </Typography>
                      <Box
                        sx={{
                          color: 'text.secondary',
                          lineHeight: 1.6,
                          fontSize: '0.875rem',
                        }}
                      >
                        <Typography variant='body2' sx={{ mb: 1.5 }}>
                          Users agree not to use the Website to:
                        </Typography>
                        <Box
                          sx={{
                            ml: 2,
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 1.5,
                          }}
                        >
                          <Box
                            sx={{
                              display: 'flex',
                              alignItems: 'flex-start',
                              gap: 1.5,
                            }}
                          >
                            <Typography
                              sx={{
                                color: '#ffda1b',
                                fontWeight: 'bold',
                                fontSize: '0.75rem',
                                mt: 0.5,
                                minWidth: '1rem',
                              }}
                            >
                              i.
                            </Typography>
                            <Typography variant='body2'>
                              Engage in any activity that could infringe on the
                              intellectual property rights of others.
                            </Typography>
                          </Box>
                          <Box
                            sx={{
                              display: 'flex',
                              alignItems: 'flex-start',
                              gap: 1.5,
                            }}
                          >
                            <Typography
                              sx={{
                                color: '#ffda1b',
                                fontWeight: 'bold',
                                fontSize: '0.75rem',
                                mt: 0.5,
                                minWidth: '1rem',
                              }}
                            >
                              ii.
                            </Typography>
                            <Typography variant='body2'>
                              Use automated systems, such as bots or scripts, to
                              access the Website or its contents for any
                              purpose.
                            </Typography>
                          </Box>
                          <Box
                            sx={{
                              display: 'flex',
                              alignItems: 'flex-start',
                              gap: 1.5,
                            }}
                          >
                            <Typography
                              sx={{
                                color: '#ffda1b',
                                fontWeight: 'bold',
                                fontSize: '0.75rem',
                                mt: 0.5,
                                minWidth: '1rem',
                              }}
                            >
                              iii.
                            </Typography>
                            <Typography variant='body2'>
                              Engage in any form of hacking, data mining,
                              reproducing content of the website or other
                              activities intended to damage, disrupt, or clone
                              the functionality of the Website.
                            </Typography>
                          </Box>
                        </Box>
                      </Box>
                    </Box>
                  </ContentBox>
                  <ContentBox>
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: 1.5,
                      }}
                    >
                      <Typography
                        sx={{
                          color: '#ffda1b',
                          fontWeight: 'bold',
                          fontSize: '0.875rem',
                          mt: 0.5,
                          minWidth: '1.5rem',
                        }}
                      >
                        b.
                      </Typography>
                      <Typography
                        variant='body2'
                        sx={{
                          color: 'text.secondary',
                          lineHeight: 1.6,
                          fontWeight: 'bold',
                        }}
                      >
                        GCCTaxLaws.com reserves the right to take appropriate
                        action, including legal remedies, in response to any
                        prohibited activities.
                      </Typography>
                    </Box>
                  </ContentBox>
                </Box>
              </SectionContainer>

              {/* 24. Contact Information */}
              <ContactSection id='contact'>
                <SectionHeader sx={{ mb: { xs: 2, sm: 3 } }}>
                  <Box
                    sx={{
                      backgroundColor: 'rgba(255, 218, 27, 0.2)',
                      p: { xs: 1, sm: 1.5 },
                      borderRadius: 1,
                      mr: { xs: 1.5, sm: 2 },
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Email
                      sx={{ fontSize: { xs: 20, sm: 24 }, color: '#ffda1b' }}
                    />
                  </Box>
                  <Typography
                    variant='h2'
                    sx={{
                      fontSize: { xs: '1.5rem', sm: '1.875rem' },
                      fontWeight: 'bold',
                      mr: 2,
                      color: 'white',
                    }}
                  >
                    24.
                  </Typography>
                  <Typography
                    variant='h2'
                    sx={{
                      color: 'white',
                      fontSize: { xs: '1.5rem', sm: '1.875rem' },
                    }}
                  >
                    Contact Information
                  </Typography>
                </SectionHeader>
                <Typography
                  variant='body1'
                  sx={{
                    color: '#e2e8f0',
                    lineHeight: 1.6,
                    fontSize: { xs: '1rem', sm: '1.125rem' },
                  }}
                >
                  For any questions, concerns, or clarifications regarding these
                  Terms, please contact us at{' '}
                  <Link
                    href='mailto:support@gcctaxlaws.com'
                    sx={{
                      color: 'white',
                      fontWeight: 'bold',
                      textDecoration: 'none',
                      px: 0,
                      py: 1,
                      borderRadius: 1,
                      transition: 'background-color 0.3s ease',
                      '&:hover': {
                        backgroundColor: 'rgba(255, 255, 255, 0.1)',
                      },
                    }}
                  >
                    support@gcctaxlaws.com
                  </Link>
                </Typography>
              </ContactSection>
            </ThemeProvider>
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  )
}

export default TermsAndConditions
