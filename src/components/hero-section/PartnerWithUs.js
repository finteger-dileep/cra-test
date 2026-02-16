// import { useNavigate } from 'react-router-dom'
import {
  Box,
  Container,
  Grid,
  Typography,
  Card,
  CardContent,
  Button,
  Paper,
  Link,
} from '@mui/material'
import { styled, createTheme, ThemeProvider } from '@mui/material/styles'
import {
  Handshake,
  School,
  Business,
  Groups,
  Edit,
  PlayCircle,
  Feedback,
  Groups2Rounded as Integration,
  CheckCircle,
  Email,
  ArrowForward,
  Api as ApiIcon,
} from '@mui/icons-material'

// Professional theme with comprehensive responsive typography
const theme = createTheme({
  palette: {
    primary: {
      main: '#ffda1b',
      contrastText: '#23252a',
    },
    secondary: {
      main: '#23252a',
      contrastText: '#ffffff',
    },
    background: {
      default: '#f9fafb',
      paper: '#ffffff',
    },
    text: {
      primary: '#1e293b',
      secondary: '#64748b',
    },
  },
  typography: {
    fontFamily: 'Inter, sans-serif',
    h1: {
      fontSize: '2.75rem',
      fontWeight: 700,
      letterSpacing: '-0.025em',
      '@media (max-width:1200px)': {
        fontSize: '2.5rem',
      },
      '@media (max-width:900px)': {
        fontSize: '2.25rem',
      },
      '@media (max-width:600px)': {
        fontSize: '2rem',
      },
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 600,
      letterSpacing: '-0.02em',
      '@media (max-width:1200px)': {
        fontSize: '1.875rem',
      },
      '@media (max-width:900px)': {
        fontSize: '1.75rem',
      },
      '@media (max-width:600px)': {
        fontSize: '1.5rem',
      },
    },
    h3: {
      fontSize: '1.5rem',
      fontWeight: 600,
      '@media (max-width:900px)': {
        fontSize: '1.375rem',
      },
      '@media (max-width:600px)': {
        fontSize: '1.25rem',
      },
    },
    h4: {
      fontSize: '1.25rem',
      fontWeight: 600,
      '@media (max-width:900px)': {
        fontSize: '1.125rem',
      },
      '@media (max-width:600px)': {
        fontSize: '1rem',
      },
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.6,
      '@media (max-width:600px)': {
        fontSize: '0.95rem',
      },
    },
    body2: {
      fontSize: '0.875rem',
      lineHeight: 1.5,
      '@media (max-width:600px)': {
        fontSize: '0.85rem',
      },
    },
  },
  shape: {
    borderRadius: 8,
  },
})

// Refined styled components with reduced hero height
const HeroSection = styled(Box)(({ theme }) => ({
  background: `linear-gradient(135deg, #23252a 0%, #374151 100%)`,
  color: 'white',
  padding: theme.spacing(6, 0),
  [theme.breakpoints.down('md')]: {
    padding: theme.spacing(4, 0),
  },
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(3, 0),
  },
}))

const GoldDivider = styled(Box)(() => ({
  width: '64px',
  height: '3px',
  backgroundColor: '#ffda1b',
  margin: '0 auto 24px auto',
}))

// Compact partner card for better space utilization
const CompactPartnerCard = styled(Card)(({ theme }) => ({
  height: '100%',
  padding: theme.spacing(2),
  borderRadius: theme.spacing(1.5),
  border: '1px solid #e2e8f0',
  backgroundColor: '#ffffff',
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  position: 'relative',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background:
      'linear-gradient(45deg, rgba(255, 218, 27, 0.03) 0%, rgba(35, 37, 54, 0.05) 100%)',
    opacity: 0,
    transition: 'opacity 0.3s ease',
  },
  '&:hover': {
    transform: 'translateY(-3px)',
    boxShadow:
      '0 16px 32px -8px rgba(0, 0, 0, 0.1), 0 6px 12px -6px rgba(0, 0, 0, 0.08)',
    borderColor: 'rgba(255, 218, 27, 0.3)',
    '&::before': {
      opacity: 1,
    },
    '& .icon-container': {
      transform: 'scale(1.05)',
    },
    '& .card-title': {
      color: '#ffda1b',
    },
  },
}))

const CollaborationCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2.5),
  borderRadius: theme.spacing(1.5),
  border: '1px solid #e2e8f0',
  backgroundColor: '#ffffff',
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  height: '100%',
  position: 'relative',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background:
      'linear-gradient(135deg, rgba(255, 218, 27, 0.02) 0%, transparent 50%)',
    opacity: 0,
    transition: 'opacity 0.3s ease',
  },
  '&:hover': {
    transform: 'translateY(-3px)',
    boxShadow:
      '0 16px 32px -8px rgba(0, 0, 0, 0.1), 0 6px 12px -6px rgba(0, 0, 0, 0.08)',
    borderColor: 'rgba(255, 218, 27, 0.2)',
    '&::before': {
      opacity: 1,
    },
    '& .collab-icon': {
      transform: 'scale(1.1)',
      backgroundColor: 'rgba(255, 218, 27, 0.15)',
    },
    '& .collab-title': {
      color: '#23252a',
    },
  },
}))

