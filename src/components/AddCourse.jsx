import { Fragment } from 'react';
import { Link, Form, useNavigate } from 'react-router-dom';
import { authStore } from '../utils/helper';
import { useEffect } from 'react';

const AddCourse = () => {
  const navigate = useNavigate();
  const token = authStore((state) => state.token);

  useEffect(() => {
    if (token.trim().length === 0) {
      navigate('/login');
    }
  });

  return (
    <Fragment>
      <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-lg">
          <h1 className="text-center text-2xl font-bold text-blue-900 sm:text-3xl">
            Add Course
          </h1>

          <div className="rounded-lg p-8 shadow-lg lg:col-span-3 lg:p-12">
            <Form method="post" action="/courses" className="space-y-1 p-1">
              <div>
                <label
                  className="mb-1 block text-sm font-medium text-gray-700"
                  htmlFor="name"
                >
                  Name
                </label>
                <input
                  className="w-full rounded-lg border-gray-200 p-3 text-sm"
                  type="text"
                  id="name"
                  name="name"
                  required
                />
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label
                    className="mb-1 block text-sm font-medium text-gray-700"
                    htmlFor="duration"
                  >
                    Duration
                  </label>
                  <input
                    className="w-full rounded-lg border-gray-200 p-3 text-sm"
                    type="number"
                    id="duration"
                    name="duration"
                    required
                  />
                </div>

                <div>
                  <label
                    className="mb-1 block text-sm font-medium text-gray-700"
                    htmlFor="technology"
                  >
                    Technology
                  </label>
                  <input
                    className="w-full rounded-lg border-gray-200 p-3 text-sm"
                    type="text"
                    id="technology"
                    name="technology"
                    required
                  />
                </div>
              </div>

              <div>
                <label
                  className="mb-1 block text-sm font-medium text-gray-700"
                  htmlFor="url"
                >
                  Launch URL
                </label>
                <input
                  className="w-full rounded-lg border-gray-200 p-3 text-sm"
                  type="text"
                  id="url"
                  name="url"
                  required
                />
              </div>

              <div>
                <label
                  className="mb-1 block text-sm font-medium text-gray-700"
                  htmlFor="description"
                >
                  Description
                </label>

                <textarea
                  className="w-full rounded-lg border-gray-200 p-3 text-sm"
                  rows="2"
                  id="description"
                  name="description"
                  required
                ></textarea>
              </div>

              <div className="pt-2 flex gap-2">
                <button
                  type="submit"
                  className="inline-block w-full rounded-lg bg-blue-900 hover:bg-blue-600 px-3 py-2.5 font-medium text-white sm:w-auto"
                >
                  Add Course
                </button>

                <Link
                  to="/courses"
                  className="inline-block w-full rounded-lg border-2 border-blue-900 hover:bg-blue-600 hover:text-white px-4 py-2 font-medium sm:w-auto"
                >
                  Cancel
                </Link>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default AddCourse;
