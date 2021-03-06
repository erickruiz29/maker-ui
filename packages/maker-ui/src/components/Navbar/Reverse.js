import React from 'react'
import { Flex } from 'theme-ui'

import { Logo, Menu, MenuButton, ColorButton, WidgetArea } from '../common'

const Reverse = React.forwardRef(
  (
    {
      logo = 'Logo',
      menu,
      widgetArea,
      menuToggle,
      colorToggle,
      maxWidth = 'maxWidth_header',
      variant = 'navbar',
      ...props
    },
    ref
  ) => (
    <Flex
      ref={ref}
      variant={variant}
      {...props}
      __css={{ variant: 'eui_header.columns', maxWidth }}>
      <Flex className="col-1">
        <Menu menuItems={menu} />
        <MenuButton custom={menuToggle} />
      </Flex>
      <Flex className="col-2">
        <Logo>{logo}</Logo>
      </Flex>
      <Flex className="col-3">
        <WidgetArea custom={widgetArea} />
        <ColorButton custom={colorToggle} />
      </Flex>
    </Flex>
  )
)

export default Reverse
