import Link from 'next/link'

function NavigationBar() {
  return (
    <header className="p-3 bg-dark text-white">
      <div className="unchain_title_container">
        <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
          <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
            <li>
              <a href="./Main.html" className="nav-link px-2 text-secondary">
                언체인
              </a>
            </li>
            <li>
              <a href="#" className="nav-link px-2 text-white">
                입출금
              </a>
            </li>
            <li>
              <a href="#" className="nav-link px-2 text-white">
                투자내역
              </a>
            </li>
            <li>
              <a href="./article.html" className="nav-link px-2 text-white">
                코인동향
              </a>
            </li>
            <li>
              <a href="#" className="nav-link px-2 text-white">
                고객센터
              </a>
            </li>
          </ul>
          <div className="text-end">
            <button
              type="button"
              className="btn btn-outline-light me-2"
              onClick="location.href='./signin.html'"
            >
              로그인
            </button>
            <button type="button" className="btn btn-warning">
              회원가입
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}

export default NavigationBar
