# EduSpace Data Source Boundary

The current frontend uses a **verified reference-derived data set** reconstructed from the supplied screenshots. It is intentionally not presented as live Ministry data because no production API, database connection, or authenticated data source was supplied with the lost application.

The data model is in `client/src/data/eduspace.ts`. It includes the 14 regions visible across the Home references, the Nuyoma Senior Secondary School profile visible in the school references, seat-allocation metrics, grade vacancy rows, and hostel statistics. These values preserve the visible structure and values from the screenshots; they are not claims about current real-world school capacity.

`client/src/data/source.ts` defines the next integration boundary. If `VITE_EDUSPACE_DATA_URL` is provided, `loadEduSpaceData()` fetches a JSON payload with `regions`, `schools`, and `vacancyRows`, validates the top-level shape, and returns it. Without that environment variable, the app returns the verified reference-derived data. The actual production endpoint, authentication method, refresh policy, and authoritative data contract should be supplied before enabling live data.

Expected top-level JSON shape:

```json
{
  "regions": [],
  "schools": [],
  "vacancyRows": []
}
```

This boundary keeps the current visual reconstruction deterministic while leaving a clear, typed path for the real-data implementation after the user provides the source details.
