import React, { useState, useEffect, useRef } from 'react'
import { styled, useTheme, alpha } from '@mui/material/styles'
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Divider,
  IconButton,
  List,
  ListItemText,
  ListItemButton,
  ListItemIcon,
  Drawer,
  Popper,
  Paper,
  Grow,
  ClickAwayListener,
  Menu,
  MenuItem,
  Collapse,
  Button,
  useMediaQuery,
  Container,
  TextField,
  InputAdornment,
  Chip,
} from '@mui/material'
import AssignmentRoundedIcon from '@mui/icons-material/AssignmentRounded'
import MenuRoundedIcon from '@mui/icons-material/MenuRounded'
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded'
import ChevronLeftRoundedIcon from '@mui/icons-material/ChevronLeftRounded'
import AttachMoneyRoundedIcon from '@mui/icons-material/AttachMoneyRounded'
import GavelRoundedIcon from '@mui/icons-material/GavelRounded'
import AutoStoriesRoundedIcon from '@mui/icons-material/AutoStoriesRounded'
import ExpandMoreRoundedIcon from '@mui/icons-material/ExpandMoreRounded'
import ExpandLessRoundedIcon from '@mui/icons-material/ExpandLessRounded'
import InfoRoundedIcon from '@mui/icons-material/InfoRounded'
import SearchRoundedIcon from '@mui/icons-material/SearchRounded'
import ClearRoundedIcon from '@mui/icons-material/ClearRounded'
// import TimelineIcon from '@mui/icons-material/Timeline'
import BookRoundedIcon from '@mui/icons-material/BookRounded'
import LoginRoundedIcon from '@mui/icons-material/LoginRounded'
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded'
import PersonRoundedIcon from '@mui/icons-material/PersonRounded'
import AdminPanelSettingsRoundedIcon from '@mui/icons-material/AdminPanelSettingsRounded'
// import ArticleRoundedIcon from '@mui/icons-material/ArticleRounded'
// import ShoppingCartRoundedIcon from '@mui/icons-material/ShoppingCartRounded'
import Avatar from '@mui/material/Avatar'
// import { useAuth } from '../../context/AuthContext'
import HandshakeRoundedIcon from '@mui/icons-material/HandshakeRounded'
import MapPinIcon from '@mui/icons-material/LocationOn'
import { useNavigate } from 'react-router'
// import { RoleBasedAccess } from '../RoleBasedAccess'
// import { useCountryLaw } from '../../context/CountryLawContext'

const getProxiedUrl = (originalUrl) => {
  if (!originalUrl) return null
  return `${
    process.env.REACT_APP_BACKEND_URL || 'http://localhost:8080'
  }/api/v1/profile/avatar?url=${encodeURIComponent(originalUrl)}`
}

// Calculate responsive drawer width
const getDrawerWidth = () => {
  const baseWidth = 280
  if (typeof window !== 'undefined') {
    const screenWidth = window.innerWidth
    if (screenWidth < 600) return Math.min(screenWidth * 0.95, baseWidth)
  }
  return baseWidth
}

// Styled components for better aesthetics
const StyledAppBar = styled(AppBar)(({ theme }) => ({
  backgroundColor: '#232536',
  boxShadow: 'none',
  borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
  position: 'sticky', // 'relative', // 'sticky',
  top: 0, // Add this to make it stick to the top
  zIndex: theme.zIndex.drawer + 1, // Lower the z-index so drawer appears over it
}))

const NavLogo = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  textDecoration: 'none',
  transition: 'transform 0.2s ease',
  '&:hover': {
    transform: 'scale(1.02)',
  },
}))

// const LogoText = styled(Typography)(({ theme }) => ({
//   fontWeight: 700,
//   fontSize: '1.25rem',
//   lineHeight: 1.2,
//   color: '#fff',
//   marginLeft: theme.spacing(1.5),
//   display: 'flex',
//   flexDirection: 'column',
//   '&:hover': {
//     color: '#ffcf51',
//   },
// }))
const StyledDrawer = styled(Drawer)(({ theme }) => ({
  width: getDrawerWidth(),
  flexShrink: 0,
  '& .MuiDrawer-paper': {
    width: getDrawerWidth(),
    boxSizing: 'border-box',
    borderRight: 'none',
    backgroundColor: '#fafafa',
    zIndex: theme.zIndex.drawer + 2, // Increase this to appear above AppBar
  },
}))

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(1, 2),
  backgroundColor: '#232536',
  color: '#fff',
  // minHeight: '64px',
  justifyContent: 'space-between',
  position: 'sticky', // Make it sticky
  top: 0, // Stick to the top
  zIndex: theme.zIndex.drawer + 3, // Higher z-index than drawer content
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
}))

const MenuButton = styled(Button)(({ theme }) => ({
  color: '#fff',
  textTransform: 'none',
  padding: theme.spacing(1, 1.5),
  borderRadius: '4px',
  fontSize: '0.95rem',
  fontWeight: 500,
  letterSpacing: '0.02em',
  position: 'relative',
  // overflow: 'hidden',
  overflow: 'visible',
  '&:hover': {
    color: '#ffcf51',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
  },
  '&::after': {
    content: '""',
    position: 'absolute',
    bottom: 0,
    left: '50%',
    width: 0,
    height: '2px',
    backgroundColor: '#ffcf51',
    transition: 'all 0.3s ease',
  },
  '&:hover::after': {
    width: '80%',
    left: '10%',
  },
}))

// const DropdownPaper = styled(Paper)(({ theme }) => ({
//   minWidth: '160px',
//   borderRadius: '8px',
//   marginTop: '8px',
//   boxShadow: '0 8px 24px rgba(0,0,0,0.15)', // Enhanced shadow
//   backgroundImage: 'linear-gradient(to bottom, #fcfcfc, #f8f8f8)', // Slightly darker gradient
//   padding: theme.spacing(0.5, 0),
//   border: '1px solid rgba(0,0,0,0.08)', // Add subtle border
//   backdropFilter: 'blur(8px)', // Add backdrop blur for better separation
//   // overflow: 'hidden',
//   position: 'relative',
//   '&::before': {
//     content: '""',
//     position: 'absolute',
//     top: 0,
//     left: 0,
//     right: 0,
//     bottom: 0,
//     background:
//       'linear-gradient(135deg, rgba(255,207,81,0.02) 0%, rgba(35,37,54,0.02) 100%)',
//     borderRadius: '8px',
//     pointerEvents: 'none',
//   },
// }))

const StyledListItemButton = styled(ListItemButton)(({ theme, level = 0 }) => ({
  padding: theme.spacing(0.5, 1, 0.5, 1 + level * 1.2),
  borderRadius: '4px',
  margin: theme.spacing(0.1, 0.5),
  minHeight: 'auto',
  '&:hover': {
    backgroundColor: alpha(theme.palette.primary.main, 0.08),
  },
}))
// Coverage Dropdown Component

const CoverageDropdown = ({
  open,

  anchorEl,

  handleClose,

  openMenuId,

  setOpenMenuId,
}) => {
  const regions = [
    { name: 'UAE', status: 'live' },
    { name: 'KSA', status: 'live' },
    { name: 'Kuwait', status: 'soon' },
    { name: 'Qatar', status: 'soon' },
    { name: 'Oman', status: 'soon' },
    { name: 'Bahrain', status: 'soon' },
  ]

  const handleContentClick = (e) => {
    e.stopPropagation()
  }

  return (
    <Popper
      open={open}
      anchorEl={anchorEl}
      placement='bottom-start'
      transition
      disablePortal
      sx={{ zIndex: 1200 }}
    >
      {({ TransitionProps }) => (
        <Grow {...TransitionProps}>
          <Paper
            sx={{
              minWidth: '280px',

              p: 1.5,

              mt: 1,

              borderRadius: 2,

              boxShadow: '0 6px 20px rgba(0,0,0,0.12)',
            }}
            onClick={handleContentClick}
          >
            <ClickAwayListener onClickAway={handleClose}>
              <Box>
                <Typography
                  variant='subtitle2'
                  sx={{ mb: 1.5, fontWeight: 600, color: '#232536' }}
                >
                  Coverage
                </Typography>

                <Box sx={{ pl: 1 }}>
                  {' '}
                  {/* borderLeft: '2px solid #e0e0e0' */}
                  {regions.map((region, index) => (
                    <Box
                      key={region.name}
                      sx={{
                        display: 'flex',

                        alignItems: 'center',
                        justifyContent: 'flex-start', // ✅ keep items together
                        columnGap: 2, // ✅ consistent spacing between name & chip

                        py: 0.75,

                        px: 1,

                        borderLeft: '2px solid',

                        borderColor: alpha('#232536', 0.1),

                        cursor: 'pointer',

                        transition: 'all 0.2s ease',

                        '&:hover': {
                          color: '#232536',

                          borderColor: '#ffcf51',

                          backgroundColor: alpha('#ffcf51', 0.1),

                          borderRadius: '0 4px 4px 0',
                        },
                      }}
                    >
                      <Box
                        sx={{ display: 'flex', alignItems: 'center', flex: 1 }}
                      >
                        <Box
                          sx={{
                            width: 6,

                            height: 6,

                            borderRadius: '50%',

                            backgroundColor: '#ffcf51',

                            mr: 1.5,

                            flexShrink: 0,
                          }}
                        />

                        <Typography
                          variant='body2'
                          sx={{
                            color: '#4a4a4a',
                            fontSize: '0.85rem',
                            transition: 'color 0.2s ease',
                          }}
                        >
                          {region.name}
                        </Typography>
                      </Box>

                      <Chip
                        label={
                          region.status === 'live' ? 'Partially Live' : 'Soon'
                        }
                        size='small'
                        sx={{
                          height: 20,

                          fontSize: '0.7rem',

                          fontWeight: 500,

                          backgroundColor:
                            region.status === 'live' ? '#4caf50' : '#ff9800',

                          color: 'white',

                          '& .MuiChip-label': {
                            px: 1,
                          },
                        }}
                      />
                    </Box>
                  ))}
                </Box>
              </Box>
            </ClickAwayListener>
          </Paper>
        </Grow>
      )}
    </Popper>
  )
}
// Universal Search Dropdown Component
const UniversalSearchDropdown = ({
  selectedCountry,
  open,
  anchorEl,
  handleClose,
  openMenuId,
  setOpenMenuId,
}) => {
  const [searchQuery, setSearchQuery] = useState('')
  const navigate = useNavigate()
  const searchInputRef = useRef(null)

  // Focus the search input when dropdown opens
  useEffect(() => {
    if (open && searchInputRef.current) {
      setTimeout(() => {
        searchInputRef.current.focus()
      }, 100)
    }
  }, [open])

  // Prevent dropdown from closing when interacting with the form
  const handleContentClick = (e) => {
    e.stopPropagation()
  }

  const handleSearch = () => {
    if (selectedCountry) {
      navigate(
        `/search-across-country?country=${selectedCountry}&query=${encodeURIComponent(
          searchQuery.trim()
        )}`
      )
      handleClose()
      setSearchQuery('')
      setOpenMenuId(null)
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      handleSearch()
    }
  }

  const handleClearSearch = () => {
    setSearchQuery('')
    if (searchInputRef.current) {
      searchInputRef.current.focus()
    }
  }

  return (
    <Popper
      open={open}
      anchorEl={anchorEl}
      placement='bottom-start'
      transition
      disablePortal
      sx={{ zIndex: 1200 }}
    >
      {({ TransitionProps }) => (
        <Grow {...TransitionProps}>
          <Paper
            sx={{
              minWidth: '320px',
              p: 2,
              mt: 1,
              borderRadius: 2,
              boxShadow: '0 6px 20px rgba(0,0,0,0.12)',
            }}
            onClick={handleContentClick}
          >
            <ClickAwayListener onClickAway={handleClose}>
              <Box>
                <Typography variant='subtitle2' sx={{ mb: 2, fontWeight: 600 }}>
                  Search across all {selectedCountry} tax laws
                </Typography>

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <TextField
                    fullWidth
                    placeholder='Enter your search query'
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={handleKeyDown}
                    inputRef={searchInputRef}
                    size='small'
                    disabled={!selectedCountry}
                    InputProps={{
                      endAdornment: searchQuery ? (
                        <InputAdornment position='end'>
                          <IconButton
                            aria-label='clear search'
                            onClick={handleClearSearch}
                            edge='end'
                            size='small'
                          >
                            <ClearRoundedIcon fontSize='small' />
                          </IconButton>
                        </InputAdornment>
                      ) : null,
                    }}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        '&.Mui-focused fieldset': {
                          borderColor: '#232536',
                        },
                      },
                    }}
                  />

                  <IconButton
                    color='primary'
                    onClick={handleSearch}
                    disabled={!selectedCountry}
                    sx={{
                      bgcolor: '#232536',
                      color: 'white',
                      '&:hover': {
                        bgcolor: '#343750',
                      },
                      '&:disabled': {
                        bgcolor: 'rgba(0, 0, 0, 0.12)',
                      },
                    }}
                  >
                    <SearchRoundedIcon />
                  </IconButton>
                </Box>

                {!selectedCountry && (
                  <Typography
                    variant='caption'
                    color='error'
                    sx={{ mt: 1, display: 'block' }}
                  >
                    Please wait while country data loads...
                  </Typography>
                )}
              </Box>
            </ClickAwayListener>
          </Paper>
        </Grow>
      )}
    </Popper>
  )
}

