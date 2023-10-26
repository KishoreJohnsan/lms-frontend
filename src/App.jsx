//import { Fragment } from 'react';
import Header from './components/Header';
import Main from './components/Main';
import Login from './components/Login';
import Signup from './components/Signup';
import CourseList from './components/CourseList';
import NotFound from './pages/NotFound'
import Search from './components/Search';

import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider
} from 'react-router-dom'

import { searchAction, loginAction, signupAction, addCourseAction, courseLoader, deleteCourseAction, logOutAction, searchByTechAction } from './utils/helper';
import AddCourse from './components/AddCourse';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Header />} >
      <Route index element={<Main />} />
      <Route path="login" element={<Login />} action={loginAction}/>
      <Route path="register" element={<Signup />} action={signupAction}/>
      <Route path="result" element={<Search />} action={searchAction} />
      <Route path="home" element={<Main />}  />
      <Route path="courses" element={<CourseList />} action={addCourseAction} loader={courseLoader}/>
      <Route path="courses/new" element={<AddCourse />} />
      <Route path="delete/:id" element={<CourseList />} action={deleteCourseAction} />
      <Route path="logout" element={<Login />} action={logOutAction} />
      <Route path="search" element={<Search />} />
      <Route path="searchByTech" element={<Search />} action={searchByTechAction} />

      <Route path="*" element={<NotFound />} />
    </Route>
  )
)

const App = () => {
  return (
    <RouterProvider router={router} />
  );
};

export default App;
