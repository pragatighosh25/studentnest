import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PageWrapper from "../../components/PageWrapper";
import { apiFetch } from "../../utils/api";

export default function AuthPage() {
  const navigate = useNavigate();

  // UI state (student | owner)
  const [role, setRole] = useState("student");
  const [mode, setMode] = useState("login");

  // form state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  /* ---------- SUBMIT ---------- */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Email and password are required");
      return;
    }

    if (mode === "register") {
      if (!name) {
        setError("Name is required");
        return;
      }
      if (password !== confirmPassword) {
        setError("Passwords do not match");
        return;
      }
    }

    try {
      const endpoint =
        mode === "login" ? "/auth/login" : "/auth/register";

      const payload =
        mode === "login"
          ? { email, password }
          : { name, email, password, role };

      const data = await apiFetch(endpoint, {
        method: "POST",
        body: JSON.stringify(payload),
      });

      // store auth
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      // redirect by role (ADMIN INCLUDED)
      if (data.user.role === "admin") {
        navigate("/admin/dashboard");
      } else if (data.user.role === "owner") {
        navigate("/owner/dashboard");
      } else {
        navigate("/");
      }
    } catch (err) {
      setError(err.message || "Authentication failed");
    }
  };

  return (
    <PageWrapper>
      <section className="min-h-screen bg-gray-50 dark:bg-zinc-950 flex items-center justify-center px-4">
        <div className="w-full max-w-md rounded-2xl bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 p-6">
          {/* ROLE TABS (NO ADMIN) */}
          <div className="flex mb-4 rounded-xl bg-gray-100 dark:bg-zinc-800 p-1">
            {["student", "owner"].map((r) => (
              <button
                key={r}
                onClick={() => setRole(r)}
                className={`flex-1 py-2 rounded-lg text-sm font-medium transition ${
                  role === r
                    ? "bg-white dark:bg-zinc-900 text-gray-900 dark:text-gray-100"
                    : "text-gray-500 dark:text-gray-400"
                }`}
              >
                {r === "student" ? "Student" : "Owner"}
              </button>
            ))}
          </div>

          {/* LOGIN / REGISTER */}
          <div className="flex justify-center gap-4 text-sm mb-6">
            {["login", "register"].map((m) => (
              <button
                key={m}
                onClick={() => setMode(m)}
                className={`font-medium ${
                  mode === m
                    ? "text-blue-600"
                    : "text-gray-500 dark:text-gray-400"
                }`}
              >
                {m === "login" ? "Login" : "Register"}
              </button>
            ))}
          </div>

          {/* TITLE */}
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 text-center">
            {mode === "login" ? "Welcome back" : "Create your account"}
          </h2>

          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400 text-center">
            {role === "owner"
              ? mode === "login"
                ? "Login to manage your PG listings"
                : "Register to list your PGs on StudentNest"
              : mode === "login"
              ? "Login to explore PGs without brokers"
              : "Register to start finding PGs easily"}
          </p>

          {/* FORM */}
          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            {mode === "register" && (
              <input
                type="text"
                placeholder="Your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="filter-input"
              />
            )}

            <input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="filter-input"
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="filter-input"
            />

            {mode === "register" && (
              <input
                type="password"
                placeholder="Confirm password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="filter-input"
              />
            )}

            {error && (
              <p className="text-sm text-red-500 text-center">
                {error}
              </p>
            )}

            <button
              type="submit"
              className={`w-full rounded-xl py-3 text-white font-medium transition ${
                role === "owner"
                  ? "bg-green-600 hover:bg-green-700"
                  : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              {mode === "login"
                ? "Login"
                : `Register as ${role === "owner" ? "Owner" : "Student"}`}
            </button>
          </form>
        </div>
      </section>
    </PageWrapper>
  );
}