// Hoverable dropdown menu for desktop with closeOthers functionality
// const NavMenuHoverable = ({
//   title,
//   items,
//   icon,
//   openMenuId,
//   setOpenMenuId,
//   isSearchMenu,
//   isCoverageMenu,
//   selectedCountry,
// }) => {
// const [open, setOpen] = useState(false)
//   const anchorRef = useRef(null)
//   const navigate = useNavigate()
//   const timerRef = useRef(null)
//   const mouseOverRef = useRef(false)
//   const menuId = useRef(`menu-${title}`)

//   // Check if this is a simple menu (like About GTL) vs complex mega menu (like Tax Laws)
//   const isSimpleMenu = title !== 'Tax Laws'
//
//   // Calculate dynamic width based on content
//   const calculateMegaMenuWidth = (items) => {
//     if (!items || items.length === 0) return '300px'
//
//     // Calculate based on screen size and number of countries
//     const countryCount = items.length
//     const baseWidth = 200
//     const minWidth = 300
//     const maxWidth =
//       typeof window !== 'undefined'
//         ? Math.min(window.innerWidth * 0.9, 900)
//         : 900 // 90% of screen or 900px max
//
//     // Dynamic width based on available space
//     let calculatedWidth = Math.max(
//       minWidth,
//       baseWidth * Math.min(countryCount, 4)
//     )
//     calculatedWidth = Math.min(calculatedWidth, maxWidth)
//
//     return `${calculatedWidth}px`
//   }
//   // 🔧 Cleanup timer on unmount
//   useEffect(() => {
//     return () => {
//       if (timerRef.current) {
//         clearTimeout(timerRef.current)
//         timerRef.current = null
//       }
//     }
//   }, [])
//   // Handle when another menu opens
//   useEffect(() => {
//     if (openMenuId && openMenuId !== menuId.current) {
//       setOpen(false)
//       mouseOverRef.current = false
//       if (timerRef.current) {
//         clearTimeout(timerRef.current)
//         timerRef.current = null
//       }
//     }
//   }, [openMenuId])
//
//   const handleMouseEnter = () => {
//     if (timerRef.current) {
//       clearTimeout(timerRef.current)
//       timerRef.current = null
//     }
//     mouseOverRef.current = true
//     setOpen(true)
//     setOpenMenuId(menuId.current)
//   }
//
//   const handleMouseLeave = () => {
//     mouseOverRef.current = false
//
//     if (timerRef.current) {
//       clearTimeout(timerRef.current)
//     }
//     timerRef.current = setTimeout(() => {
//       if (!mouseOverRef.current) {
//         setOpen(false)
//       }
//     }, 300)
//   }
//
//   const handleClose = (event, reason) => {
//     if (anchorRef.current && anchorRef.current.contains(event?.target)) {
//       return
//     }
//     // setOpen(false)
//
//     if (reason === 'backdropClick' || reason === 'escapeKeyDown' || !reason) {
//       setOpen(false)
//
//       setOpenMenuId(null)
//
//       mouseOverRef.current = false
//       if (timerRef.current) {
//         clearTimeout(timerRef.current)
//         timerRef.current = null
//       }
//     }
//   }
//
//   const handleLinkClick = (path) => {
//     // console.log('🔍 handleLinkClick called:', path)
//
//     // console.log('🔍 Current location:', window.location.pathname)
//
//     if (!path) {
//       // console.log('❌ No path provided')
//
//       return
//     }
//
//     if (path === window.location.pathname) {
//       // console.log('❌ Same page, navigation prevented')
//
//       setOpen(false)
//
//       setOpenMenuId(null)
//
//       return
//     }
//
//     // console.log('✅ Navigating from', window.location.pathname, 'to', path)
//     navigate(path)
//     setOpen(false)
//     setOpenMenuId(null)
//     mouseOverRef.current = false
//
//     if (timerRef.current) {
//       clearTimeout(timerRef.current)
//       timerRef.current = null
//     }
//   }
//
//   const handleToggle = (e) => {
//     e.preventDefault()
//
//     e.stopPropagation()
//     const newOpenState = !open
//     setOpen(newOpenState)
//     if (newOpenState) {
//       setOpenMenuId(menuId.current)
//     } else {
//       setOpenMenuId(null)
//     }
//   }
//   // If this is the coverage menu, render the coverage dropdown
//
//   if (isCoverageMenu) {
//     return (
//       <Box
//         onMouseEnter={handleMouseEnter}
//         onMouseLeave={handleMouseLeave}
//         sx={{ position: 'relative' }}
//       >
//         <MenuButton
//           ref={anchorRef}
//           aria-controls={open ? `${title}-menu` : undefined}
//           aria-haspopup='true'
//           onClick={handleToggle}
//           endIcon={
//             <ExpandMoreRoundedIcon
//               sx={{
//                 transition: 'transform 0.2s',
//
//                 transform: open ? 'rotate(180deg)' : 'rotate(0)',
//               }}
//             />
//           }
//           startIcon={icon}
//         >
//           {title}
//         </MenuButton>
//
//         <CoverageDropdown
//           open={open}
//           anchorEl={anchorRef.current}
//           handleClose={handleClose}
//           openMenuId={openMenuId}
//           setOpenMenuId={setOpenMenuId}
//         />
//       </Box>
//     )
//   }
//
//   // If this is the search menu, render the search dropdown
//   if (isSearchMenu) {
//     return (
//       <Box
//         onMouseEnter={handleMouseEnter}
//         onMouseLeave={handleMouseLeave}
//         sx={{ position: 'relative' }}
//       >
//         <MenuButton
//           ref={anchorRef}
//           aria-controls={open ? `${title}-menu` : undefined}
//           aria-haspopup='true'
//           onClick={handleToggle}
//           endIcon={
//             <ExpandMoreRoundedIcon
//               sx={{
//                 transition: 'transform 0.2s',
//                 transform: open ? 'rotate(180deg)' : 'rotate(0)',
//               }}
//             />
//           }
//           startIcon={icon}
//         >
//           {title}
//         </MenuButton>
//
//         <UniversalSearchDropdown
//           selectedCountry={selectedCountry}
//           open={open}
//           anchorEl={anchorRef.current}
//           handleClose={handleClose}
//           openMenuId={openMenuId}
//           setOpenMenuId={setOpenMenuId}
//         />
//       </Box>
//     )
//   }
//
//   // For simple menus like "About GTL", render a compact dropdown
//
//   if (isSimpleMenu) {
//     return (
//       <Box
//         onMouseEnter={handleMouseEnter}
//         onMouseLeave={handleMouseLeave}
//         sx={{ position: 'relative' }}
//       >
//         <MenuButton
//           ref={anchorRef}
//           aria-controls={open ? `${title}-menu` : undefined}
//           aria-haspopup='true'
//           onClick={handleToggle}
//           endIcon={
//             <ExpandMoreRoundedIcon
//               sx={{
//                 transition: 'transform 0.2s',
//
//                 transform: open ? 'rotate(180deg)' : 'rotate(0)',
//               }}
//             />
//           }
//           startIcon={icon}
//         >
//           {title}
//         </MenuButton>
//
//         <Menu
//           id={`${title}-menu`}
//           anchorEl={anchorRef.current}
//           open={open}
//           onClose={handleClose}
//           disableScrollLock={true}
//           MenuListProps={{
//             'aria-labelledby': `${title}-button`, // 'basic-button',
//             // onMouseEnter: handleMouseEnter,
//             // onMouseLeave: handleMouseLeave,
//           }}
//           PaperProps={{
//             sx: {
//               mt: 1,
//
//               borderRadius: 2,
//
//               minWidth: '180px',
//
//               boxShadow: '0 6px 20px rgba(0,0,0,0.12)',
//             },
//             onMouseEnter: () => {
//               mouseOverRef.current = true
//
//               clearTimeout(timerRef.current)
//             },
//
//             onMouseLeave: () => {
//               mouseOverRef.current = false
//
//               timerRef.current = setTimeout(() => {
//                 if (!mouseOverRef.current) {
//                   setOpen(false)
//
//                   setOpenMenuId(null)
//                 }
//               }, 300)
//             },
//           }}
//           disableAutoFocus={true}
//           disableRestoreFocus={true}
//           disableEnforceFocus={true}
//         >
//           {items.map((item) => (
//             <MenuItem
//               key={item.text}
//               onClick={(e) => {
//                 e.preventDefault()
//
//                 e.stopPropagation()
//
//                 handleLinkClick(item.link)
//               }}
//               sx={{
//                 py: 1,
//
//                 px: 2,
//
//                 fontSize: '0.9rem',
//
//                 '&:hover': {
//                   backgroundColor: alpha('#232536', 0.08),
//                 },
//               }}
//             >
//               {item.text}
//             </MenuItem>
//           ))}
//         </Menu>
//       </Box>
//     )
//   }
//
//   // For complex menus like "Tax Laws", render the mega menu with dynamic width
//
//   const dynamicWidth = calculateMegaMenuWidth(items)
//   return (
//     <Box
//       onMouseEnter={handleMouseEnter}
//       onMouseLeave={handleMouseLeave}
//       sx={{ position: 'relative' }}
//     >
//       <MenuButton
//         ref={anchorRef}
//         aria-controls={open ? `${title}-menu` : undefined}
//         aria-haspopup='true'
//         onClick={handleToggle}
//         endIcon={
//           <ExpandMoreRoundedIcon
//             sx={{
//               transition: 'transform 0.2s',
//               transform: open ? 'rotate(180deg)' : 'rotate(0)',
//             }}
//           />
//         }
//         startIcon={icon}
//       >
//         {title}
//       </MenuButton>
//       <Popper
//         open={open}
//         anchorEl={anchorRef.current}
//         role={undefined}
//         placement='bottom-start'
//         transition
//         disablePortal
//         sx={{
//           zIndex: 1200,
//           width: dynamicWidth, // title === 'Tax Laws' ? '700px' : 'auto', // Wider for complex menus
//           maxWidth: '90vw', // Prevent off-screen on mobile
//         }}
//         onMouseEnter={handleMouseEnter}
//         onMouseLeave={handleMouseLeave}
//       >
//         {({ TransitionProps, placement }) => (
//           <Grow
//             {...TransitionProps}
//             style={{
//               transformOrigin:
//                 placement === 'bottom-start' ? 'left top' : 'left bottom',
//             }}
//           >
//             <Paper
//               sx={{
//                 p: 1,
//                 display: 'flex',
//                 flexDirection: 'column',
//                 minWidth: '160px',
//                 borderRadius: '8px',
//                 boxShadow: '0 8px 24px rgba(0,0,0,0.15)', // Enhanced shadow
//                 backgroundImage: 'linear-gradient(to bottom, #fcfcfc, #f8f8f8)', // Slightly darker gradient
//                 border: '1px solid rgba(0,0,0,0.08)', // Add subtle border
//                 backdropFilter: 'blur(8px)', // Add backdrop blur for better separation
//                 position: 'relative',
//                 '&::before': {
//                   content: '""',
//                   position: 'absolute',
//                   top: 0,
//                   left: 0,
//                   right: 0,
//                   bottom: 0,
//                   background:
//                     'linear-gradient(135deg, rgba(255,207,81,0.02) 0%, rgba(35,37,54,0.02) 100%)',
//                   borderRadius: '8px',
//                   pointerEvents: 'none',
//                   zIndex: -1,
//                 },
//               }}
//             >
//               <ClickAwayListener onClickAway={handleClose}>
//                 <Box>
//                   {/* Title area for larger menus */}
//                   {title === 'Tax Laws' && (
//                     <Typography
//                       variant='subtitle1'
//                       sx={{ mb: 1, fontWeight: 600, color: '#232536', px: 0.5 }}
//                     >
//                       {title}
//                     </Typography>
//                   )}
//
//                   {/* Mega menu layout - display all levels horizontally */}
//                   <Box
//                     sx={{
//                       display: 'grid',
//                       gridTemplateColumns: {
//                         xs: '1fr', // Single column on very small screens
//                         sm: 'repeat(2, 1fr)', // 2 columns on small screens
//                         md: 'repeat(3, 1fr)', // Changed from 200px to 180px
//                         lg: 'repeat(auto-fit, minmax(200px, 1fr))', // Auto-fit columns on large screens
//                       },
//                       gap: 1,
//                       maxHeight: '70vh', // Limit height
//                       overflowY: 'auto', // Add scroll if needed
//                       alignItems: 'start', // Add this to align items to top
//                       // Add minimum grid behavior
//                       gridAutoRows: 'min-content', // Ensure rows size to content
//                     }}
//                   >
//                     {items.map((item) => (
//                       <MegaMenuSection
//                         key={item.text}
//                         item={item}
//                         handleLinkClick={handleLinkClick}
//                       />
//                     ))}
//                   </Box>
//                 </Box>
//               </ClickAwayListener>
//             </Paper>
//           </Grow>
//         )}
//       </Popper>
//     </Box>
//   )
// }
// Compact Dropdown Menu Component (Desktop version similar to mobile drawer)
const CompactDropdownMenu = ({
  title,
  items,
  icon,
  openMenuId,
  setOpenMenuId,
  isSearchMenu,
  isCoverageMenu,
  selectedCountry,
}) => {
  const [open, setOpen] = useState(false)
  const anchorRef = useRef(null)
  const navigate = useNavigate()
  const timerRef = useRef(null)
  const mouseOverRef = useRef(false)
  const menuId = useRef(`menu-${title}`)
  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current)
        timerRef.current = null
      }
    }
  }, [])
  // Handle when another menu opens
  useEffect(() => {
    if (openMenuId && openMenuId !== menuId.current) {
      setOpen(false)
      mouseOverRef.current = false
      if (timerRef.current) {
        clearTimeout(timerRef.current)
        timerRef.current = null
      }
    }
  }, [openMenuId])

  const handleMouseEnter = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current)
      timerRef.current = null
    }
    mouseOverRef.current = true
    setOpen(true)
    setOpenMenuId(menuId.current)
  }

  const handleMouseLeave = () => {
    mouseOverRef.current = false
    if (timerRef.current) {
      clearTimeout(timerRef.current)
    }
    timerRef.current = setTimeout(() => {
      if (!mouseOverRef.current) {
        setOpen(false)
      }
    }, 300)
  }

  const handleClose = (event, reason) => {
    if (anchorRef.current && anchorRef.current.contains(event?.target)) {
      return
    }

    if (reason === 'backdropClick' || reason === 'escapeKeyDown' || !reason) {
      setOpen(false)
      setOpenMenuId(null)
      mouseOverRef.current = false
      if (timerRef.current) {
        clearTimeout(timerRef.current)
        timerRef.current = null
      }
    }
  }

  const handleLinkClick = (path) => {
    if (!path) return
    if (path === window.location.pathname) {
      setOpen(false)
      setOpenMenuId(null)
      return
    }

    navigate(path)
    setOpen(false)
    setOpenMenuId(null)
    mouseOverRef.current = false
    if (timerRef.current) {
      clearTimeout(timerRef.current)
      timerRef.current = null
    }
  }

  const handleToggle = (e) => {
    e.preventDefault()
    e.stopPropagation()
    const newOpenState = !open
    setOpen(newOpenState)
    if (newOpenState) {
      setOpenMenuId(menuId.current)
    } else {
      setOpenMenuId(null)
    }
  }

  // Handle special menu types (keep existing logic)
  if (isCoverageMenu) {
    return (
      <Box
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        sx={{ position: 'relative' }}
      >
        <MenuButton
          ref={anchorRef}
          aria-controls={open ? `${title}-menu` : undefined}
          aria-haspopup='true'
          onClick={handleToggle}
          endIcon={
            <ExpandMoreRoundedIcon
              sx={{
                transition: 'transform 0.2s',
                transform: open ? 'rotate(180deg)' : 'rotate(0)',
              }}
            />
          }
          startIcon={icon}
        >
          {title}
        </MenuButton>
        <CoverageDropdown
          open={open}
          anchorEl={anchorRef.current}
          handleClose={handleClose}
          openMenuId={openMenuId}
          setOpenMenuId={setOpenMenuId}
        />
      </Box>
    )
  }

  if (isSearchMenu) {
    return (
      <Box
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        sx={{ position: 'relative' }}
      >
        <MenuButton
          ref={anchorRef}
          aria-controls={open ? `${title}-menu` : undefined}
          aria-haspopup='true'
          onClick={handleToggle}
          endIcon={
            <ExpandMoreRoundedIcon
              sx={{
                transition: 'transform 0.2s',
                transform: open ? 'rotate(180deg)' : 'rotate(0)',
              }}
            />
          }
          startIcon={icon}
        >
          {title}
        </MenuButton>
        <UniversalSearchDropdown
          selectedCountry={selectedCountry}
          open={open}
          anchorEl={anchorRef.current}
          handleClose={handleClose}
          openMenuId={openMenuId}
          setOpenMenuId={setOpenMenuId}
        />
      </Box>
    )
  }

  // For simple menus (About GTL, etc.)
  if (title !== 'Tax Laws') {
    return (
      <Box
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        sx={{ position: 'relative' }}
      >
        <MenuButton
          ref={anchorRef}
          aria-controls={open ? `${title}-menu` : undefined}
          aria-haspopup='true'
          onClick={handleToggle}
          endIcon={
            <ExpandMoreRoundedIcon
              sx={{
                transition: 'transform 0.2s',
                transform: open ? 'rotate(180deg)' : 'rotate(0)',
              }}
            />
          }
          startIcon={icon}
        >
          {title}
        </MenuButton>
        <Menu
          id={`${title}-menu`}
          anchorEl={anchorRef.current}
          open={open}
          onClose={handleClose}
          disableScrollLock={true}
          PaperProps={{
            sx: {
              mt: 1,
              borderRadius: 2,
              minWidth: '180px',
              boxShadow: '0 6px 20px rgba(0,0,0,0.12)',
            },
            onMouseEnter: () => {
              mouseOverRef.current = true
              clearTimeout(timerRef.current)
            },
            onMouseLeave: () => {
              mouseOverRef.current = false
              if (timerRef.current) {
                clearTimeout(timerRef.current)
              }
              timerRef.current = setTimeout(() => {
                if (!mouseOverRef.current) {
                  setOpen(false)
                  setOpenMenuId(null)
                }
              }, 300)
            },
          }}
        >
          {items.map((item) =>
            item.isCoverageMenu ? (
              // Special handling for coverage menu items
              <Box key={item.text} sx={{ px: 2, py: 1 }}>
                <Typography
                  variant='body2'
                  sx={{ mb: 1, fontWeight: 600, color: '#232536' }}
                >
                  {item.text}
                </Typography>
                <Box sx={{ pl: 1 }}>
                  {[
                    { name: 'UAE', status: 'live' },
                    { name: 'KSA', status: 'live' },
                    { name: 'Kuwait', status: 'soon' },
                    { name: 'Qatar', status: 'soon' },
                    { name: 'Oman', status: 'soon' },
                    { name: 'Bahrain', status: 'soon' },
                  ].map((region) => (
                    <Box
                      key={region.name}
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'flex-start', // ✅ keep items together
                        columnGap: 2, // ✅ consistent spacing between name & chip
                        py: 0.75,
                        px: 1,
                        borderLeft: '2px solid',
                        borderColor: alpha('#232536', 0.1),
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                        '&:hover': {
                          color: '#232536',
                          borderColor: '#ffcf51',
                          backgroundColor: alpha('#ffcf51', 0.1),
                          borderRadius: '0 4px 4px 0',
                        },
                      }}
                    >
                      <Box
                        sx={{ display: 'flex', alignItems: 'center', flex: 1 }}
                      >
                        <Box
                          sx={{
                            width: 6,
                            height: 6,
                            borderRadius: '50%',
                            backgroundColor: '#ffcf51',
                            mr: 1.5,
                            flexShrink: 0,
                          }}
                        />
                        <Typography
                          variant='body2'
                          sx={{
                            color: '#4a4a4a',
                            fontSize: '0.85rem',
                            transition: 'color 0.2s ease',
                          }}
                        >
                          {region.name}
                        </Typography>
                      </Box>
                      <Chip
                        label={
                          region.status === 'live' ? 'Partially Live' : 'Soon'
                        }
                        size='small'
                        sx={{
                          height: 20,
                          fontSize: '0.7rem',
                          fontWeight: 500,
                          backgroundColor:
                            region.status === 'live' ? '#4caf50' : '#ff9800',
                          color: 'white',
                          '& .MuiChip-label': {
                            px: 1,
                          },
                        }}
                      />
                    </Box>
                  ))}
                </Box>
              </Box>
            ) : (
              // Regular menu items
              <MenuItem
                key={item.text}
                onClick={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                  handleLinkClick(item.link)
                }}
                sx={{
                  py: 1,
                  px: 2,
                  fontSize: '0.9rem',
                  '&:hover': { backgroundColor: alpha('#232536', 0.08) },
                }}
              >
                {item.text}
              </MenuItem>
            )
          )}
        </Menu>
      </Box>
    )
  }

  // Main Tax Laws compact dropdown
  return (
    <Box
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      sx={{ position: 'relative' }}
    >
      <MenuButton
        ref={anchorRef}
        aria-controls={open ? `${title}-menu` : undefined}
        aria-haspopup='true'
        onClick={handleToggle}
        endIcon={
          <ExpandMoreRoundedIcon
            sx={{
              transition: 'transform 0.2s',
              transform: open ? 'rotate(180deg)' : 'rotate(0)',
            }}
          />
        }
        startIcon={icon}
      >
        {title}
      </MenuButton>

      <Popper
        open={open}
        anchorEl={anchorRef.current}
        placement='bottom-start'
        transition
        disablePortal
        sx={{ zIndex: 1200, maxWidth: '400px', width: '350px' }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {({ TransitionProps }) => (
          <Grow {...TransitionProps}>
            <Paper
              sx={{
                p: 1,
                mt: 1,
                borderRadius: 2,
                boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
                backgroundImage: 'linear-gradient(to bottom, #fcfcfc, #f8f8f8)',
                border: '1px solid rgba(0,0,0,0.08)',
                maxHeight: '70vh',
                overflowY: 'auto',
              }}
            >
              <ClickAwayListener onClickAway={handleClose}>
                <Box>
                  <Typography
                    variant='subtitle1'
                    sx={{ mb: 1, fontWeight: 600, color: '#232536', px: 0.5 }}
                  >
                    {title}
                  </Typography>

                  {/* Render collapsible menu items */}
                  {items.map((item) => (
                    <CompactMenuItem
                      key={item.text}
                      item={item}
                      level={0}
                      handleLinkClick={handleLinkClick}
                      openMenuId={openMenuId}
                      setOpenMenuId={setOpenMenuId}
                    />
                  ))}
                </Box>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </Box>
  )
}

// Compact Menu Item Component (similar to DrawerMenuItem but for desktop)
const CompactMenuItem = ({
  item,
  level = 0,
  handleLinkClick,
  openMenuId,
  setOpenMenuId,
}) => {
  const [open, setOpen] = useState(false)
  const hasSubItems = item.subItems && item.subItems.length > 0
  const isCountryHeader = item.isCountryHeader
  const isCoverageMenu = item.isCoverageMenu

  const handleToggle = () => {
    setOpen(!open)
  }

  const handleClick = () => {
    if (isCoverageMenu) {
      handleToggle() // For coverage, just toggle to show/hide
    } else if (!hasSubItems && item.link) {
      handleLinkClick(item.link)
    } else {
      handleToggle()
    }
  }
  // Handle coverage menu specially
  if (isCoverageMenu) {
    return (
      <>
        <Box
          onClick={handleClick}
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-start', // ✅ keep items together
            columnGap: 2, // ✅ consistent spacing between name & chip
            p: 1,
            m: 0.5,
            borderRadius: 1,
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            paddingLeft: `${1 + level * 1.5}rem`,
            fontSize: '0.9rem',
            fontWeight: 400,
            '&:hover': { backgroundColor: alpha('#232536', 0.08) },
          }}
        >
          <Typography
            variant='body2'
            sx={{
              color: '#232536',
              flex: 1,
              fontSize: 'inherit',
              fontWeight: 'inherit',
            }}
          >
            {item.text}
          </Typography>

          <Box sx={{ ml: 1, display: 'flex', alignItems: 'center' }}>
            {open ? (
              <ExpandLessRoundedIcon
                fontSize='small'
                sx={{ color: '#232536' }}
              />
            ) : (
              <ExpandMoreRoundedIcon
                fontSize='small'
                sx={{ color: '#232536' }}
              />
            )}
          </Box>
        </Box>

        <Collapse in={open} timeout='auto' unmountOnExit>
          <Box sx={{ px: 2, py: 1 }}>
            {/* Render the coverage content directly */}
            <Box sx={{ pl: 1 }}>
              {[
                { name: 'UAE', status: 'live' },
                { name: 'KSA', status: 'live' },
                { name: 'Kuwait', status: 'soon' },
                { name: 'Qatar', status: 'soon' },
                { name: 'Oman', status: 'soon' },
                { name: 'Bahrain', status: 'soon' },
              ].map((region) => (
                <Box
                  key={region.name}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'flex-start',
                    columnGap: 2, // space between name and chip
                    py: 0.75,
                    px: 1,
                    borderLeft: '2px solid',
                    borderColor: alpha('#232536', 0.1),
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    '&:hover': {
                      color: '#232536',
                      borderColor: '#ffcf51',
                      backgroundColor: alpha('#ffcf51', 0.1),
                      borderRadius: '0 4px 4px 0',
                    },
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Box
                      sx={{
                        width: 6,
                        height: 6,
                        borderRadius: '50%',
                        backgroundColor: '#ffcf51',
                        mr: 1.5,
                        flexShrink: 0,
                      }}
                    />
                    <Typography
                      variant='body2'
                      sx={{
                        color: '#4a4a4a',
                        fontSize: '0.85rem',
                        transition: 'color 0.2s ease',
                      }}
                    >
                      {region.name}
                    </Typography>
                  </Box>
                  <Chip
                    label={region.status === 'live' ? 'Partially Live' : 'Soon'}
                    size='small'
                    sx={{
                      ml: 0.5, // optional, since columnGap already gives space
                      flexShrink: 0,
                      height: 20,
                      fontSize: '0.7rem',
                      fontWeight: 500,
                      backgroundColor:
                        region.status === 'live' ? '#4caf50' : '#ff9800',
                      color: 'white',
                      '& .MuiChip-label': {
                        px: 1,
                      },
                    }}
                  />
                </Box>
              ))}
            </Box>
          </Box>
        </Collapse>
      </>
    )
  }
  // Styling based on level and item type
  const getItemStyling = () => {
    if (isCountryHeader) {
      return {
        backgroundColor: alpha('#232536', 0.05),
        borderLeft: '3px solid #ffcf51',
        fontWeight: 700, // Always bold for country headers
        fontSize: '0.9rem',
        // textTransform: 'uppercase',
        letterSpacing: '0.5px',
        '&:hover': { backgroundColor: alpha('#232536', 0.1) },
      }
    }

    return {
      paddingLeft: `${1 + level * 1.5}rem`,
      fontSize: level === 0 ? '0.9rem' : level === 1 ? '0.85rem' : '0.8rem',
      // Bold for non-leaf nodes (have sub-items) AND for standalone laws (level 0-1 leaf nodes)
      fontWeight: hasSubItems
        ? 600 // Has children - always bold
        : level <= 1
        ? 600 // Standalone laws (level 0 or 1 with no sub-items) are bold
        : 400, // Deep nested leaf nodes (level 2+) are normal
      '&:hover': { backgroundColor: alpha('#232536', 0.08) },
    }
  }

  return (
    <>
      <Box
        onClick={handleClick}
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          p: 1,
          m: 0.5,
          borderRadius: 1,
          cursor: 'pointer',
          transition: 'all 0.2s ease',
          ...getItemStyling(),
        }}
      >
        <Typography
          variant='body2'
          sx={{
            color: '#232536',
            flex: 1,
            fontSize: 'inherit',
            fontWeight: 'inherit',
            textTransform: 'inherit',
            letterSpacing: 'inherit',
          }}
        >
          {item.text}
        </Typography>

        {hasSubItems && (
          <Box sx={{ ml: 1, display: 'flex', alignItems: 'center' }}>
            {open ? (
              <ExpandLessRoundedIcon
                fontSize='small'
                sx={{ color: '#232536' }}
              />
            ) : (
              <ExpandMoreRoundedIcon
                fontSize='small'
                sx={{ color: '#232536' }}
              />
            )}
          </Box>
        )}
      </Box>

      {hasSubItems && (
        <Collapse in={open} timeout='auto' unmountOnExit>
          <Box sx={{ pl: level === 0 && isCountryHeader ? 0 : 1 }}>
            {item.subItems.map((subItem) => (
              <CompactMenuItem
                key={subItem.text}
                item={subItem}
                level={level + 1}
                handleLinkClick={handleLinkClick}
                openMenuId={openMenuId}
                setOpenMenuId={setOpenMenuId}
              />
            ))}
          </Box>
        </Collapse>
      )}
    </>
  )
}

