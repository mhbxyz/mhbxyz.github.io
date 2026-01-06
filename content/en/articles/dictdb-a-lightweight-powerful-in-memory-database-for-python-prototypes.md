---
title: "DictDB: A Lightweight, Powerful In‑Memory Database for Python Prototypes"
date: 2025-04-19
tags: ["Python", "In‑Memory Database", "Prototyping", "Developer Tools"]
author: "Manoah B."
draft: false
---

![DictDB Logo](https://raw.githubusercontent.com/mhbxyz/dictdb/main/docs/DictDBLogo.png)

## Why DictDB?
When you’re building a prototype, writing unit tests, or validating business logic, you need a data store that’s as nimble as your code. SQLite can feel heavy and verbose; plain Python dictionaries lack structure, schema, and powerful querying. **DictDB** bridges that gap: a 100% in‑memory, dictionary‑backed database with SQL‑inspired syntax, schema enforcement, indexing, transactions, and optional persistence — all without installing or configuring a separate server.

## 🚀 Key Benefits

- **Zero Configuration**: Import and use. No server, no files (unless you choose to persist).
- **Familiar API**: SQL‑style CRUD via a fluent, Pythonic DSL (`table.select(...)`, `table.insert(...)`).
- **Schema Enforcement**: Define types and constraints to catch errors early.
- **High Performance**: Automatic hash and sorted indexes speed up lookups.
- **Atomic Transactions**: Batch updates roll back on failure, preserving data integrity.
- **Lightweight Persistence**: JSON or pickle dumps (sync/async) to save and restore state.
- **Rich Logging**: Integrated with Loguru for debug, audit, and trace capabilities.

## 🔧 Installation

```bash
# From source (dev version)
git clone https://github.com/mhbxyz/dictdb.git
cd dictdb
pip install .

# Future PyPI release
pip install dictdb
```

## 🎯 Core Concepts

| Component        | Responsibility                                    |
|------------------|----------------------------------------------------|
| **DictDB**       | Manages multiple in‑memory tables                 |
| **Table**        | Holds records, schema, indexes, and CRUD logic    |
| **Field & Query**| Build SQL‑like conditions with Python operators    |
| **Index**        | HashIndex & SortedIndex for fast equality/range   |
| **BackupManager**| Automated periodic or on‑demand persistence       |

## 💡 Quickstart Example

```python
from dictdb import DictDB, Query, configure_logging

# Enable debug logging to console
configure_logging(level="DEBUG", console=True)

# 1️⃣ Create database and table
db = DictDB()
db.create_table("employees", primary_key="emp_id")
employees = db.get_table("employees")

# 2️⃣ Insert records (auto‑assigns emp_id if missing)
employees.insert({"emp_id": 101, "name": "Alice", "dept": "IT"})
employees.insert({"emp_id": 102, "name": "Bob",   "dept": "HR"})
employees.insert({           "name": "Charlie", "dept": "IT"})  # emp_id=103

# 3️⃣ Query with filters and projections
it_staff = employees.select(
    columns=["emp_id","name"],
    where=Query(employees.dept == "IT")
)
print(it_staff)

# 4️⃣ Update and delete
employees.update(
    {"dept": "Engineering"},
    where=Query(employees.name == "Alice")
)
employees.delete(where=Query(employees.name == "Bob"))

# 5️⃣ Persist to JSON
from pathlib import Path
backup = Path("./backup.json")
db.save(backup, file_format="json")

# 6️⃣ Load later
restored = DictDB.load(backup, file_format="json")
```  

## ⚖️ Feature Comparison

| Solution             | Lightweight | Schema | Complex Queries | Persistence |
|----------------------|:-----------:|:------:|:---------------:|:-----------:|
| Native `dict`        | ✔️          | ❌     | ❌              | ❌          |
| TinyDB               | ✔️          | Partial| Partial         | ✔️          |
| SQLite               | ❌          | ✔️     | ✔️              | ✔️          |
| **DictDB**           | ✔️          | ✔️     | ✔️              | ✔️          |

## 🏗️ Under the Hood

1. **Records & Schema**: Tables store Python dicts; optional schema enforces field types and presence.  
2. **Indexes**: Create hash or sorted indexes. Simple equality queries use O(1) lookups; range scans use bisect.  
3. **Conditions & Query**: Overloaded operators (`==, !=, <, >, &, |, ~`) generate a composable AST of predicates.  
4. **Transactions**: Updates collect backups, validate new state; rollback on any error (schema or otherwise).  
5. **Persistence**: `save`/`load` support JSON (human‑readable) and pickle (fast, Python‑native), sync or async.  
6. **BackupManager**: In threaded background or on‑demand, writes timestamped snapshots.

## 🚧 Roadmap

1. **JOINs & Subqueries**: Cross‑table queries with SQL‑style syntax.  
2. **Aggregate Functions**: `COUNT`, `SUM`, `AVG` on query results.  
3. **Advanced SQL Parser**: Parse SQL strings to DSL calls.  
4. **Concurrency Control**: Locks, MVCC for thread/process safety.  
5. **CLI & GUI**: Interactive shell and web dashboard for ad-hoc data exploration.

## 🤝 Contributing

DictDB is MIT‑licensed and open source. Your feedback, bug reports, and pull requests are welcome!  

- **GitHub**: https://github.com/mhbxyz/dictdb  
- **Issues**: https://github.com/mhbxyz/dictdb/issues
