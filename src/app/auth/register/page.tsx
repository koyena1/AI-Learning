import Link from "next/link";
import RegisterForm from "./register-form";

export default function RegisterPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-white">

      {/* Background Decorations */}
      <div className="absolute left-0 top-0 h-60 w-60 rounded-full bg-green-300/30 blur-3xl" />
      <div className="absolute right-0 top-0 h-72 w-72 rounded-full bg-yellow-300/30 blur-3xl" />
      <div className="absolute bottom-0 left-0 h-72 w-72 rounded-full bg-green-200/20 blur-3xl" />
      <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-yellow-200/25 blur-3xl" />

      {/* Decorative Dots */}
      <div className="absolute left-24 top-24 grid grid-cols-4 gap-3 opacity-30">
        {Array.from({ length: 16 }).map((_, i) => (
          <div key={i} className="h-1.5 w-1.5 rounded-full bg-green-500" />
        ))}
      </div>

      <div className="absolute right-28 bottom-24 grid grid-cols-4 gap-3 opacity-30">
        {Array.from({ length: 16 }).map((_, i) => (
          <div key={i} className="h-1.5 w-1.5 rounded-full bg-green-500" />
        ))}
      </div>

      {/* Floating Circles */}
      <div className="absolute left-14 top-1/2 h-5 w-5 rounded-full bg-green-400 opacity-70" />
      <div className="absolute right-20 top-1/3 h-5 w-5 rounded-full bg-green-400 opacity-70" />
      <div className="absolute left-24 bottom-28 h-5 w-5 rounded-full bg-yellow-400 opacity-80" />

      <div className="relative mx-auto flex min-h-screen max-w-7xl items-center justify-center px-6 py-16">

        <div className="grid w-full max-w-6xl items-center gap-16 lg:grid-cols-2">

          {/* Left Side Branding */}
          <div className="hidden lg:flex flex-col items-center text-center">

            {/* <div className="mb-8 rounded-3xl bg-white p-5 shadow-xl ring-1 ring-green-100">
              <Image
                src="/file.svg"
                alt="AI Learning Vault"
                width={70}
                height={70}
                priority
              />
            </div> */}

            <h1 className="text-5xl font-extrabold tracking-tight">
              <span className="text-green-700">AI </span>

              <span className="bg-gradient-to-r from-yellow-500 to-amber-400 bg-clip-text text-transparent">
                Learning
              </span>

              <span className="text-green-700"> Vault</span>
            </h1>

            <div className="my-7 flex items-center gap-3">
              <div className="h-[2px] w-12 rounded-full bg-green-600" />
              <div className="h-3 w-3 rounded-full bg-yellow-400" />
              <div className="h-[2px] w-12 rounded-full bg-green-600" />
            </div>

            <p className="max-w-sm text-lg leading-8 text-gray-600">
              Create your free account and start building your AI learning vault.
            </p>

          </div>

          {/* Register Card */}
          <div className="rounded-3xl border border-green-100 bg-white/90 p-10 shadow-2xl backdrop-blur">

            <div className="mb-8 flex flex-col items-center">

              {/* User Icon */}
              <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-green-100">

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-11 w-11 text-green-700"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 14a4 4 0 10-8 0m8 0a4 4 0 11-8 0m8 0v1a2 2 0 002 2h1m-11-3v1a2 2 0 01-2 2H3m9-14v4m-2-2h4"
                  />
                </svg>

              </div>

              <h2 className="text-4xl font-bold text-gray-900">
                Create your <span className="text-green-700">account</span>
              </h2>

              <p className="mt-3 text-center text-gray-500">
                Sign up to save and summarize your learning resources.
              </p>

              <div className="mt-6 flex items-center gap-3">
                <div className="h-[2px] w-12 rounded-full bg-green-600" />
                <div className="h-3 w-3 rounded-full bg-yellow-400" />
                <div className="h-[2px] w-12 rounded-full bg-green-600" />
              </div>

            </div>

            {/* KEEP YOUR EXISTING FORM */}
            <RegisterForm />

            <p className="mt-8 text-center text-sm text-gray-600">
              Already have an account?{" "}
              <Link
                href="/auth/login"
                className="font-semibold text-green-700 hover:underline"
              >
                Log in
              </Link>
            </p>

          </div>

        </div>

      </div>

    </main>
  );
}