const MegaMenuSection = ({ item, handleLinkClick, level = 0 }) => {
  const hasSubItems = item.subItems && item.subItems.length > 0
  const isCountryHeader = item.isCountryHeader

  // Calculate content height for better distribution
  const contentHeight = hasSubItems ? 'auto' : 'min-content'

  // Dynamic styling based on item type and hierarchy
  const getStyling = () => {
    // Country header styling (has isCountryHeader flag)
    if (isCountryHeader) {
      return {
        fontWeight: 700,
        color: '#232536',
        fontSize: '0.85rem',
        borderBottom: '2px solid #ffcf51',
        textTransform: 'uppercase',
        letterSpacing: '0.5px',
        backgroundColor: 'rgba(255, 207, 81, 0.05)',
        borderRadius: '4px 4px 0 0',
        padding: '0.75rem',
        marginBottom: '0.5rem',
      }
    }

    // Leaf node styling (has no sub-items - these are the clickable final items)
    if (!hasSubItems) {
      return {
        fontWeight: 400,
        color: '#4a4a4a',
        fontSize: '0.75rem',
        padding: '0.4rem',
        paddingLeft: `${Math.max(0.75, level * 0.5)}rem`, // Dynamic left padding based on level
        lineHeight: 1.3,
        cursor: 'pointer',
        borderLeft: '2px solid',
        borderColor: alpha('#232536', 0.1),
        marginBottom: '0.25rem',
        '&:hover': {
          color: '#232536',
          borderColor: '#ffcf51',
          backgroundColor: alpha('#ffcf51', 0.1),
          borderRadius: '0 4px 4px 0',
        },
      }
    }

    // Parent/category node styling (has sub-items - these are section headers)
    return {
      fontWeight: 600,
      color: '#232536',
      fontSize: level === 1 ? '0.8rem' : '0.75rem',
      padding: '0.5rem',
      marginBottom: '0.5rem',
      borderBottom: level === 1 ? '1px solid' : 'none',
      borderColor: level === 1 ? alpha('#232536', 0.1) : 'transparent',
      cursor: item.link ? 'pointer' : 'default',
      // Add subtle left border for clickable parent items
      ...(item.link && {
        borderLeft: '2px solid',
        borderColor: alpha('#232536', 0.1),
        '&:hover': {
          color: '#232536',
          borderColor: '#ffcf51',
          backgroundColor: alpha('#ffcf51', 0.1),
          borderRadius: '0 4px 4px 0',
        },
      }),
    }
  }

  return (
    <Box
      sx={{
        minWidth: isCountryHeader ? '180px' : '160px',
        p: level === 0 ? 0.75 : 0,
        flex: '1 1 auto',
        maxWidth: isCountryHeader ? '200px' : '180px',
        height: contentHeight,
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Render the current item header */}
      <Typography
        variant='subtitle2'
        sx={getStyling()}
        onClick={
          item.link
            ? (e) => {
                e.preventDefault()
                e.stopPropagation()
                handleLinkClick(item.link)
              }
            : undefined
        }
      >
        {item.text}
      </Typography>

      {/* Recursively render sub-items */}
      {hasSubItems && (
        <Box
          sx={{
            pl: level === 0 ? 0 : 0.75,
            flex: 1,
          }}
        >
          {item.subItems.map((subItem) => (
            <MegaMenuSection
              key={subItem.text}
              item={subItem}
              handleLinkClick={handleLinkClick}
              level={level + 1}
            />
          ))}
        </Box>
      )}
    </Box>
  )
}
// Mobile drawer search item
const DrawerSearchItem = ({ handleDrawerClose, selectedCountry }) => {
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const navigate = useNavigate()

  const handleToggle = () => {
    setSearchOpen(!searchOpen)
  }

  const handleSearch = () => {
    if (selectedCountry) {
      navigate(`/search-across-law?country=${selectedCountry}&query=${encodeURIComponent(searchQuery.trim())}`)
      handleDrawerClose()
      setSearchQuery('')
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      handleSearch()
    }
  }

  const handleClearSearch = () => {
    setSearchQuery('')
  }

  return (
    <>
      <StyledListItemButton onClick={handleToggle}>
        <ListItemIcon
          sx={{
            minWidth: 36,
            color: '#232536',
            '& .MuiSvgIcon-root': {
              fontSize: '1.25rem', // Reduced from 1.1rem
            },
          }}
        >
          <SearchRoundedIcon />
        </ListItemIcon>
        <ListItemText
          primary='Universal Search'
          sx={{
            '& .MuiTypography-root': {
              fontWeight: 500,
              fontSize: '0.95rem',
              color: '#232536',
            },
          }}
        />
        <Box sx={{ ml: 1 }}>
          {searchOpen ? (
            <ExpandLessRoundedIcon fontSize='small' />
          ) : (
            <ExpandMoreRoundedIcon fontSize='small' />
          )}
        </Box>
      </StyledListItemButton>

      <Collapse in={searchOpen} timeout='auto' unmountOnExit>
        <Box sx={{ px: 3, py: 2 }}>
          <Typography
            variant='caption'
            sx={{ mb: 1, display: 'block', color: 'text.secondary' }}
          >
            Search across all {selectedCountry} tax laws
          </Typography>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <TextField
              fullWidth
              placeholder='Enter search query'
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              size='small'
              disabled={!selectedCountry}
              InputProps={{
                endAdornment: searchQuery ? (
                  <InputAdornment position='end'>
                    <IconButton
                      aria-label='clear search'
                      onClick={handleClearSearch}
                      edge='end'
                      size='small'
                    >
                      <ClearRoundedIcon fontSize='small' />
                    </IconButton>
                  </InputAdornment>
                ) : null,
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  '&.Mui-focused fieldset': {
                    borderColor: '#232536',
                  },
                },
              }}
            />

            <IconButton
              color='primary'
              onClick={handleSearch}
              disabled={!selectedCountry}
              sx={{
                bgcolor: '#232536',
                color: 'white',
                '&:hover': {
                  bgcolor: '#343750',
                },
                '&:disabled': {
                  bgcolor: 'rgba(0, 0, 0, 0.12)',
                },
              }}
            >
              <SearchRoundedIcon />
            </IconButton>
          </Box>

          {!selectedCountry && (
            <Typography
              variant='caption'
              color='error'
              sx={{ mt: 1, display: 'block' }}
            >
              Please wait while country data loads...
            </Typography>
          )}
        </Box>
      </Collapse>
    </>
  )
}
// Mobile drawer coverage item

