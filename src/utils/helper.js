import { redirect } from 'react-router-dom';
import { create } from 'zustand';
import axios from 'axios';
import dayjs from 'dayjs';
import { toast } from 'react-toastify';

export const authStore = create(() => ({
  role: '',
  token: '',
}));

export const setRole = (role) => authStore.setState(() => ({ role: role }));
export const removeRole = () => authStore.setState(() => ({ role: '' }));
export const setToken = (token) => authStore.setState(() => ({ token: token }));
export const removeToken = () => authStore.setState(() => ({ token: '' }));

const serverErrorToast = () =>
  toast.error('Server Error. Please try again later', {
    position: 'top-center',
    autoClose: 3000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: false,
    progress: undefined,
    theme: 'colored',
  });

export const loginAction = async ({ request }) => {
  const data = await request.formData();

  const submission = {
    email: data.get('email'),
    password: data.get('password'),
  };

  try {
    const response = await axiosClient.post('/authenticate', submission);

    if (!response.data.status) {
      toast.error('Email/Password Incorrect. Please check', {
        position: 'top-center',
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        theme: 'colored',
      });

      return redirect('/login');
    }

    localStorage.setItem('data', JSON.stringify(response.data));

    setRole(response.data.role);
    setToken(response.data.token);

    toast.info('Welcome', {
      position: 'top-center',
      autoClose: 3000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: false,
      progress: undefined,
      theme: 'colored',
    });

    return redirect('/home');
  } catch (error) {
    console.log(error);
    serverErrorToast();
    return redirect('/login');
  }
};

export const signupAction = async ({ request }) => {
  const data = await request.formData();

  const submission = {
    name: data.get('name'),
    email: data.get('email'),
    password: data.get('password'),
    confirmpassword: data.get('confirmpassword'),
  };

  try {
    const response = await axiosClient.post('/register', submission);

    if (response.data) {
      toast.success('Registration Successful', {
        position: 'top-center',
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        theme: 'colored',
      });
    }

    return redirect('/login');
  } catch (error) {
    console.log(error);

    toast.error('Registration Failed. Please try again later', {
      position: 'top-center',
      autoClose: 3000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: false,
      progress: undefined,
      theme: 'colored',
    });

    return redirect('/register');
  }
};

export const logOutAction = () => {
  localStorage.removeItem('data');
  removeToken();
  removeRole();

  toast.info('Logout Successful', {
    position: 'top-center',
    autoClose: 3000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: false,
    progress: undefined,
    theme: 'colored',
  });

  return redirect('/login');
};

export const searchAction = async ({ request }) => {
  const data = await request.formData();
  const searchKey = data.get('search');
  const url = '/courses/name/' + searchKey;

  try {
    const response = await axiosClient.get(url);
    console.log(response.data);
    if (!response.data.status) {
      toast.error('Course Not Found', {
        position: 'top-center',
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        theme: 'colored',
      });

      return null;
    }

    return response.data.response;
  } catch (error) {
    console.log(error);
    serverErrorToast();
    return redirect('/login');
  }
};

export const searchByTechAction = async ({ request }) => {
  const data = await request.formData();

  const tech = data.get('technology');
  const from = data.get('from');
  const to = data.get('to');

  let url = '/courses/info/' + tech;
  if (from && to) {
    url = '/courses/get/' + tech + '/' + from + '/' + to;
  }

  try {
    const response = await axiosClient.get(url);
    console.log(response.data);

    if (response.data.errorCode !== 0 && response.data.errorCode !== 200) {
      toast.error('Course Not Found', {
        position: 'top-center',
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        theme: 'colored',
      });

      return null;
    }
    return response.data.response;
  } catch (error) {
    console.log(error);
    serverErrorToast();
    return redirect('/login');
  }
};

export const addCourseAction = async ({ request }) => {
  const data = await request.formData();

  const submission = {
    name: data.get('name'),
    duration: data.get('duration'),
    technology: data.get('technology'),
    url: data.get('url'),
    description: data.get('description'),
  };

  try {
    const response = await axiosClient.post('/courses', submission);
    if (response) {
      toast.success('Course added', {
        position: 'top-center',
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        theme: 'colored',
      });
    }
    return redirect('/courses');
  } catch (error) {
    console.log(error);
    serverErrorToast();
    return redirect('/courses/new');
  }
};

export const deleteCourseAction = async ({ params }) => {
  console.log(params.id);

  const url = '/courses/' + params.id;

  try {
    const response = await axiosClient.delete(url);
    if (response) {
      toast.success('Course Deleted', {
        position: 'top-center',
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        theme: 'colored',
      });
    }
    return redirect('/courses');
  } catch (error) {
    console.log(error);
    serverErrorToast();
    return redirect('/courses');
  }
};

export const courseLoader = async () => {
  try {
    const response = await axiosClient.get('/courses/getall');

    return response.data.response;
  } catch (error) {
    console.log(error);
    serverErrorToast();
    return redirect('/login');
  }
};

export const axiosClient = axios.create({
  baseURL: 'http://localhost:3050/api/v1/lms',
});

axiosClient.interceptors.request.use((req) => {
  const data = localStorage.getItem('data') || '';
  const url = req.url;

  const isSecured =
    req.method === 'delete' ||
    (req.method === 'post' && url.includes('courses'));

  if (data && isSecured) {
    const parsedData = JSON.parse(data);

    if (!dayjs().isAfter(dayjs(parsedData.expiry))) {
      req.headers.authorization = 'Bearer ' + parsedData.token;
    } else {
      removeRole();
      removeToken();
      localStorage.removeItem('data');

      toast.error('Session Expired. Please Log in', {
        position: 'top-center',
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        theme: 'colored',
      });

      return redirect('/login');
    }
  }

  return req;
});