const IconContainer = styled(Box)(() => ({
  width: 36,
  height: 36,
  borderRadius: '8px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginBottom: '12px',
  flexShrink: 0,
}))

const BenefitItem = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'flex-start',
  gap: '12px',
  padding: '12px 0',
}))

const StyledButton = styled(Button)(({ theme, variant: buttonVariant }) => ({
  padding: theme.spacing(1.25, 2.5),
  borderRadius: theme.spacing(1),
  textTransform: 'none',
  fontWeight: 600,
  fontSize: '0.95rem',
  transition: 'all 0.2s ease',
  ...(buttonVariant === 'primary'
    ? {
        backgroundColor: '#23252a',
        color: 'white',
        '&:hover': {
          backgroundColor: '#1a1c21',
          transform: 'translateY(-1px)',
        },
      }
    : {
        border: '1px solid #e2e8f0',
        color: '#23252a',
        backgroundColor: 'white',
        '&:hover': {
          backgroundColor: '#f8fafc',
          borderColor: '#ffda1b',
        },
      }),
}))

const ContactButton = styled(Button)(() => ({
  padding: '14px 28px',
  borderRadius: '8px',
  textTransform: 'none',
  fontWeight: 600,
  fontSize: '1rem',
  backgroundColor: '#ffda1b',
  color: '#23252a',
  transition: 'all 0.2s ease',
  '&:hover': {
    backgroundColor: '#f5c842',
    transform: 'translateY(-1px)',
    boxShadow: '0 4px 12px rgba(255, 218, 27, 0.3)',
  },
}))

// Redesigned CTA section to match partner cards styling
const CTABox = styled(Box)(({ theme }) => ({
  padding: theme.spacing(3),
  backgroundColor: 'white',
  borderRadius: theme.spacing(1.5),
  border: '1px solid #e2e8f0',
  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  transition: 'all 0.3s ease',
  '&:hover': {
    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.08)',
    borderColor: 'rgba(255, 218, 27, 0.2)',
  },
}))

const SectionDivider = styled(Box)(({ theme }) => ({
  width: '1px',
  backgroundColor: '#e2e8f0',
  margin: theme.spacing(0, 2),
  [theme.breakpoints.down('lg')]: {
    display: 'none',
  },
}))

