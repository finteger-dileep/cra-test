import React, { useEffect, useRef } from 'react'
// import { useNavigate } from 'react-router-dom'
import {
  Box,
  Container,
  Grid,
  Typography,
  Card,
  CardContent,
  Button,
  Alert,
  Paper,
} from '@mui/material'
import { styled, createTheme, ThemeProvider } from '@mui/material/styles'
import {
  CheckCircle,
  Schedule,
  Description,
  People,
  Security,
  ArrowForward,
} from '@mui/icons-material'
import EmojiEventsRoundedIcon from '@mui/icons-material/EmojiEventsRounded'
import VerifiedUserRoundedIcon from '@mui/icons-material/VerifiedUserRounded'
import GroupsRoundedIcon from '@mui/icons-material/GroupsRounded'
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded'
import ReportRoundedIcon from '@mui/icons-material/ReportRounded'
// import { getCurrentDomain, getCountryFromDomain } from '../../utils/seoConfig'
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
      '@media (max-width:768px)': {
        fontSize: '2.5rem',
      },
    },
    h2: {
      fontSize: '2.25rem',
      fontWeight: 'bold',
      '@media (max-width:768px)': {
        fontSize: '1.875rem',
      },
    },
    h3: {
      fontSize: '1.5rem',
      fontWeight: 'bold',
    },
    h4: {
      fontSize: '1.25rem',
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
  padding: theme.spacing(10, 0),
  [theme.breakpoints.down('md')]: {
    padding: theme.spacing(8, 0),
  },
}))

const GoldDivider = styled(Box)(({ theme }) => ({
  width: '96px',
  height: '4px',
  backgroundColor: '#ffda1b',
  margin: '0 auto',
  marginBottom: theme.spacing(4),
  [theme.breakpoints.down('md')]: {
    width: '80px',
    marginBottom: theme.spacing(3),
  },
}))

const FeatureCard = styled(Card)(({ theme, variant }) => ({
  height: '100%',
  padding: theme.spacing(3),
  borderRadius: theme.spacing(3),
  border: '1px solid #f1f5f9',
  backgroundColor: variant === 'alternate' ? '#fafafa' : '#ffffff',
  transition: 'all 0.3s ease',
  transform: 'translateY(0)',
  opacity: 0,
  '&:hover': {
    transform: 'translateY(-4px) scale(1.02)',
    boxShadow: theme.shadows[12],
  },
  '&.animate-fade-in-up': {
    opacity: 1,
    animation: 'fadeInUp 0.7s ease-out forwards',
  },
  '@keyframes fadeInUp': {
    '0%': {
      opacity: 0,
      transform: 'translateY(20px)',
    },
    '100%': {
      opacity: 1,
      transform: 'translateY(0)',
    },
  },
}))

const UserTypeCard = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  backgroundColor: 'rgba(255, 255, 255, 0.1)',
  backdropFilter: 'blur(4px)',
  borderRadius: theme.spacing(1.5),
  padding: theme.spacing(2),
  transition: 'all 0.3s ease',
  '&:hover': {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
}))

const TrustCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  borderRadius: theme.spacing(2),
  border: '1px solid #e2e8f0',
  boxShadow: theme.shadows[4],
}))

const InfoBox = styled(Box)(({ theme }) => ({
  backgroundColor: 'rgba(255, 218, 27, 0.1)',
  padding: theme.spacing(1.5),
  borderRadius: theme.spacing(1),
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
}))

const StatusBox = styled(Box)(({ theme }) => ({
  background: `linear-gradient(90deg, rgba(255, 218, 27, 0.1) 0%, rgba(35, 37, 54, 0.1) 100%)`,
  borderRadius: theme.spacing(2),
  padding: theme.spacing(4),
  marginBottom: theme.spacing(4),
}))

const StyledButton = styled(Button)(({ theme, variant: buttonVariant }) => ({
  padding: theme.spacing(1, 2),
  borderRadius: theme.spacing(1.5),
  textTransform: 'none',
  fontWeight: 600,
  transition: 'all 0.3s ease',
  ...(buttonVariant === 'primary' ? {
    backgroundColor: '#23252a',
    color: 'white',
    '&:hover': {
      backgroundColor: 'rgba(35, 37, 54, 0.9)',
    },
  } : {
    border: '1px solid #23252a',
    color: '#23252a',
    backgroundColor: 'transparent',
    '&:hover': {
      backgroundColor: '#23252a',
      color: 'white',
    },
  }),
}))

