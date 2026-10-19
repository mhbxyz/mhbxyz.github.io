---
translationKey: fptk-erreurs-explicites
title: "fptk: make errors explicit in a Python API"
date: 2026-02-06
tags: ["Python", "API", "Functional programming", "Error handling"]
author: "Manoah B."
draft: false
description: "Result and Validation make expected failures visible without turning every function into a try/except block."
---

## The problem is not exceptions

An API request goes through several steps: decode JSON, validate input, write to a database, then build a response. Each step can fail. In Python, we can let exceptions rise and catch them at the end. That works, but a function's signature does not tell us which steps can produce an expected failure. We may end up with one large `try/except` around the whole request, without a clear idea of what it catches.

I built [fptk](https://github.com/mhbxyz/fptk) to try another way of composing these operations. The goal is not to ban exceptions. It is to represent predictable failures in the values functions return.

## A result that says what happened

`Result` has two forms: `Ok` holds a value; `Err` holds an error. A conversion can therefore say clearly why it did not produce an age:

```python
from fptk.adt.result import Ok, Err

def parse_age(value: str):
    try:
        age = int(value)
    except ValueError:
        return Err("invalid age")

    return Ok(age) if age >= 0 else Err("negative age")

next_year = parse_age("42").map(lambda age: age + 1)
```

`map` transforms the value when the result is `Ok`. If conversion returned `Err`, the error passes through this step without another check. To chain a function that may also fail, use `bind`. The HTTP response is built at the edge of the application, where each error can be turned into a useful status and message.

## Absence and failure mean different things

Optional data can be missing without making the request invalid. `Option` represents that case. A malformed identifier, denied permission, or failed database write needs an explanation: that is what `Result` is for. This distinction keeps `None` from carrying several meanings.

Validation has another requirement. If several fields are wrong, receiving **all** the errors at once is more useful. `Validation` and `validate_all` collect them, whereas a chain of `Result` operations stops at the first failure. Once the input is valid, processing can continue with `Result`.

## Keep side effects at the edges

The benefit appears when the flow remains readable: input, validation, processing, response. Database access, email delivery, and other side effects stay at its boundaries. The business logic can then be tested without starting the entire server.

There is a cost. If every tiny function returns a container for no reason, the code becomes more ceremonial than clear. I use `Result` for operations where failure is a normal part of the behavior, and leave exceptions for unexpected errors. The [fptk API guide](https://github.com/mhbxyz/fptk/blob/main/docs/examples/api-development.fr.md) shows a complete flow with validation, data access, and error responses.