const PartnerWithUs = () => {
  // const navigate = useNavigate()
  const navigate = () => {}

  const partners = [
    {
      icon: <School sx={{ fontSize: 18 }} />,
      title: 'Universities and training institutes',
      description:
        'Use our platform in your academic programs, share it with students and faculty, or include it in research-based initiatives.',
      gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    },
    {
      icon: <Business sx={{ fontSize: 18 }} />,
      title: 'Firms and consultants',
      description:
        'Access our tools for your practice, refer clients who need reliable tax information, or contribute your expertise to help shape the content.',
      gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    },
    {
      icon: <Groups sx={{ fontSize: 18 }} />,
      title: 'Corporate tax and finance teams',
      description:
        'Equip your teams with easy access to accurate, up-to-date tax laws and related materials to support compliance and decision-making.',
      gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    },
    {
      icon: <Edit sx={{ fontSize: 18 }} />,
      title: 'Writers and experts',
      description:
        'Share insights or contribute articles — we handle the formatting, publication, and reach.',
      gradient: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
    },
  ]

  const collaborationWays = [
    {
      icon: <Integration sx={{ fontSize: 20, color: '#6366f1' }} />,
      title: 'Use the platform',
      description:
        'Integrate gcctaxlaws.com into your internal workflows and classroom sessions.',
    },
    {
      icon: <Edit sx={{ fontSize: 20, color: '#3b82f6' }} />,
      title: 'Contribute content',
      description:
        'Write articles, summaries, or explainer notes. We keep the process simple and give full credit to contributors.',
    },
    {
      icon: <PlayCircle sx={{ fontSize: 20, color: '#10b981' }} />,
      title: 'Develop training material',
      description:
        "If you're an expert in a niche area of GCC tax, we offer a revenue share model for developing short training videos or targeted learning content. You create, we distribute - and share the revenue.",
    },
    {
      icon: <ApiIcon sx={{ fontSize: 20, color: '#8b5cf6' }} />,
      title: 'Integrate our APIs',
      description:
        'Access our comprehensive, up-to-date legal database through our APIs. Render GCC tax laws, DTAAs, and value-added insights directly on your platform with our well-structured, interlinked data.',
    },
    {
      icon: <Feedback sx={{ fontSize: 20, color: '#f59e0b' }} />,
      title: 'Provide feedback',
      description:
        'Help us improve the platform for users like you by sharing ideas and user experience suggestions.',
    },
  ]

  const benefits = [
    'No heavy onboarding or long-term commitments',
    'Visibility and credibility within a focused professional community',
    'Potential for shared revenue and content reach',
    'An opportunity to contribute to how tax knowledge is shared and accessed in the GCC region',
  ]

  return (
    <ThemeProvider theme={theme}>
      <Box>
        {/* Hero Section */}
        <HeroSection>
          <Container maxWidth='lg'>
            <Box sx={{ textAlign: 'center', maxWidth: '800px', mx: 'auto' }}>
              <Box
                sx={{
                  display: 'inline-flex',
                  p: 2,
                  borderRadius: '50%',
                  backgroundColor: 'rgba(255, 218, 27, 0.15)',
                  mb: 3,
                }}
              >
                <Handshake sx={{ fontSize: 32, color: '#ffda1b' }} />
              </Box>

              <Typography variant='h1' sx={{ mb: 2 }}>
                Partner with us
              </Typography>
              <GoldDivider />

              <Typography
                variant='body1'
                sx={{
                  color: '#e2e8f0',
                  fontSize: '1.125rem',
                  mb: 3,
                }}
              >
                At gcctaxlaws.com, we're building more than a legal database -
                we're creating a one-stop platform for everything tax in the GCC
                region
              </Typography>

              <Typography
                variant='body2'
                sx={{
                  color: '#cbd5e1',
                  maxWidth: '600px',
                  mx: 'auto',
                  mb: 2,
                }}
              >
                Whether you're looking for accurate law, practical
                understanding, networking opportunities, or skill development,
                gcctaxlaws.com is designed to support professionals,
                institutions, and businesses alike.
              </Typography>
              <Typography
                variant='body2'
                sx={{
                  color: '#cbd5e1',
                  maxWidth: '600px',
                  mx: 'auto',
                }}
              >
                We invite universities, firms, consultants, and in-house teams
                to partner with us in ways that are straightforward, meaningful,
                and built for long-term value.
              </Typography>
            </Box>
          </Container>
        </HeroSection>

        {/* Redesigned Main Section with Better Space Utilization */}
        <Box sx={{ py: 6, backgroundColor: '#f8fafc' }}>
          <Container maxWidth='xl'>
            <Grid container spacing={0} sx={{ minHeight: '400px' }}>
              {/* Ready to Collaborate Section - First on mobile, right on desktop */}
              <Grid item xs={12} lg={3.8} sx={{ order: { xs: 1, lg: 3 } }}>
                <CTABox sx={{ mb: { xs: 4, lg: 0 }, ml: { lg: 3 } }}>
                  <Box>
                    <Typography
                      variant='h4'
                      sx={{
                        mb: 5,
                        color: '#23252a',
                        fontSize: { xs: '1.75rem', md: '2rem' },
                        lineHeight: 1.2,
                      }}
                    >
                      Start a partnership discussion today
                    </Typography>

                    <Typography
                      variant='body2'
                      color='text.secondary'
                      sx={{ mb: 3, fontSize: '0.875rem', lineHeight: 1.6 }}
                    >
                      Write to us at{' '}
                      <Link
                        href='mailto:partnerships@gcctaxlaws.com'
                        sx={{
                          color: '#23252a',
                          fontWeight: 600,
                          textDecoration: 'none',
                          '&:hover': { color: '#ffda1b' },
                        }}
                      >
                        partnerships@gcctaxlaws.com
                      </Link>{' '}
                      to start a conversation. We keep things simple, and if
                      there's a fit - we take it from there!
                    </Typography>
                  </Box>

                  <Box
                    sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}
                  >
                    <ContactButton
                      onClick={() =>
                        window.open('mailto:partnerships@gcctaxlaws.com')
                      }
                      startIcon={<Email />}
                      fullWidth
                      size='medium'
                    >
                      Start Partnership Discussion
                    </ContactButton>

                    <StyledButton
                      variant='secondary'
                      onClick={() => navigate('/contact-us')}
                      endIcon={<ArrowForward sx={{ fontSize: 16 }} />}
                      fullWidth
                      size='medium'
                    >
                      General Contact
                    </StyledButton>
                  </Box>
                </CTABox>
              </Grid>

              {/* Vertical Divider */}
              <Grid
                item
                lg={0.2}
                sx={{
                  display: { xs: 'none', lg: 'flex' },
                  justifyContent: 'center',
                  order: { lg: 2 },
                }}
              >
                <SectionDivider />
              </Grid>

              {/* Who We Work With Section - Second on mobile, left on desktop */}
              <Grid item xs={12} lg={8} sx={{ order: { xs: 2, lg: 1 } }}>
                <Box sx={{ pr: { lg: 3 } }}>
                  {/* Section Header */}
                  <Box sx={{ mb: 4 }}>
                    <Typography
                      variant='h2'
                      sx={{
                        color: '#23252a',
                        mb: 1,
                        mt: 3,
                        fontSize: { xs: '1.75rem', md: '2rem' },
                      }}
                    >
                      Who we work with
                    </Typography>
                    <Typography variant='body2' color='text.secondary'>
                      Trusted partners across education, consulting, and
                      corporate sectors
                    </Typography>
                  </Box>

                  {/* Partner Cards Grid */}
                  <Grid container spacing={2.5}>
                    {partners.map((partner, index) => (
                      <Grid item xs={12} sm={6} lg={6} xl={3} key={index}>
                        <CompactPartnerCard>
                          <CardContent sx={{ p: 0, height: '100%' }}>
                            <IconContainer
                              className='icon-container'
                              sx={{
                                background: partner.gradient,
                                color: 'white',
                                transition: 'all 0.3s ease',
                              }}
                            >
                              {partner.icon}
                            </IconContainer>

                            <Typography
                              className='card-title'
                              variant='h4'
                              sx={{
                                color: 'text.primary',
                                mb: 1,
                                fontSize: '1rem',
                                lineHeight: 1.3,
                                transition: 'color 0.3s ease',
                                fontWeight: 600,
                                minHeight: '2.6em',
                              }}
                            >
                              {partner.title}
                            </Typography>

                            <Typography
                              variant='body2'
                              color='text.secondary'
                              sx={{
                                lineHeight: 1.4,
                                fontSize: '0.875rem',
                              }}
                            >
                              {partner.description}
                            </Typography>
                          </CardContent>
                        </CompactPartnerCard>
                      </Grid>
                    ))}
                  </Grid>
                </Box>
              </Grid>
            </Grid>
          </Container>
        </Box>

        {/* Ways to Collaborate */}
        <Box sx={{ py: 6, backgroundColor: 'white' }}>
          <Container maxWidth='lg'>
            <Box sx={{ textAlign: 'center', mb: 5 }}>
              <Typography variant='h2' sx={{ color: '#23252a', mb: 1 }}>
                Collaboration opportunities
              </Typography>
              <Typography variant='body2' color='text.secondary'>
                Multiple ways to contribute and grow together
              </Typography>
            </Box>

            <Grid container spacing={3}>
              {collaborationWays.map((way, index) => (
                <Grid item xs={12} md={6} key={index}>
                  <CollaborationCard>
                    <Box
                      sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}
                    >
                      <Box
                        className='collab-icon'
                        sx={{
                          backgroundColor: 'rgba(255, 218, 27, 0.1)',
                          p: 1,
                          borderRadius: 1.5,
                          flexShrink: 0,
                          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                        }}
                      >
                        {way.icon}
                      </Box>
                      <Box>
                        <Typography
                          className='collab-title'
                          variant='h4'
                          sx={{
                            mb: 0.5,
                            fontSize: '1.1rem',
                            transition: 'color 0.3s ease',
                          }}
                        >
                          {way.title}
                        </Typography>
                        <Typography
                          variant='body2'
                          color='text.secondary'
                          sx={{ lineHeight: 1.5 }}
                        >
                          {way.description}
                        </Typography>
                      </Box>
                    </Box>
                  </CollaborationCard>
                </Grid>
              ))}
            </Grid>
          </Container>
        </Box>

        {/* Benefits Section */}
        <Box
          sx={{
            py: 6,
            background: 'linear-gradient(135deg, #23252a 0%, #374151 100%)',
            color: 'white',
          }}
        >
          <Container maxWidth='lg'>
            <Grid container spacing={4} alignItems='center'>
              <Grid item xs={12} lg={6}>
                <Typography variant='h2' sx={{ mb: 2 }}>
                  Partnership benefits
                </Typography>
                <Typography
                  variant='body1'
                  sx={{
                    color: '#e2e8f0',
                    fontSize: '1.1rem',
                  }}
                >
                  Designed for mutual success with clear value propositions
                </Typography>
              </Grid>

              <Grid item xs={12} lg={6}>
                <Box>
                  {benefits.map((benefit, index) => (
                    <BenefitItem key={index}>
                      <CheckCircle
                        sx={{
                          fontSize: 18,
                          color: '#ffda1b',
                          mt: 0.25,
                          flexShrink: 0,
                        }}
                      />
                      <Typography
                        variant='body2'
                        sx={{
                          color: '#e2e8f0',
                          fontSize: '0.95rem',
                        }}
                      >
                        {benefit}
                      </Typography>
                    </BenefitItem>
                  ))}
                </Box>
              </Grid>
            </Grid>
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  )
}

export default PartnerWithUs
