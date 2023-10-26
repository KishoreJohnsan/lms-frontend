import { Fragment, useState } from 'react';
import { Outlet, Link, ScrollRestoration, Form } from "react-router-dom"
import { authStore } from '../utils/helper';
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

export default function Header() {
  const [state, setState] = useState(false);

  const role = authStore((state) => state.role)
  const token = authStore((state) => state.token)

  const isAdmin = role === 'ROLE_ADMIN'
  const isLoggedIn = token && token.trim().length !== 0

  return (
    <Fragment>
      <ScrollRestoration />
      <ToastContainer />
      <nav className="border-b w-full md:static md:text-sm md:border-none">
        <div className="items-center px-4 max-w-screen-xl mx-auto md:flex md:px-8">
          <div className="flex items-center justify-between py-3 md:py-5 md:block">
            <Link to="/">

              <svg xmlns="http://www.w3.org/2000/svg" height="2em" viewBox="0 0 576 512"><path d="M9.4 86.6C-3.1 74.1-3.1 53.9 9.4 41.4s32.8-12.5 45.3 0l192 192c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L178.7 256 9.4 86.6zM256 416H544c17.7 0 32 14.3 32 32s-14.3 32-32 32H256c-17.7 0-32-14.3-32-32s14.3-32 32-32z" /></svg>
              <p className="text-xl font-semibold text-blue-950">SKILLMIND</p>
            </Link>
            <div className="md:hidden">
              <button
                className="text-gray-500 hover:text-gray-800"
                onClick={() => setState(!state)}
              >
                {state ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>
          <div
            className={`flex-1 pb-3 mt-8 md:block md:pb-0 md:mt-0 ${state ? 'block' : 'hidden'
              }`}
          >
            <ul className="justify-end items-center space-y-6 md:flex md:space-x-6 md:space-y-0">
              {
                <Fragment>
                  <li className="text-gray-700 hover:text-blue-600">
                    <Link to='/search' className="block font-semibold leading-6">
                      Search
                    </Link>
                  </li>

                  <li className="text-gray-700 hover:text-blue-600">
                    <Link to='searchByTech' className="block font-semibold leading-6">
                      Search by Tech
                    </Link>
                  </li>

                  {isLoggedIn && isAdmin && (<li className="text-gray-700 hover:text-blue-600">
                    <Link to='/courses' className="block font-semibold leading-6">
                      All Courses
                    </Link>
                  </li>)}


                </Fragment>
              }
              <span className="hidden w-px h-6 bg-gray-300 md:block"></span>
              <div className="space-y-3 items-center gap-x-6 md:flex md:space-y-0">
                {!isLoggedIn && (
                  <Fragment><li>
                    <Link
                      to="/login"
                      className="block py-3 text-center text-gray-700 hover:text-blue-600 border rounded md:border-none font-semibold leading-6"
                    >
                      Log in
                    </Link>
                  </li>
                    <li>
                      <Link
                        to="/register"
                        className="block py-3 px-4 text-center text-white bg-[#1e3a8a] hover:bg-[#2563eb] active:bg-[#1e40af] active:shadow-none rounded shadow md:inline font-semibold leading-6"
                      >
                        Sign Up
                      </Link>
                    </li>
                  </Fragment>)}

                {isLoggedIn && (<li>
                  <Form method="post" action='/logout'>
                    <button
                      to="/logout"
                      className="block py-3 px-4 text-center text-white bg-[#1e3a8a] hover:bg-[#2563eb] active:bg-[#1e40af] active:shadow-none rounded shadow md:inline font-semibold leading-5"
                    >
                      Log Out
                    </button>
                  </Form>
                </li>
                )}
              </div>
            </ul>
          </div>
        </div>
      </nav>
      <main>
        <Outlet />
      </main>
    </Fragment>
  );
}
