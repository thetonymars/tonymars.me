"use client"

export function UnderConstruction() {
  return (
    <div className="uc-wrapper">
      <style>{`
        .uc-wrapper {
          min-height: 100vh;
          background: #ffffff;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          font-family: system-ui, -apple-system, sans-serif;
          padding: 40px 24px;
        }
        .uc-logo {
          font-size: 15px;
          font-weight: 800;
          letter-spacing: 2px;
          color: #003561;
          margin-bottom: 32px;
        }
        .uc-image {
          max-width: 480px;
          width: 100%;
          margin-bottom: 40px;
        }
        .uc-image img {
          width: 100%;
          height: auto;
          display: block;
        }
        .uc-title {
          font-size: 48px;
          font-weight: 900;
          letter-spacing: -2px;
          line-height: 1.1;
          color: #1f2426;
          margin-bottom: 16px;
          text-align: center;
        }
        .uc-subtitle {
          font-size: 18px;
          color: #495257;
          line-height: 1.6;
          margin-bottom: 40px;
          text-align: center;
        }
        .uc-socials {
          display: flex;
          gap: 12px;
        }
        .uc-btn {
          display: inline-flex;
          align-items: center;
          padding: 14px 28px;
          border-radius: 8px;
          font-size: 14px;
          font-weight: 700;
          text-decoration: none;
          transition: all 0.15s;
        }
        .uc-btn-primary { background: #0073b9; color: #fff; }
        .uc-btn-primary:hover { background: #005fa0; }
        .uc-btn-secondary { background: #fff; color: #0073b9; border: 2px solid #0073b9; }
        .uc-btn-secondary:hover { background: #f0f7fc; }

        @media (max-width: 768px) {
          .uc-title { font-size: 32px; letter-spacing: -1px; }
          .uc-subtitle { font-size: 16px; }
          .uc-socials { flex-direction: column; align-items: center; }
          .uc-image { max-width: 320px; }
        }
      `}</style>

      <div className="uc-logo">ТОНИ МАРС</div>

      <div className="uc-image">
        <img src="/under-construction.jpg" alt="Under construction" />
      </div>

      <h1 className="uc-title">Сайт обновляется</h1>
      <p className="uc-subtitle">
        Строю что-то новое. Пока заходи на мои каналы.
      </p>

      <div className="uc-socials">
        <a
          href="https://www.youtube.com/@the-tony-mars"
          className="uc-btn uc-btn-primary"
          target="_blank"
          rel="noopener noreferrer"
        >
          YouTube
        </a>
        <a
          href="https://t.me/thetonymars"
          className="uc-btn uc-btn-secondary"
          target="_blank"
          rel="noopener noreferrer"
        >
          Telegram
        </a>
      </div>
    </div>
  )
}
