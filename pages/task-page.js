import Layout from "../components/Layout";
import Link from "next/link";
import { getAllTaskData } from "../lib/tasks";
import Task from "../components/Task";
import useSWR from "swr";
import { useEffect } from "react";
import StateContextProvider from "../context/StateContext";
import TaskForm from "../components/TaskForm";

const fetcher = (url) => fetch(url).then((res) => res.json());
const apiUrl = `${process.env.NEXT_PUBLIC_RESTAPI_URL}api/list-task/`;

 export default function TaskPage({ staticFillterdTasks }) {
    
    const {data: tasks, mutate} = useSWR(apiUrl, fetcher, {
        initialData: staticFillterdTasks,
    });

    const fillterdTasks = tasks?.sort(
        (a,b) => new Date(b.created_date) - new Date(a.created_date)
    );

    useEffect(() => {
        mutate();
    }, []);

    return (
        <StateContextProvider>
        <Layout title="Task page">
            <TaskForm taskCreated={mutate} />
            <ul>
                {fillterdTasks &&
                  fillterdTasks.map((task) => <Task key={task.id} task={task} taskDeleted={mutate} />)}
            </ul>
            <Link href="/main-page">
            <div className="flex cursor-pointer mt-12">
            <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-6 w-6 mr-3" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
            >
                <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth="2" 
                d="M11 19l-7-7 7-7m8 14l-7-7 7-7" 
                />
            </svg><span>Back to main page</span>
            </div>
            </Link>
        </Layout>
        </StateContextProvider>
    );
 }

 export async function getStaticProps() {
    const staticFillterdTasks = await getAllTaskData();
    return {
        props: { staticFillterdTasks },
        revalidate: 3,
    };
}