import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Page Not Found</h1>

      <Link to="/" style={styles.button}>
        Sign In
      </Link>
    </div>
  );
}

const styles = {
  container: {
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    background: "#0f172a",
    color: "#e2e8f0",
    fontFamily: "sans-serif",
  },
  title: {
    fontSize: "32px",
    marginBottom: "20px",
  },
  button: {
    textDecoration: "none",
    padding: "10px 20px",
    background: "#38bdf8",
    color: "#0f172a",
    borderRadius: "8px",
    fontWeight: "600",
  },
};

export default NotFound;