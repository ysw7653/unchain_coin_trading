import TradingViewWidget from '../components/TradingViewWidget'

export default function Home() {
  return (
    <>
      <div
        id="body_title"
        className="position-relative overflow-hidden p-3 p-md-5 m-md-3 text-center bg-light"
      >
        <div className="col-md-5 p-lg-5 mx-auto my-5">
          <h1 className="display-4 fw-normal">언체인</h1>
          <p className="lead fw-normal">투명한 디지털 자산 거래소</p>
          <a className="btn btn-outline-secondary" href="#">
            거래소
          </a>
          <a className="btn btn-outline-secondary" href="./signin.html">
            로그인
          </a>
        </div>
        <div className="product-device shadow-sm d-none d-md-block"></div>
        <div className="product-device product-device-2 shadow-sm d-none d-md-block"></div>
      </div>
      <TradingViewWidget />
      <style jsx>{`
        #body_title {
          width: 80%;
          color: white;
          background: url('/title.jpg');
          background-size: 100% 100%;
        }
      `}</style>
    </>
  )
}
