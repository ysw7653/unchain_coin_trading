import Link from 'next/link'
import { useRouter } from 'next/router'

function NavigationBar() {
  const router = useRouter()
  const anchorClass = (href) =>
    router.asPath === href ? 'nav-link px-2 text-secondary' : 'nav-link px-2 text-white'
  return (
    <header className="p-3 bg-dark text-white">
      <div className="unchain_title_container">
        <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
          <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
            <li>
              <Link href="/">
                <a className={anchorClass('/')}>언체인</a>
              </Link>
            </li>
            <li>
              <Link href="/deal">
                <a className={anchorClass('/deal')}>입출금</a>
              </Link>
            </li>
            <li>
              <Link href="/details">
                <a className={anchorClass('/details')}>투자내역</a>
              </Link>
            </li>
            <li>
              <Link href="/trends">
                <a className={anchorClass('/trends')}>코인동향</a>
              </Link>
            </li>
            <li>
              <Link href="/service">
                <a className={anchorClass('/service')}>고객센터</a>
              </Link>
            </li>
          </ul>
          <div className="text-end">
            <button
              type="button"
              className="btn btn-outline-light me-2"
              onClick={() => router.push('/login')}
            >
              로그인
            </button>
            <button
              type="button"
              className="btn btn-warning"
              onClick={() => router.push('/signin')}
            >
              회원가입
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}

export default NavigationBar
