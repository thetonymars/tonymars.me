import { createClient } from "@sanity/client"

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production"

// Only create a real client when projectId is configured
export const sanityClient = projectId
  ? createClient({
      projectId,
      dataset,
      apiVersion: "2024-01-01",
      useCdn: true,
    })
  : createClient({
      projectId: "placeholder",
      dataset,
      apiVersion: "2024-01-01",
      useCdn: false,
    })
