This document provides a comprehensive API reference for the Qdrant Rust client, including complete examples and code for each operation.

**Note**: Replace `http://localhost:6334` with the actual URL of your Qdrant server.

## 1. Client Creation

### 1.1 Create a client:
```rust
use qdrant_client::prelude::*;

#[tokio::main]
async fn main() -> Result {
    // Create a client
    let client = QdrantClient::from_url("http://localhost:6334").build()?;

    // ... perform other operations ...

    Ok(())
}
```

### 1.2 Set API key (for Qdrant Cloud):
```rust
let client = client.with_api_key("your_api_key").build()?;
```

## 2. Collection Management

### 2.1 List Collections:
```rust
let collections_list = client.list_collections().await?;
println!("Collections: {:?}", collections_list);
```

### 2.2 Create Collection:
```rust
client
    .create_collection(&CreateCollection {
        collection_name: "my_collection".into(),
        vectors_config: Some(VectorsConfig {
            config: Some(Config::Params(VectorParams {
                size: 128,
                distance: Distance::Cosine.into(),
                ..Default::default()
            })),
        }),
        ..Default::default()
    })
    .await?;
```

### 2.3 Delete Collection:
```rust
client.delete_collection("my_collection").await?;
```

### 2.4 Get Collection Info:
```rust
let collection_info = client.collection_info("my_collection").await?;
println!("Collection Info: {:?}", collection_info);
```

## 3. Point Management

### 3.1 Upsert Points:
```rust
let points = vec![
    PointStruct::new(0, vec![0.1, 0.2, 0.3], Some(json!({"color": "red", "size": 10}))),
    PointStruct::new(1, vec![0.4, 0.5, 0.6], Some(json!({"color": "blue", "size": 20}))),
];

// Asynchronous operation
client.upsert_points("my_collection", points, None).await?;

// Blocking operation
client
    .upsert_points_blocking("my_collection", points, None)
    .await?;
```

### 3.2 Delete Points:
```rust
let points = vec![PointId {
    point_id_options: Some(Num(0)),
}, PointId {
    point_id_options: Some(Num(1)),
}];

client.delete_points("my_collection", points).await?;
```

## 4. Search Operations

### 4.1 Search Points:
```rust
let search_result = client
    .search_points(&SearchPoints {
        collection_name: "my_collection".into(),
        vector: vec![0.1, 0.2, 0.3],
        filter: Some(Filter::all([
            Condition::range("size", 10, 20),
            Condition::matches("color", "red"),
        ])),
        limit: 10,
        with_payload: Some(true.into()),
        ..Default::default()
    })
    .await?;

println!("Search Results: {:?}", search_result);
```

## 5. Other Operations

### 5.1 Scroll Points:
```rust
let scroll_result = client
    .scroll_points(&ScrollPoints {
        collection_name: "my_collection".into(),
        offset: None,
        limit: Some(10),
        filter: Some(Filter::all([Condition::matches("color", "red")])),
        ..Default::default()
    })
    .await?;

println!("Scroll Results: {:?}", scroll_result);
```

### 5.2 Search Batch Points:
```rust
let searches = vec![
    SearchPoints {
        collection_name: "my_collection".into(),
        vector: vec![0.1, 0.2, 0.3],
        ..Default::default()
    },
    SearchPoints {
        collection_name: "my_collection".into(),
        vector: vec![0.4, 0.5, 0.6],
        ..Default::default()
    },
];

let batch_result = client
    .search_batch_points("my_collection", searches)
    .await?;

println!("Batch Search Results: {:?}", batch_result);
```

### 5.3 Search Point Groups:
```rust
let search_result = client
    .search_points(&SearchPoints {
        collection_name: "my_collection".into(),
        vector: vec![0.1, 0.2, 0.3],
        group_by: Some("color".into()),
        group_size: Some(5),
        limit: Some(3),
        ..Default::default()
    })
    .await?;

println!("Grouped Search Results: {:?}", search_result);
```

### 5.4 Recommend Points:
```rust
let positive = vec![
    RecommendExample::Point(PointId {
        point_id_options: Some(Num(0)),
    }),
    RecommendExample::Vector(vec![0.1, 0.2, 0.3]),
];

let negative = vec![
    RecommendExample::Point(PointId {
        point_id_options: Some(Num(1)),
    }),
    RecommendExample::Vector(vec![0.4, 0.5, 0.6]),
];

let recommend_result = client
    .recommend_points(&RecommendPoints {
        collection_name: "my_collection".into(),
        positive,
        negative,
        limit: Some(10),
        ..Default::default()
    })
    .await?;

println!("Recommended Points: {:?}", recommend_result);
```

### 5.5 Recommend Batch Points:
```rust
let searches = vec![
    RecommendPoints {
        collection_name: "my_collection".into(),
        positive: vec![...],
        negative: vec![...],
        ..Default::default()
    },
    // ... more recommend requests ...
];

let batch_result = client
    .recommend_batch_points("my_collection", searches)
    .await?;

println!("Batch Recommend Results: {:?}", batch_result);