import { Navbar, NavbarBrand, NavbarCollapse, NavbarCollapseBtn, NavbarContainer, NavbarItem, NavbarList } from 'keep-react'
import { $store } from '../store'

export const TopBar = () => {
  const state = $store.use()
  return null

  return (
    <Navbar>
      <NavbarContainer>
        <NavbarBrand>
          <h3>tawwk</h3>
        </NavbarBrand>
        <NavbarList>
          <NavbarItem>Figma</NavbarItem>
          <NavbarItem>Documentation</NavbarItem>
          <NavbarItem>Blog</NavbarItem>
          <NavbarItem active>Get Started</NavbarItem>
        </NavbarList>
        <NavbarCollapseBtn />
        <NavbarCollapse>
          <NavbarItem>Figma</NavbarItem>
          <NavbarItem>Documentation</NavbarItem>
          <NavbarItem>Blog</NavbarItem>
          <NavbarItem active>Get Started</NavbarItem>
        </NavbarCollapse>
      </NavbarContainer>
    </Navbar>
  )
}
