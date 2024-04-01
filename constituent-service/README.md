# Usage

### Run locally:

```shell
cd constituent-service
docker compose up
docker exec -it constituent-service-backend-1 /bin/bash
```

### Create a constituents:

#### POST http://localhost:8080/constituents
```json
{
    "email": "wade.atkins@email.com",
    "firstName": "tom",
    "lastName": "Atkins",
    "street": "123 Main St.",
    "city": "Cityville",
    "state": "Viginia",
    "postalCode": 1122334,
    "country": "United States"
}
```

### Get constituents:

#### GET http://localhost:8080/constituents?skip={i}&take={j}

### Download CSV:

#### GET http://localhost:8080/constituents/download?start={timestamp}&end={timestamp}

### Search for constituents

#### POST http://localhost:8080/constituents/search
```json
{
    "lastNames": [
        "Atkins"
    ],
    "createdDateRange": {
        "start": "2024-04-01T09:40:54.566Z",
        "end": "2024-04-01T09:42:03.751Z"
    }
}
```