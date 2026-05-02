function Removing() {
  return (
    <>
      <div className="removingOverlay">
        <div className="loader"></div>
        <p className="removingText">Removing...</p>
      </div>

      <style>
        {`
          .removingOverlay {
            position: absolute;
            inset: 0;
            background: rgba(0, 0, 0, 0.65);
            backdrop-filter: blur(6px);
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            border-radius: 16px;
            z-index: 10;
          }

          .loader {
            width: 42px;
            height: 42px;
            border: 4px solid rgba(255, 255, 255, 0.25);
            border-top: 4px solid #00ffcc;
            border-radius: 50%;
            animation: spin 0.8s linear infinite;
          }

          .removingText {
            margin-top: 10px;
            font-size: 14px;
            color: white;
            letter-spacing: 0.5px;
            opacity: 0.9;
          }

          @keyframes spin {
            to {
              transform: rotate(360deg);
            }
          }
        `}
      </style>
    </>
  );
}

export default Removing;