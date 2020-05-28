import React from 'react'

import { Box, Flex } from './common'
import { BoxProps } from './props'

interface FooterProps extends BoxProps {
  maxWidth: string | string[]
}

const defaultProps = {
  bg: 'bg_footer',
  maxWidth: 'maxWidth_footer',
  variant: 'footer',
}

export const Footer = React.forwardRef<HTMLElement, FooterProps>(
  ({ maxWidth, children, ...props }, ref) => {
    return (
      <Box ref={ref} as="footer" id="footer" role="contentinfo" {...props}>
        <Flex
          className="container"
          __css={{
            maxWidth,
            mx: 'auto',
          }}>
          {children}
        </Flex>
      </Box>
    )
  }
)

Footer.defaultProps = defaultProps
