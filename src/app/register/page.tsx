"use client";
import { useState } from "react";
import { ThemeToggleButton } from '../../components/ThemeToggleButton';

export default function RegisterPage() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nome, email, senha }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Erro ao registrar");
      } else {
        setSuccess("Registro realizado! Verifique seu e-mail para ativar a conta.");
        setNome("");
        setEmail("");
        setSenha("");
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
        <h2 className="text-2xl font-bold text-blue-700 mb-6">Criar nova conta</h2>
        <form className="w-full flex flex-col gap-4" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Nome completo"
            className="border rounded px-4 py-2 w-full"
            value={nome}
            onChange={e => setNome(e.target.value)}
            required
          />
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
            value={senha}
            onChange={e => setSenha(e.target.value)}
            required
          />
          {error && <div className="text-red-600 text-sm text-center">{error}</div>}
          {success && <div className="text-green-600 text-sm text-center">{success}</div>}
          <button
            type="submit"
            className="bg-blue-600 text-white rounded-lg py-2 font-semibold hover:bg-blue-700 transition disabled:opacity-60"
            disabled={loading}
          >
            {loading ? "Registrando..." : "Registrar"}
          </button>
        </form>
        <a href="/login" className="mt-4 text-blue-600 hover:underline text-sm">Já tenho conta</a>
      </div>
    </main>
  );
} 