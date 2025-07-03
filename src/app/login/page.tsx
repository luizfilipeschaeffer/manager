"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { ThemeToggleButton } from '../../components/ThemeToggleButton';

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: email, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Erro ao autenticar");
      } else {
        // Salvar token no localStorage (ou cookie, conforme estratégia)
        localStorage.setItem("token", data.token);
        router.push("/");
      }
    } catch (err) {
      setError("Erro de conexão");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-blue-200 p-4">
      <div className="max-w-md w-full bg-white dark:bg-gray-900 rounded-xl shadow-lg p-8 flex flex-col items-center relative">
        <div className="absolute top-4 right-4">
          <ThemeToggleButton />
        </div>
        <h2 className="text-2xl font-bold text-blue-700 mb-6">Entrar na Plataforma</h2>
        <form className="w-full flex flex-col gap-4" onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="E-mail"
            className="border rounded px-4 py-2 w-full"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Senha"
            className="border rounded px-4 py-2 w-full"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
          {error && <div className="text-red-600 text-sm text-center">{error}</div>}
          <button
            type="submit"
            className="bg-blue-600 text-white rounded-lg py-2 font-semibold hover:bg-blue-700 transition disabled:opacity-60"
            disabled={loading}
          >
            {loading ? "Entrando..." : "Entrar"}
          </button>
        </form>
        <a href="/recovery" className="mt-4 text-blue-600 hover:underline text-sm">Esqueci minha senha</a>
        <a href="/register" className="mt-2 text-blue-600 hover:underline text-sm">Criar nova conta</a>
      </div>
    </main>
  );
} 