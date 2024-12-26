import { getTopic } from "~/db/turso";
import type { Route } from "../../+types/root";

/**
 * Executes on the server?
 */
export async function loader({ params }: Route.LoaderArgs) {
    const topicStr = params.topicId
    if (topicStr == null) {
        return new Response("Invalid ID", {status: 400})
    }
    const topicId = parseInt(topicStr)
    const topic = await getTopic(topicId)
    return { topic }
}

export default function Topic({ loaderData, }: Route.ComponentProps) {
    const { topic } = loaderData;
    return (
        <div>
            <h1>
                {topic.name}
            </h1>
            <h3>
                Topic #{topic.id}
            </h3>
        </div>
    )
}