import Link from "next/link";
import Image from "next/image";

export default function LandingPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-white">

      {/* Background Decorations */}
      <div className="absolute left-0 top-0 h-52 w-52 rounded-full bg-green-400/25 blur-3xl" />
      <div className="absolute right-0 top-0 h-72 w-72 rounded-full bg-yellow-300/30 blur-3xl" />
      <div className="absolute bottom-0 left-0 h-72 w-72 rounded-full bg-green-300/20 blur-3xl" />
      <div className="absolute bottom-10 right-10 h-44 w-44 rounded-full bg-yellow-200/40 blur-2xl" />

      <div className="relative mx-auto flex min-h-screen max-w-7xl flex-col items-center justify-center px-6 py-20">

        {/* Hero Card */}

        <div className="flex flex-col items-center text-center">

          {/* Icon */}
          <div className="mb-8 rounded-3xl bg-white p-6 shadow-xl ring-1 ring-green-100">
            <Image
              src="/file.svg"
              alt="AI Learning Vault"
              width={72}
              height={72}
              priority
            />
          </div>

          {/* Heading */}
          <h1 className="text-5xl font-extrabold tracking-tight md:text-6xl">
            <span className="text-green-700">AI </span>

            <span className="bg-gradient-to-r from-yellow-500 to-amber-400 bg-clip-text text-transparent">
              Learning
            </span>

            <span className="text-green-700"> Vault</span>
          </h1>

          {/* Description */}
          <p className="mt-8 max-w-3xl text-lg leading-8 text-gray-600">
            Save learning resources and let AI summarize and categorize them
            automatically.
          </p>

          {/* Small Divider */}
          <div className="my-8 flex items-center gap-3">
            <div className="h-[2px] w-14 bg-green-600 rounded-full" />
            <div className="h-3 w-3 rounded-full bg-yellow-400" />
            <div className="h-[2px] w-14 bg-green-600 rounded-full" />
          </div>

          {/* Buttons */}
          <div className="flex flex-col gap-4 sm:flex-row">

            <Link
              href="/resources"
              className="rounded-xl bg-gradient-to-r from-green-600 to-green-700 px-8 py-4 text-lg font-semibold text-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
            >
              Browse Resources →
            </Link>

            <Link
              href="/auth/register"
              className="rounded-xl border border-green-200 bg-white px-8 py-4 text-lg font-semibold text-green-700 shadow-md transition-all duration-300 hover:border-green-400 hover:bg-green-50 hover:shadow-xl"
            >
              Create Account
            </Link>

          </div>

          {/* Feature Chips */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3 rounded-full border border-green-100 bg-green-50/70 px-6 py-3 shadow-sm">

            <span className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-green-700 shadow-sm">
              ✓ Smart
            </span>

            <span className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-green-700 shadow-sm">
              ✓ Secure
            </span>

            <span className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-green-700 shadow-sm">
              ✓ AI Powered
            </span>

          </div>
          {/* Footer */}
          <footer className="relative mt-24 border-t border-green-100 bg-white/70 backdrop-blur">
            <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 py-8 text-center md:flex-row">

              <div>
                <h3 className="text-lg font-semibold text-green-700">
                  AI Learning Vault
                </h3>

                <p className="mt-1 text-sm text-gray-500">
                  Built with ❤️ using Next.js, Prisma, Auth.js & OpenAI.
                </p>
              </div>

              <div className="text-sm text-gray-600">
                <p>
                  <span className="font-semibold text-green-700">Name :</span>{" "}
                  Koyena Singha
                </p>

                <div className="mt-2 flex flex-wrap items-center justify-center gap-5">

                  <a
                    href="https://github.com/koyena1"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-green-700 transition hover:text-green-900 hover:underline"
                  >
                    GitHub
                  </a>

                  <span className="text-yellow-500">•</span>

                  <a
                    href="https://www.linkedin.com/in/koyena-singha-600355253/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-green-700 transition hover:text-green-900 hover:underline"
                  >
                    LinkedIn
                  </a>

                </div>
              </div>

            </div>
          </footer>
        </div>
      </div>
    </main>
  );
}