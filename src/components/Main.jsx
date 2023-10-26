import { Form } from "react-router-dom";

export default function Main() {

  return (
    <div>
      <section className="relative">
        <div className="relative z-10 max-w-screen-xl mx-auto px-4 py-28 md:px-8">
          <div className="space-y-5 max-w-4xl mx-auto text-center">
            <h2 className="text-4xl text-blue-900 font-extrabold mx-auto md:text-5xl">
              Master new skills with our online courses
            </h2>

            <div className="relative flex gap-3 flex-col sm:flex-row">
              <div className="mx-auto max-w-md rounded-lg bg-white shadow flex-auto">
                <div className="p-4">
                  <h3 className="text-xl font-medium text-gray-900">
                    Learn Anything, Anytime, Anywhere
                  </h3>
                  <p className="mt-1 text-gray-500">
                    Discover a world of knowledge with our flexible learning
                    platform.
                  </p>
                </div>
              </div>

              <div className="mx-auto max-w-md rounded-lg bg-white shadow flex-auto">
                <div className="p-4">
                  <h3 className="text-xl font-medium text-gray-900">
                    Transform Your Future
                  </h3>
                  <p className="mt-1 text-gray-500">
                    Join the next generation of learners with our revolutionary
                    platform.
                  </p>
                </div>
              </div>

              <div className="mx-auto max-w-md rounded-lg bg-white shadow flex-auto">
                <div className="p-4">
                  <h3 className="text-xl font-medium text-gray-900">
                    Unlock Your Potential
                  </h3>
                  <p className="mt-1 text-gray-500">
                    Empower your mind and transform your future with our unique
                    learning platform.
                  </p>
                </div>
              </div>
            </div>

            <Form
              method="post" action="/result"
              className=" relative  flex flex-row gap-3 "
            >
              <input
                type="text"
                name="search"
                placeholder="Course Name..."
                className="w-full rounded border-gray-200 py-3 pe-10 shadow-sm sm:text-sm sm:w-auto flex-auto"
                required
              />
              <button className="flex items-center justify-center gap-x-2 py-3 px-4 mt-2 w-full text-lg text-white font-medium bg-[#1e3a8a] hover:bg-[#2563eb] active:bg-[#1e40af] rounded sm:mt-0 sm:w-auto flex-auto">
                Search
              </button>
            </Form>
          </div>
        </div>
      </section>
    </div>
  );
}


