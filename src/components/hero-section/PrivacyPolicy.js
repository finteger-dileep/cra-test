import React from 'react'
import { Box, Container, Typography, Grid, Link,Button} from '@mui/material'
import { styled, createTheme, ThemeProvider } from '@mui/material/styles'
// import {
//   Shield,
//   Eye,
//   Users,
//   Lock,
//   FileText,
//   Mail,
//   Calendar,
//   ExternalLink,
// } from 'lucide-react'
import {
  Shield,
  // Eye,
  People as Users,
  Lock,
  Description as FileText,
  Mail,
  CalendarToday as Calendar,
  OpenInNew as ExternalLink,
} from '@mui/icons-material'

const PrivacyPolicy = () => {
  // Color palette
  const colors = {
    primary: '#ffda1b',
    primaryAlpha10: 'rgba(255, 218, 27, 0.1)',
    primaryAlpha20: 'rgba(255, 218, 27, 0.2)',
    darkGray: 'rgb(35, 37, 54)',
    mediumGray: 'rgb(55, 65, 81)',
    lightGray: 'rgb(75, 85, 99)',
    backgroundGray: 'rgb(249, 250, 251)',
    borderGray: 'rgb(229, 231, 235)',
    white: 'white',
  }

  // Common spacing
  const spacing = {
    xs: { xs: 1, sm: 1.5 },
    sm: { xs: 1.5, sm: 2 },
    md: { xs: 2, sm: 3 },
    lg: { xs: 3, sm: 4 },
    xl: { xs: 4, sm: 6 },
    xxl: { xs: 6, sm: 8 },
  }
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

  // Reusable style objects
  const styles = {
    // Icon container styles
    iconContainer: {
      backgroundColor: colors.primaryAlpha10,
      p: spacing.xs,
      borderRadius: 2,
      mr: spacing.sm,
      color: colors.primary,
    },

    iconContainerLarge: {
      backgroundColor: colors.primaryAlpha20,
      p: { xs: 2, sm: 2.5 },
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      boxShadow: '0 8px 32px rgba(255, 218, 27, 0.1)',
      color: colors.primary,
      width: { xs: 76, sm: 76 },
      height: { xs: 76, sm: 76 },
    },

    // Section header styles
    sectionHeader: {
      display: 'flex',
      alignItems: 'center',
      mb: spacing.md,
    },

    sectionTitle: {
      fontWeight: 'bold',
      color: colors.darkGray,
    },

    // Card styles
    card: {
      backgroundColor: colors.backgroundGray,
      border: `1px solid ${colors.borderGray}`,
      borderRadius: 3,
      p: 2,
    },

    cardHover: {
      backgroundColor: colors.backgroundGray,
      border: `1px solid ${colors.borderGray}`,
      borderRadius: 3,
      p: 2,
      transition: 'box-shadow 0.3s ease',
      '&:hover': {
        boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
      },
    },

    cardWithLeftBorder: {
      backgroundColor: colors.backgroundGray,
      borderRadius: 3,
      p: 2,
      borderLeft: `4px solid ${colors.primary}`,
    },

    // Text styles
    bodyText: {
      color: colors.lightGray,
      lineHeight: 1.6,
      fontSize: '0.875rem',
    },

    bodyTextLarge: {
      color: colors.lightGray,
      lineHeight: 1.6,
      fontSize: { xs: '1rem', sm: '1.125rem' },
    },

    subtitle: {
      fontWeight: 600,
      color: colors.darkGray,
      mb: 1,
    },

    // Navigation item
    navItem: {
      display: 'flex',
      alignItems: 'center',
      p: spacing.sm,
      backgroundColor: colors.white,
      borderRadius: 3,
      boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1)',
      cursor: 'pointer',
      textAlign: 'left',
      transition: 'all 0.3s ease',
      '&:hover': {
        boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
        transform: 'translateY(-4px)',
      },
    },

    // Gradient backgrounds
    gradientDark: {
      background: `linear-gradient(135deg, ${colors.darkGray} 0%, ${colors.mediumGray} 100%)`,
    },

    gradientLight: {
      background: `linear-gradient(90deg, ${colors.primaryAlpha10} 0%, rgba(35, 37, 54, 0.1) 100%)`,
    },

    gradientSection: {
      background: `linear-gradient(90deg, ${colors.darkGray} 0%, ${colors.mediumGray} 100%)`,
      borderRadius: spacing.lg,
      p: spacing.lg,
      color: colors.white,
    },

    // Additional sections styles
    additionalSectionsContainer: {
      display: 'flex',
      flexDirection: 'column',
      gap: '24px',
      maxWidth: '800px',
      margin: '0 auto',
      padding: '16px',
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    },

    additionalSection: {
      backgroundColor: colors.backgroundGray,
      borderRadius: '12px',
      padding: '16px',
      border: `1px solid ${colors.borderGray}`,
    },

    additionalSectionHeader: {
      display: 'flex',
      alignItems: 'center',
      marginBottom: '12px',
    },

    additionalSectionTitle: {
      fontSize: '1.25rem',
      fontWeight: 'bold',
      color: colors.darkGray,
      margin: 0,
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    },

    additionalSectionText: {
      color: colors.lightGray,
      lineHeight: 1.6,
      fontSize: '0.875rem',
      margin: 0,
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    },

    additionalSectionIcon: {
      width: '20px',
      height: '20px',
      color: colors.primary,
      marginRight: '8px',
    },
  }

  // Utility functions
  const createIconBox = (IconComponent, size = { xs: 20, sm: 24 }) => (
    <Box sx={styles.iconContainer}>
      <IconComponent
        sx={{ width: size, height: size, color: colors.primary }}
      />
    </Box>
  )

  const createBulletPoint = () => (
    <Box
      sx={{
        backgroundColor: colors.primaryAlpha20,
        p: 0.75,
        borderRadius: '50%',
        mt: 0.5,
      }}
    >
      <Box
        sx={{
          width: 6,
          height: 6,
          backgroundColor: colors.primary,
          borderRadius: '50%',
        }}
      />
    </Box>
  )

  const sections = [
    // {
    //   id: 'information-collect',
    //   title: 'Information We Collect',
    //   icon: <Eye className='w-5 h-5' />,
    // },
    {
      id: 'how-we-use',
      title: 'How We Use Your Information',
      icon: <FileText className='w-5 h-5' />,
    },
    {
      id: 'disclosure',
      title: 'Disclosure of Your Information',
      icon: <Users className='w-5 h-5' />,
    },
    {
      id: 'data-security',
      title: 'Data Security',
      icon: <Lock className='w-5 h-5' />,
    },
    {
      id: 'your-rights',
      title: 'Your Rights',
      icon: <Shield className='w-5 h-5' />,
    },
    {
      id: 'contact',
      title: 'Contact Us',
      icon: <Mail className='w-5 h-5' />,
    },
  ]

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  const informationTypes = [
    {
      title: 'Personal Information',
      content:
        'We may collect personal information that you voluntarily provide to us when you use the Website, such as your name, email address, phone number, and any other information you provide through forms or communications.',
    },
    {
      title: 'Usage Data',
      content:
        'We may collect information about how you use the Website, including IP addresses, browser types, operating systems, referring URLs, pages viewed, and the dates and times of visits.',
    },
    {
      title: 'Cookies and Tracking Technologies',
      content:
        'We use cookies and other tracking technologies to enhance your experience on the Website. Cookies are small files placed on your device that help us understand your preferences and improve our services.',
    },
  ]

  const usageCards = [
    {
      title: 'To Provide and Improve Our Services',
      content:
        'We use your information to operate and maintain the Website, respond to your inquiries, and improve our services.',
    },
    {
      title: 'To Analyze and Monitor Usage',
      content:
        'We use usage data to analyze trends, track user interactions, and enhance the functionality of the Website.',
    },
  ]

  const disclosureItems = [
    {
      title: 'Service Providers',
      content:
        'We may share your information with third-party service providers who perform services on our behalf, such as hosting, data analysis, and email communication. These service providers are contractually obligated to protect your information and use it only for the purposes for which it was disclosed.',
    },
    {
      title: 'Legal Requirements',
      content:
        'We may disclose your information if required to do so by law or in response to valid requests by public authorities (e.g., a subpoena or court order).',
    },
    {
      title: 'Business Transfers',
      content:
        'In the event of a merger, acquisition, or any other business reorganization, your information may be transferred to the acquiring entity as part of the transaction.',
    },
  ]

  const userRights = [
    // {
    //   title: 'Access and Correction',
    //   content:
    //     'You have the right to access and correct your personal information that we hold. You may contact us to request access or correction of your information.',
    //   icon: <Eye sx={{ width: 16, height: 16 }} />,
    // },
    {
      title: 'Data Deletion',
      content:
        'You may request the deletion of your personal information, subject to any legal obligations we may have to retain it.',
      icon: <FileText sx={{ width: 16, height: 16 }} />,
    },
    {
      title: 'Opt-Out',
      content:
        'You may opt out of receiving marketing communications from us by following the unsubscribe instructions in those communications or contacting us directly.',
      icon: <Mail sx={{ width: 16, height: 16 }} />,
    },
  ]

  const additionalSections = [
    {
      title: 'Third-Party Links',
      icon: ExternalLink,
      content:
        'The Website may contain links to third-party websites. We are not responsible for the privacy practices or content of those websites. We encourage you to review the privacy policies of any third-party websites you visit.',
    },
    {
      title: "Children's Privacy",
      icon: Users,
      content:
        'The Website is not intended for use by children under the age of 18. We do not knowingly collect personal information from children under 18. If we become aware that we have collected personal information from a child under 18, we will take reasonable steps to delete such information.',
    },
    {
      title: 'Changes to this Privacy Policy',
      icon: Calendar,
      content:
        'We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated effective date. We encourage you to review this Privacy Policy periodically to stay informed about how we are protecting your information.',
    },
  ]

  return (
    <>
      {/* Hero Section */}
      <Box
        sx={{
          ...styles.gradientDark,
          color: colors.white,
          py: { xs: 6, sm: 8, lg: 10 },
          px: spacing.sm,
        }}
      >
        <Container maxWidth='lg' sx={{ textAlign: 'center' }}>
          <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
            <Box sx={styles.iconContainerLarge}>
              <Shield
                size={100}
                sx={{
                  filter: 'drop-shadow(0 2px 8px rgba(255, 218, 27, 0.3))',
                }}
              />
            </Box>
          </Box>

          <Typography
            variant='h1'
            sx={{
              fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem', lg: '3.75rem' },
              fontWeight: 'bold',
              mb: 3,
            }}
          >
            Privacy policy
          </Typography>
          <Box
            sx={{
              width: { xs: 64, sm: 96 },
              height: 4,
              backgroundColor: colors.primary,
              mx: 'auto',
              mb: spacing.lg,
            }}
          />
          <Typography
            variant='h6'
            sx={{
              color: colors.borderGray,
              maxWidth: '64rem',
              mx: 'auto',
              lineHeight: 1.6,
              px: 2,
            }}
          >
            Your privacy is important to us. This policy explains how
            GCCTaxLaws.com collects, uses, and protects your information when
            you use our services.
          </Typography>
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
            spacing={{ xs: 1.5, sm: 2 }}
            sx={{
              display: 'grid',
              gridTemplateColumns: {
                xs: '1fr',
                sm: 'repeat(2, 1fr)',
                lg: 'repeat(3, 1fr)',
                // xl: 'repeat(4, 1fr)',
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
      <Box
        sx={{
          backgroundColor: colors.white,
          color: colors.darkGray,
          py: spacing.xxl,
          px: spacing.sm,
        }}
      >
        <Container maxWidth='lg'>
          {/* Introduction */}
          <Box
            sx={{
              ...styles.gradientLight,
              borderRadius: spacing.lg,
              p: spacing.lg,
              mb: spacing.xl,
            }}
          >
            <Typography sx={styles.bodyTextLarge}>
              Welcome to{' '}
              <strong style={{ color: colors.darkGray }}>GCCTaxLaws.com</strong>{' '}
              (the "Website"). This Privacy Policy explains how GCCTaxLaws.com
              ("we," "our," or "us") collects, uses, discloses, and safeguards
              your information when you visit our Website. By using the Website,
              you agree to the collection and use of information in accordance
              with this Privacy Policy.
            </Typography>
          </Box>

          {/* Information We Collect */}
          <Box
            component='section'
            id='information-collect'
            sx={{ mb: spacing.xl }}
          >
            <Box sx={styles.sectionHeader}>
              {/* {createIconBox(Eye)} */}
              <Typography variant='h4' sx={styles.sectionTitle}>
                Information We Collect
              </Typography>
            </Box>

            <Typography sx={{ ...styles.bodyTextLarge, mb: spacing.md }}>
              We collect the following types of information:
            </Typography>

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
              {informationTypes.map((item, index) => (
                <Box key={index} sx={styles.cardWithLeftBorder}>
                  <Typography variant='h6' sx={styles.subtitle}>
                    {item.title}
                  </Typography>
                  <Typography sx={styles.bodyText}>{item.content}</Typography>
                </Box>
              ))}
            </Box>
          </Box>

          {/* How We Use Your Information */}
          <Box component='section' id='how-we-use' sx={{ mb: spacing.xl }}>
            <Box sx={styles.sectionHeader}>
              {createIconBox(FileText)}
              <Typography variant='h4' sx={styles.sectionTitle}>
                How We Use Your Information
              </Typography>
            </Box>

            <Grid container spacing={2}>
              {usageCards.map((card, index) => (
                <Grid item xs={12} md={6} key={index}>
                  <Box sx={styles.cardHover}>
                    <Typography variant='h6' sx={styles.subtitle}>
                      {card.title}
                    </Typography>
                    <Typography sx={styles.bodyText}>{card.content}</Typography>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Box>

          {/* Disclosure of Information */}
          <Box component='section' id='disclosure' sx={{ mb: spacing.xl }}>
            <Box sx={styles.sectionHeader}>
              {createIconBox(Users)}
              <Typography variant='h4' sx={styles.sectionTitle}>
                Disclosure of Your Information
              </Typography>
            </Box>

            <Typography sx={{ ...styles.bodyTextLarge, mb: spacing.md }}>
              We may disclose your information in the following circumstances:
            </Typography>

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
              {disclosureItems.map((item, index) => (
                <Box
                  key={index}
                  sx={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: 1.5,
                    p: 1.5,
                    backgroundColor: colors.backgroundGray,
                    borderRadius: 3,
                  }}
                >
                  {createBulletPoint()}
                  <Box sx={{ flex: 1 }}>
                    <Typography
                      variant='subtitle2'
                      sx={{ ...styles.subtitle, mb: 0.5 }}
                    >
                      {item.title}
                    </Typography>
                    <Typography
                      sx={{ ...styles.bodyText, fontSize: '0.75rem' }}
                    >
                      {item.content}
                    </Typography>
                  </Box>
                </Box>
              ))}
            </Box>
          </Box>

          {/* Data Security */}
          <Box component='section' id='data-security' sx={{ mb: spacing.xl }}>
            <Box sx={styles.sectionHeader}>
              {createIconBox(Lock)}
              <Typography variant='h4' sx={styles.sectionTitle}>
                Data Security
              </Typography>
            </Box>

            <Box sx={styles.card}>
              <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.5 }}>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: colors.primaryAlpha20,
                    p: 1,
                    borderRadius: '50%',
                    color: colors.primary,
                  }}
                >
                  <Shield
                    sx={{ width: 16, height: 16, color: colors.primary }}
                  />
                </Box>
                <Box>
                  <Typography variant='h6' sx={styles.subtitle}>
                    Our Security Commitment
                  </Typography>
                  <Typography sx={styles.bodyText}>
                    We implement reasonable security measures to protect your
                    information from unauthorized access, use, or disclosure.
                    However, no security system is impenetrable, and we cannot
                    guarantee the security of your information transmitted to or
                    from the Website.
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Box>

          {/* Your Rights */}
          <Box component='section' id='your-rights' sx={{ mb: spacing.xl }}>
            <Box sx={styles.sectionHeader}>
              {createIconBox(Shield)}
              <Typography variant='h4' sx={styles.sectionTitle}>
                Your Rights
              </Typography>
            </Box>

            <Typography sx={{ ...styles.bodyTextLarge, mb: spacing.md }}>
              You have the following rights regarding your personal information:
            </Typography>

            <Grid container spacing={2}>
              {userRights.map((right, index) => (
                <Grid item xs={12} key={index}>
                  <Box
                    sx={{
                      ...styles.card,
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                      },
                    }}
                  >
                    <Box
                      sx={{ display: 'flex', alignItems: 'center', mb: 1.5 }}
                    >
                      <Box sx={styles.iconContainer}>
                        <Box
                          sx={{
                            width: '20px',
                            height: '20px',
                            color: colors.primary,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}
                        >
                          {right.icon}
                        </Box>
                      </Box>
                      <Typography
                        variant='h6'
                        sx={{ ...styles.subtitle, mb: 0 }}
                      >
                        {right.title}
                      </Typography>
                    </Box>
                    <Typography sx={styles.bodyText}>
                      {right.content}
                    </Typography>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Box>

          {/* Additional Sections */}
          <Grid container spacing={2}>
            {additionalSections.map((section, index) => (
              <Grid item xs={12} key={index}>
                <Box
                  sx={{
                    ...styles.card,
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                    },
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1.5 }}>
                    <Box sx={styles.iconContainer}>
                      <Box
                        sx={{
                          width: '20px',
                          height: '20px',
                          color: colors.primary,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        <section.icon />
                      </Box>
                    </Box>
                    <Typography variant='h6' sx={{ ...styles.subtitle, mb: 0 }}>
                      {section.title}
                    </Typography>
                  </Box>
                  <Typography sx={styles.bodyText}>
                    {section.content}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>

          {/* Contact Section */}
          <Box component='section' id='contact' sx={{ mt: spacing.xxl }}>
            <Box sx={styles.gradientSection}>
              <Box sx={styles.sectionHeader}>
                <Box
                  sx={{
                    backgroundColor: colors.primaryAlpha20,
                    p: spacing.xs,
                    borderRadius: 2,
                    mr: spacing.sm,
                    color: colors.primary,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Mail
                    sx={{
                      width: { xs: 20, sm: 24 },
                      height: { xs: 20, sm: 24 },
                      color: colors.primary,
                    }}
                  />
                </Box>
                <Typography variant='h4' sx={{ fontWeight: 'bold' }}>
                  Contact Us
                </Typography>
              </Box>
              <Typography
                sx={{
                  color: colors.borderGray,
                  mb: spacing.md,
                  fontSize: { xs: '1rem', sm: '1.125rem' },
                  lineHeight: 1.6,
                }}
              >
                If you have any questions or concerns about this Privacy Policy
                or our data practices, please don't hesitate to reach out to us{' '}
                <Link
                  href='mailto:support@gcctaxlaws.com'
                  sx={{
                    color: colors.white,
                    fontWeight: 'bold',
                    textDecoration: 'none',
                    px: 0,
                    py: 1,
                    borderRadius: 2,
                    transition: 'background-color 0.3s ease',
                    '&:hover': {
                      backgroundColor: colors.mediumGray,
                    },
                  }}
                >
                  support@gcctaxlaws.com
                </Link>
                .
              </Typography>
            </Box>
          </Box>
        </Container>
      </Box>
    </>
  )
}

export default PrivacyPolicy
