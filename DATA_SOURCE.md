# EduSpace Data Source Boundary

The application no longer bundles mock, sample, or screenshot-derived school and region records into its live data path. Every data-driven screen waits for an authoritative source configured through `VITE_EDUSPACE_DATA_URL`.

The typed contract is defined in `client/src/data/eduspace.ts`, while `client/src/data/source.ts` loads and validates a JSON document containing `regions`, `schools`, and `vacancyRows`. If the environment variable is missing, the app shows an explicit configuration state. If the endpoint fails or returns an invalid shape, the app shows an error state and offers retry. This prevents an apparently live experience from silently displaying invented records.

The expected top-level JSON shape is:

```json
{
  "regions": [
    {
      "id": "string",
      "name": "string",
      "schools": 0,
      "available": 0,
      "icon": "string",
      "tone": "string"
    }
  ],
  "schools": [
    {
      "id": "string",
      "name": "string",
      "region": "string",
      "location": "string",
      "category": "Primary | Secondary | Combined",
      "type": "Government | Private",
      "spaces": 0,
      "boarding": "Hostel | Day school",
      "image": "https://…",
      "description": "string"
    }
  ],
  "vacancyRows": [
    {
      "grade": "string",
      "note": "string",
      "enrolled": 0,
      "capacity": 0,
      "occupied": 0,
      "streams": []
    }
  ]
}
```

Top Availability calls `getEligibleSchools()`, which includes every source school whose numeric `spaces` value is greater than zero and sorts them from highest to lowest available spaces. When no eligible schools are returned, the screen explicitly says so rather than showing a placeholder school.

The production URL, authentication method, refresh policy, and authoritative data contract still need to be supplied before enabling live records. No unsupported live service has been invented.
