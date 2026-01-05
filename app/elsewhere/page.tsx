import AnimatedPage from '@/components/AnimatedPage';

export default function ElsewherePage() {
  return (
    <AnimatedPage variant="dramatic">
      <div className="min-h-screen" style={{ backgroundColor: '#E2DEDB' }}>
        <main className="relative px-5 sm:px-6 pt-24 sm:pt-32 pb-28 sm:pb-32">
          <div className="max-w-[680px] mx-auto">
              {/* Intro copy */}
              <div className="mb-10 sm:mb-14 px-3.5 sm:px-4">
                <div className="text-[16px] sm:text-[17px] text-gray-700 leading-relaxed max-w-[576px] space-y-3 sm:space-y-4">
                  <p>
                    I&apos;m always open to new projects, collaborations, or just a good conversation about design and storytelling. Whether you have something specific in mind or just want to connect, feel free to reach out.
                  </p>
                </div>
              </div>

              {/* Elsewhere section */}
              <div className="mb-10 sm:mb-14 px-3.5 sm:px-4">
                <h1 className="text-[16px] font-medium text-black mb-8">
                  Elsewhere
                </h1>
                <div className="space-y-3 sm:space-y-4 text-[16px] sm:text-[17px] text-gray-700 max-w-[576px]">
                  <p>
                    <a
                      href="mailto:ramin@me.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline underline-offset-2"
                    >
                      Email
                    </a>
                  </p>
                  <p>
                    <a
                      href="https://x.com/ramintahbaz"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline underline-offset-2"
                    >
                      X
                    </a>
                  </p>
                  <p>
                    <a
                      href="https://www.linkedin.com/in/ramin-tahbaz/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline underline-offset-2"
                    >
                      LinkedIn
                    </a>
                  </p>
                  <p>
                    <a
                      href="https://github.com/ramintahbaz23/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline underline-offset-2"
                    >
                      Github
                    </a>
                  </p>
                  <p>
                    <a
                      href="https://www.imdb.com/name/nm11702949/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline underline-offset-2"
                    >
                      IMDb
                    </a>
                  </p>
                </div>
              </div>

              {/* Colophon section */}
              <div className="mb-10 sm:mb-12 px-3.5 sm:px-4">
                <h1 className="text-[16px] font-medium text-black mb-8">
                  Built by
                </h1>
                <div className="space-y-3 sm:space-y-4 text-[16px] sm:text-[17px] text-gray-700 leading-relaxed max-w-[576px]">
                  <p>
                    Ramin Tahbaz
                    <br />
                    <a
                      href="mailto:ramin@me.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline underline-offset-2"
                    >
                      ramin@me.com
                    </a>
                  </p>
                  <p>
                    Last updated: December 13, 2025
                    <br />
                    Built using Next.js, Framer Motion and Tailwind CSS.
                  </p>
                </div>
              </div>
          </div>
        </main>
      </div>
    </AnimatedPage>
  );
}









