import { Fragment, useState } from 'react';
import { Link, Form, useLocation, useActionData } from 'react-router-dom';
import Course from './Course';

const Search = () => {
    const location = useLocation();
    const path = location.pathname.replace('/', '');

    const techSearch = path.toLowerCase() === 'searchbytech';

    const [enable, setEnable] = useState(false);

    const handleClick = () => {
        setEnable(!enable);
    };

    const courses = useActionData()    

    return (
        <Fragment>
            <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-lg">
                    <div className="flex justify-between ml-8 mr-8 pb-2">
                        <h1 className="text-left text-2xl font-bold text-blue-900 sm:text-3xl">
                            Search
                        </h1>

                        {techSearch && (
                            <button
                                className="rounded border border-blue-900 bg-blue-900 hover:bg-blue-600 px-3.5 py-2 text-[16px] font-medium text-white"
                                onClick={handleClick}
                            >
                                {enable ? 'Remove Duration' : 'Add Duration'}
                            </button>
                        )}
                    </div>

                    <div className="rounded-lg p-8 shadow-lg lg:col-span-3 lg:p-12">
                        <Form method="post" action={techSearch ? "/searchByTech" : "/result"} className="space-y-1 p-1">
                            {!techSearch && (
                                <div>
                                    <label
                                        className="mb-1 block text-sm font-medium text-gray-700"
                                        htmlFor="search"
                                    >
                                        Name
                                    </label>
                                    <input
                                        className="w-full rounded-lg border-gray-200 p-3 text-sm"
                                        type="text"
                                        id="search"
                                        name="search"
                                        required
                                    />
                                </div>
                            )}

                            {techSearch && (
                                <Fragment>
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
                                    {enable && (
                                        <Fragment>
                                            <div>
                                                <label
                                                    className="mb-1 block text-sm font-medium text-gray-700"
                                                    htmlFor="from"
                                                >
                                                    From Duration
                                                </label>
                                                <input
                                                    className="w-full rounded-lg border-gray-200 p-3 text-sm"
                                                    type="number"
                                                    id="from"
                                                    name="from"
                                                    required
                                                />
                                            </div>
                                            <div>
                                                <label
                                                    className="mb-1 block text-sm font-medium text-gray-700"
                                                    htmlFor="to"
                                                >
                                                    To Duration
                                                </label>
                                                <input
                                                    className="w-full rounded-lg border-gray-200 p-3 text-sm"
                                                    type="number"
                                                    id="to"
                                                    name="to"
                                                    required
                                                />
                                            </div>
                                        </Fragment>
                                    )}
                                </Fragment>
                            )}

                            <div className="pt-2 flex gap-2">
                                <button
                                    type="submit"
                                    className="inline-block w-full rounded-lg bg-blue-900 hover:bg-blue-600 px-3 py-2.5 font-medium text-white sm:w-auto"
                                >
                                    Search
                                </button>

                                <Link
                                    to="/home"
                                    className="inline-block w-full rounded-lg border-2 border-blue-900 hover:bg-blue-600 hover:text-white px-4 py-2 font-medium sm:w-auto"
                                >
                                    Cancel
                                </Link>
                            </div>
                        </Form>
                    </div>
                </div>
            </div>

            {courses && (<Fragment>
                <div className="mx-auto max-w-screen-xl px-4 py-12 sm:px-6 lg:px-8">
                    <div className="flex justify-between ml-8 mr-8">
                        <h1 className="text-2xl font-bold text-blue-900 sm:text-3xl">
                            Result
                        </h1>


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
            </Fragment>)}
        </Fragment>
    );
};

export default Search;