const AboutUs = () => {
  // const navigate = useNavigate()
  const navigate = () => {}
  const featuresRef = useRef(null)

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -100px 0px',
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.classList.add('animate-fade-in-up')
          }, index * 100)
        }
      })
    }, observerOptions)

    const featureElements = featuresRef.current?.querySelectorAll('.feature-item')
    featureElements?.forEach((item) => {
      observer.observe(item)
    })

    return () => {
      featureElements?.forEach((item) => {
        observer.unobserve(item)
      })
    }
  }, [])
const features = [
  {
    icon: <EmojiEventsRoundedIcon sx={{ fontSize: 32, color: '#ffda1b' }} />,
    title: 'Expert research team',
    description:
      'Research teams led by ex-Tier 1 tax professionals with extensive experience in corporate, international tax, transfer pricing & indirect taxes.',
  },
  {
    icon: <VerifiedUserRoundedIcon sx={{ fontSize: 32, color: '#ffda1b' }} />,
    title: 'Official sources only',
    description:
      'Only official gazettes, regulators, and treaty repositories; no secondary sources. Clear indication on portal for unofficial translations.',
  },
  {
    icon: <GroupsRoundedIcon sx={{ fontSize: 32, color: '#ffda1b' }} />,
    title: 'Professionally reviewed',
    description:
      'Every document is reviewed by qualified lawyers and chartered accountants to ensure technical accuracy of the laws.',
  },
  {
    icon: <SettingsRoundedIcon sx={{ fontSize: 32, color: '#ffda1b' }} />,
    title: 'Structured editorial workflow',
    description:
      'Structured editorial workflow: primary researcher → senior reviewer → final sign-off.',
  },
  {
    icon: <ReportRoundedIcon sx={{ fontSize: 32, color: '#ffda1b' }} />,
    title: 'Issue tracking & fixes',
    description:
      'In-portal issue reporting; fixes tracked through a changelog; high-signal requests prioritized.',
  },
]

  const userTypes = [
    'Tax consultants and lawyers',
    'In-house finance and compliance teams',
    'Lecturers, students, and researchers',
    'Entrepreneurs and investors exploring GCC markets',
  ]
