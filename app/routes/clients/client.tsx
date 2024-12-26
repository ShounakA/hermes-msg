

import type { Route } from "../../+types/root";

/**
 * Executes on the server?
 */
export async function loader({ params }: Route.LoaderArgs) {
    const clientId = params.clientId
    return { clientId }
}

export default function Client({ loaderData, }: Route.ComponentProps) {
    const { clientId } = loaderData;
    return (
        <p>
            Client #{clientId}
        </p>
    )
}