import React, { useState, useEffect } from 'react'
import {Alert,
  Container,
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  Grid,
  Chip,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ToggleButton,
  ToggleButtonGroup,
  Paper,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Stack,
  useTheme,
  useMediaQuery,
  Tooltip,
  keyframes,
  Snackbar
} from '@mui/material'
import {
  Check,
  Star,
  TrendingUp,
  Lock,
  Speed,
  Support,
  ExpandMore,
  ShoppingCart,
  AccountBalance,
  Verified,
  LocalOffer,
  Business,
  Email,
  Info,
} from '@mui/icons-material'
// import { useNavigate, useLocation } from 'react-router-dom'
// import { useAuth } from '../../context/AuthContext'
// import { StaticPageWrapper } from './RouteWrappers'

// Theme colors
const themeColors = {
  primary: '#232536',
  secondary: '#ffcf51',
  hover: '#3a3e5a',
}

// Blinking animation for FREE FOREVER
const blink = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0.3; }
`

const Pricing = () => {
  // const navigate = useNavigate()
  // const location = useLocation()
  // const { isAuthenticated, user, quotaStatus } = useAuth()
  const navigate = () => {}
  const location = { hash: '' }
  const isAuthenticated = false
  const user = null
  const quotaStatus = null
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
  const isTablet = useMediaQuery(theme.breakpoints.down('md'))

  const [billingCycle, setBillingCycle] = useState('monthly')

  // HARDCODED PLANS DATA
  const plans = [
    {
      id: 1,
      planCode: 'COMPLETE_ALL_ANNUAL',
      planName: 'Complete Access Annual - All GCC Countries + DTAA',
      description:
        '12 months complete unlimited access to all 6 GCC countries tax laws plus all Double Taxation Avoidance Agreements',
      priceAed: 1399.99,
      durationType: 'ANNUAL',
      isRecurring: true,
      isActive: true,
    },
    {
      id: 2,
      planCode: 'COMPLETE_ALL_MONTHLY',
      planName: 'Complete Access Monthly - All GCC Countries + DTAA',
      description:
        '1 month complete unlimited access to all 6 GCC countries tax laws plus all Double Taxation Avoidance Agreements',
      priceAed: 159.99,
      durationType: 'MONTHLY',
      isRecurring: true,
      isActive: true,
    },
    {
      id: 3,
      planCode: 'COMPLETE_ALL_DAILY',
      planName: 'Complete Access 1-Day Pass - All GCC Countries + DTAA',
      description:
        '24-hour complete unlimited access to all 6 GCC countries tax laws plus all Double Taxation Avoidance Agreements',
      priceAed: 29.99,
      durationType: 'DAILY',
      isRecurring: false,
      isActive: true,
    },
    {
      id: 4,
      planCode: 'DTAA_ALL_ANNUAL',
      planName: 'DTAA Only Annual - All Countries',
      description:
        '12 months unlimited access to Double Taxation Avoidance Agreements for all countries (DTAA treaties only, no domestic tax laws)',
      priceAed: 849.99,
      durationType: 'ANNUAL',
      isRecurring: true,
      isActive: true,
    },
    {
      id: 5,
      planCode: 'DTAA_ALL_MONTHLY',
      planName: 'DTAA Only Monthly - All Countries',
      description:
        '1 month unlimited access to Double Taxation Avoidance Agreements for all countries (DTAA treaties only, no domestic tax laws)',
      priceAed: 99.99,
      durationType: 'MONTHLY',
      isRecurring: true,
      isActive: true,
    },
    // Legacy individual country plans
    // {
    //   id: 6,
    //   planCode: 'UAE_ANNUAL',
    //   planName: 'UAE Annual Access',
    //   description: 'Unlimited access to UAE tax laws for 12 months',
    //   priceAed: 599.99,
    //   durationType: 'ANNUAL',
    //   isRecurring: true,
    //   isActive: true,
    // },
    // {
    //   id: 7,
    //   planCode: 'UAE_MONTHLY',
    //   planName: 'UAE Monthly Access',
    //   description: 'Unlimited access to UAE tax laws for 1 month',
    //   priceAed: 69.99,
    //   durationType: 'MONTHLY',
    //   isRecurring: true,
    //   isActive: true,
    // },
    // {
    //   id: 8,
    //   planCode: 'KSA_ANNUAL',
    //   planName: 'KSA Annual Access',
    //   description: 'Unlimited access to Saudi Arabia tax laws for 12 months',
    //   priceAed: 599.99,
    //   durationType: 'ANNUAL',
    //   isRecurring: true,
    //   isActive: true,
    // },
    // {
    //   id: 9,
    //   planCode: 'KSA_MONTHLY',
    //   planName: 'KSA Monthly Access',
    //   description: 'Unlimited access to Saudi Arabia tax laws for 1 month',
    //   priceAed: 69.99,
    //   durationType: 'MONTHLY',
    //   isRecurring: true,
    //   isActive: true,
    // },
  ]

  const creditPackages = [] // Not used in this version

  // Scroll to credits section if hash is present
  useEffect(() => {
    if (location.hash === '#credits') {
      setTimeout(() => {
        document
          .getElementById('credits')
          ?.scrollIntoView({ behavior: 'smooth' })
      }, 100)
    }
  }, [location])

  const handlePlanSelect = (planId) => {
    if (!isAuthenticated) {
      navigate('/login', { state: { from: '/pricing', planId } })
      return
    }
    navigate(`/checkout?plan=${planId}`)
  }

  const handleBillingCycleChange = (event, newCycle) => {
    if (newCycle !== null) {
      setBillingCycle(newCycle)
    }
  }

  // Get hardcoded original prices for plans (not stored in DB)
  const getOriginalPrice = (planCode) => {
    const originalPrices = {
      COMPLETE_ALL_DAILY: 39.99,
      COMPLETE_ALL_MONTHLY: 299.99,
      COMPLETE_ALL_ANNUAL: 2499.99,
      DTAA_ALL_MONTHLY: 179.99,
      DTAA_ALL_ANNUAL: 1499.99,
    }
    return originalPrices[planCode] || null
  }

  // Calculate daily cost for a plan
  const calculateDailyCost = (priceAed, durationType) => {
    switch (durationType) {
      case 'DAILY':
        return priceAed
      case 'WEEKLY':
        return priceAed / 7
      case 'MONTHLY':
        return priceAed / 30
      case 'ANNUAL':
        return priceAed / 365
      case 'HALF_YEARLY':
        return priceAed / 182.5
      default:
        return 0
    }
  }

  // Filter and categorize plans
  const allAccessMonthly = plans.find(
    (p) => p.planCode === 'COMPLETE_ALL_MONTHLY'
  )
  const allAccessAnnual = plans.find(
    (p) => p.planCode === 'COMPLETE_ALL_ANNUAL'
  )
  const allAccessDaily = plans.find((p) => p.planCode === 'COMPLETE_ALL_DAILY')
  const dtaaOnlyMonthly = plans.find((p) => p.planCode === 'DTAA_ALL_MONTHLY')
  const dtaaOnlyAnnual = plans.find((p) => p.planCode === 'DTAA_ALL_ANNUAL')

  // Legacy plans for "Other Options" section
  const legacyPlans = plans.filter(
    (plan) =>
      ![
        'COMPLETE_ALL_MONTHLY',
        'COMPLETE_ALL_ANNUAL',
        'COMPLETE_ALL_DAILY',
        'DTAA_ALL_MONTHLY',
        'DTAA_ALL_ANNUAL',
      ].includes(plan.planCode)
  )

  // Filter legacy plans by billing cycle
  const filteredLegacyPlans = legacyPlans.filter((plan) => {
    if (billingCycle === 'monthly') {
      return ['MONTHLY', 'DAILY', 'WEEKLY'].includes(plan.durationType)
    } else {
      return ['ANNUAL', 'HALF_YEARLY'].includes(plan.durationType)
    }
  })

  const features = {
    free: [
      '10 document link clicks per month',
      '1 DTAA / Tax Treaty document view per month',
      'Basic search functionality',
      'Bookmark articles',
      'Add annotations',
      'Email support',
    ],
    allAccess: [
      'Unlimited access to ALL 6 GCC countries',
      'Unlimited DTAA / Tax Treaty access',
      'Advanced search & filters',
      'Share, download & print documents',
      'Bookmark & annotate',
      'Priority email support',
    ],
    dtaaOnly: [
      'Unlimited DTAA / Tax Treaty access',
      'Country comparison tools under development',
      'Share, download & print DTAA / Tax Treaty',
      'Bookmark & annotate',
      'Priority email support',
    ],
  }

  const faqs = [
    {
      question: 'What does the All Access Pass include?',
      answer:
        "The All Access Pass gives you unlimited access to domestic tax laws of all 6 GCC countries (UAE, KSA, Kuwait, Qatar, Oman, Bahrain) PLUS unlimited access to all Double Taxation Avoidance Agreements (DTAA / Tax Treaty). It's our most comprehensive offering - everything you need in one plan.",
    },
    {
      question:
        "What's the difference between All Access and DTAA /Tax Treaty Module?",
      answer:
        'All Access Pass includes domestic tax laws of all 6 GCC countries AND all tax treaties available in our database.  The DTAA / Tax Treaty Module includes access to the tax treaties (DTAA / Tax Treaty documents) along with the Free version features (10 links per month).',
    },
    {
      question: 'Can I try before committing to a monthly plan?',
      answer:
        'Absolutely! Try our All Access Day Pass for just AED 29.99. You get 24 hours of complete unlimited access to all 6 GCC countries and all tax treaties',
    },
    {
      question: 'What happens when my free quota runs out?',
      answer:
        'When you exhaust your 10 free link clicks or 1 DTAA / Tax Treaty view, you will not be able to access any links on the laws and tax treaties but you will still be able to access and search through the laws.  You can either wait for the quota to reset on the 1st of next month, get an all access day pass or upgrade to a subscription plan for unlimited access.',
    },
    {
      question: 'Do subscriptions auto-renew?',
      answer:
        'Yes, monthly and annual subscriptions automatically renew unless you cancel them. You can manage your subscriptions and turn off auto-renewal anytime from your profile settings. The Day Pass does not auto-renew.',
    },
    {
      question: 'Can I cancel my subscription anytime?',
      answer:
        'Absolutely! You can cancel your subscription at any time from your profile. You will continue to have access until the end of your current billing period. No refunds are provided for partial months.',
    },
    {
      question: 'What is the Enterprise Database Subscription?',
      answer:
        'Our Enterprise plan is designed for organizations that regularly refer to tax laws and tax treaties.  Each subscription comes with unrestricted access for up to 10 users .  It includes priority e-mail support and dedicated account management.  Contact us at support@gcctaxlaws.com for custom pricing if the standard enterprise database subscription does not work for you.',
    },
  ]

  return (
    <>
      {/* <StaticPageWrapper useDomainSEO /> */}

      <Box
        sx={{ bgcolor: '#f5f5f5', minHeight: '100vh', py: { xs: 4, md: 8 } }}
      >
        <Container maxWidth='lg'>
          {/* Hero Section */}
          <Box sx={{ textAlign: 'center', mb: { xs: 4, md: 6 } }}>
            <Typography
              variant='h2'
              sx={{
                fontWeight: 700,
                mb: 2,
                color: themeColors.primary,
                fontSize: { xs: '1.75rem', sm: '2.5rem', md: '3rem' },
              }}
            >
              Simple, transparent pricing. Cancel anytime.
            </Typography>
            <Typography
              variant='h6'
              sx={{
                color: 'text.secondary',
                mb: 4,
                maxWidth: 700,
                mx: 'auto',
                fontSize: { xs: '1rem', md: '1.25rem' },
                px: { xs: 2, md: 0 },
              }}
            >
              Get complete access to all GCC tax laws and treaties (as and when
              made available on the portal)
            </Typography>

            {/* Current Quota Status for Authenticated Users */}
            {isAuthenticated && quotaStatus && (
              <Alert
                severity='info'
                sx={{
                  maxWidth: 600,
                  mx: 'auto',
                  mb: 4,
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <Box sx={{ textAlign: 'left', width: '100%' }}>
                  <Typography variant='body2' sx={{ fontWeight: 600, mb: 1 }}>
                    Your Current Status:
                  </Typography>
                  <Typography variant='body2'>
                    Link Clicks: {quotaStatus.remainingLinkClicks || 0} /{' '}
                    {quotaStatus.monthlyLinkClicksLimit || 0} remaining
                    <br />
                    DTAA Views: {quotaStatus.remainingDtaaViews || 0} /{' '}
                    {quotaStatus.monthlyDtaaViewsLimit || 0} remaining
                    <br />
                    Credits: {quotaStatus.creditsBalance || 0}
                    {quotaStatus.hasActiveSubscription && (
                      <>
                        <br />
                        <strong>
                          ✓ You have {quotaStatus.activeSubscriptionsCount}{' '}
                          active subscription(s)
                        </strong>
                      </>
                    )}
                  </Typography>
                </Box>
              </Alert>
            )}
          </Box>

          {/* Free Plan Callout - WHITE WITH PRIMARY COLORS */}
          <Paper
            sx={{
              p: { xs: 2, md: 3 },
              mb: 6,
              bgcolor: 'white',
              border: `2px solid ${themeColors.primary}`,
              borderRadius: 2,
            }}
          >
            <Grid container spacing={3} alignItems='center'>
              <Grid item xs={12} md={8}>
                <Chip
                  label='Free Plan Available'
                  sx={{
                    bgcolor: themeColors.primary,
                    color: 'white',
                    fontWeight: 700,
                    mb: 2,
                    fontSize: '0.875rem',
                    px: 2,
                  }}
                />
                <Typography
                  variant='body1'
                  color='text.secondary'
                  sx={{ fontSize: { xs: '0.875rem', md: '1rem' }, mb: 2 }}
                >
                  Get started with <strong>10 link clicks</strong> and{' '}
                  <strong>1 DTAA / Tax Treaty view</strong> every calendar month
                  at no cost. Perfect for occasional users.
                </Typography>
                <List dense>
                  {features.free.slice(0, 3).map((feature, index) => (
                    <ListItem key={index} sx={{ py: 0.5, px: 0 }}>
                      <ListItemIcon sx={{ minWidth: 32 }}>
                        <Check sx={{ color: '#43af76', fontSize: 20 }} />
                      </ListItemIcon>
                      <ListItemText
                        primary={feature}
                        primaryTypographyProps={{ variant: 'body2' }}
                      />
                    </ListItem>
                  ))}
                </List>
              </Grid>
              <Grid item xs={12} md={4} sx={{ textAlign: 'center' }}>
                <Typography
                  variant='h3'
                  sx={{
                    fontWeight: 700,
                    color: '#43af76',
                    mb: 2,
                    fontSize: { xs: '2rem', md: '3rem' },
                    animation: `${blink} 2s ease-in-out infinite`,
                  }}
                >
                  FREE FOREVER
                </Typography>
                {!isAuthenticated && (
                  <Button
                    variant='contained'
                    size='large'
                    onClick={() => navigate('/login')}
                    fullWidth={isMobile}
                    sx={{
                      bgcolor: themeColors.primary,
                      color: 'white',
                      px: 4,
                      py: 1.5,
                      fontWeight: 700,
                      '&:hover': { bgcolor: themeColors.hover },
                    }}
                  >
                    Get Started
                  </Button>
                )}
              </Grid>
            </Grid>
          </Paper>

          {/* REDESIGNED ALL ACCESS PASS - Features Left, Pricing Buttons Right */}
          <Box sx={{ mb: 8 }}>
            <Paper
              elevation={3}
              sx={{
                p: { xs: 3, md: 4 },
                borderRadius: 3,
                border: `2px solid ${themeColors.primary}`,
              }}
            >
              <Grid container spacing={4}>
                {/* Left Side - Features */}
                <Grid item xs={12} md={6}>
                  <Typography
                    variant='h4'
                    sx={{
                      fontWeight: 700,
                      mb: 1,
                      color: themeColors.primary,
                      fontSize: { xs: '1.5rem', md: '2rem' },
                    }}
                  >
                    All Access Pass
                  </Typography>
                  <Typography
                    variant='body1'
                    color='text.secondary'
                    sx={{
                      fontSize: { xs: '0.875rem', md: '1rem' },
                    }}
                  >
                    Complete unlimited access to all 6 GCC countries' tax laws
                    AND all DTAAs / tax treaties
                  </Typography>
                  <Typography
                    variant='h6'
                    sx={{
                      fontWeight: 700,
                      mt: 3,
                      mb: 1,
                      color: themeColors.primary,
                    }}
                  >
                    What's Included:
                  </Typography>
                  <List>
                    {features.allAccess.map((feature, index) => (
                      <ListItem key={index} sx={{ px: 0, py: 1 }}>
                        <ListItemIcon sx={{ minWidth: 36 }}>
                          <Check sx={{ color: '#43af76', fontSize: 24 }} />
                        </ListItemIcon>
                        <ListItemText
                          primary={feature}
                          primaryTypographyProps={{
                            variant: 'body1',
                            fontWeight: 500,
                          }}
                        />
                      </ListItem>
                    ))}
                  </List>
                </Grid>

                {/* Right Side - Pricing Options */}
                <Grid item xs={12} md={6}>
                  <Stack spacing={3}>
                    {/* Annual Plan */}
                    {allAccessAnnual && (
                      <PricingButton
                        plan={allAccessAnnual}
                        originalPrice={getOriginalPrice(
                          allAccessAnnual.planCode
                        )}
                        dailyCost={calculateDailyCost(
                          allAccessAnnual.priceAed,
                          allAccessAnnual.durationType
                        )}
                        onSelect={handlePlanSelect}
                        badge='BEST VALUE'
                        description='12 months complete unlimited access to all 6 GCC countries tax laws plus all Double Taxation Avoidance Agreements'
                        isMobile={isMobile}
                      />
                    )}

                    {/* Monthly Plan */}
                    {allAccessMonthly && (
                      <PricingButton
                        plan={allAccessMonthly}
                        originalPrice={getOriginalPrice(
                          allAccessMonthly.planCode
                        )}
                        dailyCost={calculateDailyCost(
                          allAccessMonthly.priceAed,
                          allAccessMonthly.durationType
                        )}
                        onSelect={handlePlanSelect}
                        badge='MOST POPULAR'
                        description='1 month complete unlimited access to all 6 GCC countries tax laws plus all Double Taxation Avoidance Agreements'
                        isMobile={isMobile}
                      />
                    )}

                    {/* Day Pass */}
                    {allAccessDaily && (
                      <PricingButton
                        plan={allAccessDaily}
                        originalPrice={getOriginalPrice(
                          allAccessDaily.planCode
                        )}
                        onSelect={handlePlanSelect}
                        badge='TRY IT OUT'
                        description='24-hour complete unlimited access to all 6 GCC countries tax laws plus all Double Taxation Avoidance Agreements'
                        isMobile={isMobile}
                        isDayPass={true}
                      />
                    )}
                  </Stack>
                </Grid>
              </Grid>
            </Paper>
          </Box>

          {/* REDESIGNED TAX TREATY MODULE - Features Left, Pricing Buttons Right */}
          {(dtaaOnlyMonthly || dtaaOnlyAnnual) && (
            <Box sx={{ mb: 8 }}>
              <Paper
                elevation={3}
                sx={{
                  p: { xs: 3, md: 4 },
                  borderRadius: 3,
                  border: `2px solid ${themeColors.primary}`,
                }}
              >
                <Grid container spacing={4}>
                  {/* Left Side - Features */}
                  <Grid item xs={12} md={6}>
                    <Typography
                      variant='h4'
                      sx={{
                        fontWeight: 700,
                        mb: 1,
                        color: themeColors.primary,
                        fontSize: { xs: '1.5rem', md: '2rem' },
                      }}
                    >
                      <AccountBalance sx={{ mr: 1, verticalAlign: 'middle' }} />
                      DTAA / Tax Treaty Module
                    </Typography>
                    <Typography
                      variant='body1'
                      color='text.secondary'
                      sx={{
                        fontSize: { xs: '0.875rem', md: '1rem' },
                      }}
                    >
                      Unlimited access to all DTAAs / Tax Treaties + Free plan
                    </Typography>
                    <Typography
                      variant='h6'
                      sx={{
                        fontWeight: 700,
                        mt: 3,
                        mb: 1,
                        color: themeColors.primary,
                      }}
                    >
                      What's Included:
                    </Typography>
                    <List>
                      {features.dtaaOnly.map((feature, index) => (
                        <ListItem key={index} sx={{ px: 0, py: 1 }}>
                          <ListItemIcon sx={{ minWidth: 36 }}>
                            <Check sx={{ color: '#43af76', fontSize: 24 }} />
                          </ListItemIcon>
                          <ListItemText
                            primary={feature}
                            primaryTypographyProps={{
                              variant: 'body1',
                              fontWeight: 500,
                            }}
                          />
                        </ListItem>
                      ))}
                    </List>
                  </Grid>

                  {/* Right Side - Pricing Options */}
                  <Grid item xs={12} md={6}>
                    <Stack spacing={3}>
                      {/* Annual Plan */}
                      {dtaaOnlyAnnual && (
                        <PricingButton
                          plan={dtaaOnlyAnnual}
                          originalPrice={getOriginalPrice(
                            dtaaOnlyAnnual.planCode
                          )}
                          dailyCost={calculateDailyCost(
                            dtaaOnlyAnnual.priceAed,
                            dtaaOnlyAnnual.durationType
                          )}
                          onSelect={handlePlanSelect}
                          badge='BEST VALUE'
                          description='12 months unlimited access to Double Taxation Avoidance Agreements for all countries (DTAA treaties only, no domestic tax laws)'
                          isMobile={isMobile}
                        />
                      )}

                      {/* Monthly Plan */}
                      {dtaaOnlyMonthly && (
                        <PricingButton
                          plan={dtaaOnlyMonthly}
                          originalPrice={getOriginalPrice(
                            dtaaOnlyMonthly.planCode
                          )}
                          dailyCost={calculateDailyCost(
                            dtaaOnlyMonthly.priceAed,
                            dtaaOnlyMonthly.durationType
                          )}
                          onSelect={handlePlanSelect}
                          description='1 month unlimited access to Double Taxation Avoidance Agreements for all countries (DTAA treaties only, no domestic tax laws)'
                          isMobile={isMobile}
                        />
                      )}
                    </Stack>
                  </Grid>
                </Grid>
              </Paper>
            </Box>
          )}

          {/* OTHER OPTIONS - Legacy Plans */}
          {filteredLegacyPlans.length > 0 && (
            <Box sx={{ mb: 8 }}>
              <Box sx={{ textAlign: 'center', mb: 4 }}>
                <Typography
                  variant='h4'
                  sx={{
                    fontWeight: 600,
                    mb: 2,
                    color: themeColors.primary,
                    fontSize: { xs: '1.5rem', md: '2rem' },
                  }}
                >
                  Individual Country Plans
                </Typography>
                <Typography
                  variant='body1'
                  color='text.secondary'
                  sx={{
                    px: { xs: 2, md: 0 },
                    fontSize: { xs: '0.875rem', md: '1rem' },
                  }}
                >
                  Need access to specific countries only? Choose from our
                  individual plans.
                </Typography>

                {/* Billing Cycle Toggle */}
                <ToggleButtonGroup
                  value={billingCycle}
                  exclusive
                  onChange={handleBillingCycleChange}
                  orientation={isMobile ? 'vertical' : 'horizontal'}
                  sx={{
                    bgcolor: 'white',
                    boxShadow: 1,
                    borderRadius: 2,
                    mt: 3,
                    '& .MuiToggleButton-root': {
                      px: { xs: 3, md: 4 },
                      py: 1.5,
                      fontSize: { xs: '0.875rem', md: '1rem' },
                      fontWeight: 600,
                      border: 'none',
                      '&.Mui-selected': {
                        bgcolor: themeColors.primary,
                        color: 'white',
                        '&:hover': {
                          bgcolor: themeColors.hover,
                        },
                      },
                    },
                  }}
                >
                  <ToggleButton value='monthly'>
                    Monthly & Short-Term
                  </ToggleButton>
                  <ToggleButton value='annual'>
                    Annual
                    <Chip
                      label='Save More'
                      size='small'
                      sx={{
                        ml: 1,
                        bgcolor: themeColors.secondary,
                        color: themeColors.primary,
                        fontWeight: 600,
                      }}
                    />
                  </ToggleButton>
                </ToggleButtonGroup>
              </Box>

              <Grid container spacing={3}>
                {filteredLegacyPlans.map((plan) => (
                  <Grid item xs={12} sm={6} md={4} key={plan.id}>
                    <LegacyPlanCard
                      plan={plan}
                      onSelect={handlePlanSelect}
                      originalPrice={getOriginalPrice(plan.planCode)}
                      dailyCost={calculateDailyCost(
                        plan.priceAed,
                        plan.durationType
                      )}
                      isMobile={isMobile}
                    />
                  </Grid>
                ))}
              </Grid>
            </Box>
          )}

          {/* ENTERPRISE - DESCRIPTION LEFT, PRICING & CONTACT RIGHT */}
          <Box sx={{ mt: 8, mb: 6 }}>
            <Box sx={{ textAlign: 'center', mb: 4 }}></Box>

            <Grid container spacing={3}>
              {/* Left Side - Description & Features */}
              <Grid item xs={12} md={6}>
                <Paper
                  elevation={3}
                  sx={{
                    p: { xs: 3, md: 4 },
                    height: '100%',
                    background:
                      'linear-gradient(135deg, #232536 0%, #1a1c2e 100%)',
                    color: 'white',
                    borderRadius: 3,
                  }}
                >
                  <Typography
                    variant='h4'
                    sx={{
                      fontWeight: 700,
                      mb: 2,
                      // color: themeColors.primary,
                      fontSize: { xs: '1.5rem', md: '2rem' },
                    }}
                  >
                    <Business sx={{ mr: 1, verticalAlign: 'middle' }} />
                    Enterprise Database Subscriptions
                  </Typography>
                  <Typography
                    variant='h5'
                    sx={{
                      fontWeight: 700,
                      mb: 3,
                      fontSize: { xs: '1.25rem', md: '1.5rem' },
                    }}
                  >
                    Complete GCC tax law access for your entire team for 1 year
                  </Typography>

                  <List>
                    {[
                      'Multi-user access for up to 10 team members',
                      'Unlimited access to all 6 GCC countries',
                      'Unlimited DTAA / tax treaty documents',
                      'Dedicated account manager',
                      'Priority email support & onboarding',
                      'Centralized billing & administration',
                    ].map((feature, index) => (
                      <ListItem key={index} sx={{ py: 0.5, px: 0 }}>
                        <ListItemIcon sx={{ minWidth: 36 }}>
                          <Check sx={{ color: '#43af76', fontSize: 24 }} />
                        </ListItemIcon>
                        <ListItemText
                          primary={feature}
                          primaryTypographyProps={{
                            variant: 'body1',
                            sx: { color: 'white' },
                          }}
                        />
                      </ListItem>
                    ))}
                  </List>
                </Paper>
              </Grid>

              {/* Right Side - Pricing & Contact Boxes */}
              <Grid item xs={12} md={6}>
                <Stack spacing={3}>
                  {/* Pricing Box */}
                  <Paper
                    elevation={3}
                    sx={{
                      p: { xs: 3, md: 4 },
                      background:
                        'linear-gradient(135deg, #232536 0%, #1a1c2e 100%)',
                      color: 'white',
                      borderRadius: 3,
                    }}
                  >
                    <Box sx={{ textAlign: 'center' }}>
                      <Typography
                        variant='h6'
                        sx={{
                          mb: 2,
                          opacity: 0.9,
                          fontSize: { xs: '1rem', md: '1.25rem' },
                        }}
                      >
                        Starting from
                      </Typography>

                      {/* Original Price */}
                      <Typography
                        variant='h4'
                        sx={{
                          textDecoration: 'line-through',
                          opacity: 0.6,
                          fontSize: { xs: '1.5rem', md: '2rem' },
                          mb: 1,
                        }}
                      >
                        AED 23,999
                      </Typography>

                      {/* Discounted Price */}
                      <Typography
                        variant='h2'
                        sx={{
                          fontWeight: 700,
                          mb: 1,
                          color: themeColors.secondary,
                          fontSize: { xs: '2.5rem', md: '3.5rem' },
                        }}
                      >
                        AED 14,999
                      </Typography>

                      {/* Daily Cost */}
                      <Typography
                        variant='body2'
                        sx={{
                          mb: 2,
                          opacity: 0.85,
                          fontStyle: 'italic',
                        }}
                      >
                        AED 41.10/day
                      </Typography>

                      {/* Discount Badge */}
                      <Chip
                        label='Save 38%'
                        sx={{
                          bgcolor: themeColors.secondary,
                          color: themeColors.primary,
                          fontWeight: 700,
                        }}
                      />
                    </Box>
                  </Paper>

                  {/* Contact Box */}
                  <Paper
                    elevation={3}
                    sx={{
                      p: { xs: 3, md: 4 },
                      background:
                        'linear-gradient(135deg, #232536 0%, #1a1c2e 100%)',
                      color: 'white',
                      borderRadius: 3,
                    }}
                  >
                    <Box sx={{ textAlign: 'center' }}>
                      <Typography
                        variant='body1'
                        sx={{
                          mb: 3,
                          opacity: 0.9,
                          fontSize: { xs: '0.875rem', md: '1rem' },
                        }}
                      >
                        Get in touch with us for custom pricing based on your
                        needs
                      </Typography>

                      <Button
                        variant='contained'
                        size='large'
                        fullWidth
                        startIcon={<Email />}
                        href='mailto:support@gcctaxlaws.com?subject=Enterprise%20Subscription%20Inquiry'
                        sx={{
                          bgcolor: '#43af76',
                          color: 'white',
                          py: 1.5,
                          fontWeight: 700,
                          fontSize: { xs: '1rem', md: '1.1rem' },
                          mb: 2,
                          '&:hover': {
                            bgcolor: '#3a9668',
                          },
                        }}
                      >
                        Contact Us
                      </Button>

                      <Typography
                        variant='body2'
                        sx={{
                          opacity: 0.8,
                          fontSize: { xs: '0.75rem', md: '0.875rem' },
                        }}
                      >
                        Email: support@gcctaxlaws.com
                      </Typography>
                    </Box>
                  </Paper>
                </Stack>
              </Grid>
            </Grid>
          </Box>

          {/* Feature Comparison Table */}
          <Box sx={{ mt: 8, mb: 6 }}>
            <Typography
              variant='h4'
              sx={{
                fontWeight: 600,
                mb: 4,
                textAlign: 'center',
                fontSize: { xs: '1.5rem', md: '2rem' },
              }}
            >
              Compare Features
            </Typography>
            <FeatureComparisonTable isMobile={isMobile} isTablet={isTablet} />
          </Box>

          {/* FAQ Section */}
          <Box sx={{ mt: 8 }}>
            <Typography
              variant='h4'
              sx={{
                fontWeight: 600,
                mb: 4,
                textAlign: 'center',
                fontSize: { xs: '1.5rem', md: '2rem' },
              }}
            >
              Frequently Asked Questions
            </Typography>
            {faqs.map((faq, index) => (
              <Accordion
                key={index}
                sx={{
                  mb: 2,
                  boxShadow: 1,
                  '&:before': { display: 'none' },
                  borderRadius: 2,
                }}
              >
                <AccordionSummary expandIcon={<ExpandMore />}>
                  <Typography
                    variant='subtitle1'
                    sx={{
                      fontWeight: 600,
                      fontSize: { xs: '0.875rem', md: '1rem' },
                    }}
                  >
                    {faq.question}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography
                    variant='body2'
                    color='text.secondary'
                    sx={{ fontSize: { xs: '0.875rem', md: '1rem' } }}
                  >
                    {faq.answer}
                  </Typography>
                </AccordionDetails>
              </Accordion>
            ))}
          </Box>

          {/* Trust Signals */}
          <Box sx={{ mt: 8, textAlign: 'center' }}>
            {/* <Typography
              variant='h5'
              sx={{
                fontWeight: 600,
                mb: 3,
                fontSize: { xs: '1.25rem', md: '1.5rem' },
              }}
            >
              Trusted by Tax Professionals Across the GCC
            </Typography> */}
            <Grid container spacing={4} sx={{ maxWidth: 900, mx: 'auto' }}>
              <Grid item xs={12} sm={4}>
                <Lock
                  sx={{ fontSize: { xs: 40, md: 48 }, color: '#43af76', mb: 1 }}
                />
                <Typography
                  variant='h6'
                  sx={{
                    fontWeight: 600,
                    fontSize: { xs: '1rem', md: '1.25rem' },
                  }}
                >
                  Secure Payments
                </Typography>
                <Typography
                  variant='body2'
                  color='text.secondary'
                  sx={{ fontSize: { xs: '0.875rem', md: '1rem' } }}
                >
                  All transactions encrypted with SSL
                </Typography>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Speed
                  sx={{ fontSize: { xs: 40, md: 48 }, color: '#43af76', mb: 1 }}
                />
                <Typography
                  variant='h6'
                  sx={{
                    fontWeight: 600,
                    fontSize: { xs: '1rem', md: '1.25rem' },
                  }}
                >
                  Instant Access
                </Typography>
                <Typography
                  variant='body2'
                  color='text.secondary'
                  sx={{ fontSize: { xs: '0.875rem', md: '1rem' } }}
                >
                  Start using immediately after purchase
                </Typography>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Support
                  sx={{ fontSize: { xs: 40, md: 48 }, color: '#43af76', mb: 1 }}
                />
                <Typography
                  variant='h6'
                  sx={{
                    fontWeight: 600,
                    fontSize: { xs: '1rem', md: '1.25rem' },
                  }}
                >
                  24/7 Email Support
                </Typography>
                <Typography
                  variant='body2'
                  color='text.secondary'
                  sx={{ fontSize: { xs: '0.875rem', md: '1rem' } }}
                >
                  Help available whenever you need it
                </Typography>
              </Grid>
            </Grid>
          </Box>
        </Container>
      </Box>
    </>
  )
}

// NEW COMPONENT: Pricing Button (for All Access and DTAA sections)
const PricingButton = ({
  plan,
  originalPrice,
  dailyCost,
  onSelect,
  badge = null,
  description,
  isMobile,
  isDayPass = false,
}) => {
  const [showTooltip, setShowTooltip] = useState(false)
const [snackbar, setSnackbar] = useState({ open: false, message: '' })
  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-AE', {
      style: 'currency',
      currency: 'AED',
      minimumFractionDigits: 2,
    }).format(price)
  }

  const getBillingText = () => {
    switch (plan.durationType) {
      case 'DAILY':
        return '/day'
      case 'MONTHLY':
        return '/month'
      case 'ANNUAL':
        return '/year'
      default:
        return ''
    }
  }

  const actualOriginalPrice = originalPrice || plan.priceAed
  const discountedPrice = plan.priceAed
  const hasDiscount = originalPrice && originalPrice > discountedPrice
  const discountPercentage = hasDiscount
    ? ((1 - discountedPrice / actualOriginalPrice) * 100).toFixed(0)
    : 0

  return (
    <Tooltip
      title={
        <Box sx={{ p: 1 }}>
          <Typography variant='body2' sx={{ mb: 1, fontWeight: 600 }}>
            {description}
          </Typography>
          {plan.isRecurring && plan.durationType !== 'DAILY' && (
            <Typography variant='caption'>
              Auto-renews • Cancel anytime
            </Typography>
          )}
        </Box>
      }
      arrow
      placement='left'
      open={showTooltip}
      onClose={() => setShowTooltip(false)}
      onOpen={() => setShowTooltip(true)}
    >
      <Paper
        elevation={badge ? 4 : 2}
        sx={{
          p: 2,
          border: badge
            ? `3px solid ${themeColors.secondary}`
            : '1px solid #e0e0e0',
          borderRadius: 2,
          cursor: 'pointer',
          transition: 'transform 0.2s, box-shadow 0.2s',
          '&:hover': {
            transform: 'translateY(-4px)',
            boxShadow: 6,
          },
          position: 'relative',
        }}
        // onClick={() => onSelect(plan.id)}
        onClick={(e) => {
          e.stopPropagation()
          setSnackbar({
            open: true,
            message: 'Payments will be implemented soon!',
          })
        }}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
      >
        {badge && (
          <Chip
            label={badge}
            size='small'
            sx={{
              position: 'absolute',
              top: -12,
              left: 16,
              bgcolor: themeColors.secondary,
              color: themeColors.primary,
              fontWeight: 700,
              fontSize: '0.7rem',
            }}
          />
        )}

        <Stack
          direction='row'
          alignItems='center'
          justifyContent='space-between'
        >
          <Box>
            <Typography
              variant='subtitle1'
              sx={{ fontWeight: 700, color: themeColors.primary }}
            >
              {plan.planName
                .replace('Complete Access ', '')
                .replace(' - All GCC Countries + DTAA', '')
                .replace('DTAA Only ', '')
                .replace(' - All Countries', '')}
            </Typography>

            {/* Prices */}
            <Stack
              direction='row'
              alignItems='baseline'
              spacing={1}
              sx={{ mt: 1 }}
            >
              {hasDiscount && (
                <Typography
                  variant='body2'
                  sx={{
                    textDecoration: 'line-through',
                    color: 'text.secondary',
                    opacity: 0.6,
                  }}
                >
                  {formatPrice(actualOriginalPrice)}
                </Typography>
              )}
              <Typography
                variant='h5'
                sx={{ fontWeight: 700, color: themeColors.primary }}
              >
                {formatPrice(discountedPrice)}
              </Typography>
              <Typography variant='body2' color='text.secondary'>
                {getBillingText()}
              </Typography>
            </Stack>

            {/* Daily Cost - Only for non-day passes */}
            {!isDayPass && dailyCost && (
              <Typography
                variant='caption'
                color='text.secondary'
                sx={{ fontStyle: 'italic', display: 'block', mt: 0.5 }}
              >
                {formatPrice(dailyCost)}/day
              </Typography>
            )}

            {/* Discount Badge */}
            {hasDiscount && (
              <Chip
                label={`Save ${discountPercentage}%`}
                size='small'
                sx={{
                  mt: 1,
                  bgcolor: themeColors.secondary,
                  color: themeColors.primary,
                  fontWeight: 600,
                  fontSize: '0.7rem',
                }}
              />
            )}
          </Box>

          <Button
            variant='contained'
            // disabled
            sx={{
              bgcolor: themeColors.primary,
              color: 'white',
              fontWeight: 700,
              px: 3,
              py: 1,
              '&:hover': {
                bgcolor: themeColors.hover,
              },
            }}
          >
            {plan.durationType === 'DAILY' ? 'Try Now' : 'Subscribe'}
          </Button>
        </Stack>
      </Paper>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        message={snackbar.message}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        sx={{ mt: 8 }}
      />
    </Tooltip>
  )
}

// Legacy Plan Card Component (for individual country plans)
const LegacyPlanCard = ({
  plan,
  onSelect,
  originalPrice = null,
  dailyCost,
  isMobile,
}) => {
  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-AE', {
      style: 'currency',
      currency: 'AED',
      minimumFractionDigits: 0,
    }).format(price)
  }

  const getBillingText = () => {
    switch (plan.durationType) {
      case 'DAILY':
        return '/day'
      case 'WEEKLY':
        return '/week'
      case 'MONTHLY':
        return '/month'
      case 'ANNUAL':
        return '/year'
      default:
        return ''
    }
  }

  const actualOriginalPrice = originalPrice || plan.priceAed
  const discountedPrice = plan.priceAed
  const hasDiscount = originalPrice && originalPrice > discountedPrice
  const discountPercentage = hasDiscount
    ? ((1 - discountedPrice / actualOriginalPrice) * 100).toFixed(0)
    : 0

  return (
    <Card
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        border: '1px solid #e0e0e0',
        borderRadius: 2,
        transition: 'transform 0.2s, box-shadow 0.2s',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: 4,
        },
      }}
    >
      <CardContent sx={{ flexGrow: 1, p: { xs: 2, md: 3 } }}>
        <Typography
          variant='h6'
          sx={{
            fontWeight: 600,
            mb: 1,
            color: themeColors.primary,
            fontSize: { xs: '1rem', md: '1.25rem' },
          }}
        >
          {plan.planName}
        </Typography>

        <Typography
          variant='body2'
          color='text.secondary'
          sx={{
            mb: 2,
            minHeight: 40,
            fontSize: { xs: '0.75rem', md: '0.875rem' },
          }}
        >
          {plan.description}
        </Typography>

        <Box sx={{ mb: 2 }}>
          {hasDiscount && (
            <Typography
              variant='h6'
              sx={{
                textDecoration: 'line-through',
                color: 'text.secondary',
                opacity: 0.6,
                fontSize: { xs: '1rem', md: '1.25rem' },
              }}
            >
              {formatPrice(actualOriginalPrice)}
            </Typography>
          )}

          <Stack direction='row' alignItems='baseline' spacing={1}>
            <Typography
              variant='h4'
              sx={{
                fontWeight: 700,
                color: '#43af76',
                fontSize: { xs: '1.75rem', md: '2rem' },
              }}
            >
              {formatPrice(discountedPrice)}
            </Typography>
            <Typography variant='body1' sx={{ color: 'text.secondary' }}>
              {getBillingText()}
            </Typography>
          </Stack>

          <Typography
            variant='caption'
            color='text.secondary'
            sx={{ display: 'block', mt: 0.5, fontStyle: 'italic' }}
          >
            {formatPrice(dailyCost)}/day
          </Typography>

          {hasDiscount && (
            <Chip
              label={`${discountPercentage}% OFF`}
              size='small'
              sx={{
                mt: 1,
                bgcolor: themeColors.secondary,
                color: themeColors.primary,
                fontWeight: 600,
                fontSize: { xs: '0.7rem', md: '0.75rem' },
              }}
            />
          )}
        </Box>

        <Button
          variant='outlined'
          fullWidth
          onClick={() => onSelect(plan.id)}
          sx={{
            mt: 'auto',
            borderColor: themeColors.primary,
            color: themeColors.primary,
            fontWeight: 600,
            fontSize: { xs: '0.875rem', md: '1rem' },
            '&:hover': {
              bgcolor: themeColors.primary,
              color: 'white',
              borderColor: themeColors.primary,
            },
          }}
        >
          Select Plan
        </Button>
      </CardContent>
    </Card>
  )
}

// Feature Comparison Table Component - MOBILE RESPONSIVE
const FeatureComparisonTable = ({ isMobile, isTablet }) => {
  const comparisonData = [
    {
      feature: 'GCC Country Tax Laws',
      free: '✓',
      allAccess: 'All 6 Countries',
      dtaa: '✓',
    },
    {
      feature: 'DTAA / Tax Treaty Document Views',
      free: '1/month',
      allAccess: 'Unlimited',
      dtaa: 'Unlimited',
    },
    {
      feature: 'Document Link Clicks',
      free: '10/month',
      allAccess: 'Unlimited',
      dtaa: '10/month',
    },
    {
      feature: 'Advanced Search',
      free: '✓',
      allAccess: '✓',
      dtaa: '✓',
    },
    {
      feature: 'Download & Print',
      free: '✗',
      allAccess: '✓',
      dtaa: '✗',
    },
    {
      feature: 'Priority Email Support',
      free: '✗',
      allAccess: '✓',
      dtaa: '✓',
    },
    {
      feature: 'Ad-Free Experience',
      free: '✗',
      allAccess: '✓',
      dtaa: '✓',
    },
  ]

  if (isMobile || isTablet) {
    return (
      <Stack spacing={3}>
        {comparisonData.map((row, index) => (
          <Paper key={index} sx={{ p: 2, borderRadius: 2 }}>
            <Typography
              variant='subtitle2'
              sx={{ fontWeight: 700, mb: 2, color: themeColors.primary }}
            >
              {row.feature}
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={4}>
                <Typography
                  variant='caption'
                  color='text.secondary'
                  sx={{ display: 'block', mb: 0.5 }}
                >
                  Free
                </Typography>
                <Typography variant='body2' sx={{ fontWeight: 600 }}>
                  {row.free}
                </Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography
                  variant='caption'
                  color='text.secondary'
                  sx={{ display: 'block', mb: 0.5 }}
                >
                  All Access
                </Typography>
                <Typography
                  variant='body2'
                  sx={{ fontWeight: 600, color: '#43af76' }}
                >
                  {row.allAccess}
                </Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography
                  variant='caption'
                  color='text.secondary'
                  sx={{ display: 'block', mb: 0.5 }}
                >
                  DTAA / Tax Treaty Only
                </Typography>
                <Typography variant='body2' sx={{ fontWeight: 600 }}>
                  {row.dtaa}
                </Typography>
              </Grid>
            </Grid>
          </Paper>
        ))}
      </Stack>
    )
  }

  return (
    <Paper sx={{ p: 0, overflow: 'hidden', borderRadius: 2 }}>
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: '2fr 1fr 1fr 1fr',
          bgcolor: '#f5f5f5',
          p: 2,
          fontWeight: 700,
        }}
      >
        <Typography variant='subtitle2' sx={{ fontWeight: 700 }}>
          Feature
        </Typography>
        <Typography
          variant='subtitle2'
          sx={{ fontWeight: 700, textAlign: 'center' }}
        >
          Free
        </Typography>
        <Typography
          variant='subtitle2'
          sx={{ fontWeight: 700, textAlign: 'center' }}
        >
          All Access
        </Typography>
        <Typography
          variant='subtitle2'
          sx={{ fontWeight: 700, textAlign: 'center' }}
        >
          DTAA / Tax Treaty Only
        </Typography>
      </Box>
      {comparisonData.map((row, index) => (
        <Box
          key={index}
          sx={{
            display: 'grid',
            gridTemplateColumns: '2fr 1fr 1fr 1fr',
            p: 2,
            borderBottom: '1px solid #e0e0e0',
            '&:last-child': { borderBottom: 'none' },
            '&:hover': { bgcolor: '#fafafa' },
          }}
        >
          <Typography variant='body2'>{row.feature}</Typography>
          <Typography variant='body2' sx={{ textAlign: 'center' }}>
            {row.free}
          </Typography>
          <Typography
            variant='body2'
            sx={{ textAlign: 'center', fontWeight: 600, color: '#43af76' }}
          >
            {row.allAccess}
          </Typography>
          <Typography variant='body2' sx={{ textAlign: 'center' }}>
            {row.dtaa}
          </Typography>
        </Box>
      ))}
    </Paper>
  )
}

export default Pricing
