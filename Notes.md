### Notes - some things are omitted on purpose:

- Due to the simplicity of a demo, I decide to use a Bootstrap to save up time for common classes
- I decide to put all files into components/common, but they could be easily separate via purpose (for example)
  ```
  src/News/[name_of_a_component]
  ```
- In the `api/index.ts` there could be definitely some better error handling
- In the real world project I would probably use some third-party lib like [restful-react](https://github.com/contiamo/restful-react) for auto generating _Request_ and _Response_ from back-end
- In the production build I would use a lib for removing `data-testid`