import { NavLink } from 'react-router-dom'
import { useState, useEffect } from 'react'
import styles from './Navbar.module.css'

const links = [
  { to: '/', label: '홈', exact: true },
  { to: '/get-started', label: '시작하기' },
  { to: '/skills', label: '스킬' },
  { to: '/how-to', label: '사용법' },
  { to: '/caution', label: '주의사항' },
  { to: '/token-context', label: '토큰 & 컨텍스트' },
  { to: '/deploy', label: '배포하기' },
  { to: '/db-connect', label: 'DB 연결' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav className={`${styles.nav} ${scrolled ? styles.scrolled : ''}`}>
      <div className={styles.inner}>
        {/* 로고 */}
        <NavLink to="/" className={styles.logo}>
          <span className={styles.logoMark}>▶</span>
          <span>VIBE<span className={styles.logoDim}>.CODE</span></span>
        </NavLink>

        {/* 데스크탑 메뉴 */}
        <ul className={styles.links}>
          {links.map(({ to, label, exact }) => (
            <li key={to}>
              <NavLink
                to={to}
                end={exact}
                className={({ isActive }) =>
                  `${styles.link} ${isActive ? styles.active : ''}`
                }
              >
                {label}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* 모바일 햄버거 */}
        <button
          className={styles.burger}
          onClick={() => setOpen(!open)}
          aria-label="메뉴"
        >
          <span className={open ? styles.burgerOpen : ''} />
          <span className={open ? styles.burgerOpen : ''} />
          <span className={open ? styles.burgerOpen : ''} />
        </button>
      </div>

      {/* 모바일 드롭다운 */}
      {open && (
        <ul className={styles.mobileMenu}>
          {links.map(({ to, label, exact }) => (
            <li key={to}>
              <NavLink
                to={to}
                end={exact}
                className={({ isActive }) =>
                  `${styles.mobileLink} ${isActive ? styles.active : ''}`
                }
                onClick={() => setOpen(false)}
              >
                {label}
              </NavLink>
            </li>
          ))}
        </ul>
      )}
    </nav>
  )
}
