import { TTask } from '@/core/types/tasks';
import { db } from '@/firebase/config';
import { useUser } from '@/hooks/useUser';
import { collection, deleteDoc, doc, onSnapshot, query, setDoc } from "firebase/firestore";
import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';


const useTasksHook = () => {
    const { user } = useUser()

    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [error, setError] = useState<boolean>(false)
    const [tasks, setTasks] = useState<TTask[]>([])


    useEffect(() => {
        let unsubscribe = () => { };
        if (user) {
            const q = query(collection(db, user.uid));
            unsubscribe = onSnapshot(q, (snapshot) => {
                snapshot.docChanges().forEach((change) => {
                    if (change.type === "added") {
                        setTasks((prev) => [change.doc.data(), ...prev] as TTask[])
                    }
                    if (change.type === "modified") {
                        let newList: TTask[] = []
                        snapshot.forEach(doc => {
                            console.log(doc.data(), ">> 111");
                            newList.push(doc.data() as TTask)
                        })

                        setTasks(newList)
                    }
                    if (change.type === "removed") {
                        let newList: TTask[] = []
                        snapshot.forEach(doc => {
                            if (doc.id !== change.doc.id) {
                                newList.push(doc.data() as TTask)
                            }
                        })

                        setTasks(newList)
                    }
                });
            });
        }

        return () => {
            unsubscribe()
        }
    }, [user])

    const onCreateTask = async (title: string, description: string, onComplete: (...arg: any[]) => void) => {
        setIsLoading(true)
        const docId = uuidv4()
        const newTask = {
            title,
            description,
            isDone: false,
            id: docId,
            createdAt: Date.now(),
        }

        try {
            if (user) {
                await setDoc(doc(db, user.uid, docId), newTask);
                if (onComplete) onComplete()
            }
        } catch (e: any) {
            console.error("Error adding document: ", e);
            setError(e.response)
        } finally {
            setIsLoading(false)
        }

    }

    const onRemoveTask = async (id: string) => {
        if (user) {
            await deleteDoc(doc(db, user.uid, id));
        }
    }

    const onEditTask = async (task: TTask, onComplete: (...arg: any[]) => void) => {
        try {
            if (user) {
                await setDoc(doc(db, user.uid, task.id), task);
                if (onComplete) onComplete()
            }
        } catch (e: any) {
            console.error("Error adding document: ", e);
            setError(e.response)
        } finally {
            setIsLoading(false)
        }
    }



    return {
        onRemoveTask,
        onCreateTask,
        onEditTask,
        isLoading,
        error,
        tasks
    }
}

export default useTasksHook