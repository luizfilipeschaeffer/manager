"use client";
import { useState } from "react";
import { ThemeToggleButton } from '../../components/ThemeToggleButton';

export default function RecoveryPage() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);
    try {
      const res = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Erro ao enviar e-mail de recuperação");
      } else {
        setSuccess("Se o e-mail estiver cadastrado, você receberá um link para redefinir sua senha.");
        setEmail("");
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
        <h2 className="text-2xl font-bold text-blue-700 mb-6">Recuperar senha</h2>
        <form className="w-full flex flex-col gap-4" onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="E-mail cadastrado"
            className="border rounded px-4 py-2 w-full"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
          {error && <div className="text-red-600 text-sm text-center">{error}</div>}
          {success && <div className="text-green-600 text-sm text-center">{success}</div>}
          <button
            type="submit"
            className="bg-blue-600 text-white rounded-lg py-2 font-semibold hover:bg-blue-700 transition disabled:opacity-60"
            disabled={loading}
          >
            {loading ? "Enviando..." : "Enviar link de recuperação"}
          </button>
        </form>
        <a href="/login" className="mt-4 text-blue-600 hover:underline text-sm">Voltar para login</a>
      </div>
    </main>
  );
} 