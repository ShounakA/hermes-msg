import { deleteTopic, getTopics } from "~/db/turso";
import type { Route } from "../../+types/root";
import type { Topic } from "~/models/types";
import { Form, Link, redirect, useNavigate } from "react-router";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import { PlusIcon, TrashIcon } from 'lucide-react';


export async function loader({ params }: Route.LoaderArgs) {
    const topics = await getTopics();
    return { topics };
}

export async function action({
    request,
  }: Route.ActionArgs) {
    let formData = await request.formData();
    const { topicId } = Object.fromEntries(formData);

    const id = parseInt(topicId.toString())
    await deleteTopic(id)
    return redirect("/topics")
  }

export default function Topics({ loaderData }: Route.ComponentProps ) {
    const { topics } = loaderData
    let navigate = useNavigate();
    return (
        <div className="flex flex-col w-auto">
            <div className="m-auto">
            <Card>
                <CardHeader>
                    <div className="w-auto">
                        <Button onClick={() => navigate("/topics/add")}> Add <PlusIcon/> </Button>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-row gap-2 w-auto">
                        {topics.length ? topics.map((t: Topic) => (
                            <div className="max-w-72 w-auto rounded-lg hover:shadow-md">
                                    <div className="flex flex-col">
                                        <Card>
                                            <Link to={`/topics/${t.id}`} key={`topics-${t.id}`}>
                                            <CardHeader>
                                                <CardTitle><span>{t.name}</span></CardTitle>
                                                <CardDescription><span>{t.id}</span></CardDescription>
                                            </CardHeader>
                                            </Link>
                                            <CardContent>
                                                <code>{t.schema}</code>
                                            </CardContent>
                                            <CardFooter>
                                                <Form method="post">
                                                    <input name="topicId" value={t.id} hidden></input>
                                                    <Button type="submit" variant="destructive">
                                                        <div className="text-sm">
                                                            <TrashIcon/>
                                                        </div>
                                                    </Button>
                                                </Form>
                                            </CardFooter>
                                        </Card>
                                    </div>
                            </div>
                        )): (<p> No Topics! </p>)}
                    </div>
                </CardContent>
            </Card>
            </div>
        </div>
    )
}