// const domainContent = {
//   'uaetaxlaws.com': 'of the UAE',
//   'ksataxlaws.com': 'of Saudi Arabia',
//   'qatartaxlaws.com': 'of Qatar',
//   'kuwaittaxlaws.com': 'of Kuwait',
//   'bahraintaxlaws.com': 'of Bahrain',
//   'omantaxlaws.com': 'of Oman',
//   'gcctaxlaws.com': 'across UAE, Saudi Arabia, Qatar, Kuwait, Bahrain and Oman',
// }
const countryText = 'across UAE, Saudi Arabia, Qatar, Kuwait, Bahrain and Oman'
  return (
    <ThemeProvider theme={theme}>
      <Box>
        {/* Hero Section */}
        <HeroSection>
          <Container maxWidth='lg'>
            <Box sx={{ textAlign: 'center', maxWidth: '900px', mx: 'auto' }}>
              <Typography
                variant='h1'
                sx={{
                  mb: 3,
                  lineHeight: 1.2,
                  fontSize: { xs: '2.5rem', md: '3.75rem' },
                }}
              >
                About us
              </Typography>
              <GoldDivider />
              <Typography
                variant='h2'
                sx={{
                  color: '#e2e8f0',
                  mb: 4,
                  fontWeight: 500,
                  lineHeight: 1.6,
                  fontSize: '1.125rem', // Keeping the visual size small as requested previously
                }}
              >
                GCCTaxLaws.com is a single research
                platform for GCC tax research, built from
                the official texts of tax laws, decisions, guides and treaties{' '}
                {countryText}. We parse these official sources and structure
                them into a clean, searchable research layer, so you can
                navigate at article level, follow cross-references, and move
                from law text to implementing guidance with speed and clarity.
              </Typography>

              <Typography
                variant='h2'
                sx={{
                  color: '#cbd5e1',
                  mb: 3,
                  lineHeight: 1.6,
                  maxWidth: '750px',
                  mx: 'auto',
                  fontSize: '1.125rem',
                }}
              >
                Our coverage spans corporate tax, transfer pricing, DTAAs, VAT,
                excise, customs, and key transparency regimes such as FATCA and
                CRS alongside emerging areas such as the OECD’s Pillar Two
                global minimum tax, including local implementation measures like
                DMTT where relevant.
              </Typography>

              <Typography
                variant='h2'
                sx={{
                  color: '#cbd5e1',
                  mb: 3,
                  lineHeight: 1.6,
                  maxWidth: '750px',
                  mx: 'auto',
                  fontSize: '1.125rem',
                }}
              >
                Designed for advisers, in-house tax and finance teams,
                academics, and students, the platform brings scattered PDFs and
                portals into one place, with professional-grade features like
                filters, search, notes, exports, and source integrity controls,
                including update tracking, so research that used to take hours
                can be done in minutes.
              </Typography>
            </Box>
          </Container>
        </HeroSection>
        {/* <HeroSection>
          <Container maxWidth='lg'>
            <Box sx={{ textAlign: 'center', maxWidth: '900px', mx: 'auto' }}>

              <Typography
                variant='h1'
                sx={{
                  mb: 3,
                  lineHeight: 1.2,
                  fontSize: { xs: '2.5rem', md: '3.75rem' },
                }}
              >
                About us
              </Typography>
              <GoldDivider />

              <Box sx={{ textAlign: 'left', mt: 4 }}>
                <Typography
                  variant='body1'
                  sx={{
                    color: '#e2e8f0',
                    mb: 3,
                    fontWeight: 500,
                    lineHeight: 1.8,
                    fontSize: '1.125rem',
                  }}
                >
                  gcctaxlaws.com is a single research platform for tax laws in
                  the Gulf Cooperation Council ("GCC") region, covering the UAE,
                  Saudi Arabia, Qatar, Kuwait, Bahrain and Oman.
                </Typography>
                <Typography
                  variant='body1'
                  sx={{
                    color: '#cbd5e1',
                    mb: 3,
                    lineHeight: 1.8,
                    fontSize: '1.125rem',
                  }}
                >
                  We centralize GCC tax sources (laws, regulations, decisions,
                  treaties and guides) for corporate tax, transfer pricing,
                  DTAAs, VAT, excise, customs, FATCA and CRS.
                </Typography>
                <Typography
                  variant='body1'
                  sx={{
                    color: '#cbd5e1',
                    mb: 3,
                    lineHeight: 1.8,
                    fontSize: '1.125rem',
                  }}
                >
                  One query returns the precise article and official guidance,
                  cross-linked and citation-ready. Every citation is anchored to
                  official sources so users can move from article to paragraph
                  to implementing guidance without noise or guesswork.
                </Typography>
                <Typography
                  variant='body1'
                  sx={{
                    color: '#cbd5e1',
                    lineHeight: 1.8,
                    fontSize: '1.125rem',
                  }}
                >
                  Built for advisers, in-house tax and finance teams, academics
                  and students, the platform reduces time spent switching
                  between scattered PDFs, portals and translations, turning
                  hours of research into minutes.
                </Typography>
              </Box>
            </Box>
          </Container>
        </HeroSection> */}
        {/* Why You Can Rely Section */}
        <Box sx={{ backgroundColor: 'white', py: 10 }}>
          <Container maxWidth='lg'>
            <Box sx={{ textAlign: 'center', mb: 8 }}>
              <Typography variant='h2' sx={{ color: '#23252a', mb: 2 }}>
                Why you can rely on GCCTaxLaws.com
              </Typography>
              <GoldDivider sx={{ width: '80px' }} />
            </Box>

            <Grid
              container
              spacing={4}
              ref={featuresRef}
              sx={{
                display: 'grid',
                gridTemplateColumns: {
                  xs: '1fr',
                  md: 'repeat(2, 1fr)',
                  lg: 'repeat(3, 1fr)',
                },
                gap: 4,
              }}
            >
              {features.map((feature, index) => (
                <FeatureCard
                  key={index}
                  className='feature-item'
                  variant={index % 2 !== 0 ? 'grey:900' : 'alternate'}
                >
                  <CardContent sx={{ p: 0 }}>
                    <InfoBox sx={{ mb: 2, width: 48, height: 48 }}>
                      {feature.icon}
                    </InfoBox>
                    <Typography
                      variant='h6'
                      sx={{
                        color: 'text.primary',
                        mb: 1.5,
                        fontWeight: 600,
                      }}
                    >
                      {feature.title}
                    </Typography>
                    <Typography
                      variant='body2'
                      sx={{
                        color: 'text.secondary',
                        lineHeight: 1.6,
                      }}
                    >
                      {feature.description}
                    </Typography>
                  </CardContent>
                </FeatureCard>
              ))}
            </Grid>
          </Container>
        </Box>

        {/* Who Will Find It Useful */}
        <Box
          sx={{
            background: 'linear-gradient(90deg, #23252a 0%, #374151 100%)',
            color: 'white',
            py: 10,
          }}
        >
          <Container maxWidth='lg'>
            <Grid container spacing={6} alignItems='center'>
              <Grid item xs={12} lg={6}>
                <Typography variant='h2' sx={{ mb: 3 }}>
                  Who will find it useful
                </Typography>
                <GoldDivider sx={{ mx: 0, mb: 4 }} />
                <Typography
                  variant='body1'
                  sx={{
                    color: '#e2e8f0',
                    fontSize: '1.125rem',
                    lineHeight: 1.6,
                    mb: 4,
                  }}
                >
                  Our platform serves a diverse community of professionals and
                  learners across the GCC region.
                </Typography>
              </Grid>
              <Grid item xs={12} lg={6}>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  {userTypes.map((userType, index) => (
                    <UserTypeCard key={index}>
                      <People
                        sx={{
                          fontSize: 20,
                          color: '#ffda1b',
                          mr: 2,
                          flexShrink: 0,
                        }}
                      />
                      <Typography
                        sx={{
                          color: 'white',
                          fontWeight: 500,
                        }}
                      >
                        {userType}
                      </Typography>
                    </UserTypeCard>
                  ))}
                </Box>
              </Grid>
            </Grid>
          </Container>
        </Box>

        {/* Trust and Transparency */}
        <Box sx={{ backgroundColor: '#f8fafc', py: 10 }}>
          <Container maxWidth='lg'>
            <Grid container spacing={6} alignItems='center'>
              <Grid item xs={12} lg={6} sx={{ order: { xs: 1, lg: 2 } }}>
                <TrustCard>
                  <Security sx={{ fontSize: 48, color: '#ffda1b', mb: 3 }} />
                  <Typography variant='h4' sx={{ color: '#23252a', mb: 3 }}>
                    Trust and transparency
                  </Typography>
                  <Box
                    sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
                  >
                    <Typography
                      variant='body1'
                      sx={{
                        color: 'text.secondary',
                        lineHeight: 1.6,
                      }}
                    >
                      Every document on GCCTaxLaws.com is converted to clean,
                      searchable HTML from the official government source text
                      and hosted directly on our site.
                    </Typography>
                    <Typography
                      variant='body1'
                      sx={{
                        color: 'text.secondary',
                        lineHeight: 1.6,
                      }}
                    >
                      In cases where we host unofficial / best effort
                      translations, the same is clearly mentioned on such
                      documents.{' '}
                      <Box
                        component='span'
                        sx={{ fontWeight: 'bold', color: '#23252a' }}
                      >
                        No paraphrases. No alterations.
                      </Box>
                    </Typography>
                    <Alert
                      severity='warning'
                      sx={{
                        backgroundColor: '#fef3c7',
                        color: '#92400e',
                        border: 'none',
                        borderLeft: '4px solid #f59e0b',
                        borderRadius: '0 8px 8px 0',
                        '& .MuiAlert-icon': {
                          color: '#f59e0b',
                        },
                      }}
                    >
                      <Typography variant='body2' sx={{ fontWeight: 500 }}>
                        While we strive for accuracy, the platform is a research
                        aid, not a substitute for professional advice. For all
                        matters, consult qualified tax advisors or the issuing
                        authority.
                      </Typography>
                    </Alert>
                  </Box>
                </TrustCard>
              </Grid>
              <Grid item xs={12} lg={6} sx={{ order: { xs: 2, lg: 1 } }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                  <Box
                    sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}
                  >
                    <InfoBox>
                      <CheckCircle sx={{ fontSize: 24, color: '#ffda1b' }} />
                    </InfoBox>
                    <Box>
                      <Typography
                        variant='subtitle1'
                        sx={{
                          fontWeight: 600,
                          color: '#23252a',
                          mb: 0.5,
                        }}
                      >
                        Official sources only
                      </Typography>
                      <Typography
                        variant='body2'
                        sx={{ color: 'text.secondary' }}
                      >
                        Direct conversion from government publications
                      </Typography>
                    </Box>
                  </Box>
                  <Box
                    sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}
                  >
                    <InfoBox>
                      <Security sx={{ fontSize: 24, color: '#ffda1b' }} />
                    </InfoBox>
                    <Box>
                      <Typography
                        variant='subtitle1'
                        sx={{
                          fontWeight: 600,
                          color: '#23252a',
                          mb: 0.5,
                        }}
                      >
                        Transparent process
                      </Typography>
                      <Typography
                        variant='body2'
                        sx={{ color: 'text.secondary' }}
                      >
                        Clear labeling of translations and sources
                      </Typography>
                    </Box>
                  </Box>
                  <Box
                    sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}
                  >
                    <InfoBox>
                      <Description sx={{ fontSize: 24, color: '#ffda1b' }} />
                    </InfoBox>
                    <Box>
                      <Typography
                        variant='subtitle1'
                        sx={{
                          fontWeight: 600,
                          color: '#23252a',
                          mb: 0.5,
                        }}
                      >
                        Research aid
                      </Typography>
                      <Typography
                        variant='body2'
                        sx={{ color: 'text.secondary' }}
                      >
                        Supplement to professional consultation
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Container>
        </Box>

        {/* What's Next */}
        <Box sx={{ backgroundColor: 'white', py: 10 }}>
          <Container maxWidth='md'>
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant='h2' sx={{ color: '#23252a', mb: 3 }}>
                What's next
              </Typography>
              <GoldDivider sx={{ width: '80px' }} />

              <StatusBox>
                <Grid container spacing={4} alignItems='center'>
                  <Grid item xs={12} md={6}>
                    <Box sx={{ textAlign: 'left' }}>
                      <Typography
                        variant='h5'
                        sx={{
                          fontWeight: 'bold',
                          color: '#23252a',
                          mb: 2,
                        }}
                      >
                        Current status
                      </Typography>
                      <Box
                        sx={{ display: 'flex', alignItems: 'center', mb: 1 }}
                      >
                        <CheckCircle
                          sx={{ fontSize: 20, color: 'green', mr: 1.5 }}
                        />
                        <Typography sx={{ color: 'text.primary' }}>
                          UAE Corporate Tax Law - Live
                        </Typography>
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Schedule
                          sx={{ fontSize: 20, color: '#f59e0b', mr: 1.5 }}
                        />
                        <Typography sx={{ color: 'text.primary' }}>
                          Additional laws and GCC jurisdictions - under
                          development
                        </Typography>
                      </Box>
                    </Box>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Box sx={{ textAlign: 'left' }}>
                      <Typography
                        variant='h5'
                        sx={{
                          fontWeight: 'bold',
                          color: '#23252a',
                          mb: 2,
                        }}
                      >
                        Stay connected
                      </Typography>
                      <Typography
                        variant='body1'
                        sx={{
                          color: 'text.secondary',
                          mb: 2,
                          lineHeight: 1.6,
                        }}
                      >
                        Visit our Contact us page, follow us on LinkedIn to keep
                        up with new releases and platform enhancements.
                      </Typography>
                      <Box
                        sx={{
                          display: 'flex',
                          flexDirection: { xs: 'column', sm: 'row' },
                          gap: 2,
                        }}
                      >
                        <StyledButton
                          variant='primary'
                          onClick={() => navigate('/contact-us')}
                          endIcon={<ArrowForward sx={{ fontSize: 16 }} />}
                        >
                          Contact Us
                        </StyledButton>
                        <StyledButton
                          variant='secondary'
                          onClick={() =>
                            window.open(
                              'https://www.linkedin.com/company/gcctaxlaws',
                              '_blank',
                            )
                          }
                          endIcon={<ArrowForward sx={{ fontSize: 16 }} />}
                        >
                          LinkedIn
                        </StyledButton>
                      </Box>
                    </Box>
                  </Grid>
                </Grid>
              </StatusBox>
            </Box>
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  )
}

export default AboutUs