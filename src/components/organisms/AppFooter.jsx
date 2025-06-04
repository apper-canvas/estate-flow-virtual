import React from 'react'
import AppLogo from '../atoms/AppLogo'

const FooterLinkGroup = ({ title, links }) => (
  <div>
    <h4 className="font-semibold mb-4">{title}</h4>
    <ul className="space-y-2 text-surface-400">
      {links.map((link, index) => (
        <li key={index}>
          <a href={link.href} className="hover:text-white transition-colors">
            {link.label}
          </a>
        </li>
      ))}
    </ul>
  </div>
)

const AppFooter = () => {
  const buyerLinks = [
    { href: '#', label: 'Buy a Home' },
    { href: '#', label: 'Rent a Home' },
    { href: '#', label: 'Mortgage Calculator' },
    { href: '#', label: 'Neighborhood Guide' },
  ]

  const sellerLinks = [
    { href: '#', label: 'Sell Your Home' },
    { href: '#', label: 'Property Valuation' },
    { href: '#', label: 'Marketing Tools' },
    { href: '#', label: 'Agent Network' },
  ]

  const companyLinks = [
    { href: '#', label: 'About Us' },
    { href: '#', label: 'Careers' },
    { href: '#', label: 'Contact' },
    { href: '#', label: 'Privacy Policy' },
  ]

  return (
    <footer className="bg-surface-900 text-white py-12 md:py-16">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <AppLogo className="text-xl" iconSize="w-5 h-5" />
            <p className="text-surface-400 mb-4 mt-6">
              Your trusted partner in finding the perfect property. We make real estate simple, transparent, and accessible.
            </p>
          </div>
          
          <FooterLinkGroup title="For Buyers" links={buyerLinks} />
          <FooterLinkGroup title="For Sellers" links={sellerLinks} />
          <FooterLinkGroup title="Company" links={companyLinks} />
        </div>
        
        <div className="border-t border-surface-800 mt-12 pt-8 text-center text-surface-400">
          <p>&copy; 2024 EstateFlow. All rights reserved. Built with innovation and trust.</p>
        </div>
      </div>
    </footer>
  )
}

export default AppFooter