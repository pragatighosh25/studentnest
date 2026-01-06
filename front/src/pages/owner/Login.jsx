import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PageWrapper from "../../components/PageWrapper";

export default function AuthPage() {
  const navigate = useNavigate();

  const [role, setRole] = useState("student"); // student | owner
  const [mode, setMode] = useState("login"); // login | register

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email || !password) return;

    if (mode === "register") {
      if (!name || password !== confirmPassword) {
        alert("Passwords do not match");
        return;
      }
    }

    // V1 auth mock
    localStorage.setItem("role", role);
    localStorage.setItem("name", name || "User");

    if (role === "owner") {
      navigate("/owner/dashboard");
    } else {
      navigate("/");
    }
  };

  return (
    <PageWrapper>
      <section className="min-h-screen bg-gray-50 dark:bg-zinc-950 flex items-center justify-center px-4">
        <div className="w-full max-w-md rounded-2xl bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 p-6">
          {/* Role Tabs */}
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

          {/* Login / Register Toggle */}
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

          {/* Title */}
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

          {/* Form */}
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

            <button
              type="submit"
              className={`w-full rounded-xl py-3 text-white font-medium transition ${
                role === "owner"
                  ? "bg-green-600 hover:bg-green-700"
                  : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              {mode === "login"
                ? `Login as ${role === "owner" ? "Owner" : "Student"}`
                : `Register as ${role === "owner" ? "Owner" : "Student"}`}
            </button>
          </form>
        </div>
      </section>
    </PageWrapper>
  );
}
