import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
    const history = useNavigate();
    const [error, setError] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [userType, setUserType] = useState("student"); // Default to student

    const handleSubmit = (e) => {
        e.preventDefault();

        // Basic form validation
        if (!email || !password) {
            setError(true); // Set error state to true if email or password is empty
            return; // Exit early if validation fails
        }

        // You can handle authentication logic here
        // For example, you can use fetch or axios to send a request to your server

        // After successful authentication, redirect based on user type
        if (userType === "supervisor") {
            history('/Sup_HomePage'); // Redirect supervisor to supervisor homepage
        } else {
            history('/'); // Redirect student to student homepage
        }
    };

    return (
        <div style={styles.container}>
            <div style={styles.formWrapper}>
                <h2 style={styles.title}>Login</h2>
                <form onSubmit={handleSubmit} style={styles.form}>
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        style={styles.input}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        style={styles.input}
                    />

                    {/* Option to choose user type */}
                    <div>
                        <input
                            type="radio"
                            id="student"
                            value="student"
                            checked={userType === "student"}
                            onChange={() => setUserType("student")}
                            style={styles.radioInput}
                        />
                        <label htmlFor="student" style={styles.radioLabel}>Student</label>

                        <input
                            type="radio"
                            id="supervisor"
                            value="supervisor"
                            checked={userType === "supervisor"}
                            onChange={() => setUserType("supervisor")}
                            style={styles.radioInput}
                        />
                        <label htmlFor="supervisor" style={styles.radioLabel}>Supervisor</label>
                    </div>

                    <button type="submit" style={styles.button}>Sign In</button>

                    {error && <p style={styles.errorMsg}>Please enter both email and password.</p>}
                </form>
                <p style={styles.registerText}>Don't have an account? <Link style={styles.registerLink} to="/Register">Register</Link></p>
            </div>
        </div>
    );
}

const styles = {
    container: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        background: "#303F9F",
    },
    formWrapper: {
        background: "#fff",
        padding: "40px",
        borderRadius: "8px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    },
    title: {
        textAlign: "center",
        marginBottom: "20px",
        color: "#333",
    },
    form: {
        display: "flex",
        flexDirection: "column",
    },
    input: {
        padding: "10px",
        marginBottom: "20px",
        border: "1px solid #ccc",
        borderRadius: "4px",
        fontSize: "16px",
    },
    radioInput: {
        marginRight: "5px",
    },
    radioLabel: {
        marginRight: "20px",
    },
    button: {
        padding: "10px",
        background: "#007bff",
        color: "#fff",
        border: "none",
        borderRadius: "4px",
        cursor: "pointer",
        fontSize: "16px",
    },
    errorMsg: {
        color: "red",
        marginTop: "10px",
        textAlign: "center",
    },
    registerText: {
        textAlign: "center",
        marginTop: "20px",
        fontSize: "14px",
    },
    registerLink: {
        textDecoration: "none",
        color: "#007bff",
    },
};
