import React, { useState } from 'react'
import { Box, Flex } from 'theme-ui'
import { useSpring, animated as a } from 'react-spring'

import { useTracker, useMeasure } from './helper'
import { CloseIcon } from './icons'

const AnimatedBox = a(Flex)

const fixedPartial = (fixed, bottom) =>
  fixed
    ? {
        position: 'fixed',
        left: 0,
        right: 0,
        top: !bottom && 0,
        bottom: bottom && 0,
        zIndex: 1000,
      }
    : null

const Announcement = React.forwardRef(
  (
    {
      variant = 'announcement',
      key = 'mui_dismiss_announce',
      bg = 'primary',
      color = '#fff',
      fixed = false,
      trackerType = 'session',
      expiration = 2592000, // 30 days
      allowClose = true,
      closeButton = <CloseIcon />,
      bottom = false,
      children,
      ...props
    },
    ref
  ) => {
    const [show, set] = useState(true)
    const [bind, { height: viewHeight }] = useMeasure()
    const active = useTracker(trackerType, key, show, expiration)

    const spring = useSpring({
      transform: fixed
        ? show
          ? 'translateY(0%)'
          : `translateY(${!bottom && '-'}100%)`
        : undefined,
      height: !fixed ? (show ? viewHeight : 0) : undefined,
      opacity: show ? 1 : 0,
    })

    return active ? (
      <AnimatedBox
        ref={ref}
        as="aside"
        variant={variant}
        className="announcement"
        style={spring}
        __css={{
          ...fixedPartial(fixed, bottom),
          display: 'flex',
          alignItems: 'center',
          bg,
          color,
          willChange: !fixed && 'height',
        }}>
        <Flex {...bind} __css={{ width: '100%', alignItems: 'center' }}>
          <Flex
            variant={`${variant}.text`}
            className="announcement-text"
            __css={{ flex: 1, flexWrap: 'wrap' }}
            {...props}>
            {children}
          </Flex>
          {allowClose && (
            <Box
              as="button"
              variant={`${variant}.close`}
              className="announcement-close"
              title="Dismiss"
              aria-label="Dismiss"
              onClick={e => set(false)}
              sx={{
                cursor: 'pointer',
                border: 'none',
                background: 'none',
                px: '15px',
                color,
                svg: { height: 27, fill: color },
              }}>
              {closeButton}
            </Box>
          )}
        </Flex>
      </AnimatedBox>
    ) : null
  }
)

export default Announcement
