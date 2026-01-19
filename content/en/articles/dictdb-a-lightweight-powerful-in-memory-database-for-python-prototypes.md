---
title: "DictDB: A Lightweight In-Memory Database for Python"
date: 2025-04-19
tags: ["Python", "In-Memory Database", "Prototyping", "Developer Tools"]
author: "Manoah B."
draft: false
description: "An in-memory database for Python with SQL-like CRUD, optional schemas, indexing, and persistence. Perfect for prototyping."
---

![DictDB Logo](https://raw.githubusercontent.com/mhbxyz/dictdb/main/docs/DictDBLogo.png)

## Why DictDB?

When prototyping or writing tests, you need a data store as agile as your code. SQLite feels heavy; plain dictionaries lack structure and querying power. **DictDB** bridges that gap: an in-memory, dictionary-backed database with SQL-like CRUD, optional schemas, indexing, and persistence. No server required.

## Features

- **Zero Configuration**: Import and use. No server, no setup.
- **Query DSL**: Fluent interface with Python operators (`table.age >= 18`).
- **Indexing**: Hash indexes for O(1) lookups, sorted indexes for range queries.
- **Optional Schemas**: Type validation when you need it.
- **Persistence**: Save/load via JSON or Pickle (sync and async).
- **Automatic Backups**: Periodic and incremental backup support.
- **Thread Safety**: Reader-writer locks for concurrent access.
- **Minimal Dependencies**: Only `sortedcontainers` required.

## Installation

```bash
pip install dctdb
```

> Note: The PyPI package is `dctdb`, but the import is `dictdb`.

**Requirements**: Python 3.13+

## Quick Example

```python
from dictdb import DictDB, Condition

db = DictDB()
db.create_table("users", primary_key="id")
users = db.get_table("users")

# Insert
users.insert({"name": "Alice", "age": 30, "role": "admin"})
users.insert({"name": "Bob", "age": 25, "role": "user"})

# Select with conditions
admins = users.select(where=Condition(users.role == "admin"))

# Update
users.update({"age": 31}, where=Condition(users.name == "Alice"))

# Delete
users.delete(where=Condition(users.name == "Bob"))

# Persist
db.save("data.json", file_format="json")
```

## Feature Comparison

| Solution       | Lightweight | Schema | Complex Queries | Persistence |
|----------------|:-----------:|:------:|:---------------:|:-----------:|
| Native `dict`  | Yes         | No     | No              | No          |
| TinyDB         | Yes         | Partial| Partial         | Yes         |
| SQLite         | No          | Yes    | Yes             | Yes         |
| **DictDB**     | Yes         | Yes    | Yes             | Yes         |

## Resources

- **Documentation**: https://mhbxyz.github.io/dictdb/
- **GitHub**: https://github.com/mhbxyz/dictdb
- **License**: Apache License 2.0
