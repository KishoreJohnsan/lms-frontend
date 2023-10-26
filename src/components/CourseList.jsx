import { Fragment } from 'react';
import Course from './Course';
import { Link, useActionData, useLoaderData, useNavigate } from 'react-router-dom';
import { authStore } from '../utils/helper';
import { useEffect } from 'react';

const CourseList = () => {
  
  const role = authStore((state) => state.role)
  const token = authStore((state) => state.token)
  
  const isAdmin = role === 'ROLE_ADMIN'
  const isLoggedIn = token.trim().length !== 0

  const loaderData = useLoaderData()
  const actionData = useActionData()  
  
  const courses = loaderData ? loaderData : actionData  

  const navigate = useNavigate();  

  useEffect(() => {
    if (token.trim().length === 0) {
      navigate('/login');
    }
  });

  return (
    <Fragment>
      <div className="mx-auto max-w-screen-xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex justify-between ml-8 mr-8">
          <h1 className="text-2xl font-bold text-blue-900 sm:text-3xl">
            Course List
          </h1>

          {isLoggedIn && isAdmin && (
            <Link
              to="/courses/new"
              className="rounded border border-blue-900 bg-blue-900 hover:bg-blue-600 px-3.5 py-2 text-[16px] font-medium text-white"
            >
              Add Course
            </Link>
          )}
        </div>

        <ul className="mx-auto max-w-6xl py-6 grid grid-cols-3 gap-4">
          {courses.map((course, id) => {
            return (
              <li key={id}>
                <Course course={course} />
              </li>
            );
          })}
        </ul>
      </div>
    </Fragment>
  );
};

export default CourseList;
