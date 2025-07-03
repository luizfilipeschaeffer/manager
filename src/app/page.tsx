import Image from "next/image";
import { ThemeToggleButton } from '../components/ThemeToggleButton';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-blue-200 p-4">
      <div className="max-w-xl w-full bg-white dark:bg-gray-900 rounded-xl shadow-lg p-8 flex flex-col items-center relative">
        <div className="absolute top-4 right-4">
          <ThemeToggleButton />
        </div>
        <h1 className="text-4xl font-bold text-blue-700 dark:text-blue-300 mb-4 text-center">Bem-vindo à Plataforma Multi-Tenant</h1>
        <p className="text-lg text-gray-700 dark:text-gray-200 mb-6 text-center">
          Gerencie clientes, usuários, permissões e módulos dinâmicos com segurança e facilidade.<br/>
          Plataforma moderna, escalável e pronta para o seu negócio.
        </p>
        <div className="flex gap-4">
          <a href="/login" className="px-6 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition">Entrar</a>
          <a href="/register" className="px-6 py-2 bg-white border border-blue-600 text-blue-700 rounded-lg font-semibold hover:bg-blue-50 transition">Criar Conta</a>
        </div>
      </div>
      <footer className="mt-8 text-gray-400 text-sm">&copy; {new Date().getFullYear()} Plataforma Multi-Tenant</footer>
    </main>
  );
}
