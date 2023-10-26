import { MdOutlineDeleteForever } from 'react-icons/md';
import { authStore } from '../utils/helper';
import { Form, Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const Course = ({ course }) => {
  const role = authStore((state) => state.role);
  const token = authStore((state) => state.token);

  const isAdmin = role === 'ROLE_ADMIN';
  const isLoggedIn = token.trim().length !== 0;

  Course.propTypes = {
    course: PropTypes.object,
  };

  return (
    <article className="rounded-xl bg-white p-4 ring ring-indigo-50 sm:p-6 lg:p-8">
      <div>
        <div className="flex gap-2 justify-between">
          <button className="rounded border border-blue-600 bg-blue-600 px-3.5 py-2 text-[13px] font-medium text-white cursor-default">
            {course.technology}
          </button>
          {isLoggedIn && isAdmin && (
            <Form method="delete" action={'/delete/' + course.id}>
              <button
                className="inline-block rounded-full border border-red-700 bg-red-700 hover:bg-red-600 p-2.5 text-[24px] font-medium text-white"
                type="submit"
              >
                <MdOutlineDeleteForever />
              </button>
            </Form>
          )}
        </div>

        <h3 className="mt-4 text-lg font-medium sm:text-xl">
          <Link to="#" className="hover:underline">
            {' '}
            {course.name}{' '}
          </Link>
        </h3>

        <p className="mt-1 text-sm text-gray-700">
          {course.description ? course.description : ''}
        </p>

        <div className="mt-4 sm:flex sm:items-center sm:gap-2 flex justify-start">
          <div className="flex items-center gap-1 text-gray-500">
            <svg
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              ></path>
            </svg>

            <p className="text-xs font-medium">{course.duration} month</p>
          </div>
        </div>
      </div>
    </article>
  );
};

export default Course;
