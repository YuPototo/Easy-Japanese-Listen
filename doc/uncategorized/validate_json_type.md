# How to validate JSON schema

## Problem

`Transcription` should follow a schema. How to validate it?

In app's lifecyle, there are several steps to validate.

1. When input transcription, validate it.
2. When get transcription, validate it.
3. In database, validate it.

I plan to validate it in step 1 and 2.

To validate in Step 3, we need to use JSON schema in database. That will take more time than I want to spend.
