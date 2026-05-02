function Error({ mess, id }) {
    
  return (
    <div style={styles.wrapper}>
      <div style={styles.card}>
        <div style={styles.icon}>⚠️</div>

        <h2 style={styles.title}>Something went wrong</h2>

        <p style={styles.message}>
          {mess}
        </p>

        {id && (
          <p style={styles.id}>
            Item ID: <span style={styles.idValue}>{id}</span>
          </p>
        )}

      </div>
    </div>
  );
}

const styles = {
  wrapper: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background:
      "radial-gradient(circle at top, #1a1333, #0b061a 75%)",
    fontFamily: "'Inter', sans-serif",
  },

  card: {
    background: "rgba(255, 255, 255, 0.05)",
    backdropFilter: "blur(18px)",
    border: "1px solid rgba(139, 92, 246, 0.15)",
    padding: "36px 42px",
    borderRadius: "22px",
    textAlign: "center",
    color: "#e9e5ff",
    width: "380px",
    boxShadow: "0 12px 50px rgba(0,0,0,0.6)",
  },

  icon: {
    fontSize: "42px",
    marginBottom: "12px",
  },

  title: {
    fontSize: "22px",
    fontWeight: "600",
    marginBottom: "10px",
    color: "#f5f3ff",
  },

  message: {
    fontSize: "14px",
    color: "#c4b5fd",
    marginBottom: "16px",
    lineHeight: "1.5",
  },

  id: {
    fontSize: "13px",
    marginBottom: "22px",
    color: "#a78bfa",
  },

  idValue: {
    color: "#ddd6fe",
    fontWeight: "500",
  },

  button: {
    padding: "11px 22px",
    borderRadius: "12px",
    border: "none",
    background:
      "linear-gradient(135deg, #8b5cf6, #6d28d9)",
    color: "#f5f3ff",
    fontWeight: "600",
    cursor: "pointer",
    transition: "all 0.25s ease",
    boxShadow: "0 6px 20px rgba(139,92,246,0.35)",
  },
};

export default Error;