# Getting Started with hackerslatter

## Icons are used from [Freepik](https://www.freepik.com)

## Notes - some things are omitted on purpose:

- Due to the simplicity of a demo, I decide to use Bootstrap to save up time for common classes
- I could also use a classname package for a "nicer" way of writing className
- I decide to put all files into components, but they could be easily separate via purpose (for example)
  ```
  src/News/[name]
  ```
- In the `api/index.ts` there could be definitely some better error handling
- In the real world project I would probably use some third-party lib [restful-react](https://github.com/contiamo/restful-react) for auto generating _Request_ and _Response_ from back-end
- In the production build I would use a lib for removing `data-testid`
