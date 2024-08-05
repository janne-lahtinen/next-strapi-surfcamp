import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  const navItems = [
    {
      display: 'the camp.',
      slug: '/'
    },
    {
      display: 'the experience.',
      slug: '/experience'
    },
    {
      display: 'the blog.',
      slug: '/blog'
    },
    {
      display: 'the events.',
      slug: '/events'
    },
  ];

  const policies = [
    {
      display: 'Imprint',
      slug: '/imprint',
    },
    {
      display: 'Terms and conditions',
      slug: '/toc',
    },
    {
      display: 'Data protection',
      slug: '/data-protection',
    },
  ];

  return (
    <footer className="footer">
      <nav className="footer__nav">
        <Image className="footer__logo" src='/assets/logo.svg' alt='Logo' width={100} height={100} />
        <ul className="footer__links">
          {navItems.map(item => {
            return (
              <li key={item.slug}>
                <Link href={item.slug}>
                  <h5>{item.display}</h5>
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>
      <div className="footer__policies">
        <ul className="footer__policies-nav">
            {policies.map(item => {
              return (
                <li key={item.slug}>
                  <Link href={item.slug}>
                    <p className="copy">{item.display}</p>
                  </Link>
                </li>
              )
            })}
          </ul>
          <p className="copy">© Wavezhub - all rights reserved</p>
      </div>
    </footer>
  )
};

export default Footer;