const DrawerCoverageItem = ({ handleDrawerClose }) => {
  const [coverageOpen, setCoverageOpen] = useState(false)

  const regions = [
    { name: 'UAE', status: 'live' },
    { name: 'KSA', status: 'live' },
    { name: 'Kuwait', status: 'soon' },
    { name: 'Qatar', status: 'soon' },
    { name: 'Oman', status: 'soon' },
    { name: 'Bahrain', status: 'soon' },
  ]

  const handleToggle = () => {
    setCoverageOpen(!coverageOpen)
  }

  return (
    <>
      <StyledListItemButton onClick={handleToggle}>
        <ListItemIcon
          sx={{
            minWidth: 36,
            color: '#232536',
            '& .MuiSvgIcon-root': {
              fontSize: '1.25rem', // Reduced from 1.1rem
            },
          }}
        >
          <MapPinIcon />
        </ListItemIcon>

        <ListItemText
          primary='Coverage'
          sx={{
            '& .MuiTypography-root': {
              fontWeight: 500,

              fontSize: '0.95rem',

              color: '#232536',
            },
          }}
        />

        <Box sx={{ ml: 1 }}>
          {coverageOpen ? (
            <ExpandLessRoundedIcon fontSize='small' />
          ) : (
            <ExpandMoreRoundedIcon fontSize='small' />
          )}
        </Box>
      </StyledListItemButton>

      <Collapse in={coverageOpen} timeout='auto' unmountOnExit>
        <Box sx={{ px: 3, py: 2 }}>
          <Box sx={{ pl: 2, borderLeft: '2px solid #e0e0e0' }}>
            {regions.map((region) => (
              <Box
                key={region.name}
                sx={{
                  display: 'flex',

                  alignItems: 'center',
                  justifyContent: 'space-between',
                  py: 1,
                  px: 1,
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Box
                    sx={{
                      width: 6,

                      height: 6,

                      borderRadius: '50%',

                      backgroundColor: '#ffcf51',

                      mr: 1.5,

                      flexShrink: 0,
                    }}
                  />

                  <Typography
                    variant='body2'
                    sx={{ color: '#4a4a4a', fontSize: '0.85rem' }}
                  >
                    {region.name}
                  </Typography>
                </Box>

                <Chip
                  label={region.status === 'live' ? 'Partially Live' : 'Soon'}
                  size='small'
                  sx={{
                    ml: 0.5, // optional, since columnGap already gives space
                    flexShrink: 0,
                    height: 20,

                    fontSize: '0.7rem',

                    fontWeight: 500,

                    backgroundColor:
                      region.status === 'live' ? '#4caf50' : '#ff9800',

                    color: 'white',

                    '& .MuiChip-label': {
                      px: 1,
                    },
                  }}
                />
              </Box>
            ))}
          </Box>
        </Box>
      </Collapse>
    </>
  )
}
const DrawerUserMenuItem = ({
  user,
  logout,
  isAdmin,
  navigate,
  handleDrawerClose,
}) => {
  const [userMenuOpen, setUserMenuOpen] = useState(false)

  const handleToggle = () => {
    setUserMenuOpen(!userMenuOpen)
  }

  const handleLogout = () => {
    logout()
    handleDrawerClose()
    // toast.success('Logged out successfully')
    navigate('/')
  }

  const handleProfile = () => {
    navigate('/profile')
    handleDrawerClose()
  }

  const handleAdminPanel = () => {
    navigate('/admin')
    handleDrawerClose()
  }

  return (
    <>
      <StyledListItemButton onClick={handleToggle}>
        <ListItemIcon sx={{ minWidth: 36 }}>
          <Avatar
            src={getProxiedUrl(user?.profilePictureUrl)}
            alt={user?.name}
            sx={{
              width: 28,
              height: 28,
              bgcolor: '#ffcf51',
              color: '#232536',
              fontSize: '0.8rem',
              fontWeight: 600,
            }}
            onError={(e) => {
              console.error('Drawer avatar failed to load:', e)
            }}
          >
            {user?.name?.charAt(0)?.toUpperCase() || 'U'}
          </Avatar>
        </ListItemIcon>
        <ListItemText
          primary={`Hi, ${user?.name.split(' ')[0] || 'User'}`}
          sx={{
            '& .MuiTypography-root': {
              fontWeight: 500,
              fontSize: '0.95rem',
              color: '#232536',
            },
          }}
        />
        <Box sx={{ ml: 1 }}>
          {userMenuOpen ? (
            <ExpandLessRoundedIcon fontSize='small' />
          ) : (
            <ExpandMoreRoundedIcon fontSize='small' />
          )}
        </Box>
      </StyledListItemButton>

      <Collapse in={userMenuOpen} timeout='auto' unmountOnExit>
        <List component='div' disablePadding>
          <StyledListItemButton onClick={handleProfile} level={1}>
            <ListItemIcon sx={{ minWidth: 36, color: '#232536' }}>
              <PersonRoundedIcon />
            </ListItemIcon>
            <ListItemText primary='Profile' />
          </StyledListItemButton>

          {isAdmin() && (
            <StyledListItemButton onClick={handleAdminPanel} level={1}>
              <ListItemIcon sx={{ minWidth: 36, color: '#232536' }}>
                <AdminPanelSettingsRoundedIcon />
              </ListItemIcon>
              <ListItemText primary='Admin Panel' />
            </StyledListItemButton>
          )}

          <StyledListItemButton onClick={handleLogout} level={1}>
            <ListItemIcon sx={{ minWidth: 36, color: 'error.main' }}>
              <LogoutRoundedIcon color='error' />
            </ListItemIcon>
            <ListItemText
              primary='Logout'
              sx={{
                '& .MuiTypography-root': {
                  color: 'error.main',
                },
              }}
            />
          </StyledListItemButton>
        </List>
      </Collapse>
    </>
  )
}

// Mobile drawer menu item with collapsible submenus
const DrawerMenuItem = ({ item, level = 0, handleDrawerClose, navigate }) => {
  const [open, setOpen] = useState(false)
  const hasSubItems = item.subItems && item.subItems.length > 0
  const isCoverageMenu = item.isCoverageMenu

  const handleToggle = () => {
    setOpen(!open)
  }

  const handleClick = () => {
    if (!hasSubItems) {
      navigate(item.link)
      handleDrawerClose()
    } else {
      handleToggle()
    }
  }
  if (isCoverageMenu && level > 0) {
    return <DrawerCoverageItem handleDrawerClose={handleDrawerClose} />
  }
  return (
    <>
      <StyledListItemButton
        onClick={handleClick}
        level={level}
        sx={{
          // Add special styling for country headers
          ...(item.isCountryHeader && {
            backgroundColor: alpha('#232536', 0.05),
            borderLeft: '3px solid #ffcf51',
            '&:hover': {
              backgroundColor: alpha('#232536', 0.1),
            },
          }),
        }}
      >
        {level === 0 && item.icon && (
          <ListItemIcon
            sx={{
              minWidth: 36,
              color: '#232536',
              '& .MuiSvgIcon-root': {
                fontSize: '1.25rem',
              },
            }}
          >
            {item.icon}
          </ListItemIcon>
        )}
        <ListItemText
          primary={item.text}
          sx={{
            '& .MuiTypography-root': {
              // Font weight logic: Bold for non-leaf nodes, normal for leaf nodes
              fontWeight: item.isCountryHeader
                ? 700 // Country headers are always bold
                : hasSubItems
                ? 600 // Non-leaf nodes (have sub-items) are bold
                : level <= 1
                ? 600 // Standalone laws (level 0 or 1 with no sub-items) are bold
                : 400, // Deep nested leaf nodes (level 2+) are normal
              fontSize: item.isCountryHeader
                ? '0.9rem'
                : level === 0
                ? '0.85rem'
                : '0.8rem',
              color: '#232536',
              // textTransform: item.isCountryHeader ? 'uppercase' : 'none',
              letterSpacing: item.isCountryHeader ? '0.5px' : 'normal',
              lineHeight: 1.3,
            },
          }}
        />
        {hasSubItems && (
          <Box sx={{ ml: 1 }}>
            {open ? (
              <ExpandLessRoundedIcon fontSize='small' />
            ) : (
              <ExpandMoreRoundedIcon fontSize='small' />
            )}
          </Box>
        )}
      </StyledListItemButton>

      {hasSubItems && (
        <Collapse in={open} timeout='auto' unmountOnExit>
          <List component='div' disablePadding>
            {item.subItems.map((subItem) =>
              subItem.isCoverageMenu ? (
                <DrawerCoverageItem
                  key={subItem.text}
                  handleDrawerClose={handleDrawerClose}
                />
              ) : (
                <DrawerMenuItem
                  key={subItem.text}
                  item={subItem}
                  level={level + 1}
                  handleDrawerClose={handleDrawerClose}
                  navigate={navigate}
                />
              )
            )}
          </List>
        </Collapse>
      )}
    </>
  )
}
const UserAvatarMenu = ({ user, logout, isAdmin, navigate }) => {
  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleLogout = () => {
    logout()
    handleClose()
    // toast.success('Logged out successfully')
    navigate('/')
  }

  const handleProfile = () => {
    navigate('/profile')
    handleClose()
  }

  const handleAdminPanel = () => {
    navigate('/admin')
    handleClose()
  }

  return (
    <Box sx={{ position: 'relative' }}>
      <IconButton
        onClick={handleClick}
        sx={{
          p: 0.5,
          border: '2px solid transparent',
          '&:hover': {
            borderColor: '#ffcf51',
          },
        }}
      >
        <Avatar
          src={getProxiedUrl(user?.profilePictureUrl)}
          alt={user?.name}
          sx={{
            width: 32,
            height: 32,
            // bgcolor: user?.profilePictureUrl ? 'transparent' : '#ffcf51',
            bgcolor: '#ffcf51',
            color: '#232536',
            fontSize: '0.9rem',
            fontWeight: 600,
          }}
          onError={(e) => console.error('NavBar avatar failed:', e)}
        >
          {user?.name?.charAt(0)?.toUpperCase() || 'U'}
        </Avatar>
      </IconButton>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        disableScrollLock={true}
        PaperProps={{
          sx: {
            mt: 1,
            borderRadius: 2,
            minWidth: '180px',
            boxShadow: '0 6px 20px rgba(0,0,0,0.12)',
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem
          sx={{
            py: 1,
            px: 2,
            cursor: 'default',
            '&:hover': {
              backgroundColor: 'transparent',
            },
          }}
          disableRipple
        >
          <ListItemIcon sx={{ minWidth: 36 }}>
            <Avatar
              src={getProxiedUrl(user?.profilePictureUrl)}
              sx={{
                width: 24,
                height: 24,
                // bgcolor: user?.profilePictureUrl ? 'transparent' : '#ffda1b',
                bgcolor: '#ffda1b',
                color: '#232536',
                fontSize: '0.75rem',
                fontWeight: 600,
              }}
            >
              {/* {(!user?.profilePictureUrl &&
                user?.name?.charAt(0)?.toUpperCase()) ||
                'U'} */}
              {user?.name?.charAt(0)?.toUpperCase() || 'U'}
            </Avatar>
          </ListItemIcon>
          <ListItemText
            primary={`Hi, ${user?.name?.split(' ')[0] || 'User'}`}
            sx={{
              '& .MuiTypography-root': {
                fontWeight: 500,
                fontSize: '0.95rem',
                color: '#232536',
              },
            }}
          />
        </MenuItem>
        <Divider sx={{ my: 0.5 }} />
        <MenuItem onClick={handleProfile} sx={{ py: 1, px: 2 }}>
          <ListItemIcon sx={{ minWidth: 36 }}>
            <PersonRoundedIcon fontSize='small' />
          </ListItemIcon>
          <ListItemText primary='Profile' />
        </MenuItem>

        {isAdmin() && (
          <>
            <Divider />
            <MenuItem onClick={handleAdminPanel} sx={{ py: 1, px: 2 }}>
              <ListItemIcon sx={{ minWidth: 36 }}>
                <AdminPanelSettingsRoundedIcon fontSize='small' />
              </ListItemIcon>
              <ListItemText primary='Admin Panel' />
            </MenuItem>
          </>
        )}
        {/* <RoleBasedAccess allowedRoles={['ROLE_ADMIN']}>
          <Divider />
          <MenuItem onClick={handleAdminPanel} sx={{ py: 1, px: 2 }}>
            <ListItemIcon sx={{ minWidth: 36 }}>
              <AdminPanelSettingsRoundedIcon fontSize='small' />
            </ListItemIcon>
            <ListItemText primary='Admin Panel' />
          </MenuItem>
        </RoleBasedAccess> */}

        <Divider />
        <MenuItem
          onClick={handleLogout}
          sx={{ py: 1, px: 2, color: 'error.main' }}
        >
          <ListItemIcon sx={{ minWidth: 36 }}>
            <LogoutRoundedIcon fontSize='small' color='error' />
          </ListItemIcon>
          <ListItemText primary='Logout' />
        </MenuItem>
      </Menu>
    </Box>
  )
}
const getTaxLawsMenuItems = (countryName, isAuthenticated) => [
  {
    text: 'GCC Agreements',
    icon: <AssignmentRoundedIcon />,
    subItems: [
      {
        text: 'GCC Common Customs Agreement',
        link: `/search-across-law?country=GCC&law=common-customs-agreement`,
      },
      {
        text: 'GCC Common VAT Agreement',
        link: `/search-across-law?country=GCC&law=common-vat-agreement`,
      },
      {
        text: 'GCC Common Excise Agreement',
        link: `/search-across-law?country=GCC&law=common-excise-agreement`,
      },
    ],
  },
  {
    text: 'Tax Laws',
    icon: <GavelRoundedIcon />, // <AutoStoriesIcon />
    // link: `/search-across-law?country=UAE`,
    subItems: [
      {
        text: 'UAE',
        isCountryHeader: true,
        subItems: [
          {
            text: 'CIT (FDL No 47 of 2022, as amended)',
            link: '/search-across-law?country=UAE&law=cit-fdl-47-of-2022',
          },
          {
            text: 'VAT FDL 8 of 2017',
            link: '/search-across-law?country=UAE&law=indirecttax-law-vat-uaevat-8-of-2017-as-amended',
          },
          {
            text: 'Tax Procedures Law (2022)',
            link: '/search-across-law?country=UAE&law=tp-fdl-28-of-2022-as-amended',
          },
          {
            text: 'Excise FDL 7 of 2017',
            link: '/search-across-law?country=UAE&law=indirect-excise-7-of-2017',
          },
          {
            text: 'FATCA 2024(IGA + IP)',
            link: '/search-across-law?country=UAE&law=fatca-of-2024', // 'Stay tuned!! Our team is working on it. 🙂'
          },
        ],
      },
      {
        text: 'KSA',
        isCountryHeader: true,
        subItems: [
          {
            text: 'Income Tax Law of 2004',
            link: '/search-across-law?country=KSA&law=income-tax-law-of-2004',
          },
          {
            text: 'VAT Law',
            link: '/search-across-law?country=KSA&law=vat-law-m-113-of-2017',
          },
          {
            text: 'Excise Law of 2019',
            link: '/search-across-law?country=KSA&law=excise-law-of-2019',
          },
          {
            text: 'Zakat Collection Law of 1951',
            link: '/search-across-law?country=KSA&law=zakat-law-of-1951',
          },
          {
            text: 'Customs Law',
            link: '/search-across-law?country=KSA&law=customs-law',
          },
          {
            text: 'FATCA 2017',
            link: '/search-across-law?country=KSA&law=fatca-of-2017',
          },
        ],
      },
      {
        text: 'Kuwait',
        isCountryHeader: true,
        subItems: [
          {
            text: 'Draft Business Profit Tax Law of 2024',
            link: '/search-across-law?country=Kuwait&law=draft-business-profit-tax-law-of-2024',
          },
          {
            text: 'KIT Decree 3 of 1955',
            link: '/search-across-law?country=Kuwait&law=kit-law-no-2-of-2008-amending-decree-no-3-of-1955',
          },
          {
            text: 'QDMTT Law - Decree 157 of 2024',
            link: '/search-across-law?country=Kuwait&law=qdmtt-decree-law-157-of-2024',
          },
        ],
      },
      {
        text: 'Qatar',
        isCountryHeader: true,
        subItems: [
          {
            text: 'Income Tax Law of 2024',
            link: '/search-across-law?country=Qatar&law=income-tax-law-24-of-2018',
          },
          {
            text: 'Excise Law of 2018',
            link: '/search-across-law?country=Qatar&law=excise-law-25-of-2018',
          },
          {
            text: 'Tax Procedures Law',
            link: '/search-across-law?country=Qatar&law=tax-procedures-law',
          },
          {
            text: 'FATCA',
            link: '/search-across-law?country=Qatar&law=fatca',
          },
        ],
      },
      {
        text: 'Oman',
        isCountryHeader: true,
        subItems: [
          {
            text: 'Income Tax Law of 2020',
            link: '/search-across-law?country=Oman&law=income-tax-law-royal-decree-118-of-2020',
          },
          {
            text: 'VAT Law - Royal Decree No. 121 of 2020',
            link: '/search-across-law?country=Oman&law=vat-law-royal-decree-121-of-2020',
          },
          {
            text: 'Excise Law of 2019',
            link: '/search-across-law?country=Oman&law=excise-law-of-2019',
          },
          {
            text: 'CRS - FATCA',
            link: '/search-across-law?country=Oman&law=fatca',
          },
          {
            text: 'CBCR - Transfer Pricing',
            link: '/search-across-law?country=Oman&law=cbcr-law',
          },
        ],
      },
      {
        text: 'Bahrain',
        isCountryHeader: true,
        subItems: [
          {
            text: 'QDMTT Law (Decree Law No. 11 of 2024)',
            link: '/search-across-law?country=Bahrain&law=qdmtt-law-11-of-2024',
          },
          {
            text: 'VAT Law 48 of 2018',
            link: '/search-across-law?country=Bahrain&law=vat-law-48-of-2018',
          },
        ],
      },
    ],
  },
  {
    text: 'Tax Treaties',
    icon: <AutoStoriesRoundedIcon />, // <AutoStoriesIcon />
    link: '/search/UAE/Tax-Treaties',
  },
  {
    text: 'Blogs',
    icon: <BookRoundedIcon />, // <AutoStoriesIcon />
    link: '/blogs',
  },
  {
    text: 'Pricing',
    icon: <AttachMoneyRoundedIcon />,
    link: `/pricing`,
  },

  // {
  //   text: 'Universal Search',
  //   icon: <SearchRoundedIcon />, // <AutoStoriesIcon />
  //   isSearchMenu: true, // New flag to identify search menus
  // },
  {
    text: 'About GTL',
    icon: <InfoRoundedIcon />,
    subItems: [
      { text: 'About Us', link: '/about-us' },
      // { text: 'Features', link: '/features' },
      // { text: 'Coverage', isCoverageMenu: true },
      { text: 'Partner with Us', link: '/partner-with-us' },
      // { text: 'Contact Us', link: '/contact-us' },
      { text: 'Terms-and-Conditions', link: '/terms-and-conditions' },
      // {
      //   text: 'Lex Search ServerSidePagination (Extra)',
      //   link: '/search-across-law-spp',
      // },
    ],
  },

  // {
  //   text: 'Register',
  //   icon: <LoginRoundedIcon />, // <AutoStoriesIcon />
  //   link: '/register',
  // },
  ...(isAuthenticated
    ? [] // No additional menu item needed for authenticated users (avatar handles this)
    : [
        {
          text: 'Login',
          icon: <LoginRoundedIcon />,
          link: '/login',
        },
      ]),
]
const getTaxLawsMenuItemsPROD = (countryName, isAuthenticated) => [
  {
    text: 'GCC Agreements',
    icon: <AssignmentRoundedIcon />,
    subItems: [
      {
        text: 'GCC Common VAT Agreement',
        link: `/search-across-law?country=GCC&law=common-vat-agreement`,
      },
      {
        text: 'GCC Common Excise Agreement',
        link: `/search-across-law?country=GCC&law=common-excise-agreement`,
      },
    ],
  },
  {
    text: 'Tax Laws',
    icon: <GavelRoundedIcon />, // <AutoStoriesIcon />
    // link: `/search-across-law?country=UAE`,
    subItems: [
      {
        text: 'UAE',
        isCountryHeader: true,
        subItems: [
          {
            text: 'CIT (FDL No 47 of 2022, as amended)',
            link: '/search-across-law?country=UAE&law=cit-fdl-47-of-2022',
          },
          {
            text: 'VAT FDL 8 of 2017',
            link: '/search-across-law?country=UAE&law=indirecttax-law-vat-uaevat-8-of-2017-as-amended',
          },
          {
            text: 'Tax Procedures Law (2022)',
            link: '/search-across-law?country=UAE&law=tp-fdl-28-of-2022-as-amended',
          },
        ],
      },
      {
        text: 'KSA',
        isCountryHeader: true,
        subItems: [
          {
            text: 'Income Tax Law of 2004',
            link: '/search-across-law?country=KSA&law=income-tax-law-of-2004',
          },
          {
            text: 'VAT Law',
            link: '/search-across-law?country=KSA&law=vat-law-m-113-of-2017',
          },
        ],
      },
      {
        text: 'Kuwait',
        isCountryHeader: true,
        subItems: [
          {
            text: 'KIT Decree 3 of 1955',
            link: '/search-across-law?country=Kuwait&law=kit-law-no-2-of-2008-amending-decree-no-3-of-1955',
          },
          {
            text: 'QDMTT Law - Decree 157 of 2024',
            link: '/search-across-law?country=Kuwait&law=qdmtt-decree-law-157-of-2024',
          },
        ],
      },
    ],
  },
  {
    text: 'Tax Treaties',
    icon: <AutoStoriesRoundedIcon />, // <AutoStoriesIcon />
    link: '/search/UAE/Tax-Treaties',
  },
  {
    text: 'Blogs',
    icon: <BookRoundedIcon />, // <AutoStoriesIcon />
    link: '/blogs',
  },
  {
    text: 'Pricing',
    icon: <AttachMoneyRoundedIcon />,
    link: `/pricing`,
  },

  // {
  //   text: 'Universal Search',
  //   icon: <SearchRoundedIcon />, // <AutoStoriesIcon />
  //   isSearchMenu: true, // New flag to identify search menus
  // },
  {
    text: 'About GTL',
    icon: <InfoRoundedIcon />,
    subItems: [
      { text: 'About Us', link: '/about-us' },
      // { text: 'Features', link: '/features' },
      // { text: 'Coverage', isCoverageMenu: true },
      { text: 'Partner with Us', link: '/partner-with-us' },
  // { text: 'Contact Us', link: '/contact-us' },
      { text: 'Terms-and-Conditions', link: '/terms-and-conditions' },
    ],
  },

  // {
  //   text: 'Register',
  //   icon: <LoginRoundedIcon />, // <AutoStoriesIcon />
  //   link: '/register',
  // },
  ...(isAuthenticated
    ? []
    : [
        {
          text: 'Login',
          icon: <LoginRoundedIcon />,
          link: '/login',
        },
      ]),
]
const countryDomainMap = {
  'uaetaxlaws.com': 'UAE',
  'www.uaetaxlaws.com': 'UAE',
  'ksataxlaws.com': 'KSA',
  'www.ksataxlaws.com': 'KSA',
  'kuwaittaxlaws.com': 'Kuwait',
  'www.kuwaittaxlaws.com': 'Kuwait',
  'qatartaxlaws.com': 'Qatar',
  'www.qatartaxlaws.com': 'Qatar',
  'omantaxlaws.com': 'Oman',
  'www.omantaxlaws.com': 'Oman',
  'bahraintaxlaws.com': 'Bahrain',
  'www.bahraintaxlaws.com': 'Bahrain',
  'gcctaxlaws.com': 'GCC',
  'www.gcctaxlaws.com': 'GCC',
  // Add localhost and IP mapping for development
  localhost: 'GCC',
  '127.0.0.1': 'GCC',
}

const isLocalEnvironment = (domain) => {
  // we have 2 different DB(dev, prod) with different data sets
  // uaetaxlaws.com, ksataxlaws.com, kuwaittaxlaws.com, qatartaxlaws.com, omantaxlaws.com, bahraintaxlaws.com, localhost - REACT_APP_ENVIRONMENT=dev
  // but for seo purpose we dont want to show ksa data on uaetaxlaws.com, similar for other country specific domains
  // gcctaxlaws.com - REACT_APP_ENVIRONMENT=prod - we want to show all 6 countries data if they are passed from review team
  // so for local environment testing we will show all 6 countries only for localhost and private IP address access

  // Check for localhost variations
  if (
    domain === 'localhost' ||
    domain === '127.0.0.1'
    // || process.env.REACT_APP_ENVIRONMENT === 'dev'
  )
    return true

  // Check for private IP ranges only
  if (domain.match(/^192\.168\.\d+\.\d+$/)) return true // 192.168.0.0/16
  if (domain.match(/^10\.\d+\.\d+\.\d+$/)) return true // 10.0.0.0/8
  if (domain.match(/^172\.(1[6-9]|2\d|3[01])\.\d+\.\d+$/)) return true // 172.16.0.0/12
  // Any IP address - domain.match(/^\d+\.\d+\.\d+\.\d+$/)
  return false
}
const determineMenuStructure = (domain, isAuthenticated) => {
  const isLocalhost = isLocalEnvironment(domain)
  const isGCC = domain === 'gcctaxlaws.com' || domain === 'www.gcctaxlaws.com'
  const isProduction = process.env.REACT_APP_ENVIRONMENT === 'prod'

  // For country-specific domains: Show only that country's laws
  const countryName =
    countryDomainMap[domain] || countryDomainMap[`www.${domain}`]

  // For localhost/IP development: Show all 6 countries (full development menu)
  if (isLocalhost) {
    return getTaxLawsMenuItems(countryName, isAuthenticated) // Full menu with all countries
  }

  // For GCC domain: Show based on environment
  if (isGCC && isProduction) {
    return getTaxLawsMenuItemsPROD(countryName, isAuthenticated) // Production: UAE + KSA only
  }

  if (countryName && countryName !== 'GCC') {
    return getCountrySpecificMenuItems(countryName, isAuthenticated)
  }

  // Fallback
  return getTaxLawsMenuItemsPROD(countryName, isAuthenticated)
}

const getCountrySpecificMenuItems = (countryName, isAuthenticated) => {
  // Get only the laws for the specific country from your full menu structure
  const fullMenu = getTaxLawsMenuItems(countryName, isAuthenticated)
  const taxLawsItem = fullMenu.find((item) => item.text === 'Tax Laws')

  if (taxLawsItem && taxLawsItem.subItems) {
    const countrySection = taxLawsItem.subItems.find(
      (item) => item.text === countryName && item.isCountryHeader
    )

    if (countrySection) {
      // Return menu with only this country's laws
      return [
        {
          text: 'GCC Agreements',
          icon: <AssignmentRoundedIcon />,
          subItems: [
            {
              text: 'GCC Common Customs Agreement',
              link: `/search-across-law?country=GCC&law=common-customs-agreement`,
            },
            {
              text: 'GCC Common VAT Agreement',
              link: `/search-across-law?country=GCC&law=common-vat-agreement`,
            },
            {
              text: 'GCC Common Excise Agreement',
              link: `/search-across-law?country=GCC&law=common-excise-agreement`,
            },
          ],
        },
        {
          text: 'Tax Laws',
          icon: <GavelRoundedIcon />,
          subItems: [countrySection], // Only this country's laws
        },
        {
          text: 'Tax Treaties',
          icon: <AutoStoriesRoundedIcon />,
          link: `/search/${countryName}/Tax-Treaties`,
        },
        {
          text: 'Blogs',
          icon: <BookRoundedIcon />,
          link: '/blogs',
        },
        {
          text: 'Pricing',
          icon: <AttachMoneyRoundedIcon />,
          link: `/pricing`,
        },
        {
          text: 'About GTL',
          icon: <InfoRoundedIcon />,
          subItems: [
            { text: 'About Us', link: '/about-us' },
            // { text: 'Features', link: '/features' },
            { text: 'Partner with Us', link: '/partner-with-us' },
      // { text: 'Contact Us', link: '/contact-us' },
      { text: 'Terms-and-Conditions', link: '/terms-and-conditions' },
          ],
        },

        ...(isAuthenticated
          ? []
          : [
              {
                text: 'Login',
                icon: <LoginRoundedIcon />,
                link: '/login',
              },
            ]),
      ]
    }
  }

  // Fallback to production menu
  return getTaxLawsMenuItemsPROD(countryName, isAuthenticated)
}

const NavBar = () => {
  const navigate = useNavigate()
  const theme = useTheme()
  // const {
  //   isAuthenticated,
  //   user,
  //   logout,
  //   isAdmin,
  //   // , isModerator, isPremium
  // } = useAuth()
  const isAuthenticated = false
  const user = null
  const logout = () => {}
  const isAdmin = false
  // const { selectedCountry, /* countryFlag, */ currentDomain, siteName } =
  //   useCountryLaw()
  const selectedCountry = 'GCC'
  const currentDomain = 'gcctaxlaws.com'
  const siteName = 'GCCTaxLaws'

  const [drawerOpen, setDrawerOpen] = useState(false)
  const [menuItems, setMenuItems] = useState(() =>
    determineMenuStructure(window.location.hostname, isAuthenticated)
  )
  const [openMenuId, setOpenMenuId] = useState(null) // Track which menu is open
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))

  // const isAdmin = user?.roles?.split(',').includes('ADMIN')
  // const isModerator = user?.roles?.split(',').includes('MODERATOR')
  const handleDrawerOpen = () => {
    setDrawerOpen(true)
    // Disable scrolling on body when drawer is open, but then we will see a white strip at the right side
    //  document.body.style.overflow = 'hidden'
  }
  useEffect(() => {
    setMenuItems(
      determineMenuStructure(
        currentDomain || window.location.hostname,
        isAuthenticated
      )
    )
  }, [isAuthenticated, currentDomain])
  // Add a useEffect to clean up when component unmounts
  // useEffect(() => {
  //   return () => {
  //     // Ensure scrolling is re-enabled if component unmounts with drawer open
  //     document.body.style.overflow = 'unset'
  //   }
  // }, [])
  const handleDrawerClose = () => {
    setDrawerOpen(false)
    // Re-enable scrolling
    // document.body.style.overflow = 'unset';
  }

  const getLogoContent = () => {
    // if (countryFlag === 'GCC') {
    //   // For GCC domain, use the imported logo
    //   return (
    //     <Box
    //       sx={{
    //         backgroundImage: `url('/logo-dark.webp')`,
    //         backgroundRepeat: 'no-repeat',
    //         backgroundSize: 'contain',
    //         backgroundPosition: 'center',
    //         height: { xs: 36, sm: 40, md: 44 },
    //         width: { xs: 32, sm: 36, md: 40 }, // specify a real width
    //         mr: { xs: 1.5, sm: 1.5, md: 0.5 },
    //       }}
    //     />
    //   )
    // } else {
    //   // For country-specific domains, show the full flag with better sizing
    //   return (
    //     <Box
    //       component='img'
    //       src={`https://flagcdn.com/w160/${countryFlag.toLowerCase()}.png`}
    //       alt={`${countryFlag} Flag`}
    //       sx={{
    //         height: { xs: 28, sm: 32, md: 36 },
    //         width: 'auto',
    //         maxWidth: { xs: 50, sm: 60, md: 70 },
    //         mr: 1.5,
    //         objectFit: 'contain',
    //         borderRadius: 1,
    //         boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
    //       }}
    //     />
    //   )
    // }
    return (
      <Box
        sx={{
          backgroundImage: `url('/logo-dark.webp')`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'contain',
          backgroundPosition: 'center',
          height: { xs: 36, sm: 40, md: 44 },
          width: { xs: 32, sm: 36, md: 40 }, // specify a real width
          mr: { xs: 1.5, sm: 1.5, md: 0.5 },
        }}
      />
    )
  }
  // Close all menus when clicking elsewhere on the page
  useEffect(() => {
    const handleClickOutside = () => {
      setOpenMenuId(null)
    }

    document.addEventListener('click', handleClickOutside)
    return () => {
      document.removeEventListener('click', handleClickOutside)
    }
  }, [])
  return (
    <StyledAppBar>
      <Container maxWidth='xl' disableGutters>
        <Toolbar sx={{ py: { xs: 0.5, md: 1 }, px: { xs: 1.5, sm: 2, md: 3 } }}>
          {/* Mobile menu icon */}
          <IconButton
            color='inherit'
            aria-label='open drawer'
            onClick={handleDrawerOpen}
            edge='start'
            sx={{
              mr: 1,
              display: { xs: 'flex', md: 'none' },
              color: 'white',
              '&:hover': {
                color: '#ffcf51',
                backgroundColor: 'rgba(255,255,255,0.05)',
              },
              // padding: '8px',
              // '& .MuiSvgIcon-root': {
              //   fontSize: '1.8rem',
              // },
            }}
            aria-expanded={drawerOpen}
            aria-controls='main-navigation'
          >
            {/* <MenuIcon /> */}
            <MenuRoundedIcon />
          </IconButton>

          {/* Logo and site title */}

          <NavLogo 
            // component={Link} 
            // to='/'
            sx={{ cursor: 'pointer' }}
            onClick={() => navigate('/')}
          >
            {getLogoContent()}
            <Box sx={{ ml: 1 }}>
              <Typography
                sx={{
                  fontWeight: 700,
                  fontSize: { xs: '1rem', sm: '1.25rem' },
                  color: '#fff',
                  lineHeight: 1.2,
                  display: 'block',
                  width: { xs: '130px', sm: '160px' }, // Fixed width
                  textAlign: 'left',
                  transition: 'color 0.3s ease', // Smooth transition
                  '&:hover': {
                    color: '#ffcf51',
                  },
                }}
              >
                {siteName || 'GCC TAX LAWS'}
              </Typography>

              {/* <Box
                sx={{
                  position: 'relative',
                  height: '16px', // Fixed height for the tagline area
                  width: { xs: '130px', sm: '160px' }, // Same width as title
                }}
              >
                <Typography
                  sx={{
                    fontSize: '0.65rem',
                    color: '#ffcf51',
                    letterSpacing: '0.5px',
                    position: 'absolute',
                    width: 'max-content', // Only as wide as needed
                    left: '50%',
                    transform: 'translateX(-50%)', // Center it
                  }}
                >
                  POWERED BY GCC TAX LAWS
                </Typography>
              </Box> */}
            </Box>
          </NavLogo>

          <Box sx={{ flexGrow: 1 }} />

          {/* Desktop navigation */}
          <Box
            sx={{
              display: { xs: 'none', md: 'flex' },
              alignItems: 'center',
              gap: 0.5,
              // minHeight: '40px', // Ensure box has height
              // background: 'rgba(255,0,0,0.1)', // For debugging
            }}
          >
            {menuItems.length > 0 ? (
              menuItems.map((item) => (
                <React.Fragment key={item.text}>
                  {item.subItems || item.isSearchMenu ? (
                    // <NavMenuClickable
                    //   title={item.text}
                    //   items={item.subItems}
                    //   icon={item.icon}
                    // />

                    // Mega Menu (Full Display)
                    // <NavMenuHoverable
                    //   title={item.text}
                    //   items={item.subItems}
                    //   icon={item.icon}
                    //   openMenuId={openMenuId}
                    //   setOpenMenuId={setOpenMenuId}
                    //   isSearchMenu={item.isSearchMenu}
                    //   isCoverageMenu={item.isCoverageMenu}
                    //   selectedCountry={selectedCountry}
                    // />

                    // Compact Dropdown
                    <CompactDropdownMenu
                      title={item.text}
                      items={item.subItems}
                      icon={item.icon}
                      openMenuId={openMenuId}
                      setOpenMenuId={setOpenMenuId}
                      isSearchMenu={item.isSearchMenu}
                      selectedCountry={selectedCountry}
                    />
                  ) : (
                    <MenuButton
                      // component={Link}
                      // to={item.link}
                      onClick={() => item.link && navigate(item.link)}
                      startIcon={item.icon}
                      // sx={{
                      //   color: '#FFF',
                      //   textTransform: 'none',
                      //   '&:hover': { color: '#ffcf51' },
                      //   fontSize: '1rem',
                      // }}
                    >
                      {item.text}
                    </MenuButton>
                  )}
                </React.Fragment>
              ))
            ) : (
              <Typography color='error'>
                No menu items available for navbar
              </Typography>
            )}
            {isAuthenticated && (
              <UserAvatarMenu
                user={user}
                logout={logout}
                isAdmin={isAdmin}
                navigate={navigate}
              />
            )}
          </Box>
        </Toolbar>
      </Container>

      {/* Mobile drawer */}
      <StyledDrawer
        anchor='left'
        open={drawerOpen}
        onClose={handleDrawerClose}
        variant={isMobile ? 'temporary' : 'persistent'}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': {
            width: getDrawerWidth(),
          },
        }}
        hideBackdrop={false}
        disableScrollLock={true} // if we dont add this then the body will not scroll when drawer is opened and the scrollbar which will be removed so we will see a white strip at the right side
        // keepMounted={true}
      >
        <DrawerHeader>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {getLogoContent()}
            <Box sx={{ ml: 1 }}>
              <Typography
                sx={{
                  fontWeight: 700,
                  fontSize: { xs: '1rem', sm: '1.25rem' },
                  color: '#fff',
                  lineHeight: 1.2,
                  display: 'block',
                  // width: { xs: '130px', sm: '160px' }, // Fixed width
                  textAlign: 'left',
                  whiteSpace: 'nowrap', // Ensures title stays on one line
                  overflow: 'hidden',
                  textOverflow: 'ellipsis', // Add ellipsis if text is too long
                }}
              >
                {siteName || 'GCC TAX LAWS'}
              </Typography>

              {/* <Box
                sx={{
                  position: 'relative',
                  height: '16px', // Fixed height for the tagline area
                  width: { xs: '130px', sm: '160px' }, // Same width as title
                }}
              >
                <Typography
                  sx={{
                    fontSize: '0.65rem',
                    color: '#ffcf51',
                    letterSpacing: '0.5px',
                    position: 'absolute',
                    width: 'max-content', // Only as wide as needed
                    left: '50%',
                    transform: 'translateX(-50%)', // Center it
                    whiteSpace: 'nowrap', // Ensures subtitle stays on one line
                  }}
                >
                  POWERED BY GCC TAX LAWS
                </Typography>
              </Box> */}
            </Box>
          </Box>
          <IconButton
            onClick={handleDrawerClose}
            sx={{
              color: 'white',
              '&:focus, &:hover, &:active': {
                backgroundColor: 'rgba(255,255,255,0.1)',
                color: '#ffcf51',
              },
            }}
          >
            {' '}
            {theme.direction === 'ltr' ? (
              <ChevronLeftRoundedIcon />
            ) : (
              <ChevronRightRoundedIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <Box
          sx={{
            mt: 1,
            mb: 2,
            overflowY: 'auto', // Make content scrollable
          }}
        >
          {menuItems.map((item) =>
            item.isSearchMenu ? (
              <DrawerSearchItem
                key={item.text}
                handleDrawerClose={handleDrawerClose}
                selectedCountry={selectedCountry}
              />
            ) : (
              <DrawerMenuItem
                key={item.text}
                item={item}
                handleDrawerClose={handleDrawerClose}
                navigate={navigate}
              />
            )
          )}
          {isAuthenticated && (
            <DrawerUserMenuItem
              user={user}
              logout={logout}
              isAdmin={isAdmin}
              navigate={navigate}
              handleDrawerClose={handleDrawerClose}
            />
          )}
        </Box>
      </StyledDrawer>
    </StyledAppBar>
  )
}

export default NavBar
