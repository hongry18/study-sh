# babel plugin root import

## install dependency
> npm install --save babel-plugin-root-import

## babel plugin root import setting
.babelrc
```json
{
    "presets": ["es2015"],
    "plugins": [
        ["babel-plugin-root-import",[
            {
                "rootPathPrefix": "~",
                "rootPathSuffix": "server"
            }
        ]]
    ]
}
```

## usage
> import project/server/Custom.js file

```javascript
import CustomJs from '~/CustomJs';
```
