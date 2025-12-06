# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.






C:\Users\hajiy>cd Documents

### How to export or dump collection data
C:\Users\hajiy\Documents>mongodump --uri="mongodb://localhost:27017/lms_first_release" --out=./backup


2025-12-06T10:44:09.752-0500    writing lms_first_release.users to backup\lms_first_release\users.bson
2025-12-06T10:44:09.754-0500    writing lms_first_release.courses to backup\lms_first_release\courses.bson
2025-12-06T10:44:09.757-0500    done dumping lms_first_release.users (6 documents)
2025-12-06T10:44:09.757-0500    done dumping lms_first_release.courses (4 documents)
### this shows things worked correctly during export


## How to import or restore mongodb collection data
C:\Users\hajiy\Documents>mongorestore --uri="mongodb+srv://hajiyevahijran_db_user:Ln9AbSJEQyA6Ebnf@cluster0.4dnk2h2.mongodb.net/?appName=Cluster0" ./backup


2025-12-06T10:45:30.135-0500    WARNING: On some systems, a password provided directly in a connection string or using --uri may be visible to system status programs such as `ps` that may be invoked by other users. Consider omitting the password to provide it via stdin, or using the --config option to specify a configuration file with the password.
2025-12-06T10:45:31.711-0500    preparing collections to restore from
2025-12-06T10:45:31.713-0500    don't know what to do with file "backup\lms_first_release\prelude.json", skipping...
2025-12-06T10:45:31.713-0500    reading metadata for lms_first_release.courses from backup\lms_first_release\courses.metadata.json
2025-12-06T10:45:31.714-0500    reading metadata for lms_first_release.users from backup\lms_first_release\users.metadata.json
2025-12-06T10:45:32.039-0500    restoring lms_first_release.users from backup\lms_first_release\users.bson
2025-12-06T10:45:32.161-0500    restoring lms_first_release.courses from backup\lms_first_release\courses.bson
2025-12-06T10:45:32.266-0500    finished restoring lms_first_release.users (6 documents, 0 failures)
2025-12-06T10:45:32.367-0500    finished restoring lms_first_release.courses (4 documents, 0 failures)
2025-12-06T10:45:32.367-0500    restoring indexes for collection lms_first_release.users from metadata
2025-12-06T10:45:32.368-0500    index: &idx.IndexDocument{Options:primitive.M{"background":true, "name":"email_1", "unique":true, "v":2}, Key:primitive.D{primitive.E{Key:"email", Value:1}}, PartialFilterExpression:primitive.D(nil)}
2025-12-06T10:45:32.368-0500    restoring indexes for collection lms_first_release.courses from metadata
2025-12-06T10:45:32.368-0500    index: &idx.IndexDocument{Options:primitive.M{"background":true, "name":"code_1", "unique":true, "v":2}, Key:primitive.D{primitive.E{Key:"code", Value:1}}, PartialFilterExpression:primitive.D(nil)}
2025-12-06T10:45:32.597-0500    10 document(s) restored successfully. 0 document(s) failed to restore.
