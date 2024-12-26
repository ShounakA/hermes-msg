import { SaveIcon, X } from "lucide-react"
import { Form, redirect, useNavigate } from "react-router"
import { Button } from "~/components/ui/button"
import { Card, CardHeader, CardContent, CardFooter } from "~/components/ui/card"
import { Input } from "~/components/ui/input"
import { Label } from "~/components/ui/label"
import { Route } from "./+types/add-topic"
import { Textarea } from "~/components/ui/textarea"
import { insertTopic } from "~/db/turso"
import { topicFormSchema } from "~/models/types"
import { z } from "zod"


export async function action({
    request,
  }: Route.ActionArgs) {
    let formData = await request.formData();
    const data = Object.fromEntries(formData);

    try {
        const { name, schema } = topicFormSchema.parse(data);
        let topic = await insertTopic(name, schema);
        return redirect(`/topics/${topic.id}`)
      } catch (error) {
        if (error instanceof z.ZodError) {
          return { success: false, errors: error.flatten().fieldErrors };
        }
      }
  }

export default function AddTopic({
    actionData,
  }: Route.ComponentProps) {
    const navigate = useNavigate()
    return (
        <div className="flex flex-col w-auto">
            <div className="m-auto">
                <Card>
                    <Form method="POST">
                        <CardHeader>
                            <div className="flex flex-col">
                                <p className="text-lg">
                                    Add Topic
                                </p>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div>
                                <Label htmlFor="name">Name</Label>
                                <Input type="text" id="name" placeholder="Topic Name" name="name" />
                                {actionData?.errors?.name && (
                                    <p className="error">{actionData.errors.name[0]}</p>
                                )}
                            </div>
                            <div>
                                <Label htmlFor="schema">Schema</Label>
                                <Textarea id="schema" name="schema"/>
                                {actionData?.errors?.schema && (
                                    <p className="error">{actionData.errors.schema[0]}</p>
                                )}
                            </div>
                        </CardContent>
                        <CardFooter>
                            <div className="flex flex-row justify-between">
                                <div>
                                    <Button type="submit" variant="default"> Save <SaveIcon/> </Button>
                                </div>
                                <div>
                                    <Button onClick={() => navigate(-1)} variant="destructive"> Cancel <X/> </Button>
                                </div>
                            </div>
                        </CardFooter>
                    </Form>
                </Card>
            </div>
        </div>
    )
}