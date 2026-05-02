function Adding() {
  return (
    <div
      style={{
        background: "rgba(255,255,255,0.08)",
        border: "1px solid rgba(255,255,255,0.1)",
        padding: "28px 36px",
        borderRadius: "20px",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        textAlign: "center",
        boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
        color: "#f0f2ff",
        fontFamily: "Poppins, sans-serif"
      }}
    >
      {/* Spinner */}
      <div
        style={{
          width: "32px",
          height: "32px",
          border: "3px solid rgba(255,255,255,0.2)",
          borderTop: "3px solid #6c8bff",
          borderRadius: "50%",
          margin: "0 auto 12px",
          animation: "spin 0.8s linear infinite"
        }}
      ></div>

      <p style={{ fontSize: "14px", fontWeight: "500" }}>
        Adding...
      </p>

      {/* Keyframes inside JSX */}
      <style>
        {`
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
        `}
      </style>
    </div>
  );
}

export default Adding;