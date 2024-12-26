import { type RouteConfig, index, layout, route } from "@react-router/dev/routes";

export default [
    index("routes/home.tsx"),
    layout("layouts/navLayout.tsx", [
        route("topics", "routes/topics/topics.tsx"),
        route("topics/add", "routes/topics/add-topic.tsx"),
        route("topics/:topicId", "routes/topics/topic.tsx"),
        route("clients", "routes/clients/clients.tsx"),
        route("clients/:clientId", "routes/clients/client.tsx")
    ])
] satisfies RouteConfig